import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const ProfilePage = () => {
  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />
      <Text>Name: Rama Pramudhita Bhaskara</Text>
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => handlePress('https://github.com/tektungg')}>
          <Image
            source={{ uri: 'https://image.flaticon.com/icons/png/512/25/25231.png' }} // GitHub icon URL
            style={styles.linkImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('https://portfolio-tektung.my.canva.site/')}>
          <Image
            source={{ uri: 'https://image.flaticon.com/icons/png/512/888/888879.png' }} // Portfolio icon URL
            style={styles.linkImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  linksContainer: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  linkImage: {
    width: 50,
    height: 50,
    marginHorizontal: 16,
  },
});

export default ProfilePage;