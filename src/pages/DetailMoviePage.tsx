import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const DetailMoviePage = ({ route }: any) => {
  const { id } = route.params;
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '3209508cd4eb5fe7221d5700050e4276';
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data ? (
        <>
          <Text style={styles.header}>{data.title}</Text>
          {data.poster_path && (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
              style={styles.thumbnail}
              resizeMode="contain"
            />
          )}
          {data.overview ? (
            <Text style={styles.description}>{data.overview}</Text>
          ) : (
            <Text>No description available</Text>
          )}
          <Text>Release Date: {data.release_date}</Text>
          <Text>Rating: {data.vote_average}</Text>
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
});

export default DetailMoviePage;