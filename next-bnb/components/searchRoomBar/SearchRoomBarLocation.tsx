import React, { useRef, useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useSelector } from '../../store';
import { searchRoomActions } from '../../store/searchRoom';
import isEmpty from 'lodash/isEmpty';

import palette from '../../styles/palette';
import { searchPlacesAPI } from '../../lib/api/map';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }
  .search-room-bar-location-texts {
    position: absolute;
    width: calc(100% - 40px);
    top: 16px;
    left: 20px;
    .search-room-bar-location-label {
      font-size: 10px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    input {
      width: 100%;
      border: 0;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &::placeholder {
        font-size: 14px;
        opacity: 0.7;
      }
    }
  }
  .search-room-bar-location-results {
    position: absolute;
    background-color: white;
    top: 78px;
    width: 500px;
    padding: 16px 0;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: default;
    overflow: hidden;
    z-index: 10;
    li {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 8px 32px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
`;

const SearchBarRoomLocation: React.FC = () => {
  const location = useSelector(state => state.searchRoom.location);

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);

  //* 위치 변경 dispatch
  const setLocationDispatch = (value: string) => {
    dispatch(searchRoomActions.setLocation(value));
  };
  const [popupOpened, setPopupOpened] = useState(false);
  const [results, setResults] = useState<
  {
    description: string;
    placeId: string;
  }[]>([]);

  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setPopupOpened(true);
  };
  const searchPlaces = async () => {
    try {
      const { data } = await searchPlacesAPI(encodeURI(location));
      setResults(data);
    } catch (e) {
      console.log(e);
    }
  };
  //* 검색어가 변하면 장소를 검색
  useEffect(() => {
    if (location) {
      //* 장소 검색하기
      searchPlaces();
    }
  }, [location]);

  return (
    <Container onClick={onClickInput}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <div className="search-room-bar-location-texts">
          <p className="search-room-bar-location-label">위치</p>
          <input
            value={location}
            ref={inputRef}
            onChange={(e) => setLocationDispatch(e.target.value)}
            placeholder="어디로 여행 가세요?"
          />
        </div>
        {popupOpened && location !== "근처 추천 장소" && (
          <ul className="search-room-bar-location-results">
            {!location && <li>근처 추천 장소</li>}
            {!isEmpty(results) &&
              results.map((result, index) => (
                <li key={index}>{result.description}</li>
              ))}
            {location && isEmpty(results) && <li>검색 결과가 없습니다.</li>}
          </ul>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default SearchBarRoomLocation;