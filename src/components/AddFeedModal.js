import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../theme/colors';
import { X, Package, Calendar } from 'lucide-react-native';

export default function AddFeedModal({ visible, onClose, onAddFeedStock, feedInventory, language = 'en' }) {
  const isHi = language === 'hi';
  const [feedType, setFeedType] = useState('Green Fodder');
  const [quantity, setQuantity] = useState('500');
  const [unit, setUnit] = useState('kg');
  
  // Date Picker state
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePreset, setDatePreset] = useState('Today'); // 'Today' | 'Yesterday' | 'Custom'
  const [customDateText, setCustomDateText] = useState('');
  
  const [supplier, setSupplier] = useState('');
  const [cost, setCost] = useState('');

  const feedTypes = [
    { key: 'Green Fodder', en: 'Green Fodder', hi: 'हरा चारा' },
    { key: 'Dry Fodder', en: 'Dry Fodder', hi: 'सूखा चारा' },
    { key: 'Concentrate', en: 'Concentrate', hi: 'दाना / पोषाहार' },
    { key: 'Other', en: 'Other', hi: 'अन्य' }
  ];

  const existingFeed = feedInventory ? feedInventory.find(f => f.name.toLowerCase().includes(feedType.toLowerCase()) || f.type.toLowerCase().includes(feedType.toLowerCase())) : null;
  const previousStock = existingFeed ? existingFeed.currentStockKg : 0;
  const addedQty = parseFloat(quantity) || 0;
  const calculatedTotal = previousStock + addedQty;

  const formatDateLabel = (d) => {
    try {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return d.toLocaleDateString('en-GB', options);
    } catch (e) {
      return isHi ? 'आज' : 'Today';
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      setDatePreset('Custom');
      setCustomDateText(formatDateLabel(selectedDate));
    }
  };

  const handleSelectPreset = (preset) => {
    setDatePreset(preset);
    const now = new Date();
    if (preset === 'Today') {
      setDate(now);
      setCustomDateText(isHi ? 'आज' : 'Today');
    } else if (preset === 'Yesterday') {
      const yest = new Date();
      yest.setDate(now.getDate() - 1);
      setDate(yest);
      setCustomDateText(formatDateLabel(yest));
    } else if (preset === 'Custom') {
      setCustomDateText(formatDateLabel(now));
      if (Platform.OS !== 'web') {
        setShowDatePicker(true);
      }
    }
  };

  const handleSave = () => {
    if (addedQty <= 0) return;

    let finalDateStr = isHi ? 'आज' : 'Today';
    if (datePreset === 'Today') {
      finalDateStr = isHi ? 'आज' : 'Today';
    } else if (datePreset === 'Yesterday') {
      finalDateStr = isHi ? 'कल' : 'Yesterday';
    } else {
      finalDateStr = customDateText.trim() || formatDateLabel(date);
    }

    onAddFeedStock({
      feedType,
      quantity: addedQty,
      unit,
      dateAdded: finalDateStr,
      supplier: supplier.trim() || (isHi ? 'सीधा स्टोर' : 'Direct Store'),
      cost: cost.trim() || 'N/A'
    });

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFeedType('Green Fodder');
    setQuantity('500');
    setSupplier('');
    setCost('');
    setDate(new Date());
    setDatePreset('Today');
    setCustomDateText('');
    setShowDatePicker(false);
  };

  const webDateValue = date.toISOString().split('T')[0];

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Package size={22} color={Colors.primaryLight} />
              <Text style={styles.headerTitle}>{isHi ? '🌾 नया चारा स्टॉक जोड़ें' : 'Add Feed Stock'}</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Feed Type Selection */}
            <Text style={styles.fieldLabel}>{isHi ? 'चारे का प्रकार' : 'Feed Type'}</Text>
            <View style={styles.typeGrid}>
              {feedTypes.map(t => (
                <TouchableOpacity
                  key={t.key}
                  style={[styles.typeChip, feedType === t.key && styles.typeChipActive]}
                  onPress={() => setFeedType(t.key)}
                >
                  <View style={[styles.radioCircle, feedType === t.key && styles.radioCircleActive]}>
                    {feedType === t.key && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[styles.typeText, feedType === t.key && styles.typeTextActive]}>{isHi ? t.hi : t.en}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Quantity & Unit */}
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>{isHi ? 'मात्रा' : 'Quantity'}</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="500"
                  placeholderTextColor="#64748b"
                  value={quantity}
                  onChangeText={setQuantity}
                />
              </View>
              <View style={{ width: 100 }}>
                <Text style={styles.fieldLabel}>{isHi ? 'इकाई' : 'Unit'}</Text>
                <View style={styles.unitBox}>
                  <Text style={styles.unitText}>{isHi ? 'किग्रा ▼' : 'kg ▼'}</Text>
                </View>
              </View>
            </View>

            {/* 📅 Date Added Field */}
            <Text style={styles.fieldLabel}>{isHi ? 'जोड़ने की तिथि' : 'Date Added'}</Text>
            
            {/* Date Preset Buttons */}
            <View style={styles.datePresetRow}>
              {[
                { key: 'Today', en: 'Today', hi: 'आज' },
                { key: 'Yesterday', en: 'Yesterday', hi: 'कल' },
                { key: 'Custom', en: 'Custom', hi: 'अन्य तिथि' }
              ].map(p => (
                <TouchableOpacity
                  key={p.key}
                  style={[styles.datePresetBtn, datePreset === p.key && styles.datePresetBtnActive]}
                  onPress={() => handleSelectPreset(p.key)}
                >
                  <Text style={[styles.datePresetText, datePreset === p.key && styles.datePresetTextActive]}>{isHi ? p.hi : p.en}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Platform-Specific Date Selector */}
            {Platform.OS === 'web' ? (
              <View style={styles.webDateContainer}>
                <input
                  type="date"
                  value={webDateValue}
                  onChange={(e) => {
                    if (e.target.value) {
                      const newD = new Date(e.target.value);
                      setDate(newD);
                      setDatePreset('Custom');
                      setCustomDateText(formatDateLabel(newD));
                    }
                  }}
                  style={{
                    backgroundColor: '#f1f5f9',
                    color: '#f8fafc',
                    border: '1px solid #10b981',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    width: '100%',
                    boxSizing: 'border-box',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.datePickerCard}
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.8}
              >
                <Calendar size={18} color={Colors.primaryLight} />
                <Text style={styles.datePickerText}>
                  {formatDateLabel(date)} ({datePreset})
                </Text>
                <Text style={styles.datePickerChangeText}>{isHi ? 'बदलने के लिए टैप करें' : 'Tap to change'}</Text>
              </TouchableOpacity>
            )}

            {/* Editable Text Fallback when Custom is selected */}
            {datePreset === 'Custom' && (
              <TextInput
                style={[styles.textInput, { marginTop: 6 }]}
                placeholder={isHi ? 'या तिथि लिखें उदा. 15 अग 2026' : 'Or type date e.g. 15 Aug 2026'}
                placeholderTextColor="#64748b"
                value={customDateText}
                onChangeText={(text) => {
                  setCustomDateText(text);
                }}
              />
            )}

            {/* Native Mobile Date Picker Modal */}
            {showDatePicker && Platform.OS !== 'web' && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}

            {/* Stock Calculation Banner */}
            <View style={styles.calcBanner}>
              <Text style={styles.calcTitle}>{isHi ? `${feedType === 'Green Fodder' ? 'हरा चारा' : feedType === 'Dry Fodder' ? 'सूखा चारा' : feedType === 'Concentrate' ? 'पोषाहार' : 'चारा'} गणना:` : `${feedType} Calculation:`}</Text>
              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>{isHi ? 'पिछला स्टॉक:' : 'Previous stock:'}</Text>
                <Text style={styles.calcVal}>{previousStock} kg</Text>
              </View>
              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>{isHi ? 'नया जोड़ा:' : 'Added:'}</Text>
                <Text style={[styles.calcVal, { color: '#10b981' }]}>+ {addedQty} kg</Text>
              </View>
              <View style={[styles.calcRow, styles.calcTotalRow]}>
                <Text style={styles.calcTotalLabel}>{isHi ? 'नया कुल स्टॉक:' : 'Current stock:'}</Text>
                <Text style={styles.calcTotalVal}>{calculatedTotal} kg</Text>
              </View>
            </View>

            {/* Optional Section */}
            <Text style={[styles.fieldLabel, { marginTop: 14 }]}>{isHi ? 'ऐच्छिक विवरण' : 'Optional Details'}</Text>
            <View style={styles.optionalBox}>
              <Text style={styles.subLabel}>{isHi ? 'विक्रेता / स्रोत' : 'Supplier'}</Text>
              <TextInput
                style={styles.textInput}
                placeholder={isHi ? 'उदा. एग्रोमार्ट चारा दुकान' : 'e.g. Agromart Feed Store'}
                placeholderTextColor="#64748b"
                value={supplier}
                onChangeText={setSupplier}
              />

              <Text style={[styles.subLabel, { marginTop: 8 }]}>{isHi ? 'कुल लागत' : 'Cost'}</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. ₹ 4,500"
                placeholderTextColor="#64748b"
                value={cost}
                onChangeText={setCost}
              />
            </View>
          </ScrollView>

          {/* Footer Save */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{isHi ? 'चारा स्टॉक जोड़ें' : 'Add Feed'}</Text>
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
  typeGrid: {
    gap: 8,
    marginBottom: 10,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 10,
  },
  typeChipActive: {
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
  typeText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '500',
  },
  typeTextActive: {
    color: Colors.textPrimaryDark,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f1f5f9',
    color: Colors.textPrimaryDark,
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  unitBox: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    alignItems: 'center',
  },
  unitText: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
  datePresetRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  datePresetBtn: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  datePresetBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  datePresetText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  datePresetTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  webDateContainer: {
    marginBottom: 6,
  },
  datePickerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    gap: 10,
    marginBottom: 6,
  },
  datePickerText: {
    flex: 1,
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
  datePickerChangeText: {
    color: Colors.primaryLight,
    fontSize: 11,
    fontWeight: '600',
  },
  calcBanner: {
    backgroundColor: 'rgba(5, 150, 105, 0.12)',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    marginTop: 12,
    gap: 4,
  },
  calcTitle: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calcLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
  },
  calcVal: {
    color: Colors.textPrimaryDark,
    fontSize: 11,
    fontWeight: '700',
  },
  calcTotalRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(5, 150, 105, 0.3)',
    paddingTop: 4,
    marginTop: 2,
  },
  calcTotalLabel: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  calcTotalVal: {
    color: Colors.primaryLight,
    fontSize: 14,
    fontWeight: '900',
  },
  optionalBox: {
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  subLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
    marginBottom: 4,
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
