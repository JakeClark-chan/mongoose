import { ImageType } from "generaltypes-mt/lib/types/generalTypes";
export type HalalData = {
    isAlc: boolean;
    isFoodHalal: boolean;
    isMeat: boolean;
    meatSupplier: string;
};
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
export declare enum APPFEEDBACKTYPEENUM {
    RESTAURANTEDIT = "RESTAURANTEDIT",
    APPFEEDBACK = "APPFEEDBACK"
}
export type CollectionAboutType = {
    isPublic: boolean;
    listName: string;
    description: string;
    image?: ImageType;
};
export declare enum RESTAURANTCHANGESUGGESTIONTYPEENUM {
    KONTAKT = "Kontakt",
    HALALSTATE = "Halal Status",
    KATEGORIEN = "Kategorien",
    DETAILS = "Details"
}
//# sourceMappingURL=types.d.ts.map