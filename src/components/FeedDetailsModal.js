import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Colors } from '../theme/colors';
import { X, Plus, Clock, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react-native';

export default function FeedDetailsModal({ visible, feedItem, onClose, onUpdateFeed, language = 'en' }) {
  const isHi = language === 'hi';
  const [addStockAmount, setAddStockAmount] = useState('100');
  const [newConsumptionRate, setNewConsumptionRate] = useState('');
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'add_stock' | 'adjust'

  if (!feedItem) return null;

  const feedDisplayName = isHi ? (feedItem.name === 'Green Fodder' ? 'हरा चारा' : feedItem.name === 'Dry Fodder' ? 'सूखा चारा' : feedItem.name === 'Cattle Concentrate' ? 'पशु दाना / पोषाहार' : feedItem.name) : feedItem.name;

  const remainingDays = Math.max(0, Math.round(feedItem.currentStockKg / (feedItem.dailyConsumptionKg || 1)));

  const handleAddStockSubmit = () => {
    const qty = parseFloat(addStockAmount) || 0;
    if (qty <= 0) return;

    const newStock = feedItem.currentStockKg + qty;
    const newLog = {
      id: `fl_${Date.now()}`,
      date: isHi ? 'अभी-अभी' : 'Just now',
      change: `+ ${qty} kg`,
      note: isHi ? 'किसान द्वारा पुनः भरा गया' : 'Restocked by farmer'
    };

    onUpdateFeed(feedItem.id, {
      currentStockKg: newStock,
      logs: [newLog, ...(feedItem.logs || [])]
    });

    setActiveTab('details');
    setAddStockAmount('100');
  };

  const handleAdjustConsumptionSubmit = () => {
    const rate = parseFloat(newConsumptionRate) || 0;
    if (rate <= 0) return;

    onUpdateFeed(feedItem.id, {
      dailyConsumptionKg: rate
    });

    setActiveTab('details');
    setNewConsumptionRate('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>🌾 {feedDisplayName}</Text>
              <Text style={styles.headerSub}>{isHi ? 'चारा भंडार एवं खपत ट्रैकर' : 'Stock Inventory & Usage Tracker'}</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Top Key Stats Card */}
            <View style={styles.statsCard}>
              <View style={styles.statCol}>
                <Text style={styles.statLabel}>{isHi ? 'वर्तमान स्टॉक' : 'Current Stock'}</Text>
                <Text style={styles.statVal}>{feedItem.currentStockKg} kg</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.statCol}>
                <Text style={styles.statLabel}>{isHi ? 'दैनिक खपत' : 'Daily Usage'}</Text>
                <Text style={styles.statVal}>{feedItem.dailyConsumptionKg} kg/day</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.statCol}>
                <Text style={styles.statLabel}>{isHi ? 'शेष अनुमानित दिन' : 'Expected Remaining'}</Text>
                <Text style={[styles.statVal, { color: remainingDays < 10 ? Colors.warning : Colors.primaryLight }]}>
                  {remainingDays} {isHi ? 'दिन' : 'days'}
                </Text>
              </View>
            </View>

            {/* Quick Action Navigation Tabs */}
            <View style={styles.tabRow}>
              <TouchableOpacity
                style={[styles.actionTab, activeTab === 'details' && styles.actionTabActive]}
                onPress={() => setActiveTab('details')}
              >
                <Text style={[styles.actionTabText, activeTab === 'details' && styles.actionTabTextActive]}>{isHi ? 'अवलोकन' : 'Overview'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionTab, activeTab === 'add_stock' && styles.actionTabActive]}
                onPress={() => setActiveTab('add_stock')}
              >
                <Text style={[styles.actionTabText, activeTab === 'add_stock' && styles.actionTabTextActive]}>{isHi ? '+ स्टॉक जोड़ें' : '+ Add Stock'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionTab, activeTab === 'adjust' && styles.actionTabActive]}
                onPress={() => setActiveTab('adjust')}
              >
                <Text style={[styles.actionTabText, activeTab === 'adjust' && styles.actionTabTextActive]}>{isHi ? 'खुराक बदलें' : 'Adjust Usage'}</Text>
              </TouchableOpacity>
            </View>

            {/* VIEW 1: OVERVIEW & RECENT ACTIVITY */}
            {activeTab === 'details' && (
              <View>
                <Text style={styles.sectionTitle}>{isHi ? 'हाल की स्टॉक गतिविधि लॉग' : 'Recent Stock Activity Log'}</Text>
                <View style={styles.logsList}>
                  {feedItem.logs && feedItem.logs.map(log => (
                    <View key={log.id} style={styles.logItem}>
                      <Clock size={16} color={Colors.textSecondaryDark} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.logNote}>{log.note}</Text>
                        <Text style={styles.logDate}>{log.date}</Text>
                      </View>
                      <Text style={[styles.logChange, { color: log.change.startsWith('+') ? '#10b981' : '#f59e0b' }]}>
                        {log.change}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* VIEW 2: ADD STOCK */}
            {activeTab === 'add_stock' && (
              <View style={styles.formCard}>
                <Text style={styles.formTitle}>{isHi ? '+ नया स्टॉक जोड़ें' : '+ Restock / Add Quantity'}</Text>
                <Text style={styles.formLabel}>{isHi ? 'प्राप्त चारे की मात्रा दर्ज करें (किग्रा):' : 'Enter feed quantity received (kg):'}</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.formInput}
                    keyboardType="numeric"
                    value={addStockAmount}
                    onChangeText={setAddStockAmount}
                    placeholder="100"
                    placeholderTextColor="#64748b"
                  />
                  <Text style={styles.unit}>kg</Text>
                </View>

                <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8} onPress={handleAddStockSubmit}>
                  <Text style={styles.submitBtnText}>{isHi ? 'स्टॉक जोड़ें' : 'Confirm + Add Stock'}</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* VIEW 3: ADJUST DAILY CONSUMPTION */}
            {activeTab === 'adjust' && (
              <View style={styles.formCard}>
                <Text style={styles.formTitle}>{isHi ? '⚙️ दैनिक खपत दर समायोजित करें' : '⚙️ Adjust Daily Usage Rate'}</Text>
                <Text style={styles.formLabel}>{isHi ? `वर्तमान खपत: ${feedItem.dailyConsumptionKg} किग्रा/दिन` : `Current consumption: ${feedItem.dailyConsumptionKg} kg/day`}</Text>
                <Text style={[styles.formLabel, { marginTop: 6 }]}>{isHi ? 'नई दैनिक खपत दर (किग्रा/दिन):' : 'New daily consumption rate (kg/day):'}</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.formInput}
                    keyboardType="numeric"
                    value={newConsumptionRate}
                    onChangeText={setNewConsumptionRate}
                    placeholder={feedItem.dailyConsumptionKg.toString()}
                    placeholderTextColor="#64748b"
                  />
                  <Text style={styles.unit}>kg/day</Text>
                </View>

                <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8} onPress={handleAdjustConsumptionSubmit}>
                  <Text style={styles.submitBtnText}>{isHi ? 'नई दर सुरक्षित करें' : 'Save New Rate'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
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
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 14,
    justifyContent: 'space-around',
  },
  statCol: {
    alignItems: 'center',
  },
  statLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  statVal: {
    color: Colors.textPrimaryDark,
    fontSize: 16,
    fontWeight: '800',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.borderDark,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 14,
  },
  actionTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionTabActive: {
    backgroundColor: Colors.primary,
  },
  actionTabText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  actionTabTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  sectionTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  logsList: {
    gap: 8,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 10,
  },
  logNote: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  logDate: {
    color: Colors.textSecondaryDark,
    fontSize: 10,
  },
  logChange: {
    fontSize: 13,
    fontWeight: '800',
  },
  formCard: {
    backgroundColor: '#f1f5f9',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  formTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  formLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  formInput: {
    width: 120,
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
  unit: {
    color: Colors.textSecondaryDark,
    fontSize: 14,
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
