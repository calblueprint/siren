import React, { useMemo } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import { Asset, MediaType } from 'expo-media-library';

// IOS users , make sure u can use the images uri to upload , if your getting invalid file path or u cant work with asset-library://
// Use = > getImageMetaData: true which will be little slower but give u also the absolute path of the Asset. just console loge the result to see the localUri

// See => https://docs.expo.dev/versions/latest/sdk/media-library/#assetinfo

const ImagePicker = ({ navigation, route }: any) => {
  const onSuccess = (data: Asset[]) => {
    navigation.navigate({
      name: 'Camera',
      params: { uris: data.map(asset => asset.uri) },
      merge: true,
    });
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: 'black',
      errorMessages: {
        hasErrorWithPermissions: 'Please Allow media gallery permissions.',
        hasErrorWithLoading: 'There was an error while loading images.',
        hasErrorWithResizing: 'There was an error while loading images.',
        hasNoAssets: 'No images found.',
      },
    }),
    [],
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results but gives meta data and absolute path for ios users
      initialLoad: 100,
      assetsType: [MediaType.photo],
      minSelection: 1,
      maxSelection: 10,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    [],
  );

  // const widgetResize = useMemo(
  //   () => ({
  //     width: 50,
  //     compress: 0.7,
  //     base64: false,
  //     saveTo: 'jpeg',
  //   }),
  //   [],
  // );

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: 'finish',
        back: 'back',
        selected: 'selected',
      },
      midTextColor: 'black',
      minSelection: 1,
      buttonTextStyle: { color: 'white' },
      buttonStyle: { backgroundColor: 'orange', borderRadius: 5 },
      onBack: () => {
        navigation.navigate('Camera');
      },
      onSuccess: (data: Asset[]) => onSuccess(data),
    }),
    [],
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: 'white',
      spinnerColor: 'blue',
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: 'ios-videocam',
        color: 'tomato',
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: 'ios-checkmark-circle-outline',
        color: 'white',
        bg: '#0eb14970',
        size: 26,
      },
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <AssetsSelector
        Settings={widgetSettings}
        Errors={widgetErrors}
        Styles={widgetStyles}
        Navigator={widgetNavigator}
        // Resize={widgetResize} know how to use first , perform slower results.
      />
    </View>
  );
};

export default ImagePicker;
