import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './src/pages/HomePage';
import BookListPage from './src/pages/BookListPage';
import MovieListPage from './src/pages/MovieListPage';
import DetailMoviePage from './src/pages/DetailMoviePage';
import ProfilePage from './src/pages/ProfilePage';
import DetailBookPage from './src/pages/DetailBookPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ListStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="BookList" component={BookListPage} options={{ headerShown: false }} />
    <Stack.Screen name="MovieList" component={MovieListPage} options={{ headerShown: false }} />
    <Stack.Screen name="Detail" component={DetailBookPage} options={{ title: 'Detail' }} />
    <Stack.Screen name="DetailMovie" component={DetailMoviePage} options={{ title: 'Detail' }} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ListStack" component={ListStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconSource;

        if (route.name === 'Home') {
          iconSource = require('./assets/ico/home.png');
        } else if (route.name === 'Profile') {
          iconSource = require('./assets/ico/profile.png');
        }

        return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
      },
      tabBarActiveTintColor: '#09182c', 
      tabBarInactiveTintColor: 'gray', 
    })}
  >
    <Tab.Screen name="Home" component={HomePage} />
    <Tab.Screen name="Profile" component={ProfilePage} />
  </Tab.Navigator>
);

export default App;