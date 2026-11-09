import React from 'react';
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
