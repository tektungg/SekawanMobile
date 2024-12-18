import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, Image } from 'react-native';

const BookListPage = ({ navigation }: any) => {
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
      const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${page * 10}&maxResults=10&orderBy=relevance&printType=books`;
      const response = await fetch(url);
      const result = await response.json();
      if (result.items) {
        setData(prevData => [...prevData, ...result.items]);
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
      <Text style={styles.header}>Books List</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for books"
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
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          >
            <Image
              source={{ uri: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150' }}
              style={styles.thumbnail}
            />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.volumeInfo.title}</Text>
              <Text style={styles.itemAuthor}>{item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author'}</Text>
              <Text style={styles.itemDate}>{item.volumeInfo.publishedDate}</Text>
            </View>
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
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#09182c',
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
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius: 5,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#09182c',
  },
  itemAuthor: {
    fontSize: 14,
    color: '#555',
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default BookListPage;