import { UserType } from './user';

//* 침대 유형 
export type BedType = 
  | "다른 침대 추가",
  | "소파",
  | "에어 매트릭스",
  | "요와 이불",
  | "싱글",
  | "더블",
  | "퀸",
  | "이층 침대",
  | "바닥용 에어매트릭스",
  | "유아 침대",
  | "유아용 침대",
  | "해먹",
  | "물침대";

export type StoredRoomType = {
  id: number;
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bedroomCount: number;
  bedroomType: "private" | "public";
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  amenities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  hostId: number;
};

export type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: "private" | "public" | null;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: number;
  startDate: string | null;
  endDate: string | null;
};

//* 숙소 타입
export type RoomType = {
  id: number;
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: "private" | "public" | null;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
  title: string;
  price: number;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  host: UserType;
};