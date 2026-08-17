import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import { Stethoscope, Activity } from 'lucide-react-native';
import { TRANSLATIONS } from '../theme/i18n';

export default function TabBar({ activeTab, setActiveTab, language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <View style={styles.tabContainer}>
      {/* Tab 1: Disease Detection & Advisory */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tabButton, activeTab === 'disease' && styles.activeTabButton]}
        onPress={() => setActiveTab('disease')}
      >
        <View style={styles.iconWrapper}>
          <Stethoscope
            size={22}
            color={activeTab === 'disease' ? Colors.primary : Colors.textSecondaryDark}
          />
          {activeTab === 'disease' && <View style={styles.activeDot} />}
        </View>
        <Text style={[styles.tabLabel, activeTab === 'disease' && styles.activeTabLabel]}>
          {t.tabDisease}
        </Text>
      </TouchableOpacity>

      {/* Tab 2: Livestock Monitoring */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tabButton, activeTab === 'livestock' && styles.activeTabButton]}
        onPress={() => setActiveTab('livestock')}
      >
        <View style={styles.iconWrapper}>
          <Activity
            size={22}
            color={activeTab === 'livestock' ? Colors.primary : Colors.textSecondaryDark}
          />
          {activeTab === 'livestock' && <View style={styles.activeDot} />}
        </View>
        <Text style={[styles.tabLabel, activeTab === 'livestock' && styles.activeTabLabel]}>
          {t.tabLivestock}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.bgCardDark,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
    paddingVertical: 8,
    paddingBottom: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    ...Shadows.medium,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 14,
    marginHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: Colors.primaryBg,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.3)',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 4,
  },
  activeDot: {
    position: 'absolute',
    top: -4,
    right: -6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondaryDark,
  },
  activeTabLabel: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
