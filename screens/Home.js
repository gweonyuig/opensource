import {
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
const Home = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [imageData, setImageData] = useState('');
  const [takePhotoClicked, setTakePhotoClicked] = useState(false);
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
    if (camera != null) {
      const photo = await camera.current.takePhoto();
      setImageData(photo.path);
      setTakePhotoClicked(false);
      console.log(photo.path);
    }
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            onPress={() => {
              setTakePhotoClicked(true);
            }}>
            <Text>Take a photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Home;
