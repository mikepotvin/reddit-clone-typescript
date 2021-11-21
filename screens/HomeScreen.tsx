import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {getBestAsync, Post} from '../services/RedditApiService';

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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default HomeScreen;
