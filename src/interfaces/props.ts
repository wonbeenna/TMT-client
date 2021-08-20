import { Moment } from "moment";
import { SetStateAction } from "react";

export interface InputListProps {
  _startDate: string;
  _endDate: string;
  lists: string[];
  setLists: (value: string[]) => void;
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}

export interface InputListBtnProps {
  startToday: string;
  endToday: string;
  lists: string[];
}

export interface setProvinceProps {
  setProvince: (value: SetStateAction<string | null>) => void;
}

export interface ListProps {
  lists: string[];
  setLists: (value: string[]) => void;
}

export interface PagingProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export interface PlaceListProps {
  place: string[];
  _startDate: string;
  _endDate: string;
  lists: string[];
  setLists: (value: string[]) => void;
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export interface datePicker {
  startDate: Moment | null;
  endDate: Moment | null;
  handlendDatesChange: (type: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => void;
}

export interface mapData {
  _id: string;
  name: string;
  email: string;
  spot: any;
  theme: string[];
  place: string;
  province: string;
  address: string;
  lat: number;
  long: number;
  photo: string;
  setMap: any | null;
}
