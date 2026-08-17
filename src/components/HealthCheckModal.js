import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Colors } from '../theme/colors';
import { X, Check, AlertTriangle, ShieldCheck, Stethoscope, ChevronRight, MapPin } from 'lucide-react-native';
import { predictCowHealth } from '../services/livestockDataService';

export default function HealthCheckModal({ visible, cow, onClose, onSavePrediction, selectedHistoryItem, language = 'en' }) {
  const isHi = language === 'hi';
  // Screen views: 'questionnaire' | 'result' | 'history_detail'
  const [mode, setMode] = useState('questionnaire');

  // Questionnaire selections
  const [feedType, setFeedType] = useState('Green fodder');
  const [season, setSeason] = useState('Summer');
  const [feedIntake, setFeedIntake] = useState('Normal');
  const [rumination, setRumination] = useState('Normal');

  // Result state
  const [predictionResult, setPredictionResult] = useState(null);

  if (!cow) return null;

  // Handle Predict button press
  const handlePredict = () => {
    const res = predictCowHealth(feedType, season, feedIntake, rumination);
    const newPrediction = {
      id: `hh_${Date.now()}`,
      date: isHi ? 'आज' : 'Today',
      result: res.result,
      feedType,
      season,
      feedIntake,
      rumination,
      note: res.recommendation
    };

    setPredictionResult({
      ...res,
      record: newPrediction
    });

    onSavePrediction(cow.id, newPrediction);
    setMode('result');
  };

  const handleReset = () => {
    setFeedType('Green fodder');
    setSeason('Summer');
    setFeedIntake('Normal');
    setRumination('Normal');
    setPredictionResult(null);
    setMode('questionnaire');
  };

  const handleVisitHospital = () => {
    Alert.alert(
      isHi ? '🏥 नजदीकी पशु अस्पताल' : '🏥 Nearby Veterinary Hospitals',
      isHi
        ? '1. जिला पशु चिकित्सालय (2.4 किमी)\n   फोन: +91 98765 43210\n\n2. कृषि विज्ञान केंद्र पशु देखभाल (5.1 किमी)\n   फोन: +91 98123 45678'
        : '1. District Veterinary Polyclinic (2.4 km)\n   Phone: +91 98765 43210\n\n2. Krishi Vigyan Kendra Vet Care (5.1 km)\n   Phone: +91 98123 45678',
      [{ text: isHi ? 'ठीक है' : 'OK' }]
    );
  };

  // If opening from a historical entry tap:
  const activeHistory = selectedHistoryItem;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>{isHi ? '🩺 स्वास्थ्य परीक्षण' : '🩺 Health Check'}</Text>
              <Text style={styles.headerSub}>🐄 {cow.name} ({cow.tagNumber})</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* VIEW 1: QUESTIONNAIRE */}
          {(mode === 'questionnaire' && !activeHistory) && (
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
              <Text style={styles.instructionText}>{isHi ? 'स्वास्थ्य स्थिति का मूल्यांकन करने के लिए निम्नलिखित 4 प्रश्नों के उत्तर दें:' : 'Answer the following 4 questions to evaluate health status:'}</Text>

              {/* Evaluation Rule Definition Banner */}
              <View style={styles.ruleCard}>
                <Text style={styles.ruleCardTitle}>
                  {isHi ? '📋 स्वास्थ्य मूल्यांकन नियम परिभाषा:' : '📋 Health Evaluation Logic Rules:'}
                </Text>
                <Text style={styles.ruleCardText}>
                  {isHi
                    ? '• यदि चारा खपत या जुगाली "बहुत कम" है ➔ अस्वस्थ (🔴)\n• यदि चारा खपत और जुगाली दोनों "कम" हैं ➔ अस्वस्थ (🔴)\n• यदि वर्षा ऋतु में चारा खपत "कम" है ➔ अस्वस्थ (🔴)\n• अन्यथा ➔ पूर्णतः स्वस्थ (🟢)'
                    : '• If Feed Intake or Rumination is "Very Low" ➔ Needs Attention (🔴)\n• If both Feed Intake & Rumination are "Low" ➔ Needs Attention (🔴)\n• If Feed Intake is "Low" during Monsoon ➔ Needs Attention (🔴)\n• Otherwise ➔ Healthy (🟢)'}
                </Text>
              </View>

              {/* Q1: Feed Type */}
              <View style={styles.questionCard}>
                <Text style={styles.questionTitle}>{isHi ? '1. चारे का प्रकार' : '1. Feed Type'}</Text>
                <View style={styles.radioGroup}>
                  {[
                    { en: 'Green fodder', hi: 'हरा चारा' },
                    { en: 'Dry fodder', hi: 'सूखा चारा' },
                    { en: 'Mixed feed', hi: 'मिश्रित चारा' },
                    { en: 'Concentrate', hi: 'दाना / पोषाहार' }
                  ].map(optObj => (
                    <TouchableOpacity
                      key={optObj.en}
                      style={[styles.radioRow, feedType === optObj.en && styles.radioRowActive]}
                      onPress={() => setFeedType(optObj.en)}
                    >
                      <View style={[styles.radioCircle, feedType === optObj.en && styles.radioCircleActive]}>
                        {feedType === optObj.en && <View style={styles.radioInner} />}
                      </View>
                      <Text style={[styles.radioLabel, feedType === optObj.en && styles.radioLabelActive]}>{isHi ? optObj.hi : optObj.en}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Q2: Season */}
              <View style={styles.questionCard}>
                <Text style={styles.questionTitle}>{isHi ? '2. मौसम (ऋतु)' : '2. Season'}</Text>
                <View style={styles.radioGroup}>
                  {[
                    { en: 'Summer', hi: 'गर्मी' },
                    { en: 'Winter', hi: 'सर्दी' },
                    { en: 'Monsoon', hi: 'बरसात' }
                  ].map(optObj => (
                    <TouchableOpacity
                      key={optObj.en}
                      style={[styles.radioRow, season === optObj.en && styles.radioRowActive]}
                      onPress={() => setSeason(optObj.en)}
                    >
                      <View style={[styles.radioCircle, season === optObj.en && styles.radioCircleActive]}>
                        {season === optObj.en && <View style={styles.radioInner} />}
                      </View>
                      <Text style={[styles.radioLabel, season === optObj.en && styles.radioLabelActive]}>{isHi ? optObj.hi : optObj.en}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Q3: Feed Intake Level */}
              <View style={styles.questionCard}>
                <Text style={styles.questionTitle}>{isHi ? '3. चारा खाने का स्तर' : '3. Feed Intake Level'}</Text>
                <View style={styles.radioGroup}>
                  {[
                    { en: 'Normal', hi: '🟢 सामान्य' },
                    { en: 'Low', hi: '🟡 कम' },
                    { en: 'Very Low', hi: '🔴 बहुत कम' }
                  ].map(optObj => (
                    <TouchableOpacity
                      key={optObj.en}
                      style={[styles.radioRow, feedIntake === optObj.en && styles.radioRowActive]}
                      onPress={() => setFeedIntake(optObj.en)}
                    >
                      <View style={[styles.radioCircle, feedIntake === optObj.en && styles.radioCircleActive]}>
                        {feedIntake === optObj.en && <View style={styles.radioInner} />}
                      </View>
                      <Text style={[styles.radioLabel, feedIntake === optObj.en && styles.radioLabelActive]}>
                        {isHi ? optObj.hi : (optObj.en === 'Normal' ? '🟢 Normal' : optObj.en === 'Low' ? '🟡 Low' : '🔴 Very Low')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Q4: Rumination Level */}
              <View style={styles.questionCard}>
                <Text style={styles.questionTitle}>{isHi ? '4. जुगाली का स्तर' : '4. Rumination Level'}</Text>
                <Text style={styles.subHelpText}>{isHi ? 'गाय कितनी सामान्य रूप से जुगाली कर रही है?' : 'How normally is the cow chewing cud?'}</Text>
                <View style={styles.radioGroup}>
                  {[
                    { en: 'Normal', hi: '🟢 सामान्य' },
                    { en: 'Low', hi: '🟡 कम' },
                    { en: 'Very Low', hi: '🔴 बहुत कम' }
                  ].map(optObj => (
                    <TouchableOpacity
                      key={optObj.en}
                      style={[styles.radioRow, rumination === optObj.en && styles.radioRowActive]}
                      onPress={() => setRumination(optObj.en)}
                    >
                      <View style={[styles.radioCircle, rumination === optObj.en && styles.radioCircleActive]}>
                        {rumination === optObj.en && <View style={styles.radioInner} />}
                      </View>
                      <Text style={[styles.radioLabel, rumination === optObj.en && styles.radioLabelActive]}>
                        {isHi ? optObj.hi : (optObj.en === 'Normal' ? '🟢 Normal' : optObj.en === 'Low' ? '🟡 Low' : '🔴 Very Low')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Evaluate Button */}
              <TouchableOpacity style={styles.predictBtn} activeOpacity={0.8} onPress={handlePredict}>
                <Text style={styles.predictBtnText}>{isHi ? '🔍 स्वास्थ्य मूल्यांकन करें' : '🔍 Evaluate Health Status'}</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {/* VIEW 2: PREDICTION RESULT */}
          {(mode === 'result' && predictionResult && !activeHistory) && (
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
              <View style={styles.resultHeaderContainer}>
                <Text style={styles.cowNameTitle}>🐄 {cow.name}</Text>

                <View style={[styles.statusBigBadge, { backgroundColor: predictionResult.color + '20', borderColor: predictionResult.color }]}>
                  <Text style={[styles.statusBigEmoji]}>{predictionResult.result === 'Healthy' ? '🟢' : '🔴'}</Text>
                  <Text style={[styles.statusBigText, { color: predictionResult.color }]}>
                    {predictionResult.result === 'Healthy' ? (isHi ? 'स्वस्थ' : 'HEALTHY') : (isHi ? 'अस्वस्थ / ध्यान देने की आवश्यकता' : 'NOT HEALTHY / NEEDS ATTENTION')}
                  </Text>
                </View>

                <Text style={styles.resultDescription}>{predictionResult.recommendation}</Text>
              </View>

              {/* Recommendation Card */}
              {predictionResult.result !== 'Healthy' ? (
                <View style={styles.warningAlertCard}>
                  <AlertTriangle size={20} color="#ef4444" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.warningTitle}>{isHi ? '⚠️ सलाह' : '⚠️ Recommendation'}</Text>
                    <Text style={styles.warningText}>{isHi ? 'कृपया गहन जांच के लिए नजदीकी पशु अस्पताल से संपर्क करें।' : 'Please consider contacting/visiting a veterinary hospital for further examination.'}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.safeAlertCard}>
                  <ShieldCheck size={20} color="#10b981" />
                  <Text style={styles.safeText}>{isHi ? '✓ तत्काल पशु चिकित्सक की आवश्यकता नहीं है।' : '✓ No immediate veterinary attention indicated.'}</Text>
                </View>
              )}

              {/* Summary of Entered Indicators */}
              <Text style={styles.summaryTitle}>{isHi ? 'दर्ज किए गए मापदंड:' : 'Entered Parameters:'}</Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{isHi ? 'चारे का प्रकार:' : 'Feed Type:'}</Text>
                  <Text style={styles.summaryVal}>{predictionResult.record.feedType}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{isHi ? 'मौसम:' : 'Season:'}</Text>
                  <Text style={styles.summaryVal}>{predictionResult.record.season}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{isHi ? 'चारा खपत:' : 'Feed Intake:'}</Text>
                  <Text style={[styles.summaryVal, { color: predictionResult.record.feedIntake === 'Normal' ? '#10b981' : '#ef4444' }]}>
                    {predictionResult.record.feedIntake}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{isHi ? 'जुगाली:' : 'Rumination:'}</Text>
                  <Text style={[styles.summaryVal, { color: predictionResult.record.rumination === 'Normal' ? '#10b981' : '#ef4444' }]}>
                    {predictionResult.record.rumination}
                  </Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.resultActions}>
                {predictionResult.result !== 'Healthy' && (
                  <TouchableOpacity style={styles.hospitalBtn} activeOpacity={0.8} onPress={handleVisitHospital}>
                    <MapPin size={16} color="#fff" />
                    <Text style={styles.hospitalBtnText}>{isHi ? '🏥 पशु अस्पताल जाएं' : '🏥 Visit Veterinary Hospital'}</Text>
                  </TouchableOpacity>
                )}

                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity style={styles.againBtn} onPress={handleReset}>
                    <Text style={styles.againBtnText}>{isHi ? 'पुनः जांच करें' : 'Check Again'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
                    <Text style={styles.doneBtnText}>{isHi ? 'संपन्न' : 'Done'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}

          {/* VIEW 3: HISTORICAL ENTRY DETAIL */}
          {activeHistory && (
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
              <View style={styles.resultHeaderContainer}>
                <Text style={styles.cowNameTitle}>{isHi ? 'स्वास्थ्य जांच इतिहास' : 'Health Check History'}</Text>
                <Text style={styles.historyDateTitle}>{isHi ? 'दिनांक:' : 'Date:'} {activeHistory.date}</Text>

                <View style={[styles.statusBigBadge, { backgroundColor: activeHistory.result === 'Healthy' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', borderColor: activeHistory.result === 'Healthy' ? '#10b981' : '#ef4444' }]}>
                  <Text style={[styles.statusBigEmoji]}>{activeHistory.result === 'Healthy' ? '🟢' : '🔴'}</Text>
                  <Text style={[styles.statusBigText, { color: activeHistory.result === 'Healthy' ? '#10b981' : '#ef4444' }]}>
                    {activeHistory.result === 'Healthy' ? (isHi ? 'स्वस्थ' : 'Healthy') : (isHi ? 'अस्वस्थ' : 'Not Healthy')}
                  </Text>
                </View>
              </View>

              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{isHi ? 'चारे का प्रकार:' : 'Feed Type:'}</Text>
                  <Text style={styles.summaryVal}>{activeHistory.feedType}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{isHi ? 'मौसम:' : 'Season:'}</Text>
                  <Text style={styles.summaryVal}>{activeHistory.season}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{isHi ? 'चारा खपत:' : 'Feed Intake:'}</Text>
                  <Text style={styles.summaryVal}>{activeHistory.feedIntake}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{isHi ? 'जुगाली:' : 'Rumination:'}</Text>
                  <Text style={styles.summaryVal}>{activeHistory.rumination}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{isHi ? 'टिप्पणी:' : 'Note:'}</Text>
                  <Text style={[styles.summaryVal, { flex: 1, textAlign: 'right' }]}>{activeHistory.note}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
                <Text style={styles.doneBtnText}>{isHi ? 'बंद करें' : 'Close'}</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.bgCardDark,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark,
    marginBottom: 14,
  },
  headerTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 18,
    fontWeight: '800',
  },
  headerSub: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    marginBottom: 16,
  },
  instructionText: {
    color: Colors.textSecondaryDark,
    fontSize: 13,
    marginBottom: 14,
  },
  questionCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 12,
  },
  questionTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  subHelpText: {
    color: Colors.primaryLight,
    fontSize: 11,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  radioGroup: {
    gap: 8,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCardDark,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 10,
  },
  radioRowActive: {
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    borderColor: Colors.primaryLight,
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#64748b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: Colors.primaryLight,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryLight,
  },
  radioLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '500',
  },
  radioLabelActive: {
    color: Colors.textPrimaryDark,
    fontWeight: '700',
  },
  predictBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  predictBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  resultHeaderContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  cowNameTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 20,
    fontWeight: '800',
  },
  historyDateTitle: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    marginTop: 2,
  },
  statusBigBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    marginVertical: 12,
    gap: 8,
  },
  statusBigEmoji: {
    fontSize: 20,
  },
  statusBigText: {
    fontSize: 16,
    fontWeight: '900',
  },
  resultDescription: {
    color: Colors.textSecondaryDark,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  warningAlertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ef4444',
    marginBottom: 14,
    gap: 10,
  },
  warningTitle: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  warningText: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
  },
  safeAlertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#10b981',
    marginBottom: 14,
    gap: 10,
  },
  safeText: {
    color: '#10b981',
    fontSize: 13,
    fontWeight: '700',
  },
  summaryTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  summaryCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 8,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
  },
  summaryVal: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  resultActions: {
    gap: 10,
  },
  hospitalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  hospitalBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  againBtn: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  againBtnText: {
    color: Colors.textSecondaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
  doneBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  ruleCard: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3b82f6',
    marginBottom: 14,
  },
  ruleCardTitle: {
    color: '#3b82f6',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  ruleCardText: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    lineHeight: 18,
  },
});
