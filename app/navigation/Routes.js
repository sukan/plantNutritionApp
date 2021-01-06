import React from "react";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { enableScreens } from "react-native-screens";

import HomeScreen from "@app/containers/layouts/home";
import SplashScreen from "@app/containers/layouts/splash";
import { SignIn, SignUp } from "@app/containers/layouts/auth";
import ScanRemedy from "@app/containers/layouts/remedy/scanRemedy.js";
import RemedyResults from "@app/containers/layouts/remedy/remedyResults.js";
import RemedyResearches from "@app/containers/layouts/remedy/remedyResearches.js";

import VerificationList from "@app/containers/layouts/verification/verificationList.js";
import Verification from "@app/containers/layouts/verification/verification.js";

import { ArrowBackIcon } from "@app/assets/icons";
import { TopNavigationBar } from "./components/topNavigationBar";

import { getCurrentRouteState, isRootRoute } from "./util";
import { KEY_NAVIGATION_BACK } from "./constants";

const MenuTopNavigationParams = {
  header: (props) => {
    const { routeName } = getCurrentRouteState(props.navigation);
    return (
      <TopNavigationBar
        {...props}
        backIcon={!isRootRoute(routeName) && ArrowBackIcon}
        title={routeName}
        onBackPress={() => {
          props.navigation.goBack(KEY_NAVIGATION_BACK);
        }}
      />
    );
  },
};

const AuthNavigationMap = {
  ["Sign In"]: SignIn,
  ["Sign Up"]: SignUp,
};

const RemedyNavigationMap = createStackNavigator(
  {
    ["Scan Remedy"]: ScanRemedy,
    ["Remedy Results"]: RemedyResults,
    ["Remedy Researches"]: RemedyResearches,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const VerificationNavigationMap = createStackNavigator(
  {
    ["Verification List"]: VerificationList,
    ["Verification"]: Verification,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const DashboardNavigationMap = createStackNavigator(
  {
    ["Home"]: HomeScreen,
    ["Scan Remedy"]: RemedyNavigationMap,
    ["Verification List"]: VerificationNavigationMap,
  },
  {
    defaultNavigationOptions: MenuTopNavigationParams,
  }
);

const Routes = createStackNavigator(
  {
    ["Splash"]: SplashScreen,
    Dashboard: DashboardNavigationMap,
    ...AuthNavigationMap,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const createAppRouter = (container) => {
  enableScreens();
  return createAppContainer(container);
};

export default createAppRouter(Routes);
