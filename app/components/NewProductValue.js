import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { TouchableWithoutFeedback } from "react-native";

const Container = styled.View`
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #ebebeb;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const Column = styled.View``;

const NameTime = styled.Text`
  margin-bottom: 3px;
`;

const NewProductValue = ({ valueName }) => (
  <TouchableWithoutFeedback onPress={() => null}>
    <Container>
      <Column>
        <NameTime>{`${valueName.v12}: 아라비카`}</NameTime>
        <NameTime>{`${valueName.v13}: 콜롬비아`}</NameTime>
        <NameTime>{`${valueName.v14}: 2019.09.25 15:00`}</NameTime>
        <NameTime>{`${valueName.v15}: 9`}</NameTime>
        <NameTime>{`${valueName.v16}: AA`}</NameTime>
        <NameTime>{`${valueName.v17}: 2500~3000`}</NameTime>
      </Column>
    </Container>
  </TouchableWithoutFeedback>
);

NewProductValue.propTypes = {};

export default withNavigation(NewProductValue);
