import { SetStateAction } from "react";

export interface accessToken {
  accessToken: string;
}

export interface userInfoPassword {
  curPassword: string;
  password: string;
}

export interface signIn {
  email: string;
  password: string;
}

export interface signUp extends signIn {
  name: string;
}

export interface place {
  place: string[];
}

export interface likePhoto {
  setResult: (value: SetStateAction<Array<string>>) => void;
  setLikePlace: (value: SetStateAction<Array<string>>) => void;
  setIsLoading: (value: SetStateAction<boolean>) => void;
}

export interface inputElement {
  search: string;
  setSearch: (value: SetStateAction<string>) => void;
}

export interface theme {
  province: string;
  checkItems: string[];
}

export interface insertSpot {
  lists: string[];
  startToday: string;
  endToday: string;
}
