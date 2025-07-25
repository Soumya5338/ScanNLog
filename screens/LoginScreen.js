import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null); // 'employee' or 'manager'

  const handleLogin = () => {
    if (!role) {
      alert('Please select login type (Employee or Manager)');
      return;
    }

    if (email && password) {
      navigation.navigate('FormSelector');
    } else {
      alert('Please enter email and password');
    }
  };

  const handleForgotPassword = () => {
    if (!role) {
      alert('Please select login type first.');
    } else if (role === 'employee') {
      Alert.alert('Contact your manager to reset your password.');
    } else {
      Alert.prompt('Reset Password', 'Enter your registered email:', (inputEmail) => {
        if (inputEmail) {
          Alert.alert('Reset link sent to:', inputEmail);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back!</Text>

      <View style={styles.roleSelector}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'employee' && styles.selected]}
          onPress={() => setRole('employee')}
        >
          <Text style={styles.roleText}>Employee</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'manager' && styles.selected]}
          onPress={() => setRole('manager')}
        >
          <Text style={styles.roleText}>Manager</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#888"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          Register Now
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#f5f5f5', padding: 14, borderRadius: 10, fontSize: 16, marginBottom: 14 },
  button: { backgroundColor: '#1c3a63', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footerText: { textAlign: 'center', marginTop: 20, fontSize: 14, color: '#444' },
  registerLink: { color: '#1c3a63', fontWeight: '600' },
  forgotText: { color: '#1c3a63', textAlign: 'right', marginBottom: 12 },
  roleSelector: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  roleButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 8,
    paddingHorizontal: 16,
  },
  selected: {
    backgroundColor: '#1c3a63',
  },
  roleText: {
    color: '#1c1c1e',
  },
});
