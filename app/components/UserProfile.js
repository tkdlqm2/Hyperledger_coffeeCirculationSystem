import React, { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";
import { Platform } from "@unimodules/core";
import constants from "../constants";

const ProfileHeader = styled.View`
  padding: 17px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${styles.greyColor};
`;
const HeaderColumn = styled.View`
  padding-vertical: 25px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileStats = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Stat = styled.View`
  align-items: center;
`;

const Bold = styled.Text`
  font-weight: 600;
  font-size: 14px;
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

const ProfileMeta = styled.View`
  padding-horizontal: 20px;
`;

const ButtonContainer = styled.View`
  padding-vertical: 35px;
  border: 1px solid ${styles.greyColor};
  flex-direction: row;
  background-color: ${styles.greyColor};
  margin-bottom: 2px;
`;

const Button = styled.View`
  width: ${constants.width / 4};
  align-items: center;
`;

const ButtonLabel = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

const ListContainer = styled.ScrollView`
  border: 1px solid ${styles.greyColor};
`;

const ListItems = styled.View`
  flex-direction: row;
  padding: 20px 15px;
  border: 1px solid ${styles.greyColor};
`;

const ListText = styled.Text`
  margin-left: 13px;
`;

const UserProfile = ({ avatar, username }) => {
  const clickIcon = () => null;
  return (
    <View>
      <ProfileHeader>
        <Image
          style={{ height: 40, width: 40, borderRadius: 40 }}
          source={{ uri: avatar }}
        />
        <UserInfo>
          <ProfileMeta>
            <Bold>{username}님</Bold>
          </ProfileMeta>
        </UserInfo>
      </ProfileHeader>
      <HeaderColumn>
        <ProfileStats>
          <Stat>
            <Bold>{"1건"}</Bold>
            <StatName>배송 중</StatName>
          </Stat>
          <Stat>
            <Bold>{"3장"}</Bold>
            <StatName>쿠폰</StatName>
          </Stat>
          <Stat>
            <Bold>{"3000p"}</Bold>
            <StatName>포인트</StatName>
          </Stat>
        </ProfileStats>
      </HeaderColumn>

      <ButtonContainer>
        <TouchableOpacity onPress={clickIcon}>
          <Button>
            <Ionicons
              size={32}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
            />
            <ButtonLabel>구매내역</ButtonLabel>
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={clickIcon}>
          <Button>
            <Ionicons
              size={32}
              name={
                Platform.OS === "ios" ? "ios-star-outline" : "md-star-outline"
              }
            />
            <ButtonLabel>내 상품평</ButtonLabel>
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={clickIcon}>
          <Button>
            <Ionicons
              size={32}
              name={
                Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"
              }
            />
            <ButtonLabel>좋아요</ButtonLabel>
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={clickIcon}>
          <Button>
            <Ionicons
              size={32}
              name={Platform.OS === "ios" ? "ios-chatboxes" : "md-chatboxes"}
            />
            <ButtonLabel>Q&A</ButtonLabel>
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      {/* {posts &&
        posts.map(p =>
          isGrid ? (
            <SquarePhoto key={p.id} {...p} />
          ) : (
            <Post key={p.id} {...p} />
          )
        )} */}
      <ListContainer>
        <ListItems>
          <Ionicons
            size={20}
            color={styles.darkGreyColor}
            name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
          />
          <ListText>주문배송조회</ListText>
        </ListItems>
        <ListItems>
          <Ionicons
            size={20}
            color={styles.darkGreyColor}
            name={Platform.OS === "ios" ? "ios-card" : "md-card"}
          />
          <ListText>취소 교환 반품 조회</ListText>
        </ListItems>
        <ListItems>
          <Ionicons
            size={20}
            color={styles.darkGreyColor}
            name={Platform.OS === "ios" ? "ios-create" : "md-create"}
          />
          <ListText>구매 후기</ListText>
        </ListItems>
        <ListItems>
          <Ionicons
            size={20}
            color={styles.darkGreyColor}
            name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
          />
          <ListText>환경설정</ListText>
        </ListItems>
        <ListItems>
          <Ionicons
            size={20}
            color={styles.darkGreyColor}
            name={Platform.OS === "ios" ? "ios-log-out" : "md-log-out"}
          />
          <ListText>로그아웃</ListText>
        </ListItems>
      </ListContainer>
    </View>
  );
};

UserProfile.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default UserProfile;
