import React from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";
import PackageCard from "./PackageCard";
import NewPackageCard from "./NewPackageCard";
import Layout from "../constants/Layout";
import { View } from "react-native";

const ScrollView = styled.ScrollView``;

const Date = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10px;
`;

const DateText = styled.Text`
  font-size: 15px;
  font-weight: 500;
`;

const InfoContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;
  justify-content: center;
`;

const InfoText = styled.Text`
  font-size: 15px;
  font-weight: 500;
`;

const InfoCardContainer = styled.View`
  width: ${Layout.window.width - 40};
  height: ${Layout.window.width - 40};
  flex-direction: row;
  justify-content: center;
  border: 1px solid #ebebeb;
  padding: 10px;
  border-radius: 15px;
`;

const InfoCard = () => {
  return (
    <InfoCardContainer>
      <InfoText>패키지 정보</InfoText>
    </InfoCardContainer>
  );
};

const PackageInfo = () => {
  return (
    <InfoContainer>
      <InfoCard />
    </InfoContainer>
  );
};

export default ({ products, data }) => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 40, paddingTop: 30 }}
      bounces={false}>
      {/* {data && (
        <View>
          <Date>
            <DateText>2019.09.26 (목)</DateText>
          </Date>
          <NewPackageCard data={data} products={products} />
        </View>
      )} */}
      <Date>
        <DateText>2019.09.26 (목)</DateText>
      </Date>
      <PackageCard products={products.slice(8, 12)} />
      <Date>
        <DateText>2019.09.19 (목)</DateText>
      </Date>
      <PackageCard products={products.slice(0, 4)} />
      <Date>
        <DateText>2019.09.12 (목)</DateText>
      </Date>
      <PackageCard products={products.slice(4, 8)} />
    </ScrollView>
  );
};
