import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const ProfilePage = () => {
  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
      </View>
      <Image
        source={require('../../assets/img/user.jpg')}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Rama Pramudhita Bhaskara</Text>
      <Text style={styles.description}>
        This is my first React project! Also I'm a newbie when it comes to Mobile Development. But, I always want to learn deep further into this subject. Therefore I hope this application satisfy the HR teams requirements so I can enroll on this Mobile Developer Internship. Big thanks!
      </Text>
      <View style={styles.linksContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress('https://github.com/tektungg')}
        >
          <Text style={styles.buttonText}>GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress('https://portfolio-tektung.my.canva.site/')}
        >
          <Text style={styles.buttonText}>Portfolio</Text>
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
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#09182c',
    paddingVertical: 16,
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#09182c',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#09182c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfilePage;