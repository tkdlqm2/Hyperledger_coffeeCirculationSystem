import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Tracking from "../screens/Tracking/Tracking";
import Product from "../screens/Tracking/Product";
import { stackStyles } from "./config";
import styles from "../styles";

const TrackingTabs = createMaterialTopTabNavigator(
  {
    Product: {
      screen: Product,
      navigationOptions: {
        tabBarLabel: "Product"
      }
    },
    Tracking: {
      screen: Tracking,
      navigationOptions: {
        tabBarLabel: "Tracking"
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
      screen: TrackingTabs,
      navigationOptions: {
        title: "상품 정보",
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
