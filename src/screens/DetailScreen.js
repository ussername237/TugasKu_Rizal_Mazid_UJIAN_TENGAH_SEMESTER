import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function DetailScreen({ route, navigation, tasks, onToggle, onDelete }) {
  const { id } = route.params; // data dikirim lewat navigasi
  const task = tasks.find((t) => t.id === id);

  if (!task) return <Text style={{ padding: 20 }}>Tugas tidak ditemukan.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>{task.judul}</Text>
      <Text style={styles.info}>📚 {task.matkul}</Text>
      <Text style={styles.info}>📅 {task.deadline}</Text>
      <Text style={styles.info}>
        Status: {task.selesai ? 'Selesai ✅' : 'Belum selesai ⏳'}
      </Text>

      <Pressable style={[styles.btn, { backgroundColor: '#10B981' }]}
        onPress={() => onToggle(task.id)}>
        <Text style={styles.btnText}>
          {task.selesai ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
        </Text>
      </Pressable>

      <Pressable style={[styles.btn, { backgroundColor: '#EF4444' }]}
        onPress={() => { onDelete(task.id); navigation.goBack(); }}>
        <Text style={styles.btnText}>Hapus Tugas</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9FAFB' },
  judul: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  info: { fontSize: 16, marginBottom: 8 },
  btn: { padding: 14, borderRadius: 10, marginTop: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
