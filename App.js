import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Map from './screens/Map';
import Profile from './screens/Profile';
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {auth} from './src/firebase';

const Tab = createBottomTabNavigator();

function LoggedIn() {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: '#ffffff'},
        }}>
        <Tab.Screen
          name="Camera"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'PROFILE',
            headerRight: () => (
              <TouchableOpacity onPress={logout}>
                <Text
                  style={{
                    marginRight: 20,
                    fontSize: 16,
                    color: 'red',
                    fontWeight: 'bold',
                  }}>
                  LOGOUT
                </Text>
              </TouchableOpacity>
            ),
            //headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function Signup({setScreen}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const createAccount = async () => {
    //create account
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        setError("Passwords don't match");
      }
    } catch (e) {
      setError('there was a problem creating your account');
    }
  };
  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Signup</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" //이거안하면 @ 안뜸
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry // ***모양으로 변환
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <Button
          title="Create Account"
          onPress={createAccount}
          disabled={!email || !password || !confirmPassword}
        />
        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.link}>Login to existing account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Login({setScreen}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password'
      ) {
        setError('Your email or password was incorrect');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else {
        setError('There was a problem with your request');
      }
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Login</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" //이거안하면 @ 안뜸
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry // ***모양으로 변환
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <Button
          title="Login"
          onPress={loginUser}
          disabled={!email || !password}
        />
        {/*disabled-{true} 비활성화! */}
        <TouchableOpacity onPress={() => setScreen('signup')}>
          <Text style={styles.link}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState(null);

  onAuthStateChanged(auth, user => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const getScreen = () => {
    if (loggedIn) return <LoggedIn />;
    if (screen === 'signup') return <Signup setScreen={setScreen} />;
    return <Login setScreen={setScreen} />;
  };

  return <View style={{flex: 1}}>{getScreen()}</View>;
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  inner: {
    width: '100%',
    maxWidth: 390,
    marginLeft: 10,
    marginTop: 10,
    height: '100%',
    maxHeight: 650,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 100,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  error: {
    marginBottom: 20,
    color: 'red',
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    marginTop: 10,
    marginRight: 10,
    textAlign: 'right',
  },
});
