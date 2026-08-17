import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import { Cpu, HardDrive, Sparkles } from 'lucide-react-native';

export default function InferenceOverlay({ visible, stepInfo }) {
  if (!visible) return null;

  const pct = stepInfo?.pct || 25;
  const currentText = stepInfo?.text || 'Processing DL Tensor in RAM...';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.chip}>
              <Cpu size={14} color={Colors.primaryLight} />
              <Text style={styles.chipText}>RAM Inference Active</Text>
            </View>
            <Sparkles size={18} color={Colors.accent} />
          </View>

          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color={Colors.primaryLight} />
          </View>

          <Text style={styles.title}>Executing Neural Model</Text>
          <Text style={styles.stepText}>{currentText}</Text>

          {/* Progress Bar */}
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${pct}%` }]} />
          </View>

          <View style={styles.footerRow}>
            <View style={styles.metric}>
              <HardDrive size={12} color={Colors.textSecondaryDark} />
              <Text style={styles.metricText}>Allocated RAM: 24.8 MB</Text>
            </View>
            <Text style={styles.percentageText}>{pct}%</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: Colors.bgCardDark,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    ...Shadows.large,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  chipText: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '600',
  },
  spinnerContainer: {
    marginVertical: 12,
    alignItems: 'center',
  },
  title: {
    color: Colors.textPrimaryDark,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  stepText: {
    color: Colors.textSecondaryDark,
    fontSize: 13,
    textAlign: 'center',
    minHeight: 36,
    marginBottom: 16,
  },
  progressBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
  },
  percentageText: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
});
