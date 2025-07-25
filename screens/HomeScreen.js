import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate the logo zoom-in
    Animated.timing(scaleAnim, {
      toValue: 1.3,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    // Navigate to RoleSelection after 3.5 seconds
    const timeout = setTimeout(() => {
      navigation.replace('LoginScreen'); // 👈 updated from "Login" to "RoleSelection"
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to ScanNLog</Text>

      <Animated.Image
        source={require('../assets/logo.png')}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    position: 'absolute',
    top: 80,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
  },
  logo: {
    width: 240,
    height: 240,
  },
});
