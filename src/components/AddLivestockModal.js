import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import { X, Plus, ShieldCheck } from 'lucide-react-native';

export default function AddLivestockModal({ visible, onClose, onAddAnimal }) {
  const [name, setName] = useState('');
  const [tagNumber, setTagNumber] = useState('');
  const [type, setType] = useState('Cattle'); // Cattle, Goat, Sheep
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weightKg, setWeightKg] = useState('');

  const handleSubmit = () => {
    if (!name || !tagNumber) {
      alert('Please fill in animal name and tag number.');
      return;
    }

    const newAnimal = {
      id: `LS-${Date.now().toString().slice(-4)}`,
      name,
      tagNumber,
      type,
      breed: breed || 'Standard Hybrid',
      gender: 'Female',
      age: age || '2 yrs',
      weightKg: parseInt(weightKg) || 450,
      status: 'Optimal',
      statusText: 'Optimal Health',
      temperature: 38.5,
      tempUnit: '°C',
      heartRate: 70,
      ruminationHrs: 8.0,
      activityLevel: 'Active',
      lastUpdated: 'Just now',
      location: 'Main Enclosure',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=400&q=80',
      recentLogs: [
        { id: `l_${Date.now()}`, time: 'Just now', note: 'Animal registered in AgriSmart system.' }
      ]
    };

    onAddAnimal(newAnimal);
    setName('');
    setTagNumber('');
    setBreed('');
    setAge('');
    setWeightKg('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Register New Livestock</Text>
            <TouchableOpacity onPress={onClose}>
              <X color={Colors.textSecondaryDark} size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formBody}>
            <Text style={styles.label}>Animal Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Bella"
              placeholderTextColor="#64748b"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Ear Tag / Collar ID</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. COW-109"
              placeholderTextColor="#64748b"
              value={tagNumber}
              onChangeText={setTagNumber}
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.typeRow}>
              {['Cattle', 'Goat', 'Sheep'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.typeChip, type === item && styles.typeChipActive]}
                  onPress={() => setType(item)}
                >
                  <Text style={[styles.typeText, type === item && styles.typeTextActive]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Breed</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Holstein Friesian"
              placeholderTextColor="#64748b"
              value={breed}
              onChangeText={setBreed}
            />

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 2.5 yrs"
                  placeholderTextColor="#64748b"
                  value={age}
                  onChangeText={setAge}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 520"
                  keyboardType="numeric"
                  placeholderTextColor="#64748b"
                  value={weightKg}
                  onChangeText={setWeightKg}
                />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Plus size={18} color="#fff" />
            <Text style={styles.submitBtnText}>Add Animal Tag</Text>
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
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: Colors.bgCardDark,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
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
    fontSize: 18,
    fontWeight: '700',
  },
  formBody: {
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
  typeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  typeChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  typeChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  typeText: {
    color: Colors.textSecondaryDark,
    fontSize: 13,
    fontWeight: '600',
  },
  typeTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginTop: 10,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
