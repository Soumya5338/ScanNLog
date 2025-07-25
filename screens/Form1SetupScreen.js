import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Form1SetupScreen({ navigation }) {
  const [rows, setRows] = useState([{ title: '', columns: '' }]);
  const [showInfo, setShowInfo] = useState(false);

  const addRow = () => {
    setRows([...rows, { title: '', columns: '' }]);
  };

  const handleChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const generateForm = () => {
    const columnStructure = rows.map(row => ({
      title: row.title,
      columns: parseInt(row.columns) || 0,
    }));
    navigation.navigate('FormBuilder', {
      formName: 'Form 1',
      columnStructure,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Setup for Form 1</Text>
        <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
          <Ionicons name="information-circle-outline" size={24} color="#1c3a63" />
        </TouchableOpacity>
      </View>

      {/* Tooltip */}
      {showInfo && (
        <View style={styles.tooltipContainer}>
          <View style={styles.tooltipArrow} />
          <View style={styles.tooltipBox}>
            <Text style={styles.tooltipTitle}>
              📝 Form 1 – <Text style={{ fontWeight: 'bold' }}>Part Number Accountability</Text>
            </Text>
            <Text style={styles.tooltipText}>
              Identifies the part being inspected and its associated assemblies or subassemblies.
            </Text>
            <Text style={styles.tooltipQuote}>
              ➤ “What part are we inspecting?”
            </Text>
          </View>
        </View>
      )}

      {/* Row Inputs */}
      <FlatList
        data={rows}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.rowLine}>
            <Text style={styles.rowLabel}>Row {index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Row title"
              value={item.title}
              onChangeText={text => handleChange(index, 'title', text)}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="No. of columns"
              value={item.columns}
              onChangeText={text => handleChange(index, 'columns', text)}
            />
          </View>
        )}
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addButton} onPress={addRow}>
          <Text style={styles.buttonText}>+ Add Row</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createButton} onPress={generateForm}>
          <Text style={styles.buttonText}>Create Form</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c3a63',
  },
  tooltipContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  tooltipBox: {
    backgroundColor: '#fff8dc',
    borderColor: '#f4c542',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -10,
    left: 30,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f4c542',
    transform: [{ rotate: '180deg' }],
    zIndex: 1,
  },
  tooltipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tooltipText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  tooltipQuote: {
    fontStyle: 'italic',
    fontSize: 13,
    color: '#1c3a63',
  },
  rowLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rowLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1c3a63',
    marginRight: 10,
    width: 55,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  addButton: {
    backgroundColor: '#1c3a63',
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#4185a3',
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
