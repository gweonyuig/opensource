import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {launchImageLibrary} from 'react-native-image-picker';
const Map = () => {
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.7997761,
          longitude: 127.0748502,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: 36.7997761,
            longitude: 127.0748502,
          }}
          title="test"
          description="opensource"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
export default Map;
