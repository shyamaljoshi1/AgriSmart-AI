import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert, Platform } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import {
  Activity, Plus, Search, AlertTriangle, ShieldCheck, Heart, Thermometer,
  Filter, Milk, Package, Bell, ChevronRight, ChevronLeft, ArrowLeft, Calendar, Check, Trash2, Edit3, Mic, Sun, Moon, Stethoscope, Sliders, TrendingUp, DollarSign, Clock, BarChart2, HardDrive, Download, Upload, X
} from 'lucide-react-native';

import {
  INITIAL_CATTLE,
  INITIAL_FEED_INVENTORY,
  INITIAL_ALERTS,
  HISTORICAL_MILK_LOGS,
  FEED_TRANSACTION_HISTORY,
  generateDynamicAlerts
} from '../services/livestockDataService';

import {
  loadCattleList,
  saveCattleList,
  loadFeedInventory,
  saveFeedInventory,
  loadMilkHistory,
  saveMilkHistory,
  loadFeedTransactions,
  saveFeedTransactions,
  loadDismissedAlerts,
  saveDismissedAlerts,
  exportBackupData,
  importBackupData
} from '../services/livestockStorageService';

import AddCattleModal from '../components/AddCattleModal';
import DailyObservationModal from '../components/DailyObservationModal';
import AddMilkModal from '../components/AddMilkModal';
import FeedDetailsModal from '../components/FeedDetailsModal';
import HealthCheckModal from '../components/HealthCheckModal';
import AddFeedModal from '../components/AddFeedModal';
import AdjustConsumptionModal from '../components/AdjustConsumptionModal';
import SortFilterBottomSheet from '../components/SortFilterBottomSheet';
import AddVaccinationModal from '../components/AddVaccinationModal';
import { TRANSLATIONS } from '../theme/i18n';

export default function LivestockMonitoringScreen({ language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  // Navigation sub-state inside Livestock module: 'dashboard' | 'herd' | 'cow_profile' | 'milk' | 'feed' | 'alerts'
  const [currentView, setCurrentView] = useState('dashboard');

  // Active selected cow for Cow Profile view
  const [selectedCowId, setSelectedCowId] = useState(null);

  // Main Data States (initialized with defaults, hydrated from AsyncStorage)
  const [cattleList, setCattleList] = useState(INITIAL_CATTLE);
  const [feedInventory, setFeedInventory] = useState(INITIAL_FEED_INVENTORY);
  const [milkHistory, setMilkHistory] = useState(HISTORICAL_MILK_LOGS);
  const [feedTransactions, setFeedTransactions] = useState(FEED_TRANSACTION_HISTORY);
  const [alertsList, setAlertsList] = useState(INITIAL_ALERTS);

  // Filter & Sub-tab selections
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState([]);
  const [sortFilterSheetVisible, setSortFilterSheetVisible] = useState(false);

  // Modals Visibility States
  const [addCattleModalVisible, setAddCattleModalVisible] = useState(false);
  const [observationModalCow, setObservationModalCow] = useState(null);
  const [addMilkModalVisible, setAddMilkModalVisible] = useState(false);
  const [selectedFeedItem, setSelectedFeedItem] = useState(null);

  // Health Check, Add Feed, Adjust Consumption, Vaccination Modals
  const [healthCheckCow, setHealthCheckCow] = useState(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [addFeedModalVisible, setAddFeedModalVisible] = useState(false);
  const [adjustConsumptionModalVisible, setAdjustConsumptionModalVisible] = useState(false);
  const [vaccinationModalCow, setVaccinationModalCow] = useState(null);
  const [dismissedAlertIds, setDismissedAlertIds] = useState([]);

  const handleDismissAlert = (alertId) => {
    setDismissedAlertIds(prev => {
      const updated = [...prev, alertId];
      saveDismissedAlerts(updated);
      return updated;
    });
  };

  const handleClearAllAlerts = () => {
    const allIds = generateDynamicAlerts(cattleList, feedInventory, language).map(a => a.id);
    setDismissedAlertIds(allIds);
    saveDismissedAlerts(allIds);
  };

  const handleSaveVaccination = (cowId, newVaccineRecord, updatedNextDue) => {
    const updatedList = cattleList.map(cow => {
      if (cow.id === cowId) {
        return {
          ...cow,
          nextVaccinationDue: updatedNextDue,
          vaccinations: [newVaccineRecord, ...(cow.vaccinations || [])]
        };
      }
      return cow;
    });
    setCattleList(updatedList);
    saveCattleList(updatedList);

    // Un-dismiss vaccination alert for this cow so the new schedule pops up!
    const alertId = `alt_v_${cowId}`;
    setDismissedAlertIds(prev => {
      const updatedDismissed = prev.filter(id => id !== alertId);
      saveDismissedAlerts(updatedDismissed);
      return updatedDismissed;
    });
  };

  const handleMarkVaccinationDone = (cowId, vaccineName = 'Vaccination Dose') => {
    const updatedList = cattleList.map(cow => {
      if (cow.id === cowId) {
        const doseName = cow.nextVaccinationName || vaccineName;
        const newRecord = {
          id: `v_${Date.now()}`,
          name: doseName,
          status: 'Completed',
          dateCompleted: language === 'hi' ? 'आज' : 'Today',
          vetName: 'Local Vet / Self',
          batchNumber: 'B-2026'
        };
        return {
          ...cow,
          nextVaccinationDue: 'Completed',
          vaccinations: [newRecord, ...(cow.vaccinations || [])]
        };
      }
      return cow;
    });
    setCattleList(updatedList);
    saveCattleList(updatedList);

    // Automatically resolve/clear vaccination alert for this cow
    const alertId = `alt_v_${cowId}`;
    setDismissedAlertIds(prev => {
      const updatedDismissed = [...prev.filter(id => id !== alertId), alertId];
      saveDismissedAlerts(updatedDismissed);
      return updatedDismissed;
    });

    if (Platform.OS !== 'web') {
      Alert.alert(
        language === 'hi' ? 'टीकाकरण दर्ज हुआ' : 'Vaccination Completed',
        language === 'hi' ? 'टीकाकरण सफलतापूर्वक पूर्ण के रूप में दर्ज किया गया!' : 'Vaccination dose marked as completed!'
      );
    }
  };

  // --- OFFLINE DATA HYDRATION (Load from Phone Memory on Launch) ---
  useEffect(() => {
    async function initOfflineData() {
      const storedCattle = await loadCattleList();
      const storedFeed = await loadFeedInventory();
      const storedMilk = await loadMilkHistory();
      const storedTxns = await loadFeedTransactions();
      const storedDismissed = await loadDismissedAlerts();

      setCattleList(storedCattle);
      setFeedInventory(storedFeed);
      setMilkHistory(storedMilk);
      setFeedTransactions(storedTxns);
      if (storedDismissed) setDismissedAlertIds(storedDismissed);
    }
    initOfflineData();
  }, []);

  // Handlers for Backup & Restore
  const handleExportBackup = async () => {
    await exportBackupData();
  };

  const handleImportRestore = async () => {
    const restoredData = await importBackupData();
    if (restoredData) {
      setCattleList(restoredData.cattleList);
      setFeedInventory(restoredData.feedInventory);
      setMilkHistory(restoredData.milkHistory);
      setFeedTransactions(restoredData.feedTransactions);
    }
  };

  // Dynamic Real-Time Alerts calculated live from farm state
  const activeAlerts = React.useMemo(() => {
    const raw = generateDynamicAlerts(cattleList, feedInventory, language);
    return raw.filter(a => !dismissedAlertIds.includes(a.id));
  }, [cattleList, feedInventory, language, dismissedAlertIds]);

  // Stats Calculations
  const totalCattleCount = cattleList.length;
  const todayTotalMilkLiters = cattleList.reduce((acc, curr) => acc + (curr.todayMilkLiters || 0), 0).toFixed(1);
  const avgYieldPerCow = (parseFloat(todayTotalMilkLiters) / (totalCattleCount || 1)).toFixed(1);

  const minFeedDays = feedInventory.reduce((min, item) => {
    const days = Math.round(item.currentStockKg / (item.dailyConsumptionKg || 1));
    return days < min ? days : min;
  }, 999);

  const attentionCount = activeAlerts.filter(a => a.color === '#ef4444' || a.color === '#f59e0b').length;

  // Selected Cow object
  const selectedCow = cattleList.find(c => c.id === selectedCowId);

  // Herd Directory Filtered List
  const filteredCattle = cattleList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.breed.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterBy.includes('healthy') && c.healthStatus !== 'Healthy') return false;
    if (filterBy.includes('needs_attention') && c.healthStatus === 'Healthy') return false;
    if (filterBy.includes('vaccination_due') && !c.nextVaccinationDue.toLowerCase().includes('due')) return false;
    if (filterBy.includes('high_producer') && c.todayMilkLiters <= 8.0) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'highest_milk') return b.todayMilkLiters - a.todayMilkLiters;
    if (sortBy === 'lowest_milk') return a.todayMilkLiters - b.todayMilkLiters;
    return 0;
  });

  // Handlers with Offline Save Callbacks
  const handleAddCattle = (newCow) => {
    const updated = [newCow, ...cattleList];
    setCattleList(updated);
    saveCattleList(updated);
  };

  const handleSavePrediction = (cowId, predictionRecord) => {
    const updated = cattleList.map(c => {
      if (c.id === cowId) {
        return {
          ...c,
          healthStatus: predictionRecord.result,
          lastCheckedDate: 'Today',
          healthHistory: [predictionRecord, ...(c.healthHistory || [])]
        };
      }
      return c;
    });
    setCattleList(updated);
    saveCattleList(updated);

    // If health check flagged Needs Attention, un-dismiss alert for this cow so it pops up immediately!
    if (predictionRecord.result === 'Needs Attention') {
      const alertIdToUnclear = `alt_h_${cowId}`;
      setDismissedAlertIds(prev => {
        const updatedDismissed = prev.filter(id => id !== alertIdToUnclear);
        saveDismissedAlerts(updatedDismissed);
        return updatedDismissed;
      });
    }
  };

  const handleSaveObservation = (cowId, observation) => {
    const updated = cattleList.map(c => {
      if (c.id === cowId) {
        return {
          ...c,
          latestObservation: observation
        };
      }
      return c;
    });
    setCattleList(updated);
    saveCattleList(updated);
  };

  const handleSaveMilkYield = (milkRecords, session) => {
    const updatedCattle = cattleList.map(c => {
      const record = milkRecords.find(r => r.cattleId === c.id);
      if (record) {
        let m = c.morningMilkLiters;
        let e = c.eveningMilkLiters;
        if (session === 'Morning') m = record.amount;
        if (session === 'Evening') e = record.amount;
        if (session === 'Full Day') {
          m = record.amount * 0.6;
          e = record.amount * 0.4;
        }

        return {
          ...c,
          morningMilkLiters: m,
          eveningMilkLiters: e,
          todayMilkLiters: session === 'Full Day' ? record.amount : (m + e)
        };
      }
      return c;
    });

    setCattleList(updatedCattle);
    saveCattleList(updatedCattle);

    const newTotal = updatedCattle.reduce((acc, curr) => acc + (curr.todayMilkLiters || 0), 0).toFixed(1);
    const updatedHistory = milkHistory.map(h => {
      if (h.day === 'Today') {
        return { ...h, totalLiters: parseFloat(newTotal) };
      }
      return h;
    });
    setMilkHistory(updatedHistory);
    saveMilkHistory(updatedHistory);
  };

  const handleAddFeedStock = (newStockData) => {
    const updatedInventory = feedInventory.map(item => {
      if (item.name.toLowerCase().includes(newStockData.feedType.toLowerCase()) || item.type.toLowerCase().includes(newStockData.feedType.toLowerCase())) {
        const updatedStock = item.currentStockKg + newStockData.quantity;
        const newLog = {
          id: `fl_${Date.now()}`,
          date: newStockData.dateAdded,
          change: `+ ${newStockData.quantity} kg`,
          note: `Supplier: ${newStockData.supplier} (${newStockData.cost})`,
          cost: newStockData.cost
        };

        const daysLeft = Math.round(updatedStock / (item.dailyConsumptionKg || 1));
        let status = 'Good';
        let statusColor = '#10b981';
        if (daysLeft < 7) { status = 'Restock soon'; statusColor = '#ef4444'; }
        else if (daysLeft < 12) { status = 'Low'; statusColor = '#f59e0b'; }

        return {
          ...item,
          currentStockKg: updatedStock,
          status,
          statusColor,
          logs: [newLog, ...(item.logs || [])]
        };
      }
      return item;
    });

    setFeedInventory(updatedInventory);
    saveFeedInventory(updatedInventory);

    const newTxn = {
      id: `t_${Date.now()}`,
      date: 'Today',
      feedName: newStockData.feedType,
      type: 'Stock Added',
      qty: `+ ${newStockData.quantity} kg`,
      remaining: 'Updated',
      note: `Supplier: ${newStockData.supplier}`,
      cost: newStockData.cost
    };
    const updatedTxns = [newTxn, ...feedTransactions];
    setFeedTransactions(updatedTxns);
    saveFeedTransactions(updatedTxns);
  };

  const handleSaveConsumptionAdjustments = (newRatesMap, scope) => {
    const updatedInventory = feedInventory.map(item => {
      if (newRatesMap[item.id] !== undefined) {
        const newRate = newRatesMap[item.id];
        const daysLeft = Math.round(item.currentStockKg / (newRate || 1));
        let status = 'Good';
        let statusColor = '#10b981';
        if (daysLeft < 7) { status = 'Restock soon'; statusColor = '#ef4444'; }
        else if (daysLeft < 12) { status = 'Low'; statusColor = '#f59e0b'; }

        return {
          ...item,
          dailyConsumptionKg: newRate,
          status,
          statusColor
        };
      }
      return item;
    });

    setFeedInventory(updatedInventory);
    saveFeedInventory(updatedInventory);
  };

  const handleDeleteCow = (cowId) => {
    const updated = cattleList.filter(c => c.id !== cowId);
    setCattleList(updated);
    saveCattleList(updated);
    setCurrentView('herd');
    setSelectedCowId(null);
  };

  const maxMilkInLog = Math.max(...milkHistory.map(l => l.totalLiters), 35);

  const navScrollRef = useRef(null);

  const scrollNav = (direction) => {
    if (navScrollRef.current) {
      navScrollRef.current.scrollTo({
        x: direction === 'left' ? 0 : 300,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* 📶 Offline Mode Persistent Indicator Header */}
      <View style={styles.offlineHeaderBanner}>
        <HardDrive size={14} color="#10b981" />
        <Text style={styles.offlineHeaderText}>{t.offlineBannerText || '100% Offline Mode • All farm data saved directly on your phone'}</Text>
      </View>

      {/* Sub-Navigation Bar with Arrow Controls & Touch/Wheel Scroll */}
      <View style={styles.subNavBar}>
        <TouchableOpacity style={styles.scrollArrowBtn} onPress={() => scrollNav('left')} activeOpacity={0.7}>
          <ChevronLeft size={16} color={Colors.textSecondaryDark} />
        </TouchableOpacity>

        <ScrollView
          ref={navScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={true}
          scrollEventThrottle={16}
          contentContainerStyle={styles.subNavRow}
          style={Platform.OS === 'web' ? { overflowX: 'auto', overflowY: 'hidden', touchAction: 'pan-x' } : {}}
        >
          <TouchableOpacity
            style={[styles.navChip, currentView === 'dashboard' && styles.navChipActive]}
            onPress={() => setCurrentView('dashboard')}
            activeOpacity={0.7}
          >
            <Text style={[styles.navChipText, currentView === 'dashboard' && styles.navChipTextActive]}>{t.navHome || '🏠 Home'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navChip, currentView === 'herd' && styles.navChipActive]}
            onPress={() => setCurrentView('herd')}
            activeOpacity={0.7}
          >
            <Text style={[styles.navChipText, currentView === 'herd' && styles.navChipTextActive]}>{t.navCattle || '🐄 Cattle'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navChip, currentView === 'milk' && styles.navChipActive]}
            onPress={() => setCurrentView('milk')}
            activeOpacity={0.7}
          >
            <Text style={[styles.navChipText, currentView === 'milk' && styles.navChipTextActive]}>{t.navMilk || '🥛 Milk & Analytics'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navChip, currentView === 'feed' && styles.navChipActive]}
            onPress={() => setCurrentView('feed')}
            activeOpacity={0.7}
          >
            <Text style={[styles.navChipText, currentView === 'feed' && styles.navChipTextActive]}>{t.navFeed || '🌾 Feed Analytics'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navChip, currentView === 'alerts' && styles.navChipActive]}
            onPress={() => setCurrentView('alerts')}
            activeOpacity={0.7}
          >
            <Text style={[styles.navChipText, currentView === 'alerts' && styles.navChipTextActive]}>{t.navAlerts || '🔔 Alerts'} ({attentionCount})</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity style={styles.scrollArrowBtn} onPress={() => scrollNav('right')} activeOpacity={0.7}>
          <ChevronRight size={16} color={Colors.textSecondaryDark} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* ======================================================== */}
        {/* VIEW 1: OVERALL LIVESTOCK DASHBOARD                      */}
        {/* ======================================================== */}
        {currentView === 'dashboard' && (
          <View>
            <View style={styles.dashboardBanner}>
              <Text style={styles.bannerEmoji}>{t.offlineModeTitle || '🐄 Offline Livestock Management'}</Text>
              <Text style={styles.greetingTitle}>{t.greetingTitle || 'Good morning, Farmer'}</Text>
              <Text style={styles.greetingSubtitle}>{t.greetingSubtitle || 'How is your livestock farm doing today?'}</Text>
            </View>

            {/* 📦 OFFLINE BACKUP & RESTORE CONTROLS CARD */}
            <View style={styles.backupCard}>
              <Text style={styles.backupTitle}>{t.backupTitle || '💾 Backup & Restore Data'}</Text>
              <Text style={styles.backupSub}>{t.backupSubText || 'Protect your data before uninstalling or switching phones:'}</Text>
              <View style={styles.backupBtnRow}>
                <TouchableOpacity style={styles.exportBtn} onPress={handleExportBackup}>
                  <Download size={14} color="#fff" />
                  <Text style={styles.backupBtnText}>{t.exportBtnText || 'Export Backup'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.importBtn} onPress={handleImportRestore}>
                  <Upload size={14} color={Colors.primaryLight} />
                  <Text style={[styles.backupBtnText, { color: Colors.primaryLight }]}>{t.restoreBtnText || 'Restore Backup'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 4 Interactive Dashboard Cards */}
            <View style={styles.dashboardCardsGrid}>
              <TouchableOpacity
                style={styles.dashboardCard}
                activeOpacity={0.8}
                onPress={() => setCurrentView('herd')}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>🐄</Text>
                  <ChevronRight size={18} color="#64748b" />
                </View>
                <Text style={styles.cardTitle}>{t.herdDirTitle || 'Herd Directory'}</Text>
                <Text style={styles.cardValue}>{totalCattleCount} {language === 'hi' ? 'पशु' : 'Cattle'}</Text>
                <Text style={styles.cardSubText}>{t.tapToView || 'Tap to view directory →'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dashboardCard}
                activeOpacity={0.8}
                onPress={() => setCurrentView('milk')}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>🥛</Text>
                  <ChevronRight size={18} color="#64748b" />
                </View>
                <Text style={styles.cardTitle}>{t.subTabMilk || 'Milk Yield'}</Text>
                <Text style={[styles.cardValue, { color: Colors.primaryLight }]}>{todayTotalMilkLiters} L {language === 'hi' ? 'आज' : 'today'}</Text>
                <Text style={styles.cardSubText}>{t.tapToView || 'View History & Charts →'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dashboardCard}
                activeOpacity={0.8}
                onPress={() => setCurrentView('feed')}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>🌾</Text>
                  <ChevronRight size={18} color="#64748b" />
                </View>
                <Text style={styles.cardTitle}>{t.feedStock || 'Feed Stock'}</Text>
                <Text style={[styles.cardValue, { color: minFeedDays < 7 ? Colors.warning : Colors.textPrimaryDark }]}>
                  {minFeedDays} {language === 'hi' ? 'दिन शेष' : 'days remaining'}
                </Text>
                <Text style={styles.cardSubText}>{t.tapToView || 'View Usage Logs & Charts →'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.dashboardCard, attentionCount > 0 && styles.dashboardCardWarning]}
                activeOpacity={0.8}
                onPress={() => setCurrentView('alerts')}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>🔔</Text>
                  <ChevronRight size={18} color="#64748b" />
                </View>
                <Text style={styles.cardTitle}>{t.healthAlerts || 'Alerts'}</Text>
                <Text style={[styles.cardValue, { color: attentionCount > 0 ? Colors.warning : Colors.textPrimaryDark }]}>
                  {attentionCount} {language === 'hi' ? 'विषय ध्यान योग्य' : 'things need attention'}
                </Text>
                <Text style={styles.cardSubText}>{t.tapToView || 'Tap for unified alerts feed'}</Text>
              </TouchableOpacity>
            </View>

            {/* Quick Actions Bar */}
            <View style={styles.quickBar}>
              <TouchableOpacity style={styles.quickActionBtn} onPress={() => setAddCattleModalVisible(true)}>
                <Plus size={16} color="#fff" />
                <Text style={styles.quickActionText}>{language === 'hi' ? 'नया पशु जोड़ें' : 'Add Cattle'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionBtn} onPress={() => setAddMilkModalVisible(true)}>
                <Milk size={16} color="#fff" />
                <Text style={styles.quickActionText}>{language === 'hi' ? 'दूध रिकॉर्ड दर्ज करें' : 'Add Milk Record'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{language === 'hi' ? `पशुधन विहंगम दृश्य (${totalCattleCount})` : `Herd Overview (${totalCattleCount})`}</Text>
              <TouchableOpacity onPress={() => setCurrentView('herd')}>
                <Text style={styles.seeAllText}>{language === 'hi' ? 'सभी देखें →' : 'See All →'}</Text>
              </TouchableOpacity>
            </View>

            {cattleList.slice(0, 3).map(cow => (
              <TouchableOpacity
                key={cow.id}
                style={styles.cattleCard}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedCowId(cow.id);
                  setCurrentView('cow_profile');
                }}
              >
                <Image source={{ uri: cow.image }} style={styles.cowAvatar} />
                <View style={styles.cowInfo}>
                  <View style={styles.cowTitleRow}>
                    <Text style={styles.cowName}>🐄 {cow.name}</Text>
                    <Text style={styles.cowTag}>ID: {cow.tagNumber}</Text>
                  </View>
                  <View style={styles.cowMetaRow}>
                    <Text style={styles.cowMeta}>{language === 'hi' ? 'स्वास्थ्य:' : 'Health:'} <Text style={{ color: cow.healthStatus === 'Healthy' ? Colors.primaryDark : Colors.danger, fontWeight: '700' }}>{cow.healthStatus === 'Healthy' ? (language === 'hi' ? '🟢 स्वस्थ' : '🟢 Healthy') : (language === 'hi' ? '🔴 ध्यान दें' : '🔴 Needs Attention')}</Text></Text>
                    <Text style={styles.cowMeta}>🥛 {language === 'hi' ? 'दूध:' : 'Milk:'} <Text style={{ color: Colors.textPrimaryDark, fontWeight: '700' }}>{cow.todayMilkLiters} L/{language === 'hi' ? 'दिन' : 'day'}</Text></Text>
                  </View>
                  <Text style={styles.cowMeta}>💉 {language === 'hi' ? 'टीकाकरण:' : 'Vaccination:'} <Text style={{ color: Colors.primaryDark, fontWeight: '600' }}>{language === 'hi' ? 'अगला:' : 'Next:'} {cow.nextVaccinationDue}</Text></Text>
                </View>
                <ChevronRight size={20} color={Colors.primaryDark} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: HERD DIRECTORY                                  */}
        {/* ======================================================== */}
        {currentView === 'herd' && (
          <View>
            <View style={styles.herdHeader}>
              <View>
                <Text style={styles.pageTitle}>{t.herdDirTitle || 'Herd Directory'}</Text>
                <Text style={styles.pageSubtitle}>{filteredCattle.length} {language === 'hi' ? 'पशु पंजीकृत (फ़ोन में सुरक्षित)' : 'cattle registered (Saved on phone)'}</Text>
              </View>
              <TouchableOpacity style={styles.addCattleHeaderBtn} onPress={() => setAddCattleModalVisible(true)}>
                <Plus size={16} color="#fff" />
                <Text style={styles.addCattleHeaderText}>{t.addCattleBtn || 'Add Cattle'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchSortContainer}>
              <View style={styles.searchBar}>
                <Search size={16} color="#64748b" />
                <TextInput
                  style={styles.searchInput}
                  placeholder={t.cattleSearchPlaceholder || '🔍 Search cattle by name or ID...'}
                  placeholderTextColor="#64748b"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <TouchableOpacity style={styles.sortFilterBtn} onPress={() => setSortFilterSheetVisible(true)}>
                <Filter size={18} color={Colors.primaryLight} />
                <Text style={styles.sortFilterText}>{language === 'hi' ? 'छानें और क्रमबद्ध करें' : 'Sort & Filter'}</Text>
              </TouchableOpacity>
            </View>

            {filteredCattle.map(cow => (
              <View key={cow.id} style={styles.cattleCardFull}>
                <View style={styles.cardHeaderRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={{ uri: cow.image }} style={styles.cowAvatarLarge} />
                    <View>
                      <Text style={styles.cowNameLarge}>🐄 {cow.name}</Text>
                      <Text style={styles.cowTagLarge}>ID: {cow.tagNumber} • {cow.breed}</Text>
                    </View>
                  </View>
                  <View style={[styles.healthBadge, { backgroundColor: cow.healthStatus === 'Healthy' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', borderColor: cow.healthStatus === 'Healthy' ? '#10b981' : '#ef4444' }]}>
                    <Text style={[styles.healthBadgeText, { color: cow.healthStatus === 'Healthy' ? '#10b981' : '#ef4444' }]}>
                      {cow.healthStatus === 'Healthy' ? (language === 'hi' ? '🟢 स्वस्थ' : '🟢 Healthy') : (language === 'hi' ? '🔴 ध्यान दें' : '🔴 Needs Attention')}
                    </Text>
                  </View>
                </View>

                <View style={styles.cattleGridInfo}>
                  <View style={styles.infoCol}>
                    <Text style={styles.infoLabel}>❤️ {t.vitalsTitle || 'Health'}</Text>
                    <Text style={styles.infoVal}>{cow.healthStatus === 'Healthy' ? (language === 'hi' ? 'उत्तम 🟢' : 'Good 🟢') : (language === 'hi' ? 'ध्यान दें 🔴' : 'Needs Attention 🔴')}</Text>
                  </View>
                  <View style={styles.infoCol}>
                    <Text style={styles.infoLabel}>🥛 {t.milkYieldTitle || 'Milk Yield'}</Text>
                    <Text style={styles.infoVal}>{cow.todayMilkLiters} L/{language === 'hi' ? 'दिन' : 'day'}</Text>
                  </View>
                  <View style={styles.infoCol}>
                    <Text style={styles.infoLabel}>💉 {t.vaccinationTitle || 'Vaccination'}</Text>
                    <Text style={styles.infoVal}>{cow.nextVaccinationDue}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.viewProfileBtn}
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedCowId(cow.id);
                    setCurrentView('cow_profile');
                  }}
                >
                  <Text style={styles.viewProfileBtnText}>{language === 'hi' ? 'प्रोफ़ाइल देखें →' : 'View Profile →'}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: COW PROFILE                                     */}
        {/* ======================================================== */}
        {currentView === 'cow_profile' && selectedCow && (
          <View>
            <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentView('herd')}>
              <ArrowLeft size={18} color="#fff" />
              <Text style={styles.backBtnText}>{language === 'hi' ? '← पशु सूची पर वापस जाएं' : 'Back to Herd Directory'}</Text>
            </TouchableOpacity>

            <View style={styles.profileHeaderCard}>
              <Image source={{ uri: selectedCow.image }} style={styles.profileAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.profileName}>🐄 {selectedCow.name}</Text>
                <Text style={styles.profileTag}>ID: {selectedCow.tagNumber}</Text>
                <Text style={styles.profileMeta}>{selectedCow.breed} • {selectedCow.age} • {selectedCow.sex}</Text>
              </View>
            </View>

            <View style={styles.healthStatusCard}>
              <Text style={styles.cardHeaderTitle}>{t.vitalsTitle || 'Health Status'}</Text>
              <View style={[styles.healthBadgeLarge, { backgroundColor: selectedCow.healthStatus === 'Healthy' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', borderColor: selectedCow.healthStatus === 'Healthy' ? '#10b981' : '#ef4444' }]}>
                <Text style={[styles.healthBadgeLargeText, { color: selectedCow.healthStatus === 'Healthy' ? '#10b981' : '#ef4444' }]}>
                  {selectedCow.healthStatus === 'Healthy' ? (language === 'hi' ? '🟢 स्वस्थ' : '🟢 Healthy') : (language === 'hi' ? '🔴 ध्यान देने योग्य' : '🔴 Needs Attention')}
                </Text>
              </View>
              <Text style={styles.lastCheckedText}>{language === 'hi' ? 'अंतिम जांच:' : 'Last checked:'} {selectedCow.lastCheckedDate || (language === 'hi' ? 'आज' : 'Today')}</Text>

              <TouchableOpacity
                style={styles.checkHealthMainBtn}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedHistoryItem(null);
                  setHealthCheckCow(selectedCow);
                }}
              >
                <Stethoscope size={18} color="#fff" />
                <Text style={styles.checkHealthMainBtnText}>{t.healthCheckBtn || 'Check Health'}</Text>
              </TouchableOpacity>

              <Text style={[styles.cardHeaderTitle, { marginTop: 14, alignSelf: 'flex-start' }]}>{language === 'hi' ? 'स्वास्थ्य इतिहास' : 'Health History'}</Text>
              <View style={styles.historyList}>
                {selectedCow.healthHistory && selectedCow.healthHistory.map(hh => (
                  <TouchableOpacity
                    key={hh.id}
                    style={styles.historyRow}
                    onPress={() => {
                      setSelectedHistoryItem(hh);
                      setHealthCheckCow(selectedCow);
                    }}
                  >
                    <Text style={styles.historyDate}>{hh.date}</Text>
                    <Text style={[styles.historyResultText, { color: hh.result === 'Healthy' ? '#10b981' : '#ef4444' }]}>
                      {hh.result === 'Healthy' ? (language === 'hi' ? '🟢 स्वस्थ' : '🟢 Healthy') : (language === 'hi' ? '🔴 ध्यान दें' : '🔴 Needs attention')}
                    </Text>
                    <ChevronRight size={14} color="#64748b" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.profileMetricCard}>
              <Text style={styles.cardHeaderTitle}>🥛 {t.milkYieldTitle || 'Milk Yield'}</Text>
              <Text style={styles.metricBigVal}>{selectedCow.todayMilkLiters} L <Text style={{ fontSize: 14, color: Colors.textSecondaryDark }}>{language === 'hi' ? 'आज' : 'today'}</Text></Text>
              <TouchableOpacity style={styles.outlineActionBtn} onPress={() => setCurrentView('milk')}>
                <Text style={styles.outlineActionBtnText}>{language === 'hi' ? 'दूध विश्लेषण एवं इतिहास देखें' : 'View Milk Analytics & History'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.profileMetricCard}>
              <Text style={styles.cardHeaderTitle}>📋 {t.recentLogsTitle || 'Daily Observation'}</Text>
              {selectedCow.latestObservation ? (
                <View style={styles.obsList}>
                  <Text style={styles.obsItem}>{language === 'hi' ? 'आज:' : 'Today:'} <Text style={styles.obsVal}>{selectedCow.latestObservation.eating}</Text>, <Text style={styles.obsVal}>{selectedCow.latestObservation.activity}</Text></Text>
                </View>
              ) : (
                <Text style={styles.obsVal}>{language === 'hi' ? 'आज कोई अवलोकन दर्ज नहीं।' : 'No observations recorded today.'}</Text>
              )}
              <TouchableOpacity style={[styles.outlineActionBtn, { marginTop: 10 }]} onPress={() => setObservationModalCow(selectedCow)}>
                <Text style={styles.outlineActionBtnText}>{t.logObservationBtn || '+ Add Observation'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.profileMetricCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <Text style={styles.cardHeaderTitle}>💉 {t.vaccinationTitle || 'Vaccinations'}</Text>
                <TouchableOpacity
                  style={styles.addVacBtnInline}
                  activeOpacity={0.8}
                  onPress={() => setVaccinationModalCow(selectedCow)}
                >
                  <Plus size={14} color="#fff" />
                  <Text style={styles.addVacBtnInlineText}>{language === 'hi' ? '+ टीका खुराक दर्ज करें' : '+ Log Vaccine'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ color: '#f59e0b', fontSize: 12, fontWeight: '600', flex: 1 }}>
                  {language === 'hi' ? `📌 आगामी टीका / स्थिति: ${selectedCow.nextVaccinationDue}` : `📌 Scheduled / Status: ${selectedCow.nextVaccinationDue}`}
                </Text>
                {selectedCow.nextVaccinationDue && selectedCow.nextVaccinationDue !== 'Completed' && (
                  <TouchableOpacity
                    style={styles.markDoneBtnInline}
                    onPress={() => handleMarkVaccinationDone(selectedCow.id)}
                  >
                    <Check size={12} color="#fff" />
                    <Text style={styles.markDoneBtnInlineText}>{language === 'hi' ? 'टीका पूर्ण दर्ज करें' : 'Mark Completed'}</Text>
                  </TouchableOpacity>
                )}
              </View>
              {selectedCow.vaccinations && selectedCow.vaccinations.length > 0 ? (
                selectedCow.vaccinations.map(v => (
                  <View key={v.id} style={styles.vacRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.vacName}>{v.name}</Text>
                      {v.dateCompleted && <Text style={styles.vacSub}>{language === 'hi' ? `दिनांक: ${v.dateCompleted}` : `Date: ${v.dateCompleted}`}</Text>}
                    </View>
                    <View style={styles.vacStatusBadge}>
                      <Text style={styles.vacStatusBadgeText}>{language === 'hi' ? '✓ पूर्ण' : '✓ Completed'}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ color: Colors.textSecondaryDark, fontSize: 12 }}>{language === 'hi' ? 'कोई रिकॉर्ड दर्ज नहीं है।' : 'No vaccination records logged yet.'}</Text>
              )}
            </View>

            <TouchableOpacity style={styles.actionBtnDanger} onPress={() => handleDeleteCow(selectedCow.id)}>
              <Trash2 size={16} color="#ef4444" />
              <Text style={[styles.actionBtnText, { color: '#ef4444' }]}>{t.deleteCattleBtn || 'Delete Cow'}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: MILK YIELD / PRODUCTION DIRECTORY & HISTORY     */}
        {/* ======================================================== */}
        {currentView === 'milk' && (
          <View>
            <View style={styles.herdHeader}>
              <View>
                <Text style={styles.pageTitle}>{language === 'hi' ? 'दूध उत्पादन एवं विश्लेषण' : 'Production & Analytics'}</Text>
                <Text style={styles.pageSubtitle}>{language === 'hi' ? 'दूध उत्पादन चार्ट एवं इतिहास रिकॉर्ड' : 'Milk yield visual chart & historical production logs'}</Text>
              </View>
              <TouchableOpacity style={styles.addCattleHeaderBtn} onPress={() => setAddMilkModalVisible(true)}>
                <Plus size={16} color="#fff" />
                <Text style={styles.addCattleHeaderText}>{t.logMilkBtn || '+ Log Milk Yield'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.totalProductionCard}>
              <Text style={styles.prodCardTitle}>🥛 {t.todayTotalMilk || "Today's Milk Production"}</Text>
              <Text style={styles.totalLitersNum}>{todayTotalMilkLiters} L</Text>
              <Text style={styles.prodTrendText}>↑ {language === 'hi' ? 'कल की तुलना में 8% अधिक' : '8% compared with yesterday'}</Text>

              <View style={styles.prodStatsRow}>
                <View style={styles.prodStatBox}>
                  <Text style={styles.prodStatLabel}>{language === 'hi' ? 'औसत / पशु' : 'Avg / Cow'}</Text>
                  <Text style={styles.prodStatVal}>{avgYieldPerCow} L</Text>
                </View>
                <View style={styles.prodStatBox}>
                  <Text style={styles.prodStatLabel}>{t.morningMilk || 'Morning Shift'} ☀️</Text>
                  <Text style={styles.prodStatVal}>18.8 L (60%)</Text>
                </View>
                <View style={styles.prodStatBox}>
                  <Text style={styles.prodStatLabel}>{t.eveningMilk || 'Evening Shift'} 🌙</Text>
                  <Text style={styles.prodStatVal}>12.7 L (40%)</Text>
                </View>
              </View>
            </View>

            {/* 📈 VISUAL ANALYTICS: 7-DAY PRODUCTION TREND CHART */}
            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <TrendingUp size={18} color={Colors.primaryLight} />
                  <Text style={styles.chartTitle}>{language === 'hi' ? '7-दिवसीय उत्पादन रुझान (ट्रेंड)' : '7-Day Visual Production Trend'}</Text>
                </View>
                <View style={styles.timeframePill}>
                  <Text style={styles.timeframeText}>{language === 'hi' ? 'पिछले 7 दिन' : 'Last 7 Days'}</Text>
                </View>
              </View>

              <View style={styles.barChartContainer}>
                {milkHistory.map((item, idx) => {
                  const heightPercent = (item.totalLiters / maxMilkInLog) * 100;
                  const isToday = item.day === 'Today';
                  return (
                    <View key={idx} style={styles.barCol}>
                      <Text style={styles.barValText}>{item.totalLiters}L</Text>
                      <View style={styles.barTrack}>
                        <View
                          style={[
                            styles.barFill,
                            { height: `${heightPercent}%` },
                            isToday && styles.barFillToday
                          ]}
                        />
                      </View>
                      <Text style={[styles.barDayText, isToday && styles.barDayTextToday]}>{item.day === 'Today' ? (language === 'hi' ? 'आज' : 'Today') : item.day}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* 📋 HISTORICAL MILK PRODUCTION LOGS TABLE */}
            <Text style={styles.sectionTitle}>{t.milkHistoryTitle || 'Full Daily Milk Production History'}</Text>
            <View style={styles.historyTableCard}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableColHeader, { width: '25%' }]}>{language === 'hi' ? 'दिनांक' : 'Date'}</Text>
                <Text style={[styles.tableColHeader, { width: '25%' }]}>{language === 'hi' ? 'कुल (लीटर)' : 'Total (L)'}</Text>
                <Text style={[styles.tableColHeader, { width: '25%' }]}>{language === 'hi' ? 'सुबह / शाम' : 'Morn / Eve'}</Text>
                <Text style={[styles.tableColHeader, { width: '25%', textAlign: 'right' }]}>{language === 'hi' ? 'शीर्ष गाय' : 'Top Cow'}</Text>
              </View>

              {milkHistory.slice().reverse().map((log, index) => (
                <View key={index} style={styles.tableDataRow}>
                  <Text style={[styles.tableCell, { width: '25%', fontWeight: '700' }]}>{log.date}</Text>
                  <Text style={[styles.tableCellVal, { width: '25%' }]}>{log.totalLiters} L</Text>
                  <Text style={[styles.tableCellSub, { width: '25%' }]}>{log.morning}L / {log.evening}L</Text>
                  <Text style={[styles.tableCellTag, { width: '25%', textAlign: 'right' }]}>{log.topCow}</Text>
                </View>
              ))}
            </View>

            {/* Today's Cow Breakdown */}
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>{language === 'hi' ? 'आज का व्यक्तिगत पशु दूध विवरण' : "Today's Individual Cattle Breakdown"}</Text>
            {cattleList.map(cow => (
              <View key={cow.id} style={styles.milkBreakdownCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.milkCowName}>🐄 {cow.name}</Text>
                  <Text style={styles.milkCowSub}>{cow.tagNumber} • {language === 'hi' ? 'सुबह:' : 'Morning:'} {cow.morningMilkLiters.toFixed(1)}L | {language === 'hi' ? 'शाम:' : 'Evening:'} {cow.eveningMilkLiters.toFixed(1)}L</Text>
                </View>
                <Text style={styles.milkCowVal}>{cow.todayMilkLiters.toFixed(1)} L</Text>
              </View>
            ))}
          </View>
        )}

        {/* ======================================================== */}
        {/* VIEW 5: FEED STOCK INVENTORY & HISTORICAL ANALYTICS     */}
        {/* ======================================================== */}
        {currentView === 'feed' && (
          <View>
            <View style={styles.herdHeader}>
              <View>
                <Text style={styles.pageTitle}>{language === 'hi' ? '🌾 चारा विश्लेषण एवं इतिहास' : '🌾 Feed Analytics & History'}</Text>
                <Text style={styles.pageSubtitle}>{language === 'hi' ? 'चारा भंडारण अवधियां एवं लेनदेन का इतिहास' : 'Whole stock depletion timeline & transaction history'}</Text>
              </View>
            </View>

            <View style={styles.feedActionRow}>
              <TouchableOpacity style={styles.feedPrimaryBtn} onPress={() => setAddFeedModalVisible(true)}>
                <Plus size={16} color="#fff" />
                <Text style={styles.feedPrimaryBtnText}>{t.addFeedBtn || '+ Add Feed Stock'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.feedSecondaryBtn} onPress={() => setAdjustConsumptionModalVisible(true)}>
                <Sliders size={16} color="#fff" />
                <Text style={styles.feedSecondaryBtnText}>{t.adjustConsumptionBtn || 'Adjust Consumption'}</Text>
              </TouchableOpacity>
            </View>

            {/* 📊 FEED VISUAL STOCK TIMELINE ANALYSIS */}
            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <BarChart2 size={18} color={Colors.primaryLight} />
                  <Text style={styles.chartTitle}>{language === 'hi' ? 'चारा खपत एवं उपलब्ध स्टॉक' : 'Feed Depletion & Stock Levels'}</Text>
                </View>
              </View>

              {feedInventory.map(item => {
                const daysLeft = Math.round(item.currentStockKg / (item.dailyConsumptionKg || 1));
                const progressWidth = Math.min(100, Math.max(10, (item.currentStockKg / 400) * 100));
                let displayName = item.name;
                if (language === 'hi') {
                  if (item.name.includes('Green') || item.name.includes('Napier')) displayName = 'हरा चारा (नेपियर घास)';
                  else if (item.name.includes('Dry') || item.name.includes('Straw') || item.name.includes('Wheat')) displayName = 'सूखा भूसा (गेहूं भूसा)';
                  else if (item.name.includes('Concentrate') || item.name.includes('Pellets')) displayName = 'पशु दाना / पोषाहार गोली';
                }
                return (
                  <View key={item.id} style={styles.progressRow}>
                    <View style={styles.progressHeader}>
                      <Text style={styles.progressItemName}>🌾 {displayName}</Text>
                      <Text style={[styles.progressItemVal, { color: item.statusColor }]}>{item.currentStockKg} kg ({daysLeft} {t.daysLeft || 'days remaining'})</Text>
                    </View>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${progressWidth}%`, backgroundColor: item.statusColor }]} />
                    </View>
                  </View>
                );
              })}
            </View>

            {/* FEED ITEMS INVENTORY LIST */}
            <Text style={styles.sectionTitle}>{t.feedInventoryTitle || 'Feed Inventory Items'}</Text>
            {feedInventory.map(item => {
              const daysLeft = Math.round(item.currentStockKg / (item.dailyConsumptionKg || 1));
              let displayName = item.name;
              if (language === 'hi') {
                if (item.name.includes('Green') || item.name.includes('Napier')) displayName = 'हरा चारा (नेपियर घास)';
                else if (item.name.includes('Dry') || item.name.includes('Straw') || item.name.includes('Wheat')) displayName = 'सूखा भूसा (गेहूं भूसा)';
                else if (item.name.includes('Concentrate') || item.name.includes('Pellets')) displayName = 'पशु दाना / पोषाहार गोली';
              }
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.feedCard}
                  activeOpacity={0.8}
                  onPress={() => setSelectedFeedItem(item)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.feedItemTitle}>🌾 {displayName}</Text>
                    <Text style={styles.feedItemSub}>{item.currentStockKg} kg {language === 'hi' ? 'उपलब्ध' : 'available'} • {item.dailyConsumptionKg} kg/{language === 'hi' ? 'दिन खपत' : 'day usage'}</Text>
                    <Text style={styles.feedDaysText}>{daysLeft} {t.daysLeft || 'days remaining'}</Text>
                  </View>

                  <View style={[styles.statusBadge, { backgroundColor: item.statusColor + '20', borderColor: item.statusColor }]}>
                    <Text style={[styles.statusBadgeText, { color: item.statusColor }]}>{item.status === 'Optimal' ? (language === 'hi' ? 'पर्याप्त' : 'Optimal') : (language === 'hi' ? 'कम स्टॉक' : item.status)}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* 📋 WHOLE FEED STOCK TRANSACTION HISTORY LOG */}
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>{language === 'hi' ? 'चारा स्टॉक लेनदेन एवं उपयोग लॉग' : 'Whole Feed Stock Transaction & Usage Logs'}</Text>
            <View style={styles.historyTableCard}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableColHeader, { width: '25%' }]}>{language === 'hi' ? 'दिनांक' : 'Date'}</Text>
                <Text style={[styles.tableColHeader, { width: '30%' }]}>{language === 'hi' ? 'सामग्री एवं विवरण' : 'Item & Type'}</Text>
                <Text style={[styles.tableColHeader, { width: '25%' }]}>{language === 'hi' ? 'मात्रा' : 'Qty'}</Text>
                <Text style={[styles.tableColHeader, { width: '20%', textAlign: 'right' }]}>{language === 'hi' ? 'लागत' : 'Cost'}</Text>
              </View>

              {feedTransactions.map(txn => {
                let txnFeedName = txn.feedName;
                let txnNote = txn.note;
                if (language === 'hi') {
                  if (txn.feedName.includes('Green') || txn.feedName.includes('Napier')) txnFeedName = 'हरा चारा (नेपियर घास)';
                  else if (txn.feedName.includes('Dry') || txn.feedName.includes('Straw') || txn.feedName.includes('Wheat')) txnFeedName = 'सूखा भूसा (गेहूं भूसा)';
                  else if (txn.feedName.includes('Concentrate') || txn.feedName.includes('Pellets')) txnFeedName = 'पशु दाना / पोषाहार गोली';

                  if (txn.note === 'Daily Herd Usage') txnNote = 'दैनिक झुंड खपत';
                  else if (txn.note === 'Harvest Restock') txnNote = 'फसल कटाई स्टॉक';
                  else if (txn.note === 'Agromart Delivery') txnNote = 'एग्रोमार्ट डिलीवरी';
                  else if (txn.note === 'Bulk Purchase') txnNote = 'थोक खरीद';
                }
                return (
                  <View key={txn.id} style={styles.tableDataRow}>
                    <Text style={[styles.tableCell, { width: '25%' }]}>{language === 'hi' ? txn.date.replace('Today', 'आज').replace('Yesterday', 'कल') : txn.date}</Text>
                    <View style={{ width: '30%' }}>
                      <Text style={styles.feedTxnName}>{txnFeedName}</Text>
                      <Text style={styles.feedTxnNote}>{txnNote}</Text>
                    </View>
                    <Text style={[styles.tableCellVal, { width: '25%', color: txn.qty.startsWith('+') ? '#10b981' : '#f59e0b' }]}>
                      {txn.qty}
                    </Text>
                    <Text style={[styles.tableCellTag, { width: '20%', textAlign: 'right' }]}>{txn.cost}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* ======================================================== */}
        {/* VIEW 6: CENTRALIZED ALERTS SYSTEM                       */}
        {/* ======================================================== */}
        {currentView === 'alerts' && (
          <View>
            <View style={[styles.herdHeader, { alignItems: 'flex-start' }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.pageTitle}>{language === 'hi' ? '🔔 केंद्रीकृत चेतावनियां (अलर्ट)' : '🔔 Centralized Alerts'}</Text>
                <Text style={styles.pageSubtitle}>{language === 'hi' ? 'स्वास्थ्य, टीकाकरण एवं चारे की एकीकृत सूचनाएं' : 'Unified notifications for health, vaccines & feed'}</Text>
              </View>
              {activeAlerts && activeAlerts.length > 0 && (
                <TouchableOpacity style={styles.clearAllAlertsBtn} onPress={handleClearAllAlerts}>
                  <Text style={styles.clearAllAlertsText}>{language === 'hi' ? 'सभी हटाएं' : 'Clear All'}</Text>
                </TouchableOpacity>
              )}
            </View>

            {activeAlerts && activeAlerts.length > 0 ? (
              activeAlerts.map(alt => {
                const isVacAlert = alt.type.includes('VACCINATION') || alt.type.includes('टीकाकरण');
                return (
                  <View
                    key={alt.id}
                    style={[styles.alertCardFull, { borderLeftColor: alt.color }]}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        if (alt.screenRoute === 'add_feed') {
                          setAddFeedModalVisible(true);
                        } else if (alt.screenRoute === 'cow_profile' && alt.targetId) {
                          setSelectedCowId(alt.targetId);
                          setCurrentView('cow_profile');
                        } else if (alt.screenRoute) {
                          setCurrentView(alt.screenRoute);
                        }
                      }}
                    >
                      <View style={styles.alertHeaderRow}>
                        <Text style={[styles.alertCategory, { color: alt.color }]}>{alt.type}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <Text style={styles.alertTimeText}>{alt.time}</Text>
                          <TouchableOpacity
                            style={styles.dismissSmallBtn}
                            onPress={() => handleDismissAlert(alt.id)}
                          >
                            <Text style={{ color: '#64748b', fontSize: 14, fontWeight: '700' }}>✕</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={styles.alertTitleText}>{alt.title}</Text>
                      <Text style={styles.alertMessageText}>{alt.message}</Text>
                    </TouchableOpacity>

                    {isVacAlert && alt.targetId ? (
                      <View style={{ flexDirection: 'row', gap: 10, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.borderDark }}>
                        <TouchableOpacity
                          style={styles.markDoneBtnAlert}
                          activeOpacity={0.8}
                          onPress={() => handleMarkVaccinationDone(alt.targetId)}
                        >
                          <Check size={14} color="#fff" />
                          <Text style={styles.markDoneBtnAlertText}>{language === 'hi' ? '✓ टीका पूर्ण दर्ज करें (1-टैप)' : '✓ Mark Done (1-Tap)'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.detailsBtnAlert}
                          activeOpacity={0.8}
                          onPress={() => handleDismissAlert(alt.id)}
                        >
                          <Text style={styles.detailsBtnAlertText}>{language === 'hi' ? 'हटाएं (पढ़ा हुआ)' : 'Dismiss'}</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            if (alt.screenRoute === 'add_feed') {
                              setAddFeedModalVisible(true);
                            } else if (alt.screenRoute === 'cow_profile' && alt.targetId) {
                              setSelectedCowId(alt.targetId);
                              setCurrentView('cow_profile');
                            } else if (alt.screenRoute) {
                              setCurrentView(alt.screenRoute);
                            }
                          }}
                        >
                          <Text style={styles.tapToViewText}>{language === 'hi' ? 'देखने के लिए टैप करें →' : 'Tap to open →'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.dismissInlineBtn}
                          onPress={() => handleDismissAlert(alt.id)}
                        >
                          <Text style={styles.dismissInlineText}>{language === 'hi' ? '✓ पढ़ा हुआ' : '✓ Mark Read'}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ color: Colors.textSecondaryDark, fontSize: 13 }}>{language === 'hi' ? 'कोई सक्रिय अलर्ट नहीं। सभी पशु स्वस्थ हैं!' : 'No active alerts. All farm systems healthy!'}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* ======================================================== */}
      {/* ALL MODALS                                              */}
      {/* ======================================================== */}
      <AddCattleModal
        visible={addCattleModalVisible}
        language={language}
        onClose={() => setAddCattleModalVisible(false)}
        onAddCattle={handleAddCattle}
      />

      <DailyObservationModal
        visible={!!observationModalCow}
        cow={observationModalCow}
        language={language}
        onClose={() => setObservationModalCow(null)}
        onSaveObservation={handleSaveObservation}
      />

      <AddMilkModal
        visible={addMilkModalVisible}
        cattleList={cattleList}
        language={language}
        onClose={() => setAddMilkModalVisible(false)}
        onSaveMilkYield={handleSaveMilkYield}
      />

      <FeedDetailsModal
        visible={!!selectedFeedItem}
        feedItem={selectedFeedItem}
        language={language}
        onClose={() => setSelectedFeedItem(null)}
        onUpdateFeed={(fId, updated) => {
          const updatedInventory = feedInventory.map(f => f.id === fId ? { ...f, ...updated } : f);
          setFeedInventory(updatedInventory);
          saveFeedInventory(updatedInventory);
        }}
      />

      <HealthCheckModal
        visible={!!healthCheckCow}
        cow={healthCheckCow}
        selectedHistoryItem={selectedHistoryItem}
        language={language}
        onClose={() => {
          setHealthCheckCow(null);
          setSelectedHistoryItem(null);
        }}
        onSavePrediction={handleSavePrediction}
      />

      <AddFeedModal
        visible={addFeedModalVisible}
        feedInventory={feedInventory}
        language={language}
        onClose={() => setAddFeedModalVisible(false)}
        onAddFeedStock={handleAddFeedStock}
      />

      <AdjustConsumptionModal
        visible={adjustConsumptionModalVisible}
        feedInventory={feedInventory}
        cattleList={cattleList}
        language={language}
        onClose={() => setAdjustConsumptionModalVisible(false)}
        onSaveAdjustments={handleSaveConsumptionAdjustments}
      />

      <SortFilterBottomSheet
        visible={sortFilterSheetVisible}
        language={language}
        onClose={() => setSortFilterSheetVisible(false)}
        sortBy={sortBy}
        onSelectSortBy={setSortBy}
        filterBy={filterBy}
        onToggleFilterBy={(fId) => {
          if (filterBy.includes(fId)) {
            setFilterBy(filterBy.filter(i => i !== fId));
          } else {
            setFilterBy([...filterBy, fId]);
          }
        }}
      />

      <AddVaccinationModal
        visible={!!vaccinationModalCow}
        cow={vaccinationModalCow}
        language={language}
        onClose={() => setVaccinationModalCow(null)}
        onSaveVaccination={handleSaveVaccination}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  offlineHeaderBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.2)',
  },
  offlineHeaderText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '700',
  },
  subNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCardDark,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark,
    zIndex: 5,
    elevation: 2,
  },
  scrollArrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  subNavRow: {
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navChip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    flexShrink: 0,
  },
  navChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
  },
  navChipText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  navChipTextActive: {
    color: '#ffffff',
    fontWeight: '800',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  dashboardBanner: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 14,
    ...Shadows.medium,
  },
  bannerEmoji: {
    color: Colors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  greetingTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 22,
    fontWeight: '800',
  },
  greetingSubtitle: {
    color: Colors.textSecondaryDark,
    fontSize: 13,
    marginTop: 2,
  },
  backupCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 16,
  },
  backupTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '800',
  },
  backupSub: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
    marginTop: 2,
    marginBottom: 10,
  },
  backupBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  exportBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  importBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.3)',
    gap: 6,
  },
  backupBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  dashboardCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  dashboardCard: {
    width: '48%',
    backgroundColor: Colors.bgCardDark,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    ...Shadows.small,
  },
  dashboardCardWarning: {
    borderColor: 'rgba(245, 158, 11, 0.4)',
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 22,
  },
  cardTitle: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  cardValue: {
    color: Colors.textPrimaryDark,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  cardSubText: {
    color: Colors.textSecondaryDark,
    fontSize: 10,
    marginTop: 4,
  },
  quickBar: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
  },
  quickActionText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  seeAllText: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  cattleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCardDark,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 10,
    gap: 12,
  },
  cowAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cowInfo: {
    flex: 1,
  },
  cowTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cowName: {
    color: Colors.textPrimaryDark,
    fontSize: 14,
    fontWeight: '700',
  },
  cowTag: {
    color: '#64748b',
    fontSize: 11,
  },
  cowMetaRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 2,
  },
  cowMeta: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
  },
  herdHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  pageTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 20,
    fontWeight: '800',
  },
  pageSubtitle: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
  },
  addCattleHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  addCattleHeaderText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  searchSortContainer: {
    gap: 8,
    marginBottom: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCardDark,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.textPrimaryDark,
    fontSize: 13,
  },
  sortFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 8,
  },
  sortFilterText: {
    color: Colors.primaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
  cattleCardFull: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cowAvatarLarge: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  cowNameLarge: {
    color: Colors.textPrimaryDark,
    fontSize: 15,
    fontWeight: '800',
  },
  cowTagLarge: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
  },
  healthBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  healthBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cattleGridInfo: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 10,
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  infoCol: {
    alignItems: 'center',
  },
  infoLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 10,
    fontWeight: '600',
  },
  infoVal: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  viewProfileBtn: {
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.3)',
  },
  viewProfileBtnText: {
    color: Colors.primaryLight,
    fontSize: 13,
    fontWeight: '700',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  backBtnText: {
    color: Colors.primaryLight,
    fontSize: 13,
    fontWeight: '700',
  },
  profileHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCardDark,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 12,
    gap: 14,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
  },
  profileName: {
    color: Colors.textPrimaryDark,
    fontSize: 18,
    fontWeight: '800',
  },
  profileTag: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '600',
  },
  profileMeta: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
    marginTop: 2,
  },
  healthStatusCard: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    alignItems: 'center',
    marginBottom: 12,
  },
  healthBadgeLarge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: 6,
  },
  healthBadgeLargeText: {
    fontSize: 14,
    fontWeight: '800',
  },
  lastCheckedText: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
    marginBottom: 12,
  },
  checkHealthMainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
    width: '100%',
    justifyContent: 'center',
  },
  checkHealthMainBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  historyList: {
    width: '100%',
    gap: 6,
    marginTop: 6,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  historyDate: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
  },
  historyResultText: {
    fontSize: 12,
    fontWeight: '700',
  },
  profileMetricCard: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 12,
  },
  cardHeaderTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  metricBigVal: {
    color: Colors.primaryLight,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  outlineActionBtn: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  outlineActionBtnText: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  obsList: {
    marginBottom: 6,
  },
  obsItem: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
  },
  obsVal: {
    color: Colors.textPrimaryDark,
    fontWeight: '700',
  },
  vacRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  vacName: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  vacStatus: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  actionBtnDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    gap: 8,
    marginTop: 10,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  totalProductionCard: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    alignItems: 'center',
    marginBottom: 14,
  },
  prodCardTitle: {
    color: Colors.textSecondaryDark,
    fontSize: 13,
    fontWeight: '600',
  },
  totalLitersNum: {
    color: Colors.primaryLight,
    fontSize: 32,
    fontWeight: '900',
    marginVertical: 4,
  },
  prodTrendText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '700',
  },
  prodStatsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
  },
  prodStatBox: {
    alignItems: 'center',
  },
  prodStatLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 10,
  },
  prodStatVal: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  chartCard: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  chartTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 14,
    fontWeight: '700',
  },
  timeframePill: {
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timeframeText: {
    color: Colors.primaryLight,
    fontSize: 10,
    fontWeight: '700',
  },
  barChartContainer: {
    flexDirection: 'row',
    height: 140,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  barCol: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barValText: {
    color: Colors.textSecondaryDark,
    fontSize: 9,
    marginBottom: 4,
    fontWeight: '600',
  },
  barTrack: {
    width: 22,
    height: 90,
    backgroundColor: '#f1f5f9',
    borderRadius: 11,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: 'rgba(5, 150, 105, 0.6)',
    borderRadius: 11,
  },
  barFillToday: {
    backgroundColor: Colors.primaryLight,
  },
  barDayText: {
    color: Colors.textSecondaryDark,
    fontSize: 10,
    marginTop: 6,
    fontWeight: '500',
  },
  barDayTextToday: {
    color: Colors.primaryLight,
    fontWeight: '800',
  },
  historyTableCard: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 14,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark,
  },
  tableColHeader: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
    fontWeight: '700',
  },
  tableDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  tableCell: {
    color: Colors.textPrimaryDark,
    fontSize: 11,
  },
  tableCellVal: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  tableCellSub: {
    color: Colors.textSecondaryDark,
    fontSize: 10,
  },
  tableCellTag: {
    color: Colors.textPrimaryDark,
    fontSize: 10,
    fontWeight: '600',
  },
  milkBreakdownCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bgCardDark,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 8,
  },
  milkCowName: {
    color: Colors.textPrimaryDark,
    fontSize: 14,
    fontWeight: '700',
  },
  milkCowSub: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
  },
  milkCowVal: {
    color: Colors.primaryLight,
    fontSize: 16,
    fontWeight: '800',
  },
  feedActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  feedPrimaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  feedPrimaryBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  feedSecondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    gap: 6,
  },
  feedSecondaryBtnText: {
    color: Colors.textPrimaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
  progressRow: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressItemName: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  progressItemVal: {
    fontSize: 11,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  feedTxnName: {
    color: Colors.textPrimaryDark,
    fontSize: 11,
    fontWeight: '700',
  },
  feedTxnNote: {
    color: Colors.textSecondaryDark,
    fontSize: 9,
  },
  feedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCardDark,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    marginBottom: 10,
  },
  feedItemTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 14,
    fontWeight: '700',
  },
  feedItemSub: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
    marginTop: 2,
  },
  feedDaysText: {
    color: Colors.primaryLight,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  alertCardFull: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    borderLeftWidth: 4,
    marginBottom: 10,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  alertCategory: {
    fontSize: 11,
    fontWeight: '800',
  },
  alertTimeText: {
    color: Colors.textSecondaryDark,
    fontSize: 10,
  },
  alertTitleText: {
    color: Colors.textPrimaryDark,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  alertMessageText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
  },
  tapToViewText: {
    color: Colors.primaryLight,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
  },
  addVacBtnInline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  addVacBtnInlineText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  vacSub: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
    marginTop: 2,
  },
  vacStatusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  vacStatusBadgeText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '700',
  },
  markDoneBtnInline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  markDoneBtnInlineText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  markDoneBtnAlert: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  markDoneBtnAlertText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  detailsBtnAlert: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsBtnAlertText: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  clearAllAlertsBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  clearAllAlertsText: {
    color: '#ef4444',
    fontSize: 11,
    fontWeight: '700',
  },
  dismissSmallBtn: {
    padding: 2,
  },
  dismissInlineBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  dismissInlineText: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
    fontWeight: '600',
  },
});
