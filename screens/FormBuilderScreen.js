import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FormBuilderScreen({ route }) {
  const { formName, columnStructure } = route.params;

  const [tableData, setTableData] = useState(
    columnStructure.map(row => ({
      title: row.title,
      columns: Array(row.columns).fill(''),
    }))
  );

  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [modalVisible, setModalVisible] = useState(false);
  const [manualInput, setManualInput] = useState('');

  const handleCellPress = (rowIdx, colIdx) => {
    setSelectedCell({ row: rowIdx, col: colIdx });
    setManualInput(tableData[rowIdx].columns[colIdx]);
    setModalVisible(true);
  };

  const handleInput = value => {
    const newData = [...tableData];
    newData[selectedCell.row].columns[selectedCell.col] = value;
    setTableData(newData);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{formName}</Text>

      {tableData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.section}>
          <Text style={styles.rowTitle}>{row.title}</Text>
          <View style={styles.row}>
            {row.columns.map((cell, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={styles.cell}
                onPress={() => handleCellPress(rowIndex, colIndex)}>
                <Text style={styles.cellText}>{cell || '-'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Choose Input Method</Text>

            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="camera" size={30} color="#1c3a63" />
                <Text>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="mic" size={30} color="#1c3a63" />
                <Text>Voice</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.inputField}
              placeholder="Enter value manually"
              value={manualInput}
              onChangeText={setManualInput}
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.saveBtn]}
                onPress={() => handleInput(manualInput)}>
                <Text style={styles.btnText}>Save</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.cancelBtn]}
                onPress={() => {
                  const updatedData = [...tableData];
                  updatedData[selectedCell.row].columns[selectedCell.col] = '';
                  setTableData(updatedData);
                  setModalVisible(false);
                }}>
                <Text style={styles.btnText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1c3a63',
  },
  section: {
    marginBottom: 25,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1c3a63',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1c3a63',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    marginRight: 6,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  cellText: {
    fontSize: 14,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    backgroundColor: '#fff',
    margin: 30,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#1c3a63',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  iconBtn: {
    alignItems: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  saveBtn: {
    backgroundColor: '#1c3a63',
  },
  cancelBtn: {
    backgroundColor: '#ccc',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
