import React, { useState } from 'react';
import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
} from 'react-native';
import { Item } from '@/types/Item';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface ItemProps {
  item: Item;
}

const ItemCard: React.FC<ItemProps> = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const isEvent = item.itemType === 'EVENT';

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const eventDetails = (
    <ThemedView style={styles.detailsContainer}>
      <ThemedText style={styles.detailText}>
        By {item.authorDisplay}
        {item.publishAs && ` (as ${item.publishAs})`}
        {' · '}
        {formatTime(item.publishDate)}
      </ThemedText>
      {isEvent && (
        <ThemedText style={styles.eventText}>
          📅 {formatDate(item.eventStartTime)}{' '}
          🕒 {formatTime(item.eventStartTime)} - {formatTime(item.eventEndTime)}{' '}
          📍 {item.eventLocation}
        </ThemedText>
      )}
    </ThemedView>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}
      >
        <ThemedText style={styles.title}>{item.titleEnglish}</ThemedText>
        {eventDetails}
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <ThemedView style={styles.modalContainer}>
          <ThemedText style={styles.modalTitle}>{item.titleEnglish}</ThemedText>
          {eventDetails}
          <ThemedText style={styles.content}>{item.contentEnglish}</ThemedText>
          
          {item.facebookEvent && (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.facebookEvent)}
            >
              <ThemedText style={styles.link}>🎟️ Facebook Event</ThemedText>
            </TouchableOpacity>
          )}
          
          {item.googleForm && (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.googleForm)}
            >
              <ThemedText style={styles.link}>📝 Google Form</ThemedText>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <ThemedText>Close</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    //backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsContainer: {
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    //color: '#666',
  },
  eventText: {
    fontSize: 14,
    //color: '#777',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    //backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    //color: '#0066cc',
    marginVertical: 8,
  },
  closeButton: {
    padding: 10,
    alignItems: 'center',
    //backgroundColor: '#eee',
    borderRadius: 8,
    marginTop: 16,
  },
});

export default ItemCard;
