import React, { useState } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {Filter, SearchNormal} from 'iconsax-react-native';
import { colors } from './src/theme';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>KueKu</Text>
        <Filter color={colors.white()} size={24} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchNormal size={20} color={colors.blue()} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari resep"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearButton}>×</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Popular Recipes */}
      <View style={styles.popularRecipesContainer}>
        <Text style={styles.sectionTitle}>Resep Kue populer</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularRecipesScroll}
        >
          {[
            {id: 1, title: 'Kue Brownis', image: 'https://sugargeekshow.com/wp-content/uploads/2019/10/fudgy_brownie_recipe_featured.jpg'},
            {id: 2, title: 'Kue Donat', image: 'https://3.bp.blogspot.com/-HKFupKHeDq0/VBJ92YWNJ8I/AAAAAAAAASM/aZ3uILhgW-Q/s1600/Kue%2BDonat.jpg'},
            {id: 3, title: 'Kue Nastar', image: 'https://d12man5gwydfvl.cloudfront.net/wp-content/uploads/2019/02/Resep-Kue-Nastar-1.jpg'},
          ].map((recipe) => (
            <View key={recipe.id} style={styles.popularRecipeItem}>
              <Image 
                source={{uri: recipe.image}} 
                style={styles.popularRecipeImage} 
                defaultSource={{uri: 'https://via.placeholder.com/100'}}
              />
              <Text style={styles.popularRecipeTitle}>{recipe.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Latest Recipes */}
      <View style={styles.latestRecipesContainer}>
        <Text style={styles.sectionTitle}>Resep terbaru (985797)</Text>
        <ScrollView>
          {[
            {
              title: 'Kue Brownis',
              description: 'daging ayam filet, telur rebus, serai, daun jeruk...',
              author: 'Erlina',
              image: 'https://sugargeekshow.com/wp-content/uploads/2019/10/fudgy_brownie_recipe_featured.jpg'
            },
            {
              title: 'Kue Donat',
              description: 'Telur Ayam, Kentang ukuran besar, Tahu Kuning...',
              author: 'Sarah Dwi Ayu',
              image: 'https://3.bp.blogspot.com/-HKFupKHeDq0/VBJ92YWNJ8I/AAAAAAAAASM/aZ3uILhgW-Q/s1600/Kue%2BDonat.jpg'
            },
            {
              title: 'Kue Nastar',
              description: 'Terigu, Air, Wortel dipotong dadu / di chopper...',
              author: 'Novie Harvie',
              image: 'https://d12man5gwydfvl.cloudfront.net/wp-content/uploads/2019/02/Resep-Kue-Nastar-1.jpg'
            }
          ].map((recipe, index) => (
            <View key={index} style={styles.recipeItem}>
              <Image 
                source={{uri: recipe.image}} 
                style={styles.recipeImage} 
                defaultSource={{uri: 'https://via.placeholder.com/94'}}
              />
              <View style={styles.recipeDetails}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeDescription} numberOfLines={1}>
                  {recipe.description}
                </Text>
                <Text style={styles.recipeAuthor}>{recipe.author}</Text>
              </View>
              <TouchableOpacity style={styles.bookmarkButton}>
                <Text style={styles.bookmarkText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Cari resep</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Koleksi Resep</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey(0.1),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black(),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey(0.08),
    borderRadius: 10,
    margin: 20,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: colors.black(),
  },
  clearButton: {
    fontSize: 20,
    color: colors.grey(0.6),
  },
  popularRecipesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
    color: colors.black(),
  },
  popularRecipesScroll: {
    paddingHorizontal: 20,
  },
  popularRecipeItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  popularRecipeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  popularRecipeTitle: {
    marginTop: 5,
    fontSize: 12,
    color: colors.black(),
  },
  latestRecipesContainer: {
    flex: 1,
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blue(0.03),
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
  },
  recipeImage: {
    width: 94,
    height: 94,
    borderRadius: 10,
  },
  recipeDetails: {
    flex: 1,
    marginLeft: 15,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black(),
  },
  recipeDescription: {
    fontSize: 12,
    color: colors.grey(0.6),
    marginVertical: 5,
  },
  recipeAuthor: {
    fontSize: 10,
    color: colors.blue(0.6),
  },
  bookmarkButton: {
    backgroundColor: colors.blue(),
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkText: {
    color: colors.white(),
    fontSize: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.grey(0.1),
    paddingVertical: 15,
    backgroundColor: colors.white(),
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: colors.black(),
  },
});