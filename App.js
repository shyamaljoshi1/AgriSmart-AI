import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './src/theme/colors';
import Header from './src/components/Header';
import TabBar from './src/components/TabBar';
import DiseaseDetectionScreen from './src/screens/DiseaseDetectionScreen';
import LivestockMonitoringScreen from './src/screens/LivestockMonitoringScreen';
import ErrorBoundary from './src/components/ErrorBoundary';

export default function App() {
  // Homescreen 2 tabs state: 'disease' | 'livestock'
  const [activeTab, setActiveTab] = useState('disease');

  // Global App Language State: 'en' (English) | 'hi' (हिन्दी)
  const [language, setLanguage] = useState('en');

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.bgCardDark} />
          
          {/* App Container */}
          <View style={styles.appContainer}>
            {/* Top Header with Global Language Switcher */}
            <Header
              activeTab={activeTab}
              onTabSelect={setActiveTab}
              language={language}
              setLanguage={setLanguage}
            />

            {/* Homescreen Screen View */}
            <View style={styles.screenContainer}>
              {activeTab === 'disease' ? (
                <DiseaseDetectionScreen language={language} setLanguage={setLanguage} />
              ) : (
                <LivestockMonitoringScreen language={language} setLanguage={setLanguage} />
              )}
            </View>

          {/* Bottom Tab Navigation Bar */}
          <TabBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            language={language}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bgCardDark,
  },
  appContainer: {
    flex: 1,
    backgroundColor: Colors.bgDark,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 520 : '100%', // Mobile frame sizing on web preview
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
});
