import { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Item } from '@/types/Item';
import { List } from '@/types/List';
import ItemCard from '@/components/ItemCard';
import { ThemedView } from '@/components/ThemedView';

export default function TabThreeScreen() {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://calypso.datasektionen.se/api/list');
      const list: List = await response.json()
      const newItems = list.content;
      setItems(prev => JSON.stringify(prev) !== JSON.stringify(newItems) ? newItems : prev);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <ItemCard item={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
