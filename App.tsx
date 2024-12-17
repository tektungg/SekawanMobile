import React from 'react';
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
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={ListStack} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;