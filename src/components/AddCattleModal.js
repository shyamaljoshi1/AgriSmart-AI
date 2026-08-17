import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../theme/colors';
import { X, Camera, ChevronDown, ChevronUp } from 'lucide-react-native';

const PRESET_COW_PHOTOS = [
  { id: 'p1', name: 'Gir Cow', source: require('../../assets/cow_gir.png') },
  { id: 'p2', name: 'Sahiwal Cow', source: require('../../assets/cow_sahiwal.png') },
  { id: 'p3', name: 'Farm Cow', source: { uri: 'https://picsum.photos/id/1025/400/400' } },
  { id: 'p4', name: 'Calf', source: { uri: 'https://picsum.photos/id/1074/400/400' } }
];

export default function AddCattleModal({ visible, onClose, onAddCattle, language = 'en' }) {
  const isHi = language === 'hi';
  const [name, setName] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [breed, setBreed] = useState('Gir');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('Female');
  const [dateAcquired, setDateAcquired] = useState('');
  const [initialMilk, setInitialMilk] = useState('');
  
  // Photo state
  const [photoSource, setPhotoSource] = useState(PRESET_COW_PHOTOS[0].source);

  // Advanced accordion state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [weightKg, setWeightKg] = useState('');
  const [parentInfo, setParentInfo] = useState('');
  const [previousVaccines, setPreviousVaccines] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  const breeds = ['Gir', 'Sahiwal', 'Red Sindhi', 'Holstein Friesian', 'Jersey', 'Kankrej', 'Murrah (Buffalo)'];

  // Handle Pick Image from Gallery / Camera
  const handlePickPhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Permission to access gallery is required to upload cattle photo.');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
        setPhotoSource({ uri: pickerResult.assets[0].uri });
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Image Pick Error', 'Could not open image gallery.');
    }
  };

  const getResolvedImageUri = (src) => {
    if (typeof src === 'string') return src;
    if (src && src.uri) return src.uri;
    return 'https://picsum.photos/id/1025/400/400';
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a name for the cattle.');
      return;
    }

    const imageUri = getResolvedImageUri(photoSource);
    const parsedMilk = parseFloat(initialMilk) || 0;

    const newCow = {
      id: animalId.trim() || `C-0${Math.floor(Math.random() * 90 + 10)}`,
      name: name.trim(),
      tagNumber: animalId.trim() || `C-0${Math.floor(Math.random() * 90 + 10)}`,
      breed,
      age: age.trim() || 'Unspecified',
      sex,
      dateAcquired: dateAcquired.trim() || 'Today',
      initialMilkYield: parsedMilk,
      weightKg: parseFloat(weightKg) || 0,
      parentInfo: parentInfo.trim() || 'Not specified',
      purchasePrice: purchasePrice.trim() || 'N/A',
      image: imageUri,

      // Initial clean/unfilled state
      healthStatus: 'Not Checked',
      healthColor: '#94a3b8',
      lastCheckedDate: 'Never',
      healthHistory: [], // Empty history list until farmer performs first check

      todayMilkLiters: parsedMilk,
      morningMilkLiters: 0,
      eveningMilkLiters: 0,

      vaccinations: previousVaccines.trim() ? [
        { id: `v_${Date.now()}`, name: previousVaccines.trim(), status: 'Completed', dateCompleted: 'Prior' }
      ] : [],
      nextVaccinationDue: 'Not Scheduled',
      nextVaccinationName: 'None',

      latestObservation: {
        date: 'Never',
        eating: 'Not Recorded',
        activity: 'Not Recorded',
        milkStatus: 'Not Recorded',
        symptoms: []
      }
    };

    onAddCattle(newCow);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setAnimalId('');
    setBreed('Gir');
    setAge('');
    setSex('Female');
    setDateAcquired('');
    setInitialMilk('');
    setWeightKg('');
    setParentInfo('');
    setPreviousVaccines('');
    setPurchasePrice('');
    setPhotoSource(PRESET_COW_PHOTOS[0].source);
    setShowAdvanced(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{isHi ? '🐄 नया पशु जोड़ें' : 'Add New Cattle'}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formBody} showsVerticalScrollIndicator={false}>
            {/* 📷 Add / Change Photo */}
            <View style={styles.photoContainer}>
              <Image
                source={typeof photoSource === 'number' ? photoSource : photoSource}
                style={styles.previewImage}
              />
              
              <TouchableOpacity style={styles.photoPickerBtn} onPress={handlePickPhoto} activeOpacity={0.8}>
                <Camera size={16} color="#fff" />
                <Text style={styles.photoBtnText}>{isHi ? 'फोटो बदलें (गैलरी)' : 'Change Photo (Gallery)'}</Text>
              </TouchableOpacity>

              {/* Sample Photo Presets */}
              <Text style={styles.presetLabel}>{isHi ? 'या फोटो चुनें:' : 'Or select sample photo:'}</Text>
              <View style={styles.presetRow}>
                {PRESET_COW_PHOTOS.map(p => (
                  <TouchableOpacity
                    key={p.id}
                    style={[
                      styles.presetThumbBox,
                      photoSource === p.source && styles.presetThumbBoxActive
                    ]}
                    onPress={() => setPhotoSource(p.source)}
                  >
                    <Image
                      source={typeof p.source === 'number' ? p.source : p.source}
                      style={styles.presetThumbImg}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Name */}
            <Text style={styles.fieldLabel}>{isHi ? 'पशु का नाम *' : 'Cattle Name *'}</Text>
            <TextInput
              style={styles.textInput}
              placeholder={isHi ? 'उदा. लक्ष्मी' : 'e.g. Lakshmi'}
              placeholderTextColor="#64748b"
              value={name}
              onChangeText={setName}
            />

            {/* Animal ID */}
            <Text style={styles.fieldLabel}>{isHi ? 'टैग नंबर / पशु आईडी' : 'Tag Number / Animal ID'}</Text>
            <TextInput
              style={styles.textInput}
              placeholder={isHi ? 'उदा. C-028 (खाली रखने पर स्वतः निर्मित)' : 'e.g. C-028 (Auto-generated if empty)'}
              placeholderTextColor="#64748b"
              value={animalId}
              onChangeText={setAnimalId}
            />

            {/* Breed Picker */}
            <Text style={styles.fieldLabel}>{isHi ? 'नस्ल' : 'Breed'}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              {breeds.map(b => (
                <TouchableOpacity
                  key={b}
                  style={[styles.breedChip, breed === b && styles.breedChipActive]}
                  onPress={() => setBreed(b)}
                >
                  <Text style={[styles.breedText, breed === b && styles.breedTextActive]}>{b}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Age & Sex */}
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>{isHi ? 'आयु' : 'Age'}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={isHi ? 'उदा. 3 वर्ष' : 'e.g. 3 years'}
                  placeholderTextColor="#64748b"
                  value={age}
                  onChangeText={setAge}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>{isHi ? 'लिंग' : 'Sex'}</Text>
                <View style={styles.sexRow}>
                  {['Female', 'Male'].map(s => (
                    <TouchableOpacity
                      key={s}
                      style={[styles.sexChip, sex === s && styles.sexChipActive]}
                      onPress={() => setSex(s)}
                    >
                      <Text style={[styles.sexText, sex === s && styles.sexTextActive]}>{s === 'Female' ? (isHi ? 'मादा' : 'Female') : (isHi ? 'नर' : 'Male')}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Date Acquired & Initial Milk */}
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>{isHi ? 'खरीद / प्राप्ति तिथि' : 'Date Acquired'}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={isHi ? 'उदा. 14 अग 2026' : 'e.g. 14 Aug 2026'}
                  placeholderTextColor="#64748b"
                  value={dateAcquired}
                  onChangeText={setDateAcquired}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>{isHi ? 'प्रारंभिक दूध (लीटर/दिन)' : 'Initial Milk (L/day)'}</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="0.0"
                  placeholderTextColor="#64748b"
                  value={initialMilk}
                  onChangeText={setInitialMilk}
                />
              </View>
            </View>

            {/* Accordion: Advanced Details (Optional) */}
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => setShowAdvanced(!showAdvanced)}
            >
              <Text style={styles.accordionTitle}>{isHi ? 'अतिरिक्त विवरण (ऐच्छिक)' : 'Advanced details (Optional)'}</Text>
              {showAdvanced ? <ChevronUp size={18} color={Colors.primaryLight} /> : <ChevronDown size={18} color="#64748b" />}
            </TouchableOpacity>

            {showAdvanced && (
              <View style={styles.advancedBox}>
                <Text style={styles.fieldLabel}>{isHi ? 'वजन (किग्रा)' : 'Weight (kg)'}</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="e.g. 450"
                  placeholderTextColor="#64748b"
                  value={weightKg}
                  onChangeText={setWeightKg}
                />

                <Text style={styles.fieldLabel}>{isHi ? 'माता-पिता की जानकारी' : 'Parent Information'}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={isHi ? 'उदा. माता: गौरी (C-024)' : 'e.g. Dam: Gauri (C-024)'}
                  placeholderTextColor="#64748b"
                  value={parentInfo}
                  onChangeText={setParentInfo}
                />

                <Text style={styles.fieldLabel}>{isHi ? 'पिछला टीकाकरण इतिहास' : 'Previous Vaccination History'}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={isHi ? 'उदा. एफएमडी टीका पूर्ण' : 'e.g. FMD booster completed'}
                  placeholderTextColor="#64748b"
                  value={previousVaccines}
                  onChangeText={setPreviousVaccines}
                />

                <Text style={styles.fieldLabel}>{isHi ? 'खरीद मूल्य' : 'Purchase Price'}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. ₹ 45,000"
                  placeholderTextColor="#64748b"
                  value={purchasePrice}
                  onChangeText={setPurchasePrice}
                />
              </View>
            )}
          </ScrollView>

          {/* Footer Save */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{isHi ? 'पशु सुरक्षित करें' : 'Save Cattle'}</Text>
            </TouchableOpacity>
          </View>
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
    maxHeight: '90%',
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
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formBody: {
    marginBottom: 16,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 14,
  },
  previewImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
  },
  photoPickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    marginTop: 10,
    gap: 6,
  },
  photoBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  presetLabel: {
    color: Colors.textSecondaryDark,
    fontSize: 11,
    marginTop: 10,
    marginBottom: 6,
  },
  presetRow: {
    flexDirection: 'row',
    gap: 10,
  },
  presetThumbBox: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  presetThumbBoxActive: {
    borderColor: Colors.primaryLight,
  },
  presetThumbImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  fieldLabel: {
    color: Colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#f1f5f9',
    color: Colors.textPrimaryDark,
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  chipRow: {
    gap: 8,
    marginBottom: 6,
  },
  breedChip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  breedChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  breedText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  breedTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  sexRow: {
    flexDirection: 'row',
    gap: 6,
  },
  sexChip: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  sexChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  sexText: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
  },
  sexTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  accordionTitle: {
    color: Colors.primaryLight,
    fontSize: 13,
    fontWeight: '700',
  },
  advancedBox: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
