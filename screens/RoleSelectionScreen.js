import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RoleSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login as:</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManagerLogin')}>
        <Text style={styles.buttonText}>Manager</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EmployeeLogin')}>
        <Text style={styles.buttonText}>Employee</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>New here? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingHorizontal: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 40 
  },
  button: { 
    backgroundColor: '#1c3a63', 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 10, 
    marginBottom: 20 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18 
  },
  registerButton: {
    marginTop: 30,
  },
  registerText: {
    color: '#1c3a63',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
