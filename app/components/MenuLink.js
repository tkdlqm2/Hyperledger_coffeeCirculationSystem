import React from "react";
import { Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import styles from "../styles";
import NavIcon from "./NavIcon";

const Container = styled.TouchableOpacity`
  padding-left: 20px;
`;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => null}>
    <NavIcon name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} />
  </Container>
));
