import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';

export default function TaskForm({ onSubmit }) {
  const [judul, setJudul] = useState('');
  const [matkul, setMatkul] = useState('');
  const [deadline, setDeadline] = useState('');

  const simpan = () => {
    if (!judul.trim() || !matkul.trim() || !deadline.trim()) {
      Alert.alert('Peringatan', 'Semua kolom wajib diisi!');
      return;
    }
    onSubmit(judul.trim(), matkul.trim(), deadline.trim());
  };

  return (
    <View style={styles.box}>
      <Text style={styles.label}>Judul Tugas</Text>
      <TextInput style={styles.input} value={judul} onChangeText={setJudul}
        placeholder="Contoh: Laporan Praktikum" />

      <Text style={styles.label}>Mata Kuliah</Text>
      <TextInput style={styles.input} value={matkul} onChangeText={setMatkul}
        placeholder="Contoh: Mobile Programming" />

      <Text style={styles.label}>Deadline</Text>
      <TextInput style={styles.input} value={deadline} onChangeText={setDeadline}
        placeholder="Contoh: 17 Nov 2026" />

      <Pressable style={styles.btn} onPress={simpan}>
        <Text style={styles.btnText}>Simpan</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 16 },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, backgroundColor: '#fff' },
  btn: { backgroundColor: '#4F46E5', padding: 14, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
