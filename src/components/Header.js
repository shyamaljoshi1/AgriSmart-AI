import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import { Leaf, Sun, CloudRain, ShieldCheck } from 'lucide-react-native';
import { TRANSLATIONS } from '../theme/i18n';

export default function Header({ activeTab, onTabSelect, language = 'en', setLanguage }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <Leaf color="#ffffff" size={20} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.brandTitle}>{t.appTitle}</Text>
            <Text style={styles.brandSubtitle}>{t.appSubtitle}</Text>
          </View>
        </View>

        {/* Global Language Selector Toggle Pill */}
        <View style={styles.langToggleContainer}>
          <TouchableOpacity
            style={[styles.langBtn, language === 'en' && styles.langBtnActive]}
            onPress={() => setLanguage && setLanguage('en')}
            activeOpacity={0.8}
          >
            <Text style={[styles.langBtnText, language === 'en' && styles.langBtnTextActive]}>EN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.langBtn, language === 'hi' && styles.langBtnActive]}
            onPress={() => setLanguage && setLanguage('hi')}
            activeOpacity={0.8}
          >
            <Text style={[styles.langBtnText, language === 'hi' && styles.langBtnTextActive]}>हिन्दी</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.bgCardDark,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark,
    ...Shadows.small,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  brandSubtitle: {
    color: Colors.primaryDark,
    fontSize: 11,
    fontWeight: '600',
  },
  langToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  langBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9,
  },
  langBtnActive: {
    backgroundColor: Colors.primary,
  },
  langBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  langBtnTextActive: {
    color: '#ffffff',
  },
});
