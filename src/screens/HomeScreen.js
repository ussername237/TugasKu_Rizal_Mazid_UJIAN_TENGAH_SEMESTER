import React, { useMemo } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import TaskItem from '../components/TaskItem';

export default function HomeScreen({ navigation, tasks, onToggle }) {
  // HOOK 4: useMemo -> hitung statistik hanya saat tasks berubah
  const selesai = useMemo(() => tasks.filter((t) => t.selesai).length, [tasks]);

  return (
    <View style={styles.container}>
      <Header judul="Halo, Mahasiswa! 👋" subjudul="Kelola tugas kuliahmu dengan rapi" />
      <StatsCard total={tasks.length} selesai={selesai} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.kosong}>Belum ada tugas. Tekan tombol + untuk menambah.</Text>
        }
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => onToggle(item.id)}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          />
        )}
      />

      <Pressable style={styles.fab} onPress={() => navigation.navigate('Tambah')}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  kosong: { textAlign: 'center', marginTop: 40, color: '#9CA3AF' },
  fab: {
    position: 'absolute', right: 20, bottom: 30, width: 58, height: 58,
    borderRadius: 29, backgroundColor: '#4F46E5', alignItems: 'center',
    justifyContent: 'center', elevation: 5,
  },
  fabText: { color: '#fff', fontSize: 32, marginTop: -2 },
});
