import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Colors } from '../theme/colors';
import { X, Minus, Plus, Check, CheckSquare, Square } from 'lucide-react-native';

export default function AdjustConsumptionModal({ visible, feedInventory, cattleList, onClose, onSaveAdjustments, language = 'en' }) {
  const isHi = language === 'hi';
  const [rates, setRates] = useState(() => {
    const map = {};
    if (feedInventory) {
      feedInventory.forEach(f => {
        map[f.id] = f.dailyConsumptionKg || 20;
      });
    }
    return map;
  });

  const [applyScope, setApplyScope] = useState('herd'); // 'herd' | 'selected'
  const [selectedCattleIds, setSelectedCattleIds] = useState([]);

  // Initialize selected cattle list when modal opens or cattleList changes
  useEffect(() => {
    if (cattleList && cattleList.length > 0) {
      setSelectedCattleIds(cattleList.map(c => c.id));
    }
  }, [cattleList, visible]);

  const handleStep = (feedId, delta) => {
    const current = rates[feedId] !== undefined ? rates[feedId] : 20;
    const updated = Math.max(1, current + delta);
    setRates({ ...rates, [feedId]: updated });
  };

  const toggleSelectCow = (id) => {
    if (selectedCattleIds.includes(id)) {
      setSelectedCattleIds(selectedCattleIds.filter(cId => cId !== id));
    } else {
      setSelectedCattleIds([...selectedCattleIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (cattleList) {
      setSelectedCattleIds(cattleList.map(c => c.id));
    }
  };

  const handleDeselectAll = () => {
    setSelectedCattleIds([]);
  };

  const handleSave = () => {
    onSaveAdjustments(rates, applyScope, selectedCattleIds);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>{isHi ? 'दैनिक चारे की खुराक (राशन)' : 'Daily Feed Consumption'}</Text>
              <Text style={styles.headerSub}>{isHi ? 'अपने पशुधन के लिए दैनिक चारे की दरें समायोजित करें' : 'Adjust daily consumption rates for your farm'}</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Scope selection */}
            <Text style={styles.fieldLabel}>{isHi ? 'लागू करें:' : 'Apply to:'}</Text>
            <View style={styles.scopeRow}>
              <TouchableOpacity
                style={[styles.scopeChip, applyScope === 'herd' && styles.scopeChipActive]}
                onPress={() => setApplyScope('herd')}
              >
                <View style={[styles.radioCircle, applyScope === 'herd' && styles.radioCircleActive]}>
                  {applyScope === 'herd' && <View style={styles.radioInner} />}
                </View>
                <Text style={[styles.scopeText, applyScope === 'herd' && styles.scopeTextActive]}>{isHi ? 'पूरे झुंड पर' : 'Entire herd'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.scopeChip, applyScope === 'selected' && styles.scopeChipActive]}
                onPress={() => setApplyScope('selected')}
              >
                <View style={[styles.radioCircle, applyScope === 'selected' && styles.radioCircleActive]}>
                  {applyScope === 'selected' && <View style={styles.radioInner} />}
                </View>
                <Text style={[styles.scopeText, applyScope === 'selected' && styles.scopeTextActive]}>{isHi ? 'चुनिंदा पशुओं पर' : 'Selected cattle'}</Text>
              </TouchableOpacity>
            </View>

            {/* 🐄 CATTLE SELECTION SECTION */}
            {applyScope === 'selected' && (
              <View style={styles.cattleSelectionContainer}>
                <View style={styles.cattleSelectionHeader}>
                  <Text style={styles.cattleSelectionTitle}>
                    {isHi ? `पशु चुनें (${selectedCattleIds.length} / ${cattleList ? cattleList.length : 0} चुने गए):` : `Select Cattle (${selectedCattleIds.length} / ${cattleList ? cattleList.length : 0} selected):`}
                  </Text>
                  <View style={styles.quickSelectRow}>
                    <TouchableOpacity onPress={handleSelectAll}>
                      <Text style={styles.quickSelectText}>{isHi ? 'सभी चुनें' : 'Select All'}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: Colors.borderDark }}>|</Text>
                    <TouchableOpacity onPress={handleDeselectAll}>
                      <Text style={styles.quickSelectText}>{isHi ? 'हटाएं' : 'Clear'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {cattleList && cattleList.length > 0 ? (
                  <View style={styles.cattleGrid}>
                    {cattleList.map(cow => {
                      const isSelected = selectedCattleIds.includes(cow.id);
                      return (
                        <TouchableOpacity
                          key={cow.id}
                          style={[styles.cowCard, isSelected && styles.cowCardActive]}
                          onPress={() => toggleSelectCow(cow.id)}
                          activeOpacity={0.8}
                        >
                          <View style={styles.cowCardLeft}>
                            {cow.image ? (
                              <Image source={{ uri: cow.image }} style={styles.cowAvatar} />
                            ) : (
                              <View style={[styles.cowAvatar, { backgroundColor: Colors.primary }]}>
                                <Text style={{ color: '#fff', fontWeight: '700' }}>🐄</Text>
                              </View>
                            )}
                            <View>
                              <Text style={styles.cowName}>{cow.name}</Text>
                              <Text style={styles.cowMeta}>{cow.tagNumber} • {cow.breed}</Text>
                            </View>
                          </View>

                          <View style={[styles.checkBox, isSelected && styles.checkBoxActive]}>
                            {isSelected && <Check size={14} color="#fff" />}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : (
                  <Text style={styles.noCattleText}>{isHi ? 'कोई पशु पंजीकृत नहीं है।' : 'No cattle registered yet.'}</Text>
                )}
              </View>
            )}

            {/* Stepper items for each feed */}
            <Text style={[styles.fieldLabel, { marginTop: 12 }]}>{isHi ? 'दैनिक चारे की दर (किग्रा/दिन):' : 'Daily Feed Rates (kg/day):'}</Text>
            {feedInventory && feedInventory.map(item => {
              const currentRate = rates[item.id] !== undefined ? rates[item.id] : item.dailyConsumptionKg;
              const feedDisplayName = isHi ? (item.name === 'Green Fodder' ? 'हरा चारा' : item.name === 'Dry Fodder' ? 'सूखा चारा' : item.name === 'Cattle Concentrate' ? 'पशु दाना / पोषाहार' : item.name) : item.name;
              return (
                <View key={item.id} style={styles.stepperCard}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.feedTitle}>🌾 {feedDisplayName}</Text>
                    <Text style={styles.feedSub}>{isHi ? 'वर्तमान:' : 'Current:'} {currentRate} kg/day</Text>
                  </View>

                  <View style={styles.stepperBox}>
                    <TouchableOpacity style={styles.stepBtn} onPress={() => handleStep(item.id, -1)}>
                      <Minus size={16} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.stepVal}>{currentRate} <Text style={styles.unitText}>{isHi ? 'किग्रा/दिन' : 'kg/day'}</Text></Text>
                    <TouchableOpacity style={styles.stepBtn} onPress={() => handleStep(item.id, 1)}>
                      <Plus size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{isHi ? 'बदलाव सुरक्षित करें' : 'Save Changes'}</Text>
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
    maxHeight: '85%',
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
  fieldLabel: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  scopeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  scopeChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 8,
  },
  scopeChipActive: {
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
  scopeText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '500',
  },
  scopeTextActive: {
    color: Colors.textPrimaryDark,
    fontWeight: '700',
  },
  cattleSelectionContainer: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    marginBottom: 14,
  },
  cattleSelectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cattleSelectionTitle: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  quickSelectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quickSelectText: {
    color: Colors.primaryLight,
    fontSize: 11,
    fontWeight: '600',
  },
  cattleGrid: {
    gap: 8,
  },
  cowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  cowCardActive: {
    backgroundColor: 'rgba(5, 150, 105, 0.12)',
    borderColor: Colors.primaryLight,
  },
  cowCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cowAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cowName: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
  cowMeta: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#64748b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primaryLight,
  },
  noCattleText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontStyle: 'italic',
  },
  stepperCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 10,
  },
  feedTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 14,
    fontWeight: '700',
  },
  feedSub: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
    marginTop: 2,
  },
  stepperBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCardDark,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 8,
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepVal: {
    color: Colors.textPrimaryDark,
    fontSize: 15,
    fontWeight: '800',
    minWidth: 40,
    textAlign: 'center',
  },
  unitText: {
    fontSize: 10,
    color: Colors.textSecondaryDark,
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
