import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import {
  AlertTriangle,
  Zap,
  FlaskConical,
  Sprout,
  ShieldCheck,
  Volume2,
  VolumeX,
  Share2,
  RefreshCw,
  Clock,
  HardDrive
} from 'lucide-react-native';
import { TRANSLATIONS, CROP_DISEASE_TRANSLATIONS_HI } from '../theme/i18n';

export default function AdvisoryCard({ advisory, result, onResetScan, language = 'en' }) {
  const [activeSubTab, setActiveSubTab] = useState('immediate'); // immediate, chemical, organic, prevention
  const [isSpeaking, setIsSpeaking] = useState(false);

  const scanData = advisory || result;
  if (!scanData || !scanData.disease) return null;

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const { disease, imageUri, inferenceTimeMs } = scanData;

  // Check if Hindi translation exists for this specific disease
  const diseaseKey = disease.id || disease.scientificName || '';
  const hiTrans = CROP_DISEASE_TRANSLATIONS_HI[diseaseKey] ||
                  CROP_DISEASE_TRANSLATIONS_HI[diseaseKey.replace('Grape_Grape_', 'Grape_')] ||
                  CROP_DISEASE_TRANSLATIONS_HI[diseaseKey.replace(/ /g, '_')];

  const diseaseName = (language === 'hi' && hiTrans?.name) ? hiTrans.name : disease.name;
  const description = (language === 'hi' && hiTrans?.description) ? hiTrans.description : disease.description;
  const immediateActions = (language === 'hi' && hiTrans?.immediateActions) ? hiTrans.immediateActions : disease.immediateActions;
  const chemicalTreatment = (language === 'hi' && hiTrans?.chemicalTreatment) ? hiTrans.chemicalTreatment : disease.chemicalTreatment;
  const organicTreatment = (language === 'hi' && hiTrans?.organicTreatment) ? hiTrans.organicTreatment : disease.organicTreatment;
  const preventativeMeasures = (language === 'hi' && hiTrans?.preventativeMeasures) ? hiTrans.preventativeMeasures : disease.preventativeMeasures;

  // Localized severity label
  const getSeverityLabel = () => {
    if (language === 'hi') {
      const s = (disease.severity || '').toLowerCase();
      if (s.includes('high')) return t.severityHigh;
      if (s.includes('med')) return t.severityMedium;
      if (s.includes('low')) return t.severityLow;
      return t.severityNone;
    }
    return `${disease.severity} Severity`;
  };

  // Voice speech advisory reader helper
  const toggleSpeech = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const textToRead = `${diseaseName}. ${immediateActions.join('. ')}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      alert(`${diseaseName}. ${immediateActions[0]}`);
    }
  };

  const handleShare = () => {
    const shareText = `🌾 Smart Farm Advisory\n${diseaseName}\n${t.confidence} ${(disease.confidence * 100).toFixed(1)}%\n${immediateActions[0]}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: 'Crop Advisory', text: shareText });
    } else {
      alert(`Report Copied:\n\n${shareText}`);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Result Header & Status Banner */}
      <View style={styles.headerBanner}>
        <View style={styles.headerTitleRow}>
          <View style={[styles.severityBadge, { backgroundColor: disease.severityColor }]}>
            <AlertTriangle size={12} color="#fff" style={{ marginRight: 4 }} />
            <Text style={styles.severityText}>{getSeverityLabel()}</Text>
          </View>

          <View style={styles.metaRow}>
            <Clock size={12} color={Colors.textSecondaryDark} />
            <Text style={styles.metaText}>{inferenceTimeMs || 35}ms (RAM)</Text>
          </View>
        </View>

        <Text style={styles.diseaseName}>{diseaseName}</Text>
        <Text style={styles.scientificName}>{disease.scientificName}</Text>
      </View>

      {/* Scanned Image with Dynamic ROI Highlight Overlay */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.scannedImage} />
        
        {/* Heatmap / Bounding box ROI highlight overlay */}
        <View style={[
          styles.roiBox,
          disease.roiBox && {
            top: disease.roiBox.top || '20%',
            left: disease.roiBox.left || '20%',
            width: disease.roiBox.width || '50%',
            height: disease.roiBox.height || '45%'
          }
        ]}>
          <Text style={styles.roiTag}>{t.detectedZone} • {(disease.confidence * 100).toFixed(1)}%</Text>
        </View>

        <View style={styles.confidencePill}>
          <Text style={styles.confidenceText}>
            {t.confidence} {(disease.confidence * 100).toFixed(1)}%
          </Text>
        </View>
      </View>

      <Text style={styles.descriptionText}>{description}</Text>

      {/* Voice Reader & Action Controls */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.audioBtn, isSpeaking && styles.audioBtnActive]}
          onPress={toggleSpeech}
        >
          {isSpeaking ? (
            <VolumeX size={16} color="#fff" />
          ) : (
            <Volume2 size={16} color={Colors.primaryLight} />
          )}
          <Text style={[styles.audioBtnText, isSpeaking && { color: '#fff' }]}>
            {isSpeaking ? t.stopAudio : t.listenAdvisory}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Share2 size={16} color={Colors.textPrimaryDark} />
          <Text style={styles.shareBtnText}>{t.share}</Text>
        </TouchableOpacity>
      </View>

      {/* Advisory Navigation Sub-Tabs */}
      <View style={styles.subTabRow}>
        <TouchableOpacity
          style={[styles.subTab, activeSubTab === 'immediate' && styles.subTabActive]}
          onPress={() => setActiveSubTab('immediate')}
        >
          <Zap size={14} color={activeSubTab === 'immediate' ? '#fff' : Colors.textSecondaryDark} />
          <Text style={[styles.subTabText, activeSubTab === 'immediate' && styles.subTabTextActive]}>
            {t.subTabImmediate}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.subTab, activeSubTab === 'chemical' && styles.subTabActive]}
          onPress={() => setActiveSubTab('chemical')}
        >
          <FlaskConical size={14} color={activeSubTab === 'chemical' ? '#fff' : Colors.textSecondaryDark} />
          <Text style={[styles.subTabText, activeSubTab === 'chemical' && styles.subTabTextActive]}>
            {t.subTabChemical}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.subTab, activeSubTab === 'organic' && styles.subTabActive]}
          onPress={() => setActiveSubTab('organic')}
        >
          <Sprout size={14} color={activeSubTab === 'organic' ? '#fff' : Colors.textSecondaryDark} />
          <Text style={[styles.subTabText, activeSubTab === 'organic' && styles.subTabTextActive]}>
            {t.subTabOrganic}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.subTab, activeSubTab === 'prevention' && styles.subTabActive]}
          onPress={() => setActiveSubTab('prevention')}
        >
          <ShieldCheck size={14} color={activeSubTab === 'prevention' ? '#fff' : Colors.textSecondaryDark} />
          <Text style={[styles.subTabText, activeSubTab === 'prevention' && styles.subTabTextActive]}>
            {t.subTabPrevent}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sub-Tab Content View */}
      <View style={styles.advisoryBody}>
        {activeSubTab === 'immediate' && (
          <View>
            <Text style={styles.sectionHeader}>{t.immediateTitle}</Text>
            {immediateActions.map((item, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <View style={styles.bulletNumber}>
                  <Text style={styles.bulletNumText}>{idx + 1}</Text>
                </View>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {activeSubTab === 'chemical' && (
          <View>
            <Text style={styles.sectionHeader}>{t.chemicalTitle}</Text>
            {chemicalTreatment.map((item, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <View style={[styles.bulletNumber, { backgroundColor: Colors.info }]}>
                  <Text style={styles.bulletNumText}>{idx + 1}</Text>
                </View>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {activeSubTab === 'organic' && (
          <View>
            <Text style={styles.sectionHeader}>{t.organicTitle}</Text>
            {organicTreatment.map((item, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <View style={[styles.bulletNumber, { backgroundColor: Colors.primary }]}>
                  <Text style={styles.bulletNumText}>{idx + 1}</Text>
                </View>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {activeSubTab === 'prevention' && (
          <View>
            <Text style={styles.sectionHeader}>{t.preventTitle}</Text>
            {preventativeMeasures.map((item, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <View style={[styles.bulletNumber, { backgroundColor: Colors.accent }]}>
                  <Text style={styles.bulletNumText}>{idx + 1}</Text>
                </View>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Rescan Button */}
      <TouchableOpacity style={styles.rescanBtn} activeOpacity={0.8} onPress={onResetScan}>
        <RefreshCw size={18} color="#fff" />
        <Text style={styles.rescanBtnText}>{t.scanAnotherBtn}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 20,
    ...Shadows.medium,
  },
  headerBanner: {
    marginBottom: 12,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimaryDark,
    marginBottom: 2,
  },
  scientificName: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontStyle: 'italic',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
  },
  scannedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  roiBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#dc2626',
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    borderRadius: 8,
    padding: 4,
  },
  roiTag: {
    color: '#fff',
    backgroundColor: '#dc2626',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  confidencePill: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  confidenceText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 13,
    color: Colors.textSecondaryDark,
    lineHeight: 19,
    marginBottom: 14,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  audioBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    backgroundColor: Colors.primaryBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.3)',
  },
  audioBtnActive: {
    backgroundColor: Colors.primary,
  },
  audioBtnText: {
    color: Colors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  shareBtnText: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  subTabRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14,
  },
  subTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  subTabActive: {
    backgroundColor: Colors.primary,
  },
  subTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondaryDark,
  },
  subTabTextActive: {
    color: '#fff',
  },
  advisoryBody: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimaryDark,
    marginBottom: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  bulletNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  bulletNumText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  bulletText: {
    flex: 1,
    color: Colors.textPrimaryDark,
    fontSize: 12,
    lineHeight: 18,
  },
  rescanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  rescanBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
