import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Colors } from '../theme/colors';
import { X, Check, Calendar, Syringe, ShieldCheck } from 'lucide-react-native';

export default function AddVaccinationModal({ visible, cow, onClose, onSaveVaccination, language = 'en' }) {
  const isHi = language === 'hi';

  const vaccinePresets = [
    { en: 'FMD Booster', hi: 'खुरपका-मुंहपका (FMD) बूस्टर' },
    { en: 'Rabies Vaccine', hi: 'रेबीज टीका' },
    { en: 'Brucellosis', hi: 'ब्रुसेलोसिस टीका' },
    { en: 'Deworming Dose', hi: 'पेट के कीड़ों की दवा (Deworming)' },
    { en: 'Anthrax Vaccine', hi: 'एंथ्रेक्स टीका' },
    { en: 'HS Vaccine (Galghotu)', hi: 'गलघोंटू (HS) टीका' }
  ];

  const nextDuePresets = [
    { en: 'In 6 Months (Normal Schedule)', hi: '6 महीने बाद (सामान्य अनुसूची)' },
    { en: 'In 3 Months', hi: '3 महीने बाद' },
    { en: 'In 1 Year', hi: '1 वर्ष बाद' },
    { en: 'Completed (No Booster Required)', hi: 'पूर्ण (कोई बूस्टर आवश्यक नहीं)' }
  ];

  const [selectedVaccine, setSelectedVaccine] = useState('FMD Booster');
  const [customVaccine, setCustomVaccine] = useState('');
  const [dateAdministered, setDateAdministered] = useState('Today');
  const [vetName, setVetName] = useState('Dr. Sharma (District Vet)');
  const [selectedNextDue, setSelectedNextDue] = useState('In 6 Months (Normal Schedule)');
  const [batchNumber, setBatchNumber] = useState('');

  if (!cow) return null;

  const handleSave = () => {
    const finalVaccineName = selectedVaccine === 'Other' ? (customVaccine.trim() || 'Custom Vaccine') : selectedVaccine;
    
    // Map preset to actual due date display text
    let newDueText = 'In 6 Months';
    if (selectedNextDue.includes('3 Months')) newDueText = '15 Nov 2026';
    else if (selectedNextDue.includes('6 Months')) newDueText = '15 Feb 2027';
    else if (selectedNextDue.includes('1 Year')) newDueText = '17 Aug 2027';
    else if (selectedNextDue.includes('Completed')) newDueText = 'Completed';

    const newRecord = {
      id: `v_${Date.now()}`,
      name: finalVaccineName,
      status: 'Completed',
      dateCompleted: dateAdministered === 'Today' ? (isHi ? 'आज' : 'Today') : dateAdministered,
      vetName: vetName || 'Self',
      batchNumber: batchNumber || 'B-1092'
    };

    onSaveVaccination(cow.id, newRecord, newDueText);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>{isHi ? '💉 टीका खुराक दर्ज करें' : '💉 Log Vaccination Dose'}</Text>
              <Text style={styles.headerSub}>🐄 {cow.name} ({cow.tagNumber})</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Current Due Alert Info Banner */}
            <View style={styles.alertInfoBanner}>
              <Syringe size={18} color="#f59e0b" />
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>{isHi ? 'अनुसूचित टीकाकरण' : 'Scheduled Vaccination'}</Text>
                <Text style={styles.bannerText}>
                  {isHi ? `वर्तमान स्थिति: ${cow.nextVaccinationDue || 'बकाया'}` : `Current Due: ${cow.nextVaccinationDue || 'Overdue'}`}
                </Text>
              </View>
            </View>

            {/* Select Vaccine Type */}
            <Text style={styles.sectionTitle}>{isHi ? 'टीका का नाम चुनें:' : 'Select Vaccine Name:'}</Text>
            <View style={styles.presetGrid}>
              {vaccinePresets.map(vp => (
                <TouchableOpacity
                  key={vp.en}
                  style={[styles.presetChip, selectedVaccine === vp.en && styles.presetChipActive]}
                  onPress={() => setSelectedVaccine(vp.en)}
                >
                  <Text style={[styles.presetChipText, selectedVaccine === vp.en && styles.presetChipTextActive]}>
                    {isHi ? vp.hi : vp.en}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Date Administered */}
            <Text style={styles.sectionTitle}>{isHi ? 'टीकाकरण की तिथि:' : 'Date Administered:'}</Text>
            <TextInput
              style={styles.inputField}
              value={dateAdministered}
              onChangeText={setDateAdministered}
              placeholder="e.g. Today or 17 Aug 2026"
              placeholderTextColor="#64748b"
            />

            {/* Veterinarian / Doctor */}
            <Text style={styles.sectionTitle}>{isHi ? 'टीका लगाने वाले चिकित्सक / व्यक्ति:' : 'Veterinarian / Administered By:'}</Text>
            <TextInput
              style={styles.inputField}
              value={vetName}
              onChangeText={setVetName}
              placeholder="e.g. Dr. Sharma"
              placeholderTextColor="#64748b"
            />

            {/* Next Booster Schedule */}
            <Text style={styles.sectionTitle}>{isHi ? 'अगले टीके की तिथि (अगला बूस्टर):' : 'Next Booster Schedule:'}</Text>
            <View style={styles.radioGroup}>
              {nextDuePresets.map(ndp => (
                <TouchableOpacity
                  key={ndp.en}
                  style={[styles.radioRow, selectedNextDue === ndp.en && styles.radioRowActive]}
                  onPress={() => setSelectedNextDue(ndp.en)}
                >
                  <View style={[styles.radioCircle, selectedNextDue === ndp.en && styles.radioCircleActive]}>
                    {selectedNextDue === ndp.en && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[styles.radioLabel, selectedNextDue === ndp.en && styles.radioLabelActive]}>
                    {isHi ? ndp.hi : ndp.en}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Footer Submit Button */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{isHi ? 'टीका खुराक सुरक्षित करें' : 'Save Vaccination Record'}</Text>
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
  body: {
    marginBottom: 16,
  },
  alertInfoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f59e0b',
    marginBottom: 16,
    gap: 10,
  },
  bannerTitle: {
    color: '#f59e0b',
    fontSize: 13,
    fontWeight: '700',
  },
  bannerText: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
  },
  sectionTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 8,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  presetChip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  presetChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  presetChipText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  presetChipTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  inputField: {
    backgroundColor: '#f1f5f9',
    color: Colors.textPrimaryDark,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 12,
  },
  radioGroup: {
    gap: 8,
    marginBottom: 16,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
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
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
