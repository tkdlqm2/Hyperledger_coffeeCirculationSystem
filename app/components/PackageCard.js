import React from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";
import PackageProductCard from "../components/PackageProductCard";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const DataContainer = styled.View`
  padding-horizontal: 20px;
  margin-bottom: 40px;
`;

const Column = styled.View``;

const MasonryContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  border: 1px solid #ebebeb;
  padding: 10px;
  border-radius: 15px;
  background-color: #f6f6f6;
`;

const splitArray = arr => {
  const { length } = arr;
  const half = length / 2;
  const firstHalf = arr.slice(0, 2);
  const secondHalf = arr.slice(2, 4);
  return { firstHalf, secondHalf };
};

export default ({ products }) => {
  return (
    <DataContainer>
      <MasonryContainer>
        <Column>
          {splitArray(products).firstHalf.map(product => (
            <PackageProductCard
              imgSrc={product.uri}
              price={product.price}
              name={product.name}
              exuri={product.exuri}
              key={product.name}
            />
          ))}
        </Column>
        <Column>
          {splitArray(products).secondHalf.map(product => (
            <PackageProductCard
              imgSrc={product.uri}
              price={product.price}
              name={product.name}
              exuri={product.exuri}
              key={product.name}
            />
          ))}
        </Column>
      </MasonryContainer>
    </DataContainer>
  );
};
