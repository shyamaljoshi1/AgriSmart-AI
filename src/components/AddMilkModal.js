import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Colors } from '../theme/colors';
import { X, Check, Milk, Calendar, Sun, Moon } from 'lucide-react-native';

export default function AddMilkModal({ visible, cattleList, onClose, onSaveMilkYield, language = 'en' }) {
  const isHi = language === 'hi';
  const [entryType, setEntryType] = useState('common'); // 'common' | 'individual'
  const [session, setSession] = useState('Morning'); // 'Morning' | 'Evening' | 'Full Day'
  const [commonAmount, setCommonAmount] = useState('8.0');
  
  // Selected cattle IDs for common entry
  const [selectedCattleIds, setSelectedCattleIds] = useState(cattleList ? cattleList.map(c => c.id) : []);
  
  // Individual quantities mapping: { 'C-024': '8.2', 'C-025': '7.8' }
  const [individualAmounts, setIndividualAmounts] = useState(() => {
    const map = {};
    if (cattleList) {
      cattleList.forEach(c => {
        map[c.id] = c.todayMilkLiters ? c.todayMilkLiters.toString() : '8.0';
      });
    }
    return map;
  });

  const toggleSelectCattle = (id) => {
    if (selectedCattleIds.includes(id)) {
      setSelectedCattleIds(selectedCattleIds.filter(i => i !== id));
    } else {
      setSelectedCattleIds([...selectedCattleIds, id]);
    }
  };

  const handleSave = () => {
    const parsedCommon = parseFloat(commonAmount) || 0;
    const milkRecords = [];

    if (entryType === 'common') {
      selectedCattleIds.forEach(id => {
        milkRecords.push({
          cattleId: id,
          amount: parsedCommon,
          session
        });
      });
    } else {
      cattleList.forEach(c => {
        const val = parseFloat(individualAmounts[c.id]) || 0;
        milkRecords.push({
          cattleId: c.id,
          amount: val,
          session
        });
      });
    }

    onSaveMilkYield(milkRecords, session);
    onClose();
  };

  const selectedCount = selectedCattleIds.length;
  const commonTotal = selectedCount * (parseFloat(commonAmount) || 0);

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Milk size={22} color={Colors.primaryLight} />
              <Text style={styles.headerTitle}>{isHi ? '🥛 दूध उत्पादन दर्ज करें' : 'Add Milk Production'}</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Session Selection (Morning / Evening / Full Day) */}
            <Text style={styles.fieldLabel}>{isHi ? 'दोहन का समय (शिफ्ट)' : 'Milking Session'}</Text>
            <View style={styles.sessionRow}>
              {[
                { label: 'Morning', hiLabel: 'सुबह', icon: Sun, color: '#f59e0b' },
                { label: 'Evening', hiLabel: 'शाम', icon: Moon, color: '#8b5cf6' },
                { label: 'Full Day', hiLabel: 'पूरा दिन', icon: Milk, color: '#10b981' }
              ].map(s => {
                const IconComp = s.icon;
                const isSel = session === s.label;
                return (
                  <TouchableOpacity
                    key={s.label}
                    style={[styles.sessionChip, isSel && { backgroundColor: s.color + '25', borderColor: s.color }]}
                    onPress={() => setSession(s.label)}
                  >
                    <IconComp size={16} color={isSel ? s.color : '#94a3b8'} />
                    <Text style={[styles.sessionText, isSel && { color: s.color, fontWeight: '700' }]}>
                      {isHi ? s.hiLabel : s.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Entry Mode Toggle */}
            <Text style={styles.fieldLabel}>{isHi ? 'दर्ज करने का प्रकार' : 'Entry Type'}</Text>
            <View style={styles.typeRow}>
              <TouchableOpacity
                style={[styles.typeOption, entryType === 'common' && styles.typeOptionActive]}
                onPress={() => setEntryType('common')}
              >
                <View style={[styles.radioCircle, entryType === 'common' && styles.radioCircleActive]}>
                  {entryType === 'common' && <View style={styles.radioInner} />}
                </View>
                <Text style={[styles.typeText, entryType === 'common' && styles.typeTextActive]}>
                  {isHi ? 'सभी चुने गए पशुओं के लिए समान मात्रा' : 'Same amount for multiple cattle (Common)'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeOption, entryType === 'individual' && styles.typeOptionActive]}
                onPress={() => setEntryType('individual')}
              >
                <View style={[styles.radioCircle, entryType === 'individual' && styles.radioCircleActive]}>
                  {entryType === 'individual' && <View style={styles.radioInner} />}
                </View>
                <Text style={[styles.typeText, entryType === 'individual' && styles.typeTextActive]}>
                  {isHi ? 'प्रत्येक गाय का अलग दूध दर्ज करें' : 'Different amount for each cow'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* COMMON ENTRY MODE */}
            {entryType === 'common' ? (
              <View style={styles.sectionCard}>
                <Text style={styles.subLabel}>{isHi ? 'प्रति गाय उत्पादित दूध (लीटर):' : 'Milk produced per cow (Liters):'}</Text>
                <View style={styles.inputBoxRow}>
                  <TextInput
                    style={styles.amountInput}
                    keyboardType="numeric"
                    value={commonAmount}
                    onChangeText={setCommonAmount}
                    placeholder="8.0"
                    placeholderTextColor="#64748b"
                  />
                  <Text style={styles.unitText}>{isHi ? 'लीटर / गाय' : 'L / cow'}</Text>
                </View>

                <Text style={[styles.subLabel, { marginTop: 14 }]}>{isHi ? `पशु चुनें (${selectedCount} चुने गए):` : `Select Cattle (${selectedCount} selected):`}</Text>
                <View style={styles.cattleGrid}>
                  {cattleList.map(c => {
                    const isSel = selectedCattleIds.includes(c.id);
                    return (
                      <TouchableOpacity
                        key={c.id}
                        style={[styles.cattleChip, isSel && styles.cattleChipActive]}
                        onPress={() => toggleSelectCattle(c.id)}
                      >
                        <View style={[styles.chkBox, isSel && styles.chkBoxActive]}>
                          {isSel && <Check size={12} color="#fff" />}
                        </View>
                        <Text style={[styles.cattleName, isSel && styles.cattleNameActive]}>{c.name}</Text>
                        <Text style={styles.cattleTag}>({c.tagNumber})</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={styles.summaryBox}>
                  <Text style={styles.summaryText}>
                    {isHi ? 'गणना:' : 'Calculation:'} <Text style={styles.summaryHighlight}>{selectedCount} {isHi ? 'पशु' : 'cattle'} × {commonAmount || 0} L = {commonTotal.toFixed(1)} L</Text>
                  </Text>
                </View>
              </View>
            ) : (
              /* INDIVIDUAL ENTRY MODE */
              <View style={styles.sectionCard}>
                <Text style={styles.subLabel}>{isHi ? 'प्रत्येक पशु के लिए दूध की मात्रा दर्ज करें:' : 'Enter Milk Quantity for Each Cattle:'}</Text>
                {cattleList.map(c => (
                  <View key={c.id} style={styles.indivRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.indivName}>🐄 {c.name}</Text>
                      <Text style={styles.indivTag}>{c.tagNumber} • {c.breed}</Text>
                    </View>
                    <View style={styles.indivInputRow}>
                      <TextInput
                        style={styles.indivInput}
                        keyboardType="numeric"
                        value={individualAmounts[c.id] || ''}
                        onChangeText={(txt) => setIndividualAmounts({ ...individualAmounts, [c.id]: txt })}
                        placeholder="0.0"
                        placeholderTextColor="#64748b"
                      />
                      <Text style={styles.unitText}>L</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{isHi ? 'दूध रिकॉर्ड सुरक्षित करें' : 'Save Milk Yield Record'}</Text>
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
  fieldLabel: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 8,
  },
  sessionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  sessionChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 6,
  },
  sessionText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  typeRow: {
    gap: 8,
    marginBottom: 14,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 10,
  },
  typeOptionActive: {
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    borderColor: Colors.primaryLight,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#64748b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: Colors.primaryLight,
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: Colors.primaryLight,
  },
  typeText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '500',
  },
  typeTextActive: {
    color: Colors.textPrimaryDark,
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  subLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  amountInput: {
    width: 100,
    backgroundColor: Colors.bgCardDark,
    color: Colors.textPrimaryDark,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    textAlign: 'center',
  },
  unitText: {
    color: Colors.textSecondaryDark,
    fontSize: 14,
    fontWeight: '600',
  },
  cattleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cattleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCardDark,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 6,
  },
  cattleChipActive: {
    backgroundColor: 'rgba(5, 150, 105, 0.25)',
    borderColor: Colors.primaryLight,
  },
  chkBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#64748b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chkBoxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  cattleName: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  cattleNameActive: {
    color: '#fff',
    fontWeight: '700',
  },
  cattleTag: {
    color: '#64748b',
    fontSize: 10,
  },
  summaryBox: {
    marginTop: 14,
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  summaryText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
  },
  summaryHighlight: {
    color: Colors.primaryLight,
    fontWeight: '800',
  },
  indivRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  indivName: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
  indivTag: {
    color: '#64748b',
    fontSize: 11,
  },
  indivInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  indivInput: {
    width: 70,
    backgroundColor: Colors.bgCardDark,
    color: Colors.textPrimaryDark,
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    textAlign: 'center',
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
