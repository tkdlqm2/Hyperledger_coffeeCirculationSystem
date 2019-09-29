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

const PackagingValue = ({ valueName }) => (
  <TouchableWithoutFeedback onPress={() => null}>
    <Container>
      <Column>
        <NameTime>{`${valueName.v39}: 2019.10.12 20:00`}</NameTime>
      </Column>
    </Container>
  </TouchableWithoutFeedback>
);

PackagingValue.propTypes = {};

export default withNavigation(PackagingValue);
