import React from "react";
import styled from "styled-components";
import Log from "../../components/Log";
import ValueLog from "../../components/ValueLog";
import { TouchableOpacity, AsyncStorage } from "react-native";
import Swiper from "react-native-swiper";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import Store from "../../components/Store";

const getHeight = () =>
  Layout.window.height <= 667
    ? Layout.window.height / 2.8
    : Layout.window.height / 2.3;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollView = styled.ScrollView``;

const Image = styled.Image`
  width: ${Layout.window.width};
  height: ${getHeight()};
  position: relative;
`;

const Image2 = styled.Image`
  width: ${Layout.window.width};
  height: ${getHeight()};
`;

const DataContainer = styled.View`
  padding-horizontal: 20px;
`;

const TimeLocation = styled.Text`
  color: ${Colors.greyColor};
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const NamePrice = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const NamePriceText = styled.Text`
  font-size: 24px;
  color: ${Colors.blackColor};
  font-weight: 600;
`;

const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: rgba(151, 151, 151, 0.1);
  margin-top: 30px;
`;

const Description = styled.Text`
  margin-bottom: 25px;
  color: ${Colors.greyColor};
`;

const SeeLogText = styled.Text`
  font-size: 16px;
  color: ${Colors.blackColor};
  font-weight: 500;
`;

const ButtonContainer = styled.View``;

export default ({ navigation }) => {
  const imgSrc = navigation.getParam("imgSrc");
  const name = navigation.getParam("name");
  const price = navigation.getParam("price");
  const country = navigation.getParam("country");
  const rate = navigation.getParam("rate");
  const storeName = navigation.getParam("storeName");
  const storeLocation = navigation.getParam("storeLocation");
  const data = navigation.dangerouslyGetParent().getParam("data");
  const exuri = navigation.getParam("exuri");

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} bounces={false}>
        <Swiper
          style={{ height: getHeight(), marginBottom: 20 }}
          activeDotColor="white"
          dotColor="rgba(255, 255, 255, 0.3)">
          <Image
            source={{
              uri: imgSrc
            }}
          />
          <Image
            source={{
              uri: imgSrc
            }}
          />
          <Image
            source={{
              uri: imgSrc
            }}
          />
        </Swiper>
        <DataContainer>
          <NamePrice>
            <TimeLocation>{`아라비카 • AA등급`}</TimeLocation>
            <TouchableOpacity
              onPress={() => navigation.navigate("Tracking", { data })}>
              <ButtonContainer>
                {price ? (
                  <NamePriceText>{`${price}원`}</NamePriceText>
                ) : (
                  <SeeLogText>{"이력조회  >"}</SeeLogText>
                )}
              </ButtonContainer>
            </TouchableOpacity>
          </NamePrice>
          <NamePriceText>{name}</NamePriceText>
          <Divider />
          <ScrollView>
            <Image2 source={require("../../assets/coffee/ex2.jpg")} />
          </ScrollView>
        </DataContainer>
      </ScrollView>
      <Store
        storeName={storeName}
        location={storeLocation}
        avatarUrl={require("../../assets/coffee/cafe1.jpg")}
      />
    </Container>
  );
};
