import { ImageType, LocationType, StateEnum } from "generaltypes-mt/lib";
import { RESTAURANTCATEGORYENUM, RESTAURANTDETAILSEMUM } from "./constants-schema";
import { APPFEEDBACKTYPEENUM, CollectionAboutType, HalalData, RESTAURANTCHANGESUGGESTIONTYPEENUM, RestaurantContactType, RestaurantOpeningHoursType } from "./types";
export type RestaurantModel = {
    state: StateEnum;
    data: RestaurantDataModel;
    generated: GeneratedFollowType & GeneratedGeneralType & {
        authorID?: string;
    };
};
export type UserModel = {
    data: UserDataModel;
    generated: GeneratedGeneralType & {
        auth: UserAuthModel;
        token?: PushTokenModel;
    };
};
export type CollectionModel = {
    state: StateEnum;
    data: CollectionDataModel;
    generated: GeneratedFollowType & GeneratedGeneralType;
};
export type AppFeedBackModel = {
    publishingDate: Date;
    type: APPFEEDBACKTYPEENUM;
    authorID?: string;
    title: string;
    text: string;
    params: {
        restaurant?: {
            name?: string;
            id: string;
        };
    };
};
export type RestaurantChangeSuggestionModel = {
    authorID: string;
    restaurantId: string;
    type: RESTAURANTCHANGESUGGESTIONTYPEENUM;
    value: Partial<RestaurantDataModel>;
};
export type SettingsModel = {
    maintenance: {
        isEnabled: boolean;
        text?: string;
    };
    ads: {
        isEnabled: boolean;
    };
    iap: {
        isEnabled: boolean;
    };
};
export type GeneratedFollowType = {
    numberOfFollowers: number;
    followers: string[];
};
export type GeneratedGeneralType = {
    publishingDate: Date;
    searchableName: string[];
};
export type UserPreviewModel = UserDataModel & {
    id: string;
};
export type UserDataModel = {
    userName: string;
    profileImage?: ImageType;
};
export type UserAuthModel = {
    uid: string;
    email: string;
};
export type CollectionDataModel = {
    about: CollectionAboutType;
    author: UserPreviewModel;
    restaurants: string[];
};
export type RestaurantDataModel = {
    contact: RestaurantContactType & RestaurantOpeningHoursType;
    halalData: HalalData;
    categories: RESTAURANTCATEGORYENUM[];
    sonstiges: RESTAURANTDETAILSEMUM[];
    location: LocationType;
    gallery: ImageType[];
    menu: ImageType[];
};
export type PushTokenModel = {
    token?: string;
    publishingDate?: Date;
    plz?: string;
    city?: string;
};
//# sourceMappingURL=schema.d.ts.map