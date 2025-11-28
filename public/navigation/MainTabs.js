import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/Home/HomeScreen';
import PlacesListScreen from '../screens/Places/PlacesListScreen';
import PlaceDetailScreen from '../screens/Places/PlaceDetailScreen';
import SlotsScreen from '../screens/Slots/SlotsScreen';
import PostsListScreen from '../screens/Forum/PostsListScreen';
import PostDetailScreen from '../screens/Forum/PostDetailScreen';
import NewPostScreen from '../screens/Forum/NewPostScreen';
import CafeteriaMenuScreen from '../screens/Cafeteria/CafeteriaMenuScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import BlogDetailScreen from '../screens/Blog/BlogDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home Stack
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeMain" 
      component={HomeScreen} 
      options={{ title: 'Ana Sayfa' }} 
    />
    <Stack.Screen 
      name="BlogDetail" 
      component={BlogDetailScreen} 
      options={{ title: 'Blog Detay' }} 
    />
  </Stack.Navigator>
);

// Places Stack
const PlacesStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="PlacesList" 
      component={PlacesListScreen} 
      options={{ title: 'Tesisler' }} 
    />
    <Stack.Screen 
      name="PlaceDetail" 
      component={PlaceDetailScreen} 
      options={{ title: 'Tesis Detay' }} 
    />
    <Stack.Screen 
      name="Slots" 
      component={SlotsScreen} 
      options={{ title: 'Spor Slotları' }} 
    />
  </Stack.Navigator>
);

// Forum Stack
const ForumStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="PostsList" 
      component={PostsListScreen} 
      options={{ title: 'Forum' }} 
    />
    <Stack.Screen 
      name="PostDetail" 
      component={PostDetailScreen} 
      options={{ title: 'Post Detay' }} 
    />
    <Stack.Screen 
      name="NewPost" 
      component={NewPostScreen} 
      options={{ title: 'Yeni Post' }} 
    />
  </Stack.Navigator>
);

// Cafeteria Stack
const CafeteriaStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="CafeteriaMenu" 
      component={CafeteriaMenuScreen} 
      options={{ title: 'Yemekhane' }} 
    />
  </Stack.Navigator>
);

// Profile Stack
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProfileMain" 
      component={ProfileScreen} 
      options={{ title: 'Profil' }} 
    />
  </Stack.Navigator>
);

/**
 * Ana bottom tab navigator
 */
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Places') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Forum') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Cafeteria') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ tabBarLabel: 'Ana Sayfa' }} 
      />
      <Tab.Screen 
        name="Places" 
        component={PlacesStack} 
        options={{ tabBarLabel: 'Tesisler' }} 
      />
      <Tab.Screen 
        name="Forum" 
        component={ForumStack} 
        options={{ tabBarLabel: 'Forum' }} 
      />
      <Tab.Screen 
        name="Cafeteria" 
        component={CafeteriaStack} 
        options={{ tabBarLabel: 'Yemekhane' }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack} 
        options={{ tabBarLabel: 'Profil' }} 
      />
    </Tab.Navigator>
  );
};

export default MainTabs;