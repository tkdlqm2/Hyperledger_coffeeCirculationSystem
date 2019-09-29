import React, { Component, useState } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Button,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";
import styled from "styled-components";
import styles from "../styles";

const Container = styled.ScrollView``;

const OptionCardContainer = styled.View``;

const OptionContainer = styled.View`
  width: ${constants.width};
`;

const ImageContainer = styled.View`
  padding: 5px;
  border-color: ${props => (props.selected ? "#003569" : styles.darkGreyColor)};
  border-width: ${props => (props.selected ? 3 : 1)};
  border-radius: 15px;
`;

const OptionText = styled.Text`
  text-align: center;
`;

const FirstOption = styled.View``;

const SecondOption = styled.View``;

const ThirdOption = styled.View``;

const BigText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  padding: 30px;
`;

const Cards = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: rgba(151, 151, 151, 0.1);
  margin-top: 30px;
`;

const OptionCard = ({ image }) => {
  const [selected, setSelected] = useState(false);
  const toggleSelected = () => setSelected(i => !i);
  return (
    <OptionCardContainer>
      <TouchableOpacity onPress={toggleSelected}>
        <ImageContainer selected={selected}>
          <Image
            source={image}
            style={{
              width: constants.width / 4,
              height: constants.height / 6,
              borderRadius: 15,
              padding: 10
            }}
          />
        </ImageContainer>
      </TouchableOpacity>
    </OptionCardContainer>
  );
};

class CoffeeOption extends Component {
  render() {
    return (
      <Container>
        <OptionContainer>
          <FirstOption>
            <BigText>Step 1: 타입 선택</BigText>
          </FirstOption>
          <Cards>
            <View>
              <OptionCard image={require("../assets/coffee/4.jpg")} />
              <OptionText>원두</OptionText>
            </View>
            <View>
              <OptionCard image={require("../assets/coffee/5.jpg")} />
              <OptionText>드립백</OptionText>
            </View>
            <View>
              <OptionCard image={require("../assets/coffee/6.jpg")} />
              <OptionText>콜드브루</OptionText>
            </View>
          </Cards>
        </OptionContainer>
        <Divider />
        <OptionContainer>
          <SecondOption>
            <BigText>Step 2: 수량 선택</BigText>
          </SecondOption>
          <Cards>
            <View>
              <OptionCard image={require("../assets/coffee/1.jpg")} />
              <OptionText>200g</OptionText>
            </View>
            <View>
              <OptionCard image={require("../assets/coffee/2.jpg")} />
              <OptionText>400g</OptionText>
            </View>
            <View>
              <OptionCard image={require("../assets/coffee/3.jpg")} />
              <OptionText>600g</OptionText>
            </View>
          </Cards>
        </OptionContainer>
        <Divider />
        <OptionContainer>
          <ThirdOption>
            <BigText>Step 3: 기간 선택</BigText>
          </ThirdOption>
          <Cards>
            <View>
              <OptionCard image={require("../assets/coffee/1week.png")} />
              <OptionText>200g</OptionText>
            </View>
            <View>
              <OptionCard image={require("../assets/coffee/2weeks.png")} />
              <OptionText>400g</OptionText>
            </View>
            <View>
              <OptionCard image={require("../assets/coffee/1month.png")} />
              <OptionText>600g</OptionText>
            </View>
          </Cards>
        </OptionContainer>
        <Divider />
      </Container>
    );
  }
}

export default CoffeeOption;
