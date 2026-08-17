import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import { Camera, Sparkles, AlertCircle, CheckCircle2, History, Cpu, FileCode, Languages, Globe } from 'lucide-react-native';
import CameraModal from '../components/CameraModal';
import InferenceOverlay from '../components/InferenceOverlay';
import AdvisoryCard from '../components/AdvisoryCard';
import { runRAMInference } from '../services/dlModelService';
import { TRANSLATIONS } from '../theme/i18n';

export default function DiseaseDetectionScreen({ language = 'en', setLanguage }) {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [inferring, setInferring] = useState(false);
  const [inferenceStep, setInferenceStep] = useState(null);
  const [advisoryResult, setAdvisoryResult] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [selectedModel, setSelectedModel] = useState('mobilenet'); // 'mobilenet' (45 classes) or 'ghostnet' (38 classes)

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Handles photo capture from camera modal or file picker
  const handlePhotoCaptured = async (imageUri, presetDiseaseId) => {
    setInferring(true);
    setAdvisoryResult(null);

    try {
      const result = await runRAMInference(imageUri, presetDiseaseId, (step) => {
        setInferenceStep(step);
      }, selectedModel);

      setAdvisoryResult(result);
      setRecentScans((prev) => [result, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error('RAM Inference error:', error);
    } finally {
      setInferring(false);
      setInferenceStep(null);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Welcome Hero Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View style={styles.badge}>
            <Sparkles size={14} color={Colors.primaryLight} />
            <Text style={styles.badgeText}>{t.badgeModel}</Text>
          </View>
          <View style={styles.pyBadge}>
            <FileCode size={12} color={Colors.accent} />
            <Text style={styles.pyBadgeText}>{t.badgeApi}</Text>
          </View>
        </View>

        <Text style={styles.heroTitle}>{t.heroTitle}</Text>
        <Text style={styles.heroSubtitle}>
          {t.heroSubtitle}
        </Text>

        {/* Model Switcher Selector */}
        <View style={styles.modelSelectorContainer}>
          <Text style={styles.modelSelectorLabel}>{t.modelSelectorLabel}</Text>
          <View style={styles.modelToggleRow}>
            <TouchableOpacity
              style={[styles.modelTab, selectedModel === 'mobilenet' && styles.modelTabActive]}
              onPress={() => setSelectedModel('mobilenet')}
              activeOpacity={0.8}
            >
              <Cpu size={14} color={selectedModel === 'mobilenet' ? '#fff' : Colors.textSecondaryDark} />
              <Text style={[styles.modelTabText, selectedModel === 'mobilenet' && styles.modelTabTextActive]}>
                {t.modelMobileNet}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modelTab, selectedModel === 'ghostnet' && styles.modelTabActive]}
              onPress={() => setSelectedModel('ghostnet')}
              activeOpacity={0.8}
            >
              <Cpu size={14} color={selectedModel === 'ghostnet' ? '#fff' : Colors.textSecondaryDark} />
              <Text style={[styles.modelTabText, selectedModel === 'ghostnet' && styles.modelTabTextActive]}>
                {t.modelGhostNet}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          style={styles.captureBtn}
          activeOpacity={0.85}
          onPress={() => setCameraVisible(true)}
        >
          <View style={styles.captureIconWrapper}>
            <Camera size={24} color="#ffffff" />
          </View>
          <View>
            <Text style={styles.captureBtnTitle}>{t.clickPhotoBtn}</Text>
            <Text style={styles.captureBtnSubtitle}>
              {selectedModel === 'mobilenet' ? t.usingModelMobileNet : t.usingModelGhostNet}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Inference Processing Overlay */}
      {inferring && <InferenceOverlay step={inferenceStep} />}

      {/* Disease Diagnosis & Agronomic Advisory Card Output */}
      {advisoryResult && (
        <AdvisoryCard
          advisory={advisoryResult}
          onResetScan={() => setAdvisoryResult(null)}
          language={language}
        />
      )}

      {/* Recent Scans History Section */}
      <View style={styles.historySection}>
        <View style={styles.sectionTitleRow}>
          <History size={18} color={Colors.primaryLight} />
          <Text style={styles.sectionTitle}>{t.recentScansTitle}</Text>
        </View>

        {recentScans.length === 0 ? (
          <View style={styles.emptyHistoryCard}>
            <AlertCircle size={24} color={Colors.textSecondaryDark} />
            <Text style={styles.emptyText}>{t.noScansText}</Text>
          </View>
        ) : (
          recentScans.map((scan, index) => (
            <TouchableOpacity
              key={index}
              style={styles.historyItem}
              onPress={() => setAdvisoryResult(scan)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: scan.imageUri }} style={styles.historyThumb} />
              <View style={styles.historyInfo}>
                <Text style={styles.historyDiseaseName}>{scan.disease.name}</Text>
                <Text style={styles.historyMeta}>
                  {scan.disease.crop} • {(scan.disease.confidence * 100).toFixed(1)}% {t.confidence}
                </Text>
              </View>
              <View style={[styles.severityBadge, { backgroundColor: scan.disease.severityColor }]}>
                <Text style={styles.severityBadgeText}>{scan.disease.severity}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Camera Capture / Demo Picker Modal */}
      <CameraModal
        visible={cameraVisible}
        onClose={() => setCameraVisible(false)}
        onPhotoCaptured={handlePhotoCaptured}
        language={language}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  topHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    backgroundColor: Colors.bgCardDark,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    ...Shadows.small,
  },
  appTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  langToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 3,
  },
  langBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9,
  },
  langBtnActive: {
    backgroundColor: Colors.primary,
  },
  langBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondaryDark,
  },
  langBtnTextActive: {
    color: '#ffffff',
  },
  heroCard: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 20,
    ...Shadows.medium,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  badgeText: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '600',
  },
  pyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  pyBadgeText: {
    color: Colors.accent,
    fontSize: 11,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimaryDark,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.textSecondaryDark,
    lineHeight: 20,
    marginBottom: 16,
  },
  modelSelectorContainer: {
    marginBottom: 16,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  modelSelectorLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondaryDark,
    marginBottom: 8,
  },
  modelToggleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  modelTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#e2e8f0',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  modelTabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  modelTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondaryDark,
  },
  modelTabTextActive: {
    color: '#ffffff',
  },
  captureBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...Shadows.small,
  },
  captureIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtnTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  captureBtnSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  historySection: {
    marginTop: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimaryDark,
  },
  emptyHistoryCard: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    borderStyle: 'dashed',
  },
  emptyText: {
    color: Colors.textSecondaryDark,
    fontSize: 13,
    textAlign: 'center',
  },
  historyItem: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  historyThumb: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  historyInfo: {
    flex: 1,
  },
  historyDiseaseName: {
    color: Colors.textPrimaryDark,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyMeta: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
});
