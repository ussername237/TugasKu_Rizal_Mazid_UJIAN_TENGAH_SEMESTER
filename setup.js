const fs = require('fs');
const path = require('path');

const files = {};

files['App.js'] = String.raw`import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './src/screens/HomeScreen';
import TambahScreen from './src/screens/TambahScreen';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createNativeStackNavigator();
const KEY = 'tugasku_data';

export default function App() {
  // HOOK 1: useState -> menyimpan daftar tugas
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // HOOK 2: useEffect -> ambil data saat app dibuka
  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(KEY);
        if (saved) setTasks(JSON.parse(saved));
      } catch (e) {
        console.log('Gagal memuat data', e);
      }
      setLoaded(true);
    };
    load();
  }, []);

  // HOOK 3: useEffect -> simpan data setiap tasks berubah
  useEffect(() => {
    if (loaded) AsyncStorage.setItem(KEY, JSON.stringify(tasks));
  }, [tasks, loaded]);

  const addTask = (judul, matkul, deadline) => {
    const baru = {
      id: Date.now().toString(),
      judul,
      matkul,
      deadline,
      selesai: false,
    };
    setTasks((prev) => [baru, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4F46E5' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Home" options={{ title: 'TugasKu' }}>
          {(props) => (
            <HomeScreen {...props} tasks={tasks} onToggle={toggleTask} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Tambah" options={{ title: 'Tambah Tugas' }}>
          {(props) => <TambahScreen {...props} onAdd={addTask} />}
        </Stack.Screen>

        <Stack.Screen name="Detail" options={{ title: 'Detail Tugas' }}>
          {(props) => (
            <DetailScreen
              {...props}
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
`;

files['src/components/Header.js'] = String.raw`import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ judul, subjudul }) {
  return (
    <View style={styles.box}>
      <Text style={styles.judul}>{judul}</Text>
      <Text style={styles.sub}>{subjudul}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 20, backgroundColor: '#EEF2FF' },
  judul: { fontSize: 22, fontWeight: 'bold', color: '#312E81' },
  sub: { fontSize: 14, color: '#6366F1', marginTop: 4 },
});
`;

files['src/components/StatsCard.js'] = String.raw`import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatsCard({ total, selesai }) {
  const sisa = total - selesai;
  return (
    <View style={styles.row}>
      <View style={[styles.card, { backgroundColor: '#DBEAFE' }]}>
        <Text style={styles.angka}>{total}</Text>
        <Text style={styles.label}>Total</Text>
      </View>
      <View style={[styles.card, { backgroundColor: '#FEF3C7' }]}>
        <Text style={styles.angka}>{sisa}</Text>
        <Text style={styles.label}>Belum</Text>
      </View>
      <View style={[styles.card, { backgroundColor: '#D1FAE5' }]}>
        <Text style={styles.angka}>{selesai}</Text>
        <Text style={styles.label}>Selesai</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-around', padding: 12 },
  card: { flex: 1, margin: 4, padding: 14, borderRadius: 12, alignItems: 'center' },
  angka: { fontSize: 24, fontWeight: 'bold' },
  label: { fontSize: 12, color: '#374151' },
});
`;

files['src/components/TaskItem.js'] = String.raw`import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function TaskItem({ task, onPress, onToggle }) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Pressable onPress={onToggle} style={styles.check}>
        <Text style={{ fontSize: 22 }}>{task.selesai ? '✅' : '⬜'}</Text>
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text style={[styles.judul, task.selesai && styles.coret]}>
          {task.judul}
        </Text>
        <Text style={styles.info}>
          {task.matkul} • {task.deadline}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 5,
    borderRadius: 12,
    elevation: 2,
  },
  check: { marginRight: 12 },
  judul: { fontSize: 16, fontWeight: '600' },
  coret: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  info: { fontSize: 12, color: '#6B7280', marginTop: 2 },
});
`;

files['src/components/TaskForm.js'] = String.raw`import React, { useState } from 'react';
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
`;

files['src/screens/HomeScreen.js'] = String.raw`import React, { useMemo } from 'react';
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
`;

files['src/screens/TambahScreen.js'] = String.raw`import React from 'react';
import { ScrollView } from 'react-native';
import TaskForm from '../components/TaskForm';

export default function TambahScreen({ navigation, onAdd }) {
  const handleSubmit = (judul, matkul, deadline) => {
    onAdd(judul, matkul, deadline);
    navigation.goBack();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <TaskForm onSubmit={handleSubmit} />
    </ScrollView>
  );
}
`;

files['src/screens/DetailScreen.js'] = String.raw`import React from 'react';
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
`;

// ---------- Proses pembuatan ----------
if (!fs.existsSync('package.json')) {
  console.log('❌ package.json tidak ditemukan.');
  console.log('   Jalankan skrip ini DI DALAM folder project Expo (folder TugasKu).');
  process.exit(1);
}

let dibuat = 0;
for (const [relPath, isi] of Object.entries(files)) {
  const full = path.join(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, isi, 'utf8');
  console.log('✅ ' + relPath);
  dibuat++;
}

console.log('\nSelesai! ' + dibuat + ' file berhasil dibuat.');
console.log('Langkah berikutnya: npx expo start');