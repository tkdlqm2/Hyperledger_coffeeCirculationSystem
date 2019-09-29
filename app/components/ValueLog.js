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

const ValueLog = ({ valueName }) => (
  <TouchableWithoutFeedback onPress={() => null}>
    <Container>
      <Column>
        <NameTime>{`${valueName.v21}: 14`}</NameTime>
        <NameTime>{`${valueName.v22}: 61`}</NameTime>
      </Column>
    </Container>
  </TouchableWithoutFeedback>
);

ValueLog.propTypes = {};

export default withNavigation(ValueLog);
