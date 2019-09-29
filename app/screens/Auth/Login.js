import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const emailInput = useInput("");

  return (
    <View>
      <AuthInput
        {...emailInput}
        placeholder="Email"
        keyboardType="email-address"
      />
      <AuthButton onPress={() => null} text="Log In" />
    </View>
  );
};
