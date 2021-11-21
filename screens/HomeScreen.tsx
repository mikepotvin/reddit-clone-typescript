import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {getBestAsync, Post} from '../services/RedditApiService';
import {DefaultTheme} from '../styles/DefaultTheme';

const HomeScreen = () => {
  const [data, setData] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const rData = await getBestAsync();
    if (rData.success) {
      setData(rData.data as Post[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = (item: Post) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>Title: {item.title}</Text>
        <Text style={styles.text}>Body: {item.body}</Text>
        <Text style={styles.text}>Link: {item.link}</Text>
        <Text style={styles.text}>Type: {item.type}</Text>
      </View>
    );
  };

  if (isLoading) {
    <View style={styles.container}>
      <ActivityIndicator />
    </View>;
  }

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={({item}) => renderItem(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.darkGrey,
  },
  card: {
    backgroundColor: DefaultTheme.colors.darkerGrey,
    margin: 16,
    padding: 16,
    elevation: 3,
    borderRadius: 4,
  },
  text: {
    color: DefaultTheme.colors.white,
  },
});

export default HomeScreen;
