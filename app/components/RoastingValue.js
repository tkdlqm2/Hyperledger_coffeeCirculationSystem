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

const RoastingValue = ({ valueName }) => (
  <TouchableWithoutFeedback onPress={() => null}>
    <Container>
      <Column>
        <NameTime>{`${valueName.v27}: 0`}</NameTime>
        <NameTime>{`${valueName.v28}: 3`}</NameTime>
        <NameTime>{`${valueName.v29}: 3`}</NameTime>
        <NameTime>{`${valueName.v30}: 2`}</NameTime>
        <NameTime>{`${valueName.v31}: 1`}</NameTime>
        <NameTime>{`${valueName.v32}: 2`}</NameTime>
        <NameTime>{`${valueName.v33}: 5`}</NameTime>
        <NameTime>{`${valueName.v34}: 3`}</NameTime>
        <NameTime>{`${valueName.v35}: 1`}</NameTime>
      </Column>
    </Container>
  </TouchableWithoutFeedback>
);

RoastingValue.propTypes = {};

export default withNavigation(RoastingValue);
