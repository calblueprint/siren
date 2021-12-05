import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
  LogBox,
  Platform,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { firestoreAutoId } from 'database/helpers';
import { AntDesign } from '@expo/vector-icons';

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const CameraScreen = ({ navigation, route }: any) => {
  const [imageUris, setImageUris] = useState([] as string[]);
  const [uploading, setUploading] = useState(false);
  const storage = firebase.storage();

  useEffect(() => {
    if (route.params?.uris) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      setImageUris(route.params.uris);
    }
  }, [route.params?.uris]);

  useEffect(() => {
    const requestAccess = async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
    requestAccess();
  }, []);

  const maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
    return null;
  };

  const renderCurrentPictures = () => {
    if (imageUris.length === 0) {
      return null;
    }
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {imageUris.map(uri => (
          <ImageBackground
            key={uri}
            source={{ uri }}
            style={{ height: 150, width: 75 }}
          >
            <TouchableHighlight
              onPress={() =>
                setImageUris(prevImageUris =>
                  prevImageUris.filter(u => u !== uri),
                )
              }
            >
              <AntDesign name="closecircleo" size={16} color="black" />
            </TouchableHighlight>
          </ImageBackground>
        ))}
      </View>
    );
  };

  const uploadImageAsync = async (uri: string) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = e => {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const rootRef = storage.ref();
    const childRef = rootRef.child(`${firestoreAutoId()}.jpg`);
    await childRef.put(blob);

    // We're done with the blob, close and release it
    // DOESNT WORK WITH TYPESCRIPT MIGHT BE MEMORY LEAK IDK?
    // blob.close();

    return childRef.getDownloadURL();
  };
  const uploadImages = async () => {
    try {
      setUploading(true);
      imageUris.map(async uri => uploadImageAsync(uri));
      navigation.navigate('TabsStack', { screen: 'Home' });
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      setUploading(false);
    }
  };

  const takePhoto = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    if (!pickerResult.cancelled) {
      setImageUris(prevImageUris => [...prevImageUris, pickerResult.uri]);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {renderCurrentPictures()}

      {imageUris.length > 0 ? (
        <Button onPress={uploadImages} title="Upload" />
      ) : null}

      <Button
        onPress={() => navigation.navigate('Image')}
        title="Pick images from camera roll"
      />

      <Button onPress={takePhoto} title="Take a photo" />

      {/* {maybeRenderImage()} */}
      {maybeRenderUploadingOverlay()}

      <StatusBar barStyle="default" />
    </View>
  );
};

export default CameraScreen;
