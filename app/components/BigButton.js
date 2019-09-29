import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../constants/Layout";
import Mixins from "../constants/Mixins";

const Container = styled.View`
  background-color: #003569;
  border-radius: ${Layout.btnRadius};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 60px;
  border: ${prosp => (prosp.transparent ? Mixins.authBorder : "")};
  margin-bottom: 50px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 500;
`;

const BigButton = ({ transparent = false, children, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Container transparent={transparent}>
      <ButtonText>신청하기</ButtonText>
    </Container>
  </TouchableOpacity>
);

BigButton.propTypes = {
  transparent: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onPress: PropTypes.func.isRequired
};

export default BigButton;
