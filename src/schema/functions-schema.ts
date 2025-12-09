import { FirestoreType } from "generaltypes-mt/lib";
import {
  CollectionDataModel,
  CollectionModel,
  PushTokenModel,
  RestaurantDataModel,
  UserAuthModel,
  UserDataModel,
  UserModel,
} from "./schema";

// Functions
export type Functions_UpdateUserTokenType = {
  token: PushTokenModel;
};

export type Functions_FollowType = {
  hasFollowed: boolean;
  followObjectType: FOLLOWOBJECTTYPEENUM;
  followObjectID: string;
};

export type Functions_CreateNewUserType = {
  _data: UserDataModel;
  auth: UserAuthModel;
  token?: PushTokenModel;
};

export type Functions_CreateNewUserReturnType = {
  user: FirestoreType<UserModel>;
  newCollection: FirestoreType<CollectionModel>;
};

export type Functions_CreateNewRestaurantType = {
  _data: RestaurantDataModel;
};

export type Functions_CreateNewCollectionType = {
  _data: CollectionDataModel;
};

// Helper
export enum FOLLOWOBJECTTYPEENUM {
  RESTAURANTS = "restaurants",
  COLLECTIONS = "collections",
  POSTS = "posts",
}
