import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./Avatar";
import Colors from "../constants/Colors";
import SmallButton from "./SmallButton";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 13px;
  border-top-color: ${Colors.lightGreyColor};
  border-top-width: 1.5;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DataContainer = styled.View`
  margin-left: 10px;
`;

const StoreName = styled.Text`
  font-weight: 500;
  font-size: 16px;
`;

const Location = styled.Text`
  color: ${Colors.greyColor};
`;

const FirstButtonContainer = styled.View`
  margin-right: 2.5%;
`;

const buyItem = () => {
  alert("상품을 구매하였습니다.");
};

const subscribeItem = () => {
  alert("정기배송을 신청하였습니다.");
};

const Store = ({ avatarUrl, location, storeName }) => (
  <Container>
    <Column>
      <Avatar source={avatarUrl} />
      <DataContainer>
        <StoreName>커피인더스트리</StoreName>
        <Location>서울시 서초구</Location>
      </DataContainer>
    </Column>
    <Column>
      <FirstButtonContainer>
        <SmallButton text="개별구매" onPress={buyItem} />
      </FirstButtonContainer>
      <SmallButton text="정기배송" onPress={subscribeItem} accent />
    </Column>
  </Container>
);

Store.propTypes = {
  avatarUrl: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
};

export default Store;
