import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import SearchRoomBarGuests from './SearchRoomBarGuests';
import SearchRoomBarLocation from './SearchRoomBarLocation';
import SearchRoomBarCheckInDate from './SearchRoomBarCheckInDate';
import SearchRoomBarCheckOutDate from './SearchRoomBarCheckOutDate';

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;

  .search-room-bar-inputs {
    display: flex;
    align-items: center;
    width: 100%;
    .search-room-bar-input-divider {
      width: 1px;
      height: 44px;
      background-color: ${palette.gray_dd};
    }
  }
`;

const SearchRoomBar: React.FC = () => {
  return (
    <Container>
      <div className="search-room-bar-inputs">
        <SearchRoomBarLocation />
        <div className="search-room-bar-input-divider" />
        <SearchRoomBarCheckInDate />
        <div className="search-room-bar-input-divider" />
        <SearchRoomBarCheckOutDate />
        <div className="search-room-bar-input-divider" />
        <SearchRoomBarGuests />
      </div>
    </Container>
  );
};

export default SearchRoomBar;