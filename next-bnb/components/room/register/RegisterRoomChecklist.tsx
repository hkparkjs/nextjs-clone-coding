import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from '../../../store';
import isEmpty from 'lodash/isEmpty';
import RegisterRoomCheckStep from './RegisterRoomCheckStep';
import RegisterRoomFooter from './RegisterRoomFooter';
import RegisterRoomSubmitFooter from './RegisterRoomSubmitFooter';

const Container = styled.div`
  padding: 62px 30px 100px;
  min-height: 100vh;
  .register-room-checklist-info {
    margin-bottom: 39px;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
  }
`;

const RegisterRoomChecklist: React.FC = () => {
  const registerRoom = useSelector(state => state.registerRoom);

  //* 숙소 유형이 활성화됐는지
  const isBuildingTypeActived = useMemo(() => {
    const {
      largeBuildingType,
      buildingType,
      roomType,
      isSetUpForGuest,
    } = registerRoom;
    if (
      !largeBuildingType ||
      !buildingType ||
      !roomType ||
      isSetUpForGuest === null
    ) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 종류가 활성화됐는지
  const isRoomTypeActived = useMemo(() => {
    const {
      maximumGuestCount,
      bedroomCount,
      bedCount,
      bedList,
      publicBedList,
    } = registerRoom;
    if (
      !isBuildingTypeActived ||
      !maximumGuestCount ||
      !bedroomCount ||
      !bedCount
    ) {
      return false;
    }
    return true;
  }, []);

  //* 욕실 항목이 활성화됐는지
  const isBathroomActived = useMemo(() => {
    const { bathroomCount, bathroomType } = registerRoom;
    if (!isRoomTypeActived || !bathroomCount || bathroomType === null) {
      return false;
    }
    return true;
  }, []);

  //* 위치 항목이 활성화됐는지
  const isLocationActived = useMemo(() => {
    const {
      latitude,
      longitude,
      country,
      city,
      district,
      streetAddress,
      detailAddress,
      postcode,
    } = registerRoom;
    if (
      !isBathroomActived ||
      !latitude ||
      !longitude ||
      !country ||
      !city ||
      !district ||
      !streetAddress ||
      !postcode
    ) {
      return false;
    }
    return true;
  }, []);

  //* 편의 시설이 활성화됐는지
  const isAmenitiesActived = useMemo(() => {
    const { amenities } = registerRoom;

    if (!isLocationActived) {
      return false;
    }
    return true;
  }, []);

  //* 공용공간이 활성화됐는지
  const isConveniencesActived = useMemo(() => {
    if (!isAmenitiesActived) {
      return false;
    }
    return true;
  }, []);

  //* 사진 항목이 다 채워져있는지
  const isPhotoActived = useMemo(() => {
    const { photos } = registerRoom;
    if (!isConveniencesActived || isEmpty(photos)) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 설명이 다 채워져 있는지
  const isDescriptionActived = useMemo(() => {
    const { description } = registerRoom;
    if (!isPhotoActived || !description) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 제목이 다 채워져 있는지
  const isTitleActived = useMemo(() => {
    const { title } = registerRoom;
    if (!isDescriptionActived || !title) {
      return false;
    }
    return true;
  }, []);

  //* 숙소 금액이 채워져 있는지
  const isPriceActived = useMemo(() => {
    const { price } = registerRoom;
    if (!isTitleActived || !price) {
      return false;
    }
    return true;
  }, []);

  //* 예약 날짜가 채워져 있는지
  const isDateActived = useMemo(() => {
    const { startDate, endDate } = registerRoom;
    if (!isPriceActived || !startDate || !endDate) {
      return false;
    }
    return true;
  }, []);

  //* 진행 중인 단계
  const stepInProgress = useMemo(() => {
    if (!isBuildingTypeActived) {
      return "building";
    }
    if (!isRoomTypeActived) {
      return "bedrooms";
    }
    if (!isBathroomActived) {
      return "bathroom";
    }
    if (!isLocationActived) {
      return "location";
    }
    if (!isAmenitiesActived) {
      return "amenities";
    }
    if (!isConveniencesActived) {
      return "conveniences";
    }
    if (!isPhotoActived) {
      return "photo";
    }
    if (!isDescriptionActived) {
      return "description";
    }
    if (!isTitleActived) {
      return "title";
    }
    if (!isPriceActived) {
      return "price";
    }
    if (!isDateActived) {
      return "date";
    }
    return "";
  }, []);

  return (
    <Container>
      <p className="register-room-checklist-info">
        숙소를 등록한 후 언제든 숙소를 수정할 수 있습니다.
      </p>
      <ul>
        <RegisterRoomCheckStep
          step="숙소 유형"
          href="/room/register/building"
          disabled={!isBuildingTypeActived}
          inProgress={stepInProgress === "building"}
        />
        <RegisterRoomCheckStep
          step="숙소 종류"
          href="/room/register/bedrooms"
          disabled={!isRoomTypeActived}
          inProgress={stepInProgress === "bedrooms"}
        />
        <RegisterRoomCheckStep
          step="욕실"
          href="/room/register/bathroom"
          disabled={!isBathroomActived}
          inProgress={stepInProgress === "bathroom"}
        />
        <RegisterRoomCheckStep
          step="위치"
          href="/room/register/location"
          disabled={!isLocationActived}
          inProgress={stepInProgress === "location"}
        />
        <RegisterRoomCheckStep
          step="편의 시설"
          href="/room/register/amenities"
          disabled={!isAmenitiesActived}
          inProgress={stepInProgress === "amenities"}
        />
        <RegisterRoomCheckStep
          step="편의 시설"
          href="/room/register/amenities"
          disabled={!isAmenitiesActived}
          inProgress={stepInProgress === "amenities"}
        />
        <RegisterRoomCheckStep
          step="공용공간"
          href="/room/register/conveniences"
          disabled={!isConveniencesActived}
          inProgress={stepInProgress === "conveniences"}
        />
        <RegisterRoomCheckStep
          step="사진"
          href="/room/register/photo"
          disabled={!isPhotoActived}
          inProgress={stepInProgress === "photo"}
        />
        <RegisterRoomCheckStep
          step="설명"
          href="/room/register/description"
          disabled={!isDescriptionActived}
          inProgress={stepInProgress === "description"}
        />
        <RegisterRoomCheckStep
          step="제목"
          href="/room/register/title"
          disabled={!isTitleActived}
          inProgress={stepInProgress === "title"}
        />
        <RegisterRoomCheckStep
          step="요금"
          href="/room/register/price"
          disabled={!isPriceActived}
          inProgress={stepInProgress === "price"}
        />
        <RegisterRoomCheckStep
          step="예약 날짜"
          href="/room/register/date"
          disabled={!isDateActived}
          inProgress={stepInProgress === "date"}
        />
      </ul>
      {isDateActived ? (
        <RegisterRoomSubmitFooter />
      ) : (
        <RegisterRoomFooter
          prevHref="/room/register/date"
          nextHref={`/room/register/${stepInProgress}`}
        />
      )}
    </Container>
  );
};

export default RegisterRoomChecklist;