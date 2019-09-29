import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import Swiper from "react-native-swiper";
import Layout from "../constants/Layout";

const getHeight = () =>
  Layout.window.height <= 667
    ? Layout.window.height / 3.3
    : Layout.window.height / 2.8;

const Image = styled.Image`
  width: ${Layout.window.width};
  height: ${getHeight()};
  position: relative;
`;

const Column = styled.View``;

const ScrollView = styled.ScrollView``;

const MasonryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20;
`;

const splitArray = arr => {
  const { length } = arr;
  const half = length / 2;
  const firstHalf = arr.slice(0, half);
  const secondHalf = arr.slice(half, length);
  return { firstHalf, secondHalf };
};

const MasonryProducts = ({ products, children = null }) => (
  <ScrollView contentContainerStyle={{}}>
    <Swiper
      style={{ height: getHeight(), marginBottom: 20 }}
      activeDotColor="white"
      dotColor="rgba(255, 255, 255, 0.3)">
      <Image source={require("../assets/coffee/dlv2.png")} />
      <Image source={require("../assets/coffee/banner.jpg")} />
      <Image source={require("../assets/coffee/banner2.jpg")} />
    </Swiper>
    {children}
    <MasonryContainer>
      <Column>
        {splitArray(products).firstHalf.map(product => (
          <ProductCard
            imgSrc={product.uri}
            price={product.price}
            name={product.name}
            key={product.name}
            exuri={product.exuri}
          />
        ))}
      </Column>
      <Column>
        {splitArray(products).secondHalf.map(product => (
          <ProductCard
            imgSrc={product.uri}
            price={product.price}
            name={product.name}
            key={product.name}
            exuri={product.exuri}
          />
        ))}
      </Column>
    </MasonryContainer>
  </ScrollView>
);

MasonryProducts.propTypes = {
  products: PropTypes.instanceOf(Array),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default MasonryProducts;
