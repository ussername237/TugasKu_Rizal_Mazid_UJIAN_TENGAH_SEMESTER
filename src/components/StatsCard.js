import React from 'react';
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
