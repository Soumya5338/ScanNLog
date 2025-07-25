import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ManagerLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
    } else {
      navigation.navigate('FormSelector');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manager Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#f0f4f8', padding: 14, borderRadius: 10, fontSize: 16, marginBottom: 20, borderColor: '#ccc', borderWidth: 1 },
  button: { backgroundColor: '#1c3a63', paddingVertical: 14, borderRadius: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
