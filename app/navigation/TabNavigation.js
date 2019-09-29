import React from "react";
import { Platform } from "react-native";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Tabs/Home";
import Subscribe from "../screens/Tabs/Subscribe";
import MyPage from "../screens/Tabs/MyPage";
import Packages from "../screens/Tabs/Packages";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";
import CartLink from "../components/CartLink";
import MenuLink from "../components/MenuLink";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig,
          headerStyle: { ...stackStyles }
        }
      }
    },
    { headerLayoutPreset: "center" }
  );

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerLeft: <MenuLink />,
        headerRight: <CartLink />,
        headerTitle: (
          <Image
            style={{ height: 30 }}
            resizeMode="contain"
            source={require("../assets/homelogo.png")}
          />
        )
      }),
      title: "Block Coffee",
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          />
        )
      }
    },
    Subscribe: {
      screen: stackFactory(Subscribe, {
        headerLeft: <MenuLink />,
        title: "Subscribe"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-gift" : "md-gift"}
          />
        )
      }
    },
    ScanQR: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-qr-scanner" : "md-qr-scanner"}
          />
        )
      }
    },
    Packages: {
      screen: stackFactory(Packages, {
        title: "정기배송 리스트",
        headerLeft: <MenuLink />,
        headerRight: <CartLink />
      }),
      navigationOptions: {
        tabBarOnPress: ({ navigation }) => navigation.navigate("Packages"),
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-pin" : "md-pin"}
          />
        )
      }
    },
    MyPage: {
      screen: stackFactory(MyPage, {
        title: "MyPage",
        headerLeft: <MenuLink />,
        headerRight: <CartLink />
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      showLabel: true,
      style: {
        backgroundColor: "#FAFAFA"
      }
    }
  }
);
