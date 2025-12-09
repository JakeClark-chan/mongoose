import {
  ImageType,
  BooleanOrNull,
} from "generaltypes-mt/lib/types/generalTypes";

// Restaurant - Halal State

export type HalalData = {
  // Wird Alkohol verkauft oder werden Speisen angeboten, denen Alkohol zugefügt werden?
  isAlc: boolean;

  // Sind alle Speisen Halal?
  isFoodHalal: boolean;

  // Lieferant
  isMeat: boolean;
  meatSupplier: string;
};

// Restaurant - Kontakt
export type RestaurantContactType = {
  name: string;
  phoneNumber?: string;
  emailAdress?: string;
  website?: string;
};

export type RestaurantOpeningHoursType = {
  openingHours: OpeningHoursItemType[];
};

export type OpeningHoursItemType = {
  day: number;
  open: string;
  close: string;
};

// App-Feedback
export enum APPFEEDBACKTYPEENUM {
  RESTAURANTEDIT = "RESTAURANTEDIT",
  APPFEEDBACK = "APPFEEDBACK",
}

// Collections
export type CollectionAboutType = {
  isPublic: boolean;
  listName: string;
  description: string;
  image?: ImageType;
};

// Restaurant Changes
export enum RESTAURANTCHANGESUGGESTIONTYPEENUM {
  KONTAKT = "Kontakt",
  HALALSTATE = "Halal Status",
  KATEGORIEN = "Kategorien",
  DETAILS = "Details",
}
