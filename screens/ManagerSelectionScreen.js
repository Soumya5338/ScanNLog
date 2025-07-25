import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Share,
} from 'react-native';

export default function ManagerSelectionScreen({ navigation }) {
  const [meEngineers, setMeEngineers] = useState([{ email: '', password: '' }]);
  const [qcEngineers, setQcEngineers] = useState([{ email: '', password: '' }]);

  const handleGeneratePassword = (listSetter, index) => {
    const password = Math.random().toString(36).slice(-8);
    listSetter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, password } : item))
    );
  };

  const handleShare = (email, password) => {
    if (!email || !password) {
      alert('Please enter email and generate password first.');
      return;
    }

    Share.share({
      message: `ScanNLog Login Details:\nEmail: ${email}\nPassword: ${password}`,
    });
  };

  const handleAddEngineer = (setter) => {
    setter((prev) => [...prev, { email: '', password: '' }]);
  };

  const handleEmailChange = (setter, index, value) => {
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, email: value } : item))
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Text style={styles.title}>Assign Engineers</Text>
        <Text style={styles.subtitle}>Add ME-Engineers and QC-Engineers</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>ME-Engineers</Text>
          {meEngineers.map((engineer, index) => (
            <View key={index} style={styles.row}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={engineer.email}
                onChangeText={(text) => handleEmailChange(setMeEngineers, index, text)}
                style={[styles.input, { flex: 1 }]}
              />
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => handleGeneratePassword(setMeEngineers, index)}
              >
                <Text style={styles.smallButtonText}>🔐</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => handleShare(engineer.email, engineer.password)}
              >
                <Text style={styles.smallButtonText}>📤</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => handleAddEngineer(setMeEngineers)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+ Add ME-Engineer</Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>QC-Engineers</Text>
          {qcEngineers.map((engineer, index) => (
            <View key={index} style={styles.row}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={engineer.email}
                onChangeText={(text) => handleEmailChange(setQcEngineers, index, text)}
                style={[styles.input, { flex: 1 }]}
              />
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => handleGeneratePassword(setQcEngineers, index)}
              >
                <Text style={styles.smallButtonText}>🔐</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => handleShare(engineer.email, engineer.password)}
              >
                <Text style={styles.smallButtonText}>📤</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => handleAddEngineer(setQcEngineers)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+ Add QC-Engineer</Text>
          </TouchableOpacity>

          {/* Manager Login Link */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.LoginLink}> Login </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1c3a63',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1c3a63',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  smallButton: {
    marginLeft: 8,
    backgroundColor: '#1c3a63',
    padding: 10,
    borderRadius: 8,
  },
  smallButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    marginTop: 4,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#1c3a63',
    fontSize: 14,
    fontWeight: '600',
  },
  LoginLink: {
    marginTop: 24,
    textAlign: 'center',
    color: '#1c3a63',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
