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
import HtmlRenderer from '@/components/HtmlRenderer';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ItemProps {
  item: Item;
}

const ItemCard: React.FC<ItemProps> = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const isEvent = item.itemType === 'EVENT';

  const backgroundColor = useThemeColor({}, 'card');

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
    <ThemedView style={[styles.detailsContainer, { backgroundColor }]}>
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
        style={[styles.card, { backgroundColor }]}
        onPress={() => setModalVisible(true)}
      >
        <ThemedText style={styles.title}>{item.titleEnglish}</ThemedText>
        {eventDetails}
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <ThemedView style={styles.modalContainer}>
          <ThemedText style={styles.modalTitle}>{item.titleEnglish}</ThemedText>
          {eventDetails}
          <HtmlRenderer html={item.contentEnglish}/>
          
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
  },
  eventText: {
    fontSize: 14,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
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
    marginVertical: 8,
  },
  closeButton: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
});

export default ItemCard;
