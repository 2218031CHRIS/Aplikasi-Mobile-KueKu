// File: ListBlog.js (atau nama file yang Anda gunakan untuk komponen ini)

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native'; // Pastikan Anda mengimpor komponen dasar React Native

// Asumsikan Anda memiliki file-file ini dan mereka mengekspor komponen/data dengan benar
// Sesuaikan path import ini sesuai dengan struktur folder proyek Anda
import { BlogList } from '../data'; // Contoh: jika BlogList ada di './data/BlogList.js'
import ListHorizontal from './ListHorizontal'; // Contoh: jika ListHorizontal ada di './components/ListHorizontal.js'
import ItemSmall from './ItemSmall'; // Contoh: jika ItemSmall ada di './components/ItemSmall.js'

/**
 * Komponen ListBlog menampilkan daftar blog dalam tata letak horizontal dan vertikal.
 * Menggunakan ScrollView untuk memungkinkan scrolling vertikal.
 */
const ListBlog = () => {
  // Membagi data BlogList menjadi dua bagian: 5 item pertama untuk horizontal, sisanya untuk vertikal.
  const horizontalData = BlogList.slice(0, 5);
  const verticalData = BlogList.slice(5);

  return (
    // ScrollView memungkinkan konten untuk di-scroll jika melebihi tinggi layar
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Container utama untuk daftar blog */}
      <View style={styles.listBlog}>
        {/* Menampilkan daftar blog secara horizontal menggunakan komponen ListHorizontal */}
        <ListHorizontal data={horizontalData} />

        {/* Container untuk daftar blog vertikal (ItemSmall) */}
        <View style={styles.listCard}>
          {/* Melakukan iterasi pada data vertikal dan merender ItemSmall untuk setiap item */}
          {verticalData.map((item, index) => (
            // Menggunakan 'key' adalah praktik terbaik untuk performa daftar di React
            <ItemSmall item={item} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

// --- INI ADALAH BAGIAN PALING PENTING YANG SERING TERLUPAKAN ---
// Mengekspor komponen ListBlog sebagai default export agar bisa diimpor di file lain.
export default ListBlog;

// Definisi gaya menggunakan StyleSheet dari React Native
const styles = StyleSheet.create({
  listBlog: {
    flex: 1, // Mengambil ruang yang tersedia
    paddingHorizontal: 10, // Memberikan padding horizontal
    paddingVertical: 15,   // Memberikan padding vertikal
  },
  listCard: {
    flexDirection: 'row',   // Mengatur item dalam baris
    flexWrap: 'wrap',       // Memungkinkan item untuk melipat ke baris berikutnya
    justifyContent: 'space-around', // Mendistribusikan item secara merata di sepanjang baris
    marginTop: 20,          // Memberikan margin atas
  },
});