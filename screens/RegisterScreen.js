import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = () => {
    if (!company || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    navigation.navigate('ManagerSelection');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello! Register to get started</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Company Name"
          value={company}
          onChangeText={setCompany}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#888"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c1c1e',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1c3a63',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
