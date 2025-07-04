import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { fontType, colors } from '../../theme';
import firestore from '@react-native-firebase/firestore';

// Import notifee untuk notifikasi lokal
import notifee, { AndroidImportance } from '@notifee/react-native';

const AddBlogForm = () => {
  const dataCategory = [
    { id: 1, name: 'Populer' },
    { id: 2, name: 'Terbaru' },
    { id: 3, name: 'Daerah' },
    { id: 4, name: 'Kategori' },
    { id: 5, name: 'Tentang' },
  ];
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    category: {},
    totalLikes: 0,
    totalComments: 0,
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleChange = (key, value) => {
    setBlogData({
      ...blogData,
      [key]: value,
    });
  };

  // Fungsi untuk menampilkan notifikasi lokal dengan notifee
  const showLocalNotification = async (title, message) => {
    // Pastikan channel sudah dibuat (Android)
    await notifee.createChannel({
      id: 'blog-channel',
      name: 'Blog Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: title,
      body: message,
      android: {
        channelId: 'blog-channel',
        smallIcon: 'ic_launcher', // pastikan ada di android/app/src/main/res/mipmap
      },
    });
  };

  // Handler upload ke Firestore
  const handleUpload = async () => {
    if (!blogData.title || !blogData.content || !blogData.category.id || !blogData.image) {
      Alert.alert('Error', 'Please fill all required fields!');
      return;
    }
    setLoading(true);
    try {
      await firestore()
        .collection('blogs')
        .add({
          title: blogData.title,
          content: blogData.content,
          category: blogData.category,
          totalLikes: blogData.totalLikes,
          totalComments: blogData.totalComments,
          image: blogData.image,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      // Tampilkan notifikasi lokal setelah upload berhasil
      await showLocalNotification(
        'Blog Uploaded',
        `Blog "${blogData.title}" berhasil di-upload!`
      );
      Alert.alert('Success', 'Blog uploaded successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to upload blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Write blog</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}
      >
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Title"
            value={blogData.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.borderDashed, { minHeight: 250 }]}>
          <TextInput
            placeholder="Content"
            value={blogData.content}
            onChangeText={text => handleChange('content', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Image URL"
            value={blogData.image}
            onChangeText={text => handleChange('image', text)}
            placeholderTextColor={colors.grey(0.6)}
            style={textInput.content}
          />
        </View>
        <View style={[textInput.borderDashed]}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fontType['Pjs-Regular'],
              color: colors.grey(0.6),
            }}>
            Category
          </Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === blogData.category.id
                  ? colors.black()
                  : colors.grey(0.08);
              const color =
                item.id === blogData.category.id
                  ? colors.white()
                  : colors.grey();
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange('category', { id: item.id, name: item.name })
                  }
                  style={[category.item, { backgroundColor: bgColor }]}>
                  <Text style={[category.name, { color: color }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.white()} />
          ) : (
            <Text style={styles.buttonLabel}>Upload</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBlogForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.black(),
  },
  bottomBar: {
    backgroundColor: colors.white(),
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: colors.black(),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.blue(),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.white(),
  },
});
const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.grey(0.4),
  },
  title: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    padding: 0,
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.6),
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
  }
});