import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

import {
  INITIAL_CATTLE,
  INITIAL_FEED_INVENTORY,
  HISTORICAL_MILK_LOGS,
  FEED_TRANSACTION_HISTORY
} from './livestockDataService';

const KEYS = {
  CATTLE_LIST: '@smart_farm_cattle_list',
  FEED_INVENTORY: '@smart_farm_feed_inventory',
  MILK_HISTORY: '@smart_farm_milk_history',
  FEED_TRANSACTIONS: '@smart_farm_feed_transactions',
  DISMISSED_ALERTS: '@smart_farm_dismissed_alerts',
};

// --- DISMISSED ALERTS STORAGE ---
export async function loadDismissedAlerts() {
  try {
    const json = await AsyncStorage.getItem(KEYS.DISMISSED_ALERTS);
    if (json !== null) {
      return JSON.parse(json);
    }
  } catch (error) {
    console.error('Error loading dismissed alerts from AsyncStorage:', error);
  }
  return [];
}

export async function saveDismissedAlerts(dismissedIds) {
  try {
    await AsyncStorage.setItem(KEYS.DISMISSED_ALERTS, JSON.stringify(dismissedIds));
  } catch (error) {
    console.error('Error saving dismissed alerts to AsyncStorage:', error);
  }
}

/**
 * OFFLINE STORAGE & BACKUP/RESTORE SERVICE
 * Fully cross-platform: Android, iOS & Web Browser support.
 */

// --- CATTLE STORAGE ---
export async function loadCattleList() {
  try {
    const json = await AsyncStorage.getItem(KEYS.CATTLE_LIST);
    if (json !== null) {
      return JSON.parse(json);
    }
  } catch (error) {
    console.error('Error loading cattle list from AsyncStorage:', error);
  }
  return INITIAL_CATTLE;
}

export async function saveCattleList(cattleList) {
  try {
    await AsyncStorage.setItem(KEYS.CATTLE_LIST, JSON.stringify(cattleList));
  } catch (error) {
    console.error('Error saving cattle list to AsyncStorage:', error);
  }
}

// --- FEED INVENTORY STORAGE ---
export async function loadFeedInventory() {
  try {
    const json = await AsyncStorage.getItem(KEYS.FEED_INVENTORY);
    if (json !== null) {
      return JSON.parse(json);
    }
  } catch (error) {
    console.error('Error loading feed inventory from AsyncStorage:', error);
  }
  return INITIAL_FEED_INVENTORY;
}

export async function saveFeedInventory(feedInventory) {
  try {
    await AsyncStorage.setItem(KEYS.FEED_INVENTORY, JSON.stringify(feedInventory));
  } catch (error) {
    console.error('Error saving feed inventory to AsyncStorage:', error);
  }
}

// --- MILK HISTORY STORAGE ---
export async function loadMilkHistory() {
  try {
    const json = await AsyncStorage.getItem(KEYS.MILK_HISTORY);
    if (json !== null) {
      return JSON.parse(json);
    }
  } catch (error) {
    console.error('Error loading milk history from AsyncStorage:', error);
  }
  return HISTORICAL_MILK_LOGS;
}

export async function saveMilkHistory(milkHistory) {
  try {
    await AsyncStorage.setItem(KEYS.MILK_HISTORY, JSON.stringify(milkHistory));
  } catch (error) {
    console.error('Error saving milk history to AsyncStorage:', error);
  }
}

// --- FEED TRANSACTION LOGS STORAGE ---
export async function loadFeedTransactions() {
  try {
    const json = await AsyncStorage.getItem(KEYS.FEED_TRANSACTIONS);
    if (json !== null) {
      return JSON.parse(json);
    }
  } catch (error) {
    console.error('Error loading feed transactions from AsyncStorage:', error);
  }
  return FEED_TRANSACTION_HISTORY;
}

export async function saveFeedTransactions(transactions) {
  try {
    await AsyncStorage.setItem(KEYS.FEED_TRANSACTIONS, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving feed transactions to AsyncStorage:', error);
  }
}

// ========================================================
// 📦 1-TAP CROSS-PLATFORM BACKUP & RESTORE (Mobile + Web)
// ========================================================

/**
 * Exports all local farm data to a portable JSON backup file.
 * Handles Web browser downloads as well as Android/iOS native file sharing.
 */
export async function exportBackupData() {
  try {
    const cattle = await loadCattleList();
    const feed = await loadFeedInventory();
    const milk = await loadMilkHistory();
    const txns = await loadFeedTransactions();

    const backupPayload = {
      appName: 'SmartFarmMobile',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      data: {
        cattleList: cattle,
        feedInventory: feed,
        milkHistory: milk,
        feedTransactions: txns
      }
    };

    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `SmartFarm_Backup_${dateStr}.json`;
    const jsonString = JSON.stringify(backupPayload, null, 2);

    // --- WEB BROWSER EXPORT ---
    if (Platform.OS === 'web') {
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    }

    // --- NATIVE MOBILE EXPORT (Android / iOS) ---
    const filePath = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.writeAsStringAsync(filePath, jsonString);

    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(filePath, {
        mimeType: 'application/json',
        dialogTitle: 'Save / Share Smart Farm Backup File',
        UTI: 'public.json'
      });
    } else {
      Alert.alert('Backup Created', `Backup file saved at: ${filePath}`);
    }
    return true;
  } catch (error) {
    console.error('Export backup error:', error);
    Alert.alert('Export Failed', 'Could not create backup file. Please try again.');
    return false;
  }
}

/**
 * Restores data from a user-selected JSON backup file across Web and Native Mobile.
 */
export async function importBackupData() {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/json', '*/*'],
      copyToCacheDirectory: true
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null; // User cancelled selection
    }

    const fileAsset = result.assets[0];
    let fileContent = '';

    // --- WEB BROWSER IMPORT ---
    if (Platform.OS === 'web') {
      if (fileAsset.file instanceof Blob) {
        fileContent = await fileAsset.file.text();
      } else if (fileAsset.uri) {
        const response = await fetch(fileAsset.uri);
        fileContent = await response.text();
      }
    } else {
      // --- NATIVE MOBILE IMPORT (Android / iOS) ---
      fileContent = await FileSystem.readAsStringAsync(fileAsset.uri);
    }

    const parsed = JSON.parse(fileContent);

    if (!parsed || !parsed.data || !parsed.data.cattleList) {
      Alert.alert('Invalid File', 'The selected file is not a valid Smart Farm backup.');
      return null;
    }

    // Save imported data directly into AsyncStorage
    const { cattleList, feedInventory, milkHistory, feedTransactions } = parsed.data;
    
    if (cattleList) await saveCattleList(cattleList);
    if (feedInventory) await saveFeedInventory(feedInventory);
    if (milkHistory) await saveMilkHistory(milkHistory);
    if (feedTransactions) await saveFeedTransactions(feedTransactions);

    Alert.alert('Restore Successful! 🎉', 'All cattle records, milk yields, feed stock & health histories have been restored.');
    
    return {
      cattleList: cattleList || INITIAL_CATTLE,
      feedInventory: feedInventory || INITIAL_FEED_INVENTORY,
      milkHistory: milkHistory || HISTORICAL_MILK_LOGS,
      feedTransactions: feedTransactions || FEED_TRANSACTION_HISTORY
    };
  } catch (error) {
    console.error('Import restore error:', error);
    Alert.alert('Restore Failed', 'Failed to import backup file. Please ensure it is a valid backup file.');
    return null;
  }
}

export async function clearAllLocalData() {
  try {
    await AsyncStorage.multiRemove([
      KEYS.CATTLE_LIST,
      KEYS.FEED_INVENTORY,
      KEYS.MILK_HISTORY,
      KEYS.FEED_TRANSACTIONS,
    ]);
  } catch (error) {
    console.error('Error clearing local storage:', error);
  }
}
