import {
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import {launchImageLibrary} from 'react-native-image-picker';
//import storage from '@react-native-firebase/storage';
import {storage, uploadImage} from '../src/firebase';

const Home = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [imageData, setImageData] = useState('');
  const [takePhotoClicked, setTakePhotoClicked] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  async function hasAndroidPermission() {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const saveToAlbum = async () => {
    if (imageData !== '') {
      const album = 'Opensource'; // 저장할 앨범의 이름을 설정합니다.
      try {
        await CameraRoll.save(imageData, {album});
        Alert.alert('사진이 앨범에 저장되었습니다.');
        console.log('이미지가 앨범에 저장되었습니다.');
      } catch (error) {
        console.log('앨범에 저장 중에 오류가 발생했습니다:', error);
      }
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();

    console.log(newCameraPermission);
  };
  if (device == null) return <ActivityIndicator />;

  const takePicture = async () => {
    if (camera.current != null) {
      try {
        const photo = await camera.current.takePhoto();
        setImageData(photo.path);
        setTakePhotoClicked(false);
        console.log(photo.path);
      } catch (error) {
        console.log('카메라가 아직 준비되지 않았습니다:', error);
      }
    }
  };

  const UploadImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      async res => {
        console.log(res);
        if (res.didCancel) return;

        try {
          const imageFile = {
            uri: res.assets[0].uri,
            type: res.assets[0].type,
            name: res.assets[0].fileName,
          };

          await uploadImage(imageFile);

          Alert.alert('사진이 업로드되었습니다.');
        } catch (error) {
          console.log(error);
          Alert.alert('사진 업로드 중 오류가 발생했습니다.');
        }
      },
    );
  };

  return (
    <View style={{flex: 1}}>
      {takePhotoClicked ? (
        <View style={{flex: 1}}>
          <Camera
            ref={camera}
            style={{flex: 1}}
            device={device}
            isActive={true}
            photo
          />
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#ff0037',
              position: 'absolute',
              bottom: 50,
              alignSelf: 'center',
            }}
            onPress={() => {
              takePicture();
            }}></TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          {imageData !== '' && (
            <Image
              source={{uri: 'file://' + imageData}}
              style={{width: '90%', height: 200}}
            />
          )}
          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              borderWidth: 1,
              alignSelf: 'center',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}
            onPress={() => {
              setTakePhotoClicked(true);
            }}>
            <Text>Take a photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              borderWidth: 1,
              alignSelf: 'center',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}
            onPress={() => {
              saveToAlbum();
            }}>
            <Text>Save Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              borderWidth: 1,
              alignSelf: 'center',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}
            onPress={UploadImage}>
            <Text>Upload Photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Home;
