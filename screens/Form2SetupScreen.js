// screens/Form2SetupScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Form2SetupScreen({ navigation }) {
  const [rows, setRows] = useState([{ title: '', columns: '' }]);
  const [showTooltip, setShowTooltip] = useState(false);

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
      formName: 'Form 2',
      columnStructure,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Setup for Form 2</Text>
        <Pressable onPress={() => setShowTooltip(!showTooltip)}>
          <Ionicons name="information-circle-outline" size={26} color="#1c3a63" />
        </Pressable>
      </View>

      {/* Tooltip */}
      {showTooltip && (
        <View style={styles.tooltipContainer}>
          <View style={styles.tooltip}>
            <Text style={styles.tooltipTitle}>🛠 Form 2 – Product Accountability</Text>
            <Text style={styles.tooltipText}>
              Lists materials, special processes, and specifications used in manufacturing the part.
            </Text>
            <Text style={styles.tooltipNote}>🧾 “What materials/processes were used?”</Text>
          </View>
          <View style={styles.tooltipPointer} />
        </View>
      )}

      {/* Row Inputs */}
      <FlatList
        data={rows}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.rowInputContainer}>
            <View style={styles.rowLabelContainer}>
              <Text style={styles.rowLabel}>Row {index + 1}</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Row title"
              value={item.title}
              onChangeText={(text) => handleChange(index, 'title', text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="No. of columns"
              keyboardType="numeric"
              value={item.columns}
              onChangeText={(text) => handleChange(index, 'columns', text)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c3a63',
  },
  tooltipContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  tooltip: {
    backgroundColor: '#fffbea',
    borderColor: '#f4d700',
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 12,
    maxWidth: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tooltipTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#1c3a63',
  },
  tooltipText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  tooltipNote: {
    fontStyle: 'italic',
    color: '#555',
    fontSize: 13,
  },
  tooltipPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 12,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f4d700',
    transform: [{ rotate: '180deg' }],
    marginLeft: 15,
    marginTop: -1,
  },
  rowInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  rowLabelContainer: {
    width: 70,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c3a63',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
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
