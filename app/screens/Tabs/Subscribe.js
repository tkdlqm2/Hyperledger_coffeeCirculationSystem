import React from "react";
import { ScrollView, Button } from "react-native";
import styled from "styled-components";
import CoffeeOption from "../../components/CoffeeOption";
import constants from "../../constants";
import styles from "../../styles";
import BigButton from "../../components/BigButton";

const Container = styled.View`
  border: 1px solid ${styles.greyColor};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: ${constants.width};
  padding-top: 50px;
`;

const onPress = () => {
  alert("정기배송 신청이 완료되었습니다.");
};

const Subscribe = ({ navigation }) => {
  return (
    <ScrollView>
      <Container>
        <CoffeeOption />
        <ButtonContainer>
          <BigButton onPress={onPress} children="신청하기" />
        </ButtonContainer>
      </Container>
    </ScrollView>
  );
};

export default Subscribe;
