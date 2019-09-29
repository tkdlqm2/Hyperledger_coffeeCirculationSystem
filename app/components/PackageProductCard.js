import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";

const Container = styled.View`
  margin-bottom: 20px;
`;

const ImageContainer = styled.View`
  box-shadow: 0px 10px 15px rgba(60, 60, 60, 0.4);
  width: ${Layout.window.width / 2 - 40};
  border-radius: 15px;
  elevation: 4;
  min-height: 150px;
  margin-vertical: 5px;
`;

const PackageProductCard = ({ imgSrc, name, price, exuri, navigation }) => (
  <TouchableWithoutFeedback
    onPress={() =>
      navigation.navigate("Product", { imgSrc, name, price, exuri })
    }>
    <ImageContainer>
      <AutoHeightImage
        width={Layout.window.width / 2 - 40}
        height={Layout.window.width / 2 - 40}
        source={{ uri: imgSrc }}
        style={{
          borderRadius: 15
        }}
      />
    </ImageContainer>
  </TouchableWithoutFeedback>
);

PackageProductCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default withNavigation(PackageProductCard);
