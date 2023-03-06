import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

//* 컴포넌트 안에서 window객체 사용 예정이므로 dynamic 이용한 ssr 방지
const RegisterRoomGeometry = dynamic(
  import("../../../components/room/register/RegisterRoomGeometry"),
  { ssr: false }
);

const geometry: NextPage = () => {
  return <RegisterRoomGeometry />;
};

export default geometry;