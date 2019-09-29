import React, { useEffect } from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";
import NewPackageProductCard from "../components/NewPackageProductCard";
import { AsyncStorage } from "react-native";

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

export default ({ data }) => {
  const dataArr = JSON.parse(data);

  return (
    <DataContainer>
      <MasonryContainer>
        <Column>
          {splitArray(dataArr).firstHalf.map(data => (
            <NewPackageProductCard
              imgSrc={
                "https://image.idus.com/image/files/5cec888e38f7403ba9c870f6968d7e86_1440.jpg"
              }
              name={data.v12}
              key={data.key}
              rate={data.v16}
              country={data.v13}
              storeName={data.v24}
              storeLocation={`${data.v18.split(" ")[0]} ${
                data.v18.split(" ")[1]
              }`}
              data={data}
            />
          ))}
        </Column>
        <Column>
          {splitArray(dataArr).secondHalf.map(data => (
            <NewPackageProductCard
              imgSrc={
                "https://image.idus.com/image/files/2646b9b7ff5e497f8f2d3c6443f6bfde_1440.jpg"
              }
              name={data.v12}
              key={data.key}
              rate={data.v16}
              country={data.v13}
              storeName={data.v24}
              storeLocation={`${data.v18.split(" ")[0]} ${
                data.v18.split(" ")[1]
              }`}
              data={data}
            />
          ))}
        </Column>
      </MasonryContainer>
    </DataContainer>
  );
};
