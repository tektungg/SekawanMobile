import { LogBox } from 'react-native';

// Ignore specific warning messages
LogBox.ignoreLogs([
  'TRenderEngineProvider: Support for defaultProps will be removed from function components in a future major release.',
  'TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release.'
]);

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const DetailBookPage = ({ route }: any) => {
  const { id } = route.params;
  const [data, setData] = useState<any | null>(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data ? (
        <>
          <Text style={styles.header}>{data.volumeInfo.title}</Text>
          {data.volumeInfo.imageLinks && data.volumeInfo.imageLinks.thumbnail && (
            <Image
              source={{ uri: data.volumeInfo.imageLinks.thumbnail }}
              style={styles.thumbnail}
              resizeMode="contain"
            />
          )}
          {data.volumeInfo.description ? (
            <RenderHtml
              contentWidth={width}
              source={{ html: data.volumeInfo.description }}
              baseStyle={styles.description}
            />
          ) : (
            <Text style={styles.noDescription}>No description available</Text>
          )}
          <Text style={styles.author}>Author: {data.volumeInfo.authors ? data.volumeInfo.authors.join(', ') : 'N/A'}</Text>
          <Text style={styles.publishedDate}>Published Date: {data.volumeInfo.publishedDate}</Text>
          {data.volumeInfo.averageRating && data.volumeInfo.ratingsCount && (
            <View style={styles.ratingContainer}>
              <Image source={require('../../assets/ico/star.png')} style={styles.starIcon} />
              <Text style={styles.ratingText}>{data.volumeInfo.averageRating} ({data.volumeInfo.ratingsCount})</Text>
            </View>
          )}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  thumbnail: {
    width: 200,
    height: 250,
    marginBottom: 16,
    borderRadius: 10,
  },
  description: {
    marginBottom: 16,
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
  },
  noDescription: {
    marginBottom: 16,
    fontSize: 16,
    color: '#999',
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  publishedDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#333',
  },
});

export default DetailBookPage;