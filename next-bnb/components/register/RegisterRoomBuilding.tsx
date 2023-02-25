import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Selector from '../common/Selector';
import { largeBuildingTypeList } from '../../lib/staticData';

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
`;
//* 선택 불가능한 큰 범위 건물 유형
const disabledlargeBuildingTypeOptions = ["하나를 선택해주세요."];

const RegisterRoomBuilding: React.FC = () => {
  return (
    <Container>
      <h2>등록할 숙소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value="하나를 선택해주세요."
          defaultValue="하나를 선택해주세요."
          disabledOptions={disabledlargeBuildingTypeOptions}
          label="우선 범위를 좁혀볼까요?"
          options={largeBuildingTypeList}
          onChange={() => {}}
        />
      </div>
    </Container>
  );
};

export default RegisterRoomBuilding;