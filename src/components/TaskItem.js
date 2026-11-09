import React from 'react';
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
