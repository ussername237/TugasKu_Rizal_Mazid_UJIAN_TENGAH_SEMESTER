import React, { useState, useEffect } from 'react';
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
