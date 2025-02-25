export interface Item {
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
