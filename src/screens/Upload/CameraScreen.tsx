import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import {
  Button,
  StatusBar,
  LogBox,
  Platform,
  ImageBackground,
  TouchableHighlight,
  View,
} from 'react-native';
import { firestoreAutoId } from 'database/helpers';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { TextSubtitle } from 'assets/fonts/Fonts';
import { setDocument } from 'database/queries';
import { PicturesContainer, PageContainer, ButtonHeader } from './styles';

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const CameraScreen = ({ navigation, route }: any) => {
  const [imageUris, setImageUris] = useState([] as string[]);
  const [uploading, setUploading] = useState(false);
  const storage = firebase.storage();
  const clientCase = route.params?.clientCase;
  const clientId = route.params?.clientId;
  const docName = route.params?.name;

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
        <View>
          <ActivityIndicator color="#808080" animating size="large" />
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
      <PicturesContainer>
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
      </PicturesContainer>
    );
  };

  const uploadImageAsync = async (uri: string) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    // TODO: make uploading faster by separating the storage put and the firestore set.
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
    const downloadUrl = await childRef.getDownloadURL();
    await setDocument(clientId, clientCase.id, {
      id: firestoreAutoId(),
      url: downloadUrl,
      type: docName,
      createdAt: new Date(),
    });
  };
  const uploadImages = async () => {
    try {
      setUploading(true);
      await Promise.all(imageUris.map(async uri => uploadImageAsync(uri)));
      setUploading(false);
      navigation.navigate('Documents');
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
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
    <PageContainer>
      <ButtonHeader onPress={() => navigation.goBack()}>
        <Appbar.BackAction
          size={18}
          style={{ margin: 0 }}
          onPress={() => navigation.goBack()}
        />
        <TextSubtitle>Go Back</TextSubtitle>
      </ButtonHeader>
      {maybeRenderUploadingOverlay()}
      {renderCurrentPictures()}
      {imageUris.length > 0 ? (
        <Button onPress={uploadImages} title="Upload" />
      ) : null}
      <Button
        onPress={() => navigation.navigate('Image')}
        title="Pick images from camera roll"
      />
      <Button onPress={takePhoto} title="Take a photo" />
      <StatusBar barStyle="default" />
    </PageContainer>
  );
};

export default CameraScreen;
