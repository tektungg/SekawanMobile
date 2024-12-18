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
            <Text style={styles.noDescription}>No description available</Text>
          )}
          <Text style={styles.releaseDate}>Release Date: {data.release_date}</Text>
          {data.genres && (
            <Text style={styles.genres}>
              Genres: {data.genres.map((genre: any) => genre.name).join(', ')}
            </Text>
          )}
          {data.vote_average && data.vote_count && (
            <View style={styles.ratingContainer}>
              <Image source={require('../../assets/ico/star.png')} style={styles.starIcon} />
              <Text style={styles.ratingText}>{data.vote_average} ({data.vote_count})</Text>
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
    height: 300,
    marginBottom: 16,
    borderRadius: 10,
  },
  description: {
    marginBottom: 16,
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
    paddingHorizontal: 16,
  },
  noDescription: {
    marginBottom: 16,
    fontSize: 16,
    color: '#999',
  },
  releaseDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  genres: {
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

export default DetailMoviePage;