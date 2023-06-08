import {View, Text, StyleSheet} from 'react-native';

const Home = ({logout}) => {
  return (
    <View
      style={{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={styles.text}>Home screen</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '110%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
