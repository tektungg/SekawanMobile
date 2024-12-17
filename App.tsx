import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListPage from './src/pages/ListPage';
import DetailPage from './src/pages/DetailPage';
import ProfilePage from './src/pages/ProfilePage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ListStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="List" component={ListPage} options={{ headerShown: false }} />
    <Stack.Screen name="Detail" component={DetailPage} options={{ title: 'Detail' }} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
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
        })}
      >
        <Tab.Screen name="Home" component={ListStack} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;