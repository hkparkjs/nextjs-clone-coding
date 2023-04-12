import axios from 'axios';
import { RegisterRoomState } from '../../types/room';
import { RoomType } from '../../types/room';
import { makeQueryString } from '../utils';

//* 숙소 등록하기
export const registerRoomAPI = (body: RegisterRoomState & { hostId: number }) => {
  axios.post("/api/rooms", body);
};

//* 숙소 리스트 불러오기 query
type GetRoomListAPIQueries = {
  location?: string | string[];
  checkInDate?: string | string[];
  checkOutDate?: string | string[];
  adultCount?: string | string[];
  childrenCount?: string | string[];
  infantsCount?: string | string[];
  latitude?: string | string[];
  longitude?: string | string[];
  limit: string | string[];
  page: string | string[];
};

//* 숙소 리스트 불러오기
export const getRoomListAPI = (queries: GetRoomListAPIQueries) => {
  return axios.get<RoomType[]>(makeQueryString("http://localhost:3000/api/rooms", queries));
};

//* 숙소 하나 불러오기
export const getRoomAPI = (roomId: number) => axios.get<RoomType>(`http://localhost:3000/api/rooms/${roomId}`);