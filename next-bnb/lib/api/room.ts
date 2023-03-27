import axios from 'axios';
import { RegisterRoomState } from '../../types/room';

//* 숙소 등록하기
export const registerRoomAPI = (body: RegisterRoomState & { hostId: number }) => {
  axios.post("/api/rooms", body);
};