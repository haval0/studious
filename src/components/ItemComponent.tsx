import React from 'react';

interface Item {
  id: number;
  itemType: string;
  updated: string;
  titleSwedish: string;
  titleEnglish: string;
  author: string;
  authorDisplay: string;
  publishAs: string | null;
  publishAsDisplay: string | null;
  sticky: boolean;
  sensitive: boolean;
  publishDate: string;
  contentSwedish: string;
  contentEnglish: string;
  eventLocation: string | null;
  eventStartTime: string | null;
  eventEndTime: string | null;
  facebookEvent: string;
  googleForm: string;
  publishStatus: string;
}

interface ItemProps {
  item: Item;
}

const ItemComponent: React.FC<ItemProps> = ({ item }) => {
  const isEvent = item.itemType === 'EVENT';
  const isSticky = item.sticky;
  const isSensitive = item.sensitive;

  return (
    <div className={`item ${isSticky ? 'sticky' : ''} ${isSensitive ? 'sensitive' : ''}`}>
      {/* Sticky and Sensitive Indicators */}
      {isSticky && <div className="sticky-indicator">Pinned</div>}
      {isSensitive && <div className="sensitive-indicator">Sensitive Content</div>}

      {/* Title */}
      <h2>{item.titleEnglish}</h2>

      {/* Author and Publish Info */}
      <div className="meta">
        <span>By {item.authorDisplay}</span>
        {item.publishAsDisplay && <span> (as {item.publishAsDisplay})</span>}
        <span> · {new Date(item.publishDate).toLocaleDateString()}</span>
      </div>

      {/* Event Details (if applicable) */}
      {isEvent && (
        <div className="event-details">
          <p>
            <strong>Location:</strong> {item.eventLocation}
          </p>
          <p>
            <strong>Start:</strong> {new Date(item.eventStartTime!).toLocaleString()}
          </p>
          <p>
            <strong>End:</strong> {new Date(item.eventEndTime!).toLocaleString()}
          </p>
          {item.facebookEvent && (
            <p>
              <strong>Facebook Event:</strong>{' '}
              <a href={item.facebookEvent} target="_blank" rel="noopener noreferrer">
                Link
              </a>
            </p>
          )}
          {item.googleForm && (
            <p>
              <strong>Google Form:</strong>{' '}
              <a href={item.googleForm} target="_blank" rel="noopener noreferrer">
                Link
              </a>
            </p>
          )}
        </div>
      )}

      {/* Content */}
      <div className="content" dangerouslySetInnerHTML={{ __html: item.contentEnglish }} />

      {/* Publish Status */}
      <div className="publish-status">
        <strong>Status:</strong> {item.publishStatus}
      </div>
    </div>
  );
};

export default ItemComponent;
