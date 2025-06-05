import { StyleSheet, Text, View, FlatList, Animated, TouchableWithoutFeedback } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { BlogList } from '../../data';
import { ItemSmall } from '../../components';
import { SearchNormal1 } from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, label: 'Kue kering' },
  { id: 2, label: 'Kue basah' },
  { id: 3, label: 'Roti & Pastry' },
  { id: 4, label: 'Dessert' },
  { id: 5, label: 'Puding' },
];

const ItemRecent = ({ item }) => {
  return (
    <View style={recent.button}>
      <Text style={recent.label}>{item.label}</Text>
    </View>
  );
};

const FlatListRecent = () => {
  const renderItem = ({ item }) => {
    return <ItemRecent item={item} />;
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const Discover = () => {
  const navigation = useNavigation();
  const recentBlog = BlogList.slice(5);

  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current; // for opacity
  const translateYAnim = useRef(new Animated.Value(30)).current; // for slide up
  const scrollY = useRef(new Animated.Value(0)).current; // for scroll event (optional)

  useEffect(() => {
    // Fade in and slide up animation for Recent Search
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('SearchPage')}>
        <View style={styles.header}>
          <View style={styles.bar}>
            <SearchNormal1 size={18} color={colors.grey(0.5)} variant="Linear" />
            <Text style={styles.placeholder}>Search</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Animated Recent Search */}
      <Animated.View
        style={[
          recent.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
      >
        <Text style={recent.text}>Recent Search</Text>
        <FlatListRecent />
      </Animated.View>

      {/* Animated ScrollView for blog list */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 142 }}
      >
        <View style={styles.listCard}>
          {recentBlog.map((item, index) => (
            <ItemSmall item={item} key={index} />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingBottom: 10,
    gap: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    gap: 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  bar: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.grey(0.05),
    borderRadius: 10,
    flex: 1,
  },
  placeholder: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.5),
    lineHeight: 18,
  },
});

const recent = StyleSheet.create({
  container: {
    // Tambahkan style jika perlu
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderColor: colors.grey(0.15),
    borderWidth: 1,
    backgroundColor: colors.grey(0.03),
  },
  label: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.65),
  },
  text: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    paddingVertical: 5,
    paddingHorizontal: 24,
  },
});