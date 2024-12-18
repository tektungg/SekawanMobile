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

const DetailPage = ({ route }: any) => {
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
            <Text>No description available</Text>
          )}
          <Text style={styles.author}>Author: {data.volumeInfo.authors ? data.volumeInfo.authors.join(', ') : 'N/A'}</Text>
          <Text>Published Date: {data.volumeInfo.publishedDate}</Text>
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
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  thumbnail: {
    width: 200,
    height: 250,
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
  },
  author: {
    marginTop: 16,
  },
});

export default DetailPage;