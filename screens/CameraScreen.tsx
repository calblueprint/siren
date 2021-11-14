/* eslint-disable react/style-prop-object */
import { Camera } from 'expo-camera';
import React, { useState } from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Document } from '../types/types';
import { setDocument } from '../firebase/queries';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  capture: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    zIndex: 1,
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    display: 'flex',
    backgroundColor: '#fff',
  },
  previewContainer: {
    flex: 1,
    width: '100%',
  },
  previewImage: {
    width: '100%',
    padding: 100,
  },
});

enum CameraStatus {
  INACTIVE, // inactive camera
  ACTIVE, // open camera
  PREVIEW, // viewing taken picture
}

type Photo = {
  uri: string;
  height: number;
  width: number;
};

export default function UploadScreen() {
  let camera: Camera | null;
  const [cameraState, setCameraState] = useState<CameraStatus>(
    CameraStatus.INACTIVE,
  );
  const [photo, setPhoto] = useState<Photo | undefined>(undefined);

  const startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === 'granted') {
      setCameraState(CameraStatus.ACTIVE);
    } else {
      // TODO: access denied -> go back?
    }
  };

  const takePicture = async () => {
    if (!camera) {
      return;
    }
    const currentPhoto: Photo = await camera.takePictureAsync();
    setPhoto(currentPhoto);
    setCameraState(CameraStatus.PREVIEW);
  };

  const uploadPicture = async () => {
    const thisPhoto: Document = {
      id: '', // set this to some id
      url: photo.uri,
      type: '', // check what this should be
      createdAt: new Date(),
    };
    setDocument('clientId', 'caseId', thisPhoto); // replace clientId and caseId
  };

  const CameraPreview = ({ p }: any) => (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: p && p.uri }}
        style={styles.previewImage}
      />
      <Button title="Keep Scan" onPress={uploadPicture} />
    </View>
  );

  switch (cameraState) {
    case CameraStatus.ACTIVE:
      return (
        <View style={styles.container}>
          <View style={styles.capture}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            />
          </View>
          <Camera
            style={styles.camera}
            ref={r => {
              camera = r;
            }}
          />
        </View>
      );
    case CameraStatus.PREVIEW:
      return <CameraPreview photo={photo} />;
    default:
      return (
        <View style={styles.container}>
          <Button title="Upload Document" onPress={startCamera} />
        </View>
      );
  }
}
