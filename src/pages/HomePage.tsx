import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomePage = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Catalogue</Text>
      <Image source={require('../../assets/img/image.png')} style={styles.image} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ListStack', { screen: 'BookList' })}
      >
        <Text style={styles.buttonText}>Search Books</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ListStack', { screen: 'MovieList' })}
      >
        <Text style={styles.buttonText}>Search Movies</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#09182c',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#09182c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomePage;