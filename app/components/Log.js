import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import { Platform, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "./Avatar";
import Colors from "../constants/Colors";
import styles from "../styles";

const Container = styled.View`
  padding: 15px 10px;
  border-radius: 15px;
  border: 1px solid #ebebeb;
  flex-direction: row;
  align-items: center;
`;

const AvatarColumn = styled.View`
  margin-right: 20px;
`;

const Column = styled.View``;

const NameTime = styled.Text``;

const PreviewContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  height: 26px;
`;

const PreviewText = styled.Text`
  font-weight: ${props => (props.unread ? "600" : "400")};
  margin-right: ${props => (props.unread ? "0px" : "10px")};
`;

const IconContainer = styled.View`
  height: 26px;
`;

const TimeLog = styled.View`
  height: 26px;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`;

const Role = styled.Text`
  color: ${styles.darkGreyColor};
`;

const Name = styled.View`
  flex-direction: row;
`;

const TimeStamp = styled.Text``;

const Log = ({ userAvatar, name, role, preview, date, navigation }) => (
  <TouchableWithoutFeedback onPress={() => null}>
    <View>
      <TimeLog>
        <TimeStamp>{date}</TimeStamp>
      </TimeLog>
      <Container>
        <AvatarColumn>
          <Avatar source={userAvatar} />
        </AvatarColumn>
        <Column>
          <Name>
            <NameTime>{`${name}`}</NameTime>
            <Role>{`   •   ${role}`}</Role>
          </Name>
          <PreviewContainer>
            <PreviewText>{preview}</PreviewText>
          </PreviewContainer>
        </Column>
      </Container>
    </View>
  </TouchableWithoutFeedback>
);

Log.propTypes = {
  userAvatar: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  delivered: PropTypes.bool,
  readReceipt: PropTypes.bool,
  pendingRead: PropTypes.number,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired
};

export default withNavigation(Log);
