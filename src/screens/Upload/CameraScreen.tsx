/* eslint-disable no-alert */
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  LogBox,
  Platform,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { firestoreAutoId } from 'database/helpers';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import {
  TextRegular,
  TextRegularWhite,
  TextSubtitle,
  TextTitle,
} from 'assets/fonts/Fonts';
import { setDocument } from 'database/queries';
import {
  PicturesContainer,
  PageContainer,
  ButtonHeader,
  AddPageContainer,
  ModalContainer,
  ModalButtonContainer,
  ButtonDarkBlue,
  ButtonDarkBlueBottom,
} from './styles';

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const CameraScreen = ({ navigation, route }: any) => {
  const [imageUris, setImageUris] = useState([] as string[]);
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
    return (
      <PicturesContainer>
        {imageUris.length !== 0
          ? imageUris.map(uri => (
              <ImageBackground
                key={uri}
                source={{ uri }}
                style={{
                  height: 132,
                  width: 100,
                  marginLeft: 4,
                  marginRight: 4,
                  marginTop: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    setImageUris(prevImageUris =>
                      prevImageUris.filter(u => u !== uri),
                    )
                  }
                >
                  <AntDesign name="closecircleo" size={16} color="black" />
                </TouchableOpacity>
              </ImageBackground>
            ))
          : null}
        <AddPageContainer onPress={() => setModalVisible(true)}>
          <AntDesign name="plus" size={16} color="black" />
          <TextRegular>Add page(s)</TextRegular>
        </AddPageContainer>
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
      navigation.goBack();
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
    setModalVisible(false);
  };

  const getPageDescription = () => {
    return `Tap on the button below to upload the pages of your document.\nIf your document has more than 1 page, please make sure to upload all the pages.`;
  };

  return (
    <PageContainer>
      <ButtonHeader
        onPress={() => navigation.navigate('TabsStack', { screen: 'Upload' })}
      >
        <Appbar.BackAction size={18} style={{ margin: 0 }} />
        <TextSubtitle>Go Back</TextSubtitle>
      </ButtonHeader>
      <TextTitle>Previous DACA Application</TextTitle>
      {/* TODO New mem sprint task: Add tutorial for adding pages */}
      <TextRegular>{getPageDescription()}</TextRegular>
      {maybeRenderUploadingOverlay()}
      {renderCurrentPictures()}
      <Modal
        coverScreen={false}
        isVisible={modalVisible}
        backdropColor="white"
        onBackdropPress={() => setModalVisible(false)}
      >
        <ModalContainer>
          <TextRegular>Select how to upload your document pages</TextRegular>
          <ModalButtonContainer>
            <ButtonDarkBlue
              onPress={() => {
                navigation.navigate('Image');
                setModalVisible(false);
              }}
            >
              <TextRegularWhite>Select photos</TextRegularWhite>
            </ButtonDarkBlue>
            <ButtonDarkBlue onPress={takePhoto}>
              <TextRegularWhite>Take photos</TextRegularWhite>
            </ButtonDarkBlue>
          </ModalButtonContainer>
        </ModalContainer>
      </Modal>
      {imageUris.length > 0 ? (
        <ButtonDarkBlueBottom onPress={uploadImages}>
          <TextRegularWhite>Done</TextRegularWhite>
        </ButtonDarkBlueBottom>
      ) : null}

      <StatusBar barStyle="default" />
    </PageContainer>
  );
};

export default CameraScreen;
