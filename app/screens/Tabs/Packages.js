import React, { useState } from "react";
import styled from "styled-components";
import PackageView from "../../components/PackageView";
import { products } from "../../products";
import Loader from "../../components/Loader";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export default ({ navigation }) => {
  const data = navigation.dangerouslyGetParent().getParam("data");
  return (
    <Container>
      <PackageView products={products} data={data} />
    </Container>
  );
};
