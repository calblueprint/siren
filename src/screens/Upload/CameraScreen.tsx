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
import { Document } from 'types/types';
import {
  setDocument,
  getClientCaseDocs,
  deleteDocument,
} from 'database/queries';
import { Text } from 'context/ContextProvider';
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
  const [imageUrls, setImageUrls] = useState([] as string[]);
  const [docs, setDocs] = useState([] as Document[]);
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [numImagesUploaded, setNumImagesUploaded] = useState(-1);
  const storage = firebase.storage();
  const clientCase = route.params?.clientCase;
  const caseId = clientCase?.id;
  const clientId = route.params?.clientId;
  const docName = route.params?.name;

  useEffect(() => {
    const loadImages = async (): Promise<void> => {
      const clientCaseDocs = await getClientCaseDocs(clientId, caseId);
      setDocs(clientCaseDocs);
      const imgUrls = clientCaseDocs
        .filter(doc => doc.type === docName)
        .map(doc => doc.url);
      setImageUrls(imgUrls);
      setNumImagesUploaded(imgUrls.length);
    };
    loadImages();
  }, [route.params?.uris]);

  useEffect(() => {
    const requestAccess = async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert(Text('Sorry, we need camera roll permissions'));
        }
        const result = await ImagePicker.requestCameraPermissionsAsync();
        if (result.status !== 'granted') {
          alert(Text('Sorry, we need camera roll permissions'));
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

  const deleteDocs = () => {
    if (imageUrls.length !== numImagesUploaded) {
      docs.map(doc =>
        imageUrls.includes(doc.url) || doc.type !== docName
          ? null
          : deleteDocument(clientId, caseId, doc),
      );
    }
  };

  const renderCurrentPictures = () => {
    return (
      <PicturesContainer>
        {imageUrls.length !== 0
          ? imageUrls.map(uri => (
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
                    setImageUrls(prevImageUrls =>
                      prevImageUrls.filter(u => u !== uri),
                    )
                  }
                >
                  <AntDesign name="closecircleo" size={16} color="black" />
                </TouchableOpacity>
              </ImageBackground>
            ))
          : null}
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
          <TextRegular>{Text('Add page(s)')}</TextRegular>
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
      alert(Text('Upload failed'));
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

  const handleDone = () => {
    uploadImages();
    deleteDocs();
  };

  const getPageDescription = () => {
    return Text('Tap on the button below to upload');
  };

  return (
    <PageContainer>
      <ButtonHeader
        onPress={() => navigation.navigate('TabsStack', { screen: 'Upload' })}
      >
        <Appbar.BackAction size={18} style={{ margin: 0 }} />
        <TextSubtitle>{Text('Go Back')}</TextSubtitle>
      </ButtonHeader>
      <TextTitle>{Text('Previous DACA Application')}</TextTitle>
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
          <TextRegular>
            {Text('Select how to upload your document pages')}
          </TextRegular>
          <ModalButtonContainer>
            <ButtonDarkBlue
              onPress={() => {
                navigation.navigate('Image');
                setModalVisible(false);
              }}
            >
              <TextRegularWhite>{Text('Select photos')}</TextRegularWhite>
            </ButtonDarkBlue>
            <ButtonDarkBlue onPress={takePhoto}>
              <TextRegularWhite>{Text('Take photos')}</TextRegularWhite>
            </ButtonDarkBlue>
          </ModalButtonContainer>
        </ModalContainer>
      </Modal>
      {imageUrls.length !== numImagesUploaded || imageUris.length > 0 ? (
        <ButtonDarkBlueBottom onPress={handleDone}>
          <TextRegularWhite>{Text('Done')}</TextRegularWhite>
        </ButtonDarkBlueBottom>
      ) : null}

      <StatusBar barStyle="default" />
    </PageContainer>
  );
};

export default CameraScreen;
