import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Discover, Bookmark, Profile, BlogDetail, AddBlogForm, Search} from '../screens';
import { Home2, LocationDiscover, Receipt21, ProfileCircle } from 'iconsax-react-native';
import { fontType, colors } from '../theme';
import { SearchBar } from '../components';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 1. Membuat Bottom Tab Navigator
function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.blue(),
        tabBarInactiveTintColor: colors.black(),
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontSize: 10,
          fontFamily: fontType['Pjs-Medium'],
        },
        headerShown: false, // Sesuai praktikum, header di tab disembunyikan
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Home2 color={color} variant={focused ? 'Bold' : 'Linear'} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ focused, color }) => (
            <LocationDiscover color={color} variant={focused ? 'Bold' : 'Linear'} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarLabel: 'Bookmark',
          tabBarIcon: ({ focused, color }) => (
            <Receipt21 color={color} variant={focused ? 'Bold' : 'Linear'} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <ProfileCircle color={color} variant={focused ? 'Bold' : 'Linear'} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 2. Membuat Stack Navigator
const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainApp" // Sesuai praktikum, initial route ke MainApp
      screenOptions={{
        headerShown: false, // Default header disembunyikan
        ...TransitionPresets.SlideFromRightIOS, // Animasi transisi sesuai praktikum
      }}
    >
      <Stack.Screen
        name="MainApp"
        component={MainApp}
      />
      <Stack.Screen
        name="BlogDetail"
        component={BlogDetail}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="AddBlogForm"
        component={AddBlogForm}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="SearchPage"
        component={SearchBar}
        options={{
          headerShown: false, 
          presentation: 'transparentModal',
        }}
      />

      
    </Stack.Navigator>
  );
};

export default Router;