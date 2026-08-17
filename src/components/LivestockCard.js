import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import { Thermometer, Heart, Activity, MapPin, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react-native';

export default function LivestockCard({ animal, onLogHealth, language = 'en' }) {
  const [expanded, setExpanded] = useState(false);
  const isHi = language === 'hi';

  const getStatusColor = (status) => {
    switch (status) {
      case 'Optimal': return Colors.primary;
      case 'Warning': return Colors.warning;
      case 'Critical': return Colors.danger;
      default: return Colors.primary;
    }
  };

  const statusColor = getStatusColor(animal.status);

  return (
    <View style={styles.card}>
      {/* Top Animal Summary */}
      <View style={styles.topRow}>
        <Image source={{ uri: animal.image }} style={styles.animalImage} />
        
        <View style={styles.infoCol}>
          <View style={styles.tagRow}>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{animal.tagNumber}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}15`, borderColor: `${statusColor}40` }]}>
              <View style={[styles.dot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusText, { color: statusColor }]}>{isHi ? (animal.status === 'Optimal' ? 'उत्तम' : 'ध्यान दें') : animal.statusText}</Text>
            </View>
          </View>

          <Text style={styles.animalName}>{animal.name}</Text>
          <Text style={styles.breedText}>{animal.breed} • {animal.age} • {animal.weightKg} kg</Text>
          
          <View style={styles.locationRow}>
            <MapPin size={12} color={Colors.textSecondaryDark} />
            <Text style={styles.locationText}>{animal.location}</Text>
          </View>
        </View>
      </View>

      {/* Vitals Metric Cards Grid */}
      <View style={styles.vitalsGrid}>
        {/* Temperature */}
        <View style={[styles.vitalBox, animal.temperature > 39.5 && styles.vitalBoxWarning]}>
          <View style={styles.vitalHeader}>
            <Thermometer size={14} color={animal.temperature > 39.5 ? Colors.danger : Colors.primaryDark} />
            <Text style={styles.vitalLabel}>{isHi ? 'तापमान' : 'Temp'}</Text>
          </View>
          <Text style={[styles.vitalValue, animal.temperature > 39.5 && { color: Colors.danger }]}>
            {animal.temperature}{animal.tempUnit}
          </Text>
        </View>

        {/* Heart Rate */}
        <View style={styles.vitalBox}>
          <View style={styles.vitalHeader}>
            <Heart size={14} color={Colors.accent} />
            <Text style={styles.vitalLabel}>{isHi ? 'हृदय गति' : 'Heart Rate'}</Text>
          </View>
          <Text style={styles.vitalValue}>{animal.heartRate} <Text style={styles.unitText}>BPM</Text></Text>
        </View>

        {/* Rumination */}
        <View style={styles.vitalBox}>
          <View style={styles.vitalHeader}>
            <Activity size={14} color={Colors.info} />
            <Text style={styles.vitalLabel}>{isHi ? 'जुगाली' : 'Rumination'}</Text>
          </View>
          <Text style={styles.vitalValue}>{animal.ruminationHrs} <Text style={styles.unitText}>{isHi ? 'घंटे/दिन' : 'hrs/day'}</Text></Text>
        </View>
      </View>

      {/* Accordion Toggle for Logs */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.logBtn} onPress={() => onLogHealth(animal)}>
          <PlusCircle size={14} color={Colors.primaryDark} />
          <Text style={styles.logBtnText}>{isHi ? 'विटल्स दर्ज करें' : 'Log Vitals'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.expandBtn} onPress={() => setExpanded(!expanded)}>
          <Text style={styles.expandText}>{expanded ? (isHi ? 'इतिहास छिपाएं' : 'Hide History') : (isHi ? 'इतिहास देखें' : 'View History')}</Text>
          {expanded ? <ChevronUp size={16} color={Colors.textSecondaryDark} /> : <ChevronDown size={16} color={Colors.textSecondaryDark} />}
        </TouchableOpacity>
      </View>

      {/* History Log Section */}
      {expanded && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>📋 Recent Health Logs:</Text>
          {animal.recentLogs.map((log) => (
            <View key={log.id} style={styles.logItem}>
              <Text style={styles.logTime}>{log.time}</Text>
              <Text style={styles.logNote}>{log.note}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    ...Shadows.small,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  animalImage: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: Colors.borderDark,
  },
  infoCol: {
    flex: 1,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  tagBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  tagText: {
    color: Colors.textPrimaryDark,
    fontSize: 11,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  animalName: {
    color: Colors.textPrimaryDark,
    fontSize: 17,
    fontWeight: '700',
  },
  breedText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    marginTop: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
  },
  vitalsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  vitalBox: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  vitalBoxWarning: {
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  vitalLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 10,
    fontWeight: '600',
  },
  vitalValue: {
    color: Colors.textPrimaryDark,
    fontSize: 15,
    fontWeight: '700',
  },
  unitText: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.textSecondaryDark,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
  },
  logBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logBtnText: {
    color: Colors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expandText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
  },
  historyContainer: {
    marginTop: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  historyTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  logItem: {
    marginBottom: 6,
  },
  logTime: {
    color: Colors.primaryDark,
    fontSize: 10,
    fontWeight: '700',
  },
  logNote: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
  },
});
