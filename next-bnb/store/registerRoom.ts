import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BedType } from '../types/room';
import { RegisterRoomState } from '../types/room';

//* 초기 상태
const initialState: RegisterRoomState = {
  //* 건물 유형 큰 범주
  largeBuildingType: null,
  //* 건물 유형
  buildingType: null,
  //* 숙소 유형
  roomType: null,
  //* 게스트만을 위해 만들어진 숙소인가
  isSetUpForGuest: null,
  //* 최대 숙박 인원
  maximumGuestCount: 1,
  //* 침실 개수
  bedroomCount: 0,
  //* 침대 개수
  bedCount: 1,
  //* 침대 유형
  bedList: [],
  //* 공용공간 침대 유형
  publicBedList: [],
  //* 욕실 개수
  bathroomCount: 1,
  //* 욕실 유형
  bathroomType: null,
  //* 국가/지역
  country: "",
  //* 시/도
  city: "",
  //* 시/군/구
  district: "",
  //* 도로명주소
  streetAddress: "",
  //* 동호수
  detailAddress: "",
  //* 우편번호
  postcode: "",
  //* 위도
  latitude: 0,
  //* 경도
  longitude: 0,
  //* 편의 시설
  amenities: [],
  //* 편의 공간
  conveniences: [],
  //* 숙소 사진
  photos: [
    "https://hkparkjs-bucket.s3.ap-southeast-2.amazonaws.com/IMG_6671__5955efc2-4c06-4b11-bd2f-4ea059ae8e98.jpeg",
    "https://hkparkjs-bucket.s3.ap-southeast-2.amazonaws.com/IMG_7974__d873f4ff-2f48-4adc-9946-00224ff6d6d1.jpeg",
    "https://hkparkjs-bucket.s3.ap-southeast-2.amazonaws.com/IMG_8065__f8e60916-9716-4291-90f1-7b61d458e1e1.jpeg",
    "https://hkparkjs-bucket.s3.ap-southeast-2.amazonaws.com/IMG_8250__a786f00c-4b59-48ab-b926-50e16395a0ea.jpeg",
  ],
  //* 숙소 설명
  description: "",
  //* 숙소 제목
  title: "",
  //* 숙소 요금
  price: 0,
  //* 예약 시작 날짜
  startDate: null,
  //* 예약 종료 날짜
  endDate: null,
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
    setRoomType(state, action: PayloadAction<"entire" | "private" | "public">) {
      state.roomType = action.payload;
      return state;
    },
    //* '게스트용 숙소인지' 변경하기
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },
    //* 최대 숙박 인원 변경하기
    setMaximumGuestCount(state, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state;
    },
    //* 침실 개수 변경하기
    setBedroomCount(state, action: PayloadAction<number>) {
      const bedroomCount = action.payload;
      let { bedList } = state;

      state.bedroomCount = bedroomCount;

      if (bedroomCount < bedList.length) {
        //* 기존 침대 개수가 더 많으면 초과 부분 잘라내기
        bedList = state.bedList.slice(0, bedroomCount);
      } else {
        //* 변경될 침대 개수가 더 많으면 나머지 침실 채우기
        for (let i= bedList.length + 1; i < bedroomCount + 1; i += 1) {
          bedList.push({ id: i, beds: [] });
        }
      }
      state.bedList = bedList;
      return state;
    },
    //* 최대 침대 개수 변경하기
    setBedCount(state, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },
    //* 침대 유형 개수 변경하기
    setBedTypeCount(
      state,
      action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>
    ) {
      const { bedroomId, type, count } = action.payload;
      const bedroom = state.bedList[bedroomId - 1];
      const prevBeds = bedroom.beds;
      const index = prevBeds.findIndex((bed) => bed.type === type);
      if (index === -1) {
        //* 타입이 없다면
        state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
        return state;
      }
      //* 타입이 존재한다면
      if (count === 0) {
        state.bedList[bedroomId - 1].beds.splice(index, 1);
      } else {
        state.bedList[bedroomId - 1].beds[index].count = count;
      }
      return state;
    },
    //* 공용공간 침대 유형 개수 변경하기
    setPublicBedTypeCount(
      state,
      action: PayloadAction<{ type: BedType; count: number }>
    ) {
      const { type, count } = action.payload;

      const index = state.publicBedList.findIndex((bed) => bed.type === type);
      if (index === -1) {
        //* 타입이 없다면
        state.publicBedList = [...state.publicBedList, { type, count }];
        return state;
      }
      //* 타입이 존재한다면
      if (count === 0) {
        state.publicBedList.splice(index, 1);
      } else {
        state.publicBedList[index].count = count;
      }
      return state;
    },
    //* 욕실 개수 변경하기
    setBathroomCount(state, action: PayloadAction<number>) {
      state.bathroomCount = action.payload;
    },
    //* 욕실 유형 변경하기
    setBathroomType(state, action: PayloadAction<"private" | "public">) {
      state.bathroomType = action.payload;
    },
    //* 국가 변경하기
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    //* 시/도 변경하기
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    //* 시/군/구 변경하기
    setDistrict(state, action: PayloadAction<string>) {
      state.district = action.payload;
    },
    //* 도로명주소 변경하기
    setStreetAddress(state, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
    },
    //* 동호수 변경하기
    setDetailAddress(state, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
    },
    //* 우편번호 변경하기
    setPostcode(state, action: PayloadAction<string>) {
      state.postcode = action.payload;
    },
    //* 위도 변경하기
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    //* 경도 변경하기
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
    //* 편의 시설 변경하기
    setAmenities(state, action: PayloadAction<string[]>) {
      state.amenities = action.payload;
    },
    //* 편의 공간 변경하기
    setConveniences(state, action: PayloadAction<string[]>) {
      state.conveniences = action.payload;
    },
    //* 숙소 사진 변경하기
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
    //* 숙소 설명 변경하기
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    //* 숙소 제목 변경하기
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    //* 숙소 요금 변경하기
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
    },
    //* 예약 시작 날짜 변경하기
    setStartDate(state, action: PayloadAction<string | null>) {
      state.startDate = action.payload;
    },
    //* 예약 종료 날짜 변경하기
    setEndDate(state, action: PayloadAction<string | null>) {
      state.endDate = action.payload;
    }
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;