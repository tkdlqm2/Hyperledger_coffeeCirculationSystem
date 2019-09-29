import React from "react";
import styled from "styled-components";
import Log from "../../components/Log";
import ValueLog from "../../components/ValueLog";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import Store from "../../components/Store";
import { valueName } from "../../valueName";
import NewProductValue from "../../components/NewProductValue";
import RoastingValue from "../../components/RoastingValue";
import PackagingValue from "../../components/PackagingValue";

const getHeight = () =>
  Layout.window.height <= 667
    ? Layout.window.height / 2.8
    : Layout.window.height / 2.3;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollView = styled.ScrollView``;

const Image = styled.Image`
  width: ${Layout.window.width};
  height: ${getHeight()};
  position: relative;
`;

const DataContainer = styled.View`
  padding-horizontal: 20px;
`;

const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: rgba(151, 151, 151, 0.1);
  margin-top: 30px;
`;

export default ({ navigation }) => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} bounces={false}>
        <DataContainer>
          <Container
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 15
            }}>
            <Log
              userAvatar={require("../../assets/images/smAvatar.png")}
              name="김의진"
              role="수입업자"
              preview="새로운 원두가 등록되었습니다."
              date="2019.09.16 15:30"
            />
            <NewProductValue valueName={valueName} />
            <Log
              userAvatar={require("../../assets/images/smAvatar.png")}
              name="김의진"
              role="수입업자"
              preview="창고관리자에게 원두를 전달했습니다."
              date="2019.09.17 13:00"
            />
            <Divider />
            <Log
              userAvatar={require("../../assets/images/smAvatar2.png")}
              name="김홍준"
              role="창고관리자"
              preview="원두를 창고에 관리합니다."
              date="2019.09.17 15:30"
            />
            <ValueLog valueName={valueName} />
            <Log
              userAvatar={require("../../assets/images/smAvatar2.png")}
              name="김홍준"
              role="창고관리자"
              preview="카페로 원두를 배송합니다."
              date="2019.09.20 11:50"
            />
            <Divider />
            <Log
              userAvatar={require("../../assets/coffee/cafe1.jpg")}
              name="런던다방"
              role="카페"
              preview="원두를 배송받았습니다."
              date="2019.09.21 09:34"
            />
            <Log
              userAvatar={require("../../assets/coffee/cafe1.jpg")}
              name="런던다방"
              role="카페"
              preview="로스팅을 시작합니다."
              date="2019.09.22 13:20"
            />
            <RoastingValue valueName={valueName} />
            <Log
              userAvatar={require("../../assets/coffee/cafe1.jpg")}
              name="런던다방"
              role="카페"
              preview="상품을 정기배송 센터로 보냅니다."
              date="2019.09.22 18:33"
            />
            <Divider />
            <Log
              userAvatar={require("../../assets/icon.png")}
              name="블록커피"
              role="정기배송센터"
              preview="상품을 배송받았습니다."
              date="2019.09.23 11:54"
            />
            <Log
              userAvatar={require("../../assets/icon.png")}
              name="블록커피"
              role="정기배송센터"
              preview="상품을 패키징합니다."
              date="2019.09.24 12:03"
            />
            <PackagingValue valueName={valueName} />
            <Log
              userAvatar={require("../../assets/icon.png")}
              name="블록커피"
              role="정기배송센터"
              preview="패키지 배송을 시작합니다."
              date="2019.09.25 14:20"
            />
            <Divider />
            <Log
              userAvatar={require("../../assets/images/lgAvatar.png")}
              name="소비자"
              role="정기배송센터"
              preview="상품을 배송 받았습니다."
              date="2019.09.26 15:30"
            />
          </Container>
        </DataContainer>
      </ScrollView>
      <Store
        storeName="런던다방"
        lacation="서울시 서초구"
        avatarUrl={require("../../assets/coffee/cafe1.jpg")}
      />
    </Container>
  );
};
