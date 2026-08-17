import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Colors } from '../theme/colors';
import { X, Mic, Check, AlertCircle } from 'lucide-react-native';

export default function DailyObservationModal({ visible, cow, onClose, onSaveObservation, language = 'en' }) {
  const isHi = language === 'hi';
  const [eating, setEating] = useState('Normal');
  const [activity, setActivity] = useState('Normal');
  const [milkStatus, setMilkStatus] = useState('Normal');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['None']);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceRecorded, setVoiceRecorded] = useState(false);

  if (!cow) return null;

  const toggleSymptom = (sym) => {
    if (sym === 'None') {
      setSelectedSymptoms(['None']);
      return;
    }

    let updated = selectedSymptoms.filter(s => s !== 'None');
    if (updated.includes(sym)) {
      updated = updated.filter(s => s !== sym);
    } else {
      updated.push(sym);
    }

    if (updated.length === 0) {
      updated = ['None'];
    }
    setSelectedSymptoms(updated);
  };

  const handleVoiceRecordToggle = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setTimeout(() => {
        setIsRecordingVoice(false);
        setVoiceRecorded(true);
      }, 2500);
    }
  };

  const handleSave = () => {
    const observation = {
      date: isHi ? 'अभी-अभी' : 'Just now',
      eating,
      activity,
      milkStatus,
      symptoms: selectedSymptoms,
      voiceNote: voiceRecorded ? (isHi ? 'वॉयस नोट रिकॉर्ड किया गया (0:14)' : 'Voice note recorded (0:14)') : null
    };
    onSaveObservation(cow.id, observation);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>{isHi ? 'दैनिक स्वास्थ्य अवलोकन' : 'Daily Observation'}</Text>
              <Text style={styles.headerSub}>{isHi ? `आज ${cow.name} (${cow.tagNumber}) की स्थिति कैसी है?` : `How is ${cow.name} (${cow.tagNumber}) today?`}</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formBody} showsVerticalScrollIndicator={false}>
            {/* 1. Eating */}
            <Text style={styles.fieldLabel}>{isHi ? 'खान-पान (चारा खाना)' : 'Eating'}</Text>
            <View style={styles.optionRow}>
              {[
                { label: 'Normal', hiLabel: 'सामान्य', color: '#10b981', prefix: '🟢' },
                { label: 'Less than usual', hiLabel: 'सामान्य से कम', color: '#f59e0b', prefix: '🟡' },
                { label: 'Not eating', hiLabel: 'खाना बंद', color: '#ef4444', prefix: '🔴' }
              ].map(opt => (
                <TouchableOpacity
                  key={opt.label}
                  style={[styles.optionChip, eating === opt.label && { backgroundColor: opt.color + '25', borderColor: opt.color }]}
                  onPress={() => setEating(opt.label)}
                >
                  <Text style={styles.optionPrefix}>{opt.prefix}</Text>
                  <Text style={[styles.optionText, eating === opt.label && { color: opt.color, fontWeight: '700' }]}>
                    {isHi ? opt.hiLabel : opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 2. Activity */}
            <Text style={styles.fieldLabel}>{isHi ? 'शारीरिक सक्रियता' : 'Activity'}</Text>
            <View style={styles.optionRow}>
              {[
                { label: 'Normal', hiLabel: 'सक्रिय (सामान्य)', color: '#10b981', prefix: '🟢' },
                { label: 'Less active', hiLabel: 'कम सक्रिय', color: '#f59e0b', prefix: '🟡' },
                { label: 'Very weak', hiLabel: 'अत्यंत सुस्त', color: '#ef4444', prefix: '🔴' }
              ].map(opt => (
                <TouchableOpacity
                  key={opt.label}
                  style={[styles.optionChip, activity === opt.label && { backgroundColor: opt.color + '25', borderColor: opt.color }]}
                  onPress={() => setActivity(opt.label)}
                >
                  <Text style={styles.optionPrefix}>{opt.prefix}</Text>
                  <Text style={[styles.optionText, activity === opt.label && { color: opt.color, fontWeight: '700' }]}>
                    {isHi ? opt.hiLabel : opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 3. Milk */}
            <Text style={styles.fieldLabel}>{isHi ? 'दूध की स्थिति' : 'Milk Production'}</Text>
            <View style={styles.optionRow}>
              {[
                { label: 'Normal', hiLabel: 'सामान्य', color: '#10b981', prefix: '🟢' },
                { label: 'Reduced', hiLabel: 'कम हुआ', color: '#f59e0b', prefix: '🟡' },
                { label: 'Very low', hiLabel: 'अत्यंत कम', color: '#ef4444', prefix: '🔴' }
              ].map(opt => (
                <TouchableOpacity
                  key={opt.label}
                  style={[styles.optionChip, milkStatus === opt.label && { backgroundColor: opt.color + '25', borderColor: opt.color }]}
                  onPress={() => setMilkStatus(opt.label)}
                >
                  <Text style={styles.optionPrefix}>{opt.prefix}</Text>
                  <Text style={[styles.optionText, milkStatus === opt.label && { color: opt.color, fontWeight: '700' }]}>
                    {isHi ? opt.hiLabel : opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 4. Visible Symptoms */}
            <Text style={styles.fieldLabel}>{isHi ? 'दिखने वाले लक्षण' : 'Visible Symptoms'}</Text>
            <View style={styles.checkboxGrid}>
              {[
                { en: 'Cough', hi: 'खांसी' },
                { en: 'Fever', hi: 'बुखार' },
                { en: 'Limping', hi: 'लंगड़ाना' },
                { en: 'Swelling', hi: 'सूजन' },
                { en: 'Discharge', hi: 'नाक/आंख स्राव' },
                { en: 'None', hi: 'कोई नहीं' }
              ].map(symObj => {
                const sym = symObj.en;
                const isSelected = selectedSymptoms.includes(sym);
                return (
                  <TouchableOpacity
                    key={sym}
                    style={[styles.checkboxCard, isSelected && styles.checkboxCardActive]}
                    onPress={() => toggleSymptom(sym)}
                  >
                    <View style={[styles.checkboxBox, isSelected && styles.checkboxBoxActive]}>
                      {isSelected && <Check size={12} color="#fff" />}
                    </View>
                    <Text style={[styles.checkboxText, isSelected && styles.checkboxTextActive]}>{isHi ? symObj.hi : sym}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Voice Input Option */}
            <View style={styles.voiceSection}>
              <Text style={styles.fieldLabel}>{isHi ? 'वॉइस रिकॉर्डिंग (ऐच्छिक)' : 'Voice Input (Optional)'}</Text>
              <TouchableOpacity
                style={[styles.voiceBtn, isRecordingVoice && styles.voiceBtnRecording, voiceRecorded && styles.voiceBtnDone]}
                onPress={handleVoiceRecordToggle}
              >
                <Mic size={20} color={isRecordingVoice ? '#ef4444' : voiceRecorded ? '#10b981' : '#ffffff'} />
                <Text style={styles.voiceBtnText}>
                  {isRecordingVoice
                    ? (isHi ? 'रिकॉर्डिंग चालू है... बोलें' : 'Recording... Listening to voice note')
                    : voiceRecorded
                    ? (isHi ? 'वॉइस नोट सुरक्षित (0:14) - पुनः रिकॉर्ड करें' : 'Voice Note Saved (0:14) - Tap to re-record')
                    : (isHi ? '🎤 बोलकर अवलोकन दर्ज करें' : '🎤 Tell us what happened')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Footer Save */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{isHi ? 'अवलोकन सुरक्षित करें' : 'Save Observation'}</Text>
            </TouchableOpacity>
          </View>
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
  formBody: {
    marginBottom: 16,
  },
  fieldLabel: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  optionChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 4,
  },
  optionPrefix: {
    fontSize: 12,
  },
  optionText: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
    fontWeight: '600',
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  checkboxCard: {
    width: '31%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 8,
  },
  checkboxCardActive: {
    backgroundColor: 'rgba(5, 150, 105, 0.2)',
    borderColor: Colors.primaryLight,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#64748b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  checkboxText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '500',
  },
  checkboxTextActive: {
    color: Colors.textPrimaryDark,
    fontWeight: '700',
  },
  voiceSection: {
    marginTop: 6,
    marginBottom: 10,
  },
  voiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 8,
  },
  voiceBtnRecording: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: '#ef4444',
  },
  voiceBtnDone: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10b981',
  },
  voiceBtnText: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
