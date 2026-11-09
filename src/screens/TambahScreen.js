import React from 'react';
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
