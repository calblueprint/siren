/* eslint-disable react/style-prop-object */
import firebase from 'database/clientApp';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Document, Client } from 'types/types';
import { setDocument } from 'database/queries';
import { getCurrentClient } from 'database/auth';

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
    height: '100%',
  },
});

enum CameraStatus {
  INACTIVE, // inactive camera
  ACTIVE, // open camera
  PREVIEW, // viewing taken picture
}

export default function UploadScreen() {
  let camera: Camera | null;
  const storage = firebase.storage();
  const [cameraState, setCameraState] = useState<CameraStatus>(
    CameraStatus.INACTIVE,
  );
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(
    undefined,
  );
  const [client, setClient] = useState<Client | undefined>(undefined);

  const loadClient = async (): Promise<void> => {
    const c: Client | undefined = await getCurrentClient();
    setClient(c);
  };

  useEffect(() => {
    loadClient();
  }, []);

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
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
    const currentPhoto: CameraCapturedPicture = await camera.takePictureAsync({
      base64: true,
    });
    setPhoto(currentPhoto);
  };

  useEffect(() => {
    if (photo !== undefined) {
      setCameraState(CameraStatus.PREVIEW);
    }
  }, [photo]);

  const uploadPicture = async () => {
    const reference = storage.ref();
    const ref2 = reference.child(`${client!.id}.jpg`);
    await ref2.putString(photo?.uri!, 'data_url', {
      contentType: 'image/jpg',
    });
    const url = await ref2.getDownloadURL();
    // TODO after Noah finishes document sprint
    // const thisPhoto: Document = {
    //   id: 'sample-pic', // set this to some id
    //   url,
    //   type: 'passport', // check what this should be
    //   createdAt: new Date(),
    // };
    // setDocument('clientId', 'caseId', thisPhoto);
  };

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
      return (
        <View style={styles.previewContainer}>
          <ImageBackground
            source={{ uri: photo!.uri }}
            style={styles.previewImage}
          />
          <Button title="Keep Scan" onPress={uploadPicture} />
        </View>
      );
    default:
      return (
        <View style={styles.container}>
          <Button title="Upload Document" onPress={startCamera} />
        </View>
      );
  }
}
