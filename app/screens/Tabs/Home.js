import React from "react";
import styled from "styled-components";
import Shopping from "../../components/Shopping";
import { products } from "../../products";

const View = styled.View`
  background-color: white;
  flex: 1;
`;

export default () => (
  <View>
    <Shopping products={products} />
  </View>
);
