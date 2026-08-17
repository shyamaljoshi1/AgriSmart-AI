import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Platform } from 'react-native';
import { Colors } from '../theme/colors';
import { Camera, X, RefreshCw, Zap, Image as ImageIcon, Check, Crop } from 'lucide-react-native';
import { SAMPLE_PLANT_PRESETS } from '../services/dlModelService';

import { TRANSLATIONS } from '../theme/i18n';

export default function CameraModal({ visible, onClose, onPhotoCaptured, language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [flashOn, setFlashOn] = useState(false);
  const presets = SAMPLE_PLANT_PRESETS || [];
  const [selectedPreset, setSelectedPreset] = useState(presets[0] || { id: 'default', diseaseId: 'healthy_crop', crop: 'General', imageUri: '' });
  const [streamActive, setStreamActive] = useState(false);
  const videoRef = useRef(null);

  // Web camera initialization if running on web preview
  useEffect(() => {
    let currentStream = null;
    if (visible && Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          currentStream = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setStreamActive(true);
          }
        })
        .catch((err) => {
          console.log('Web camera access notice:', err.message);
          setStreamActive(false);
        });
    }

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [visible]);

  const handleShutterPress = () => {
    // If real web camera feed is running, we capture frame, otherwise use selected preset or placeholder
    if (streamActive && videoRef.current) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        const callback = onPhotoCaptured || onCapturePhoto;
        if (callback) callback(dataUrl, selectedPreset.diseaseId);
        onClose();
        return;
      } catch (e) {
        console.log('Fallback to preset image on capture:', e);
      }
    }

    // Default photo capture from selected preset
    const callback = onPhotoCaptured || onCapturePhoto;
    if (callback) callback(selectedPreset.imageUri, selectedPreset.diseaseId);
    onClose();
  };

  const handleFileUpload = () => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const callback = onPhotoCaptured || onCapturePhoto;
            if (callback) callback(event.target.result, null);
            onClose();
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      handleShutterPress();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Top Camera Controls */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={onClose}>
            <X color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.topTitle}>{t.cameraModalTitle}</Text>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setFlashOn(!flashOn)}>
            <Zap color={flashOn ? Colors.accent : '#fff'} size={24} />
          </TouchableOpacity>
        </View>

        {/* Viewfinder / Camera View */}
        <View style={styles.viewfinder}>
          {Platform.OS === 'web' && streamActive ? (
            <video
              ref={videoRef}
              style={styles.webVideo}
              autoPlay
              playsInline
              muted
            />
          ) : (
            <Image
              source={{ uri: selectedPreset.imageUri }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          )}

          {/* Bounding Box Alignment Guide */}
          <View style={styles.overlayFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            <Text style={styles.guideText}>Center affected leaf area inside frame</Text>
          </View>
        </View>

        {/* Sample Leaf Selector for quick testing */}
        <View style={styles.presetSection}>
          <Text style={styles.presetSectionTitle}>Select Sample Leaf to Test DL Model:</Text>
          <View style={styles.presetRow}>
            {presets.map((preset) => {
              const isSelected = selectedPreset.id === preset.id;
              return (
                <TouchableOpacity
                  key={preset.id}
                  style={[styles.presetChip, isSelected && styles.presetChipActive]}
                  onPress={() => setSelectedPreset(preset)}
                >
                  <Text style={[styles.presetText, isSelected && styles.presetTextActive]}>
                    {preset.crop}
                  </Text>
                  {isSelected && <Check size={12} color="#fff" style={{ marginLeft: 4 }} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Shutter & Controls Bottom Bar */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.sideBtn} onPress={handleFileUpload}>
            <ImageIcon color="#fff" size={22} />
            <Text style={styles.sideBtnText}>Gallery</Text>
          </TouchableOpacity>

          {/* Main Click Photo Shutter Button */}
          <TouchableOpacity style={styles.shutterBtn} activeOpacity={0.7} onPress={handleShutterPress}>
            <View style={styles.shutterInner}>
              <Camera color={Colors.primary} size={30} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideBtn} onPress={() => {
            if (presets.length === 0) return;
            const nextIdx = (presets.findIndex(p => p.id === selectedPreset.id) + 1) % presets.length;
            setSelectedPreset(presets[nextIdx]);
          }}>
            <RefreshCw color="#fff" size={22} />
            <Text style={styles.sideBtnText}>Switch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.bgCardDark,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.bgCardDark,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark,
    zIndex: 10,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    color: Colors.textPrimaryDark,
    fontSize: 16,
    fontWeight: '700',
  },
  viewfinder: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  webVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  overlayFrame: {
    position: 'absolute',
    width: '80%',
    height: '60%',
    borderWidth: 2,
    borderColor: 'rgba(52, 211, 153, 0.6)',
    borderRadius: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: Colors.primaryLight,
  },
  topLeft: { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 16 },
  topRight: { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 16 },
  bottomLeft: { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 16 },
  bottomRight: { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 16 },
  guideText: {
    color: Colors.primaryLight,
    fontSize: 13,
    fontWeight: '600',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  presetSection: {
    backgroundColor: 'rgba(19, 30, 46, 0.95)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
  },
  presetSectionTitle: {
    color: Colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  presetChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  presetText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '500',
  },
  presetTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#000000',
  },
  sideBtn: {
    alignItems: 'center',
    width: 70,
  },
  sideBtnText: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 4,
  },
  shutterBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Colors.primaryLight,
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
