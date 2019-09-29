import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import ScanQR from "../screens/Photo/ScanQR";
import History from "../screens/Photo/History";
import { stackStyles } from "./config";
import styles from "../styles";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    ScanQR: {
      screen: ScanQR,
      navigationOptions: {
        tabBarLabel: "Camera"
      }
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: "History"
      }
    }
  },
  {
    tabBarPosition: "top",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: styles.darkBlueColor
      },
      labelStyle: {
        color: styles.blackColor,
        fontWeight: "600"
      },
      style: {
        ...stackStyles
      }
    }
  }
);

export default createStackNavigator(
  {
    Tabs: {
      screen: PhotoTabs,
      navigationOptions: {
        title: "Scan QR Code",
        headerBackTitle: null
      }
    }
  },
  { headerLayoutPreset: "center" },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles
      },
      headerTintColor: styles.blackColor
    }
  }
);
