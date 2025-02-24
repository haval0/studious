import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {Dialog, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const isEvent = item.itemType === "EVENT";

  const formatTime = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  const eventDetails = (
    <div className="text-sm text-gray-600 mb-4">
      <span>By {item.authorDisplay}</span>
      {item.publishAs && <span> (as {item.publishAs})</span>}
      <span> · {formatTime(item.publishDate)}</span>
    {isEvent && (
      <div className="text-gray-700">
        <p>
          📅 {formatDate(item.eventStartTime)}{" "}
          🕒 {formatTime(item.eventStartTime)} - {formatTime(item.eventEndTime)}{" "}
          📍 {item.eventLocation}
        </p>
      </div>
    )}
    </div>
  );

  return (
    <>
      <Card
        className="max-w-2xl mx-auto my-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader>
          <CardTitle>{item.titleEnglish}</CardTitle>
        </CardHeader>
        <CardContent>
          {eventDetails}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{item.titleEnglish}</DialogTitle>
          </DialogHeader>
          {eventDetails}      
          <div
            className="text-gray-700 preserve-line-breaks"
            dangerouslySetInnerHTML={{ __html: item.contentEnglish }}
          />
          {item.facebookEvent && (
            <a
              href={item.facebookEvent}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              🎟️ Facebook Event
            </a>
          )}

          {item.googleForm && (
            <a
              href={item.googleForm}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              📝 Google Form
            </a>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ItemComponent;
