import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import { X, Check } from 'lucide-react-native';

export default function SortFilterBottomSheet({
  visible,
  onClose,
  sortBy,
  onSelectSortBy,
  filterBy,
  onToggleFilterBy,
  language = 'en'
}) {
  const isHi = language === 'hi';

  const sortOptions = [
    { id: 'name', label: isHi ? 'नाम (अ से ज्ञ)' : 'Name (A-Z)' },
    { id: 'highest_milk', label: isHi ? 'सर्वाधिक दूध उत्पादन' : 'Highest milk yield' },
    { id: 'lowest_milk', label: isHi ? 'कम दूध उत्पादन' : 'Lowest milk yield' },
    { id: 'health', label: isHi ? 'स्वास्थ्य स्कोर' : 'Health Score' },
    { id: 'vaccination_due', label: isHi ? 'टीकाकरण निकट है' : 'Vaccination due soon' }
  ];

  const filterOptions = [
    { id: 'healthy', label: isHi ? 'स्वस्थ 🟢' : 'Healthy 🟢' },
    { id: 'needs_attention', label: isHi ? 'ध्यान देने योग्य 🟡' : 'Needs attention 🟡' },
    { id: 'vaccination_due', label: isHi ? 'टीकाकरण बकाया 💉' : 'Vaccination due 💉' },
    { id: 'high_producer', label: isHi ? 'उच्च दुधारू गाय 🥛 (>8 ली)' : 'High milk producer 🥛 (>8 L)' }
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheetContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{isHi ? 'क्रमबद्ध करें और फ़िल्टर करें' : 'Sort & Filter Cattle'}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color={Colors.textSecondaryDark} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* SORT SECTION */}
            <Text style={styles.sectionTitle}>{isHi ? 'क्रमानुसार व्यवस्थित करें:' : 'Sort Cattle By:'}</Text>
            <View style={styles.optionsList}>
              {sortOptions.map(opt => {
                const isSelected = sortBy === opt.id;
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[styles.radioItem, isSelected && styles.radioItemActive]}
                    onPress={() => onSelectSortBy(opt.id)}
                  >
                    <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                    <Text style={[styles.optionLabel, isSelected && styles.optionLabelActive]}>{opt.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* FILTER SECTION */}
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>{isHi ? 'फ़िल्टर द्वारा चुनें:' : 'Filter By:'}</Text>
            <View style={styles.optionsList}>
              {filterOptions.map(opt => {
                const isChecked = filterBy.includes(opt.id);
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[styles.checkItem, isChecked && styles.checkItemActive]}
                    onPress={() => onToggleFilterBy(opt.id)}
                  >
                    <View style={[styles.checkBox, isChecked && styles.checkBoxActive]}>
                      {isChecked && <Check size={12} color="#fff" />}
                    </View>
                    <Text style={[styles.optionLabel, isChecked && styles.optionLabelActive]}>{opt.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* Footer Done */}
          <TouchableOpacity style={styles.applyBtn} activeOpacity={0.8} onPress={onClose}>
            <Text style={styles.applyBtnText}>{isHi ? 'फ़िल्टर लागू करें' : 'Apply Sort & Filter'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  sheetContent: {
    backgroundColor: Colors.bgCardDark,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
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
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  optionsList: {
    gap: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 10,
  },
  radioItemActive: {
    backgroundColor: Colors.primaryBg,
    borderColor: Colors.primary,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#94a3b8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: Colors.primary,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 10,
  },
  checkItemActive: {
    backgroundColor: Colors.primaryBg,
    borderColor: Colors.primary,
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#94a3b8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 13,
    fontWeight: '500',
  },
  optionLabelActive: {
    color: Colors.textPrimaryDark,
    fontWeight: '700',
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  applyBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
