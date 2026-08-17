import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';
import { X, Check } from 'lucide-react-native';

export default function HealthLogModal({ visible, animal, onClose, onSaveLog }) {
  const [temperature, setTemperature] = useState(animal ? String(animal.temperature) : '');
  const [note, setNote] = useState('');

  if (!animal) return null;

  const handleSave = () => {
    if (!note) {
      alert('Please write a quick observation note.');
      return;
    }

    const updatedTemp = parseFloat(temperature) || animal.temperature;
    let newStatus = 'Optimal';
    let newStatusText = 'Healthy & Active';

    if (updatedTemp > 39.5) {
      newStatus = 'Warning';
      newStatusText = 'Elevated Temp';
    }

    const newLog = {
      id: `l_${Date.now()}`,
      time: `Today ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      note: `Temp: ${updatedTemp}°C. ${note}`
    };

    onSaveLog(animal.id, updatedTemp, newStatus, newStatusText, newLog);
    setNote('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Log Vitals for {animal.name} ({animal.tagNumber})</Text>
            <TouchableOpacity onPress={onClose}>
              <X color={Colors.textSecondaryDark} size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <Text style={styles.label}>Body Temperature (°C)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={temperature}
              onChangeText={setTemperature}
            />

            <Text style={styles.label}>Observation / Treatment Note</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={3}
              placeholder="e.g. Administered 10mL vitamin booster. Grazing normally."
              placeholderTextColor="#64748b"
              value={note}
              onChangeText={setNote}
            />
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Check size={18} color="#fff" />
            <Text style={styles.saveBtnText}>Save Entry</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: Colors.bgCardDark,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark,
  },
  title: {
    color: Colors.textPrimaryDark,
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  body: {
    marginVertical: 14,
  },
  label: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: Colors.borderDark,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: Colors.textPrimaryDark,
    fontSize: 14,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  saveBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
