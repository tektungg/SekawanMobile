import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';

const MovieListPage = ({ navigation }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (page: number, query: string) => {
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const apiKey = '3209508cd4eb5fe7221d5700050e4276';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page + 1}`;
      const response = await fetch(url);
      const result = await response.json();
      if (result.results) {
        setData(prevData => [...prevData, ...result.results]);
      } else {
        setError('No results found');
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page, query);
  }, [page, query]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = () => {
    setData([]);
    setPage(0);
    fetchData(0, query);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Movies List</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for movies"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('DetailMovie', { id: item.id })}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    width: '100%',
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    width: '100%',
  },
  itemText: {
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default MovieListPage;