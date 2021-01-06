import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { List, withStyles, Avatar, Text, Button } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import Speedometer from "react-native-speedometer-chart";

import {
  dietPlanIcon,
  heartRateIcon,
  moodPlanIcon,
  exercisePlanIcon,
} from "@app/assets";
import LayoutsListItem from "@app/components/home/LayoutsListItemComponent";
import { navigate, navigateAndReset } from "@app/actions/routes";
import {
  imageLogoutIcon,
  imageAvatarMale,
  imageAvatarFemale,
} from "@app/assets";
import { LOGOUT_ACTION, GENDER_TYPES } from "@app/constants/auth";
import { userLogout } from "@app/actions/auth";

const { width } = Dimensions.get("window");
const itemWidth: number = width / 2 - 16;

class HomeScreen extends Component {
  renderItem = (info) => {
    const {
      themedStyle: { item: itemStyles },
    } = this.props;
    if (info.item.action) {
      return (
        <LayoutsListItem
          style={itemStyles}
          data={info.item}
          onPress={info.item.action}
        />
      );
    }
    return (
      <LayoutsListItem
        style={itemStyles}
        data={info.item}
        onPress={() => this.props.navigate(info.item.route)}
      />
    );
  };

  render() {
    const { themedStyle, userLogout, gender, profileImage, risk } = this.props;
    const avatarImage = profileImage
      ? { uri: profileImage }
      : gender === GENDER_TYPES.MALE
      ? imageAvatarMale
      : imageAvatarFemale;
    return (
      <LinearGradient colors={["#077806", "#ffffff"]} style={{ flex: 1 }}>
        <View style={[themedStyle.detailsContainer]}>
          <Avatar style={themedStyle.profileAvatar} source={avatarImage} />
        </View>
        <View style={[themedStyle.buttonContainer]}>
          <Button
            size="giant"
            style={{
              borderColor: "#077806",
              marginBottom: 10,
              marginTop: 10,
            }}
            textStyle={{ color: "#ffffff", fontWeight: "bold" }}
            onPress={() => this.props.navigate("Scan Remedy")}
          >
            Research Remedy
          </Button>
          <Button
            size="giant"
            style={{
              borderColor: "#077806",
              marginBottom: 10,
              marginTop: 10,
            }}
            textStyle={{ color: "#ffffff", fontWeight: "bold" }}
            onPress={() => this.props.navigate("Verification List")}
          >
            Verification Requests
          </Button>
          <Button
            size="giant"
            style={{
              borderColor: "#077806",
              backgroundColor: "transparent",
              marginBottom: 10,
              marginTop: 10,
            }}
            textStyle={{ color: "#ffffff", fontWeight: "bold" }}
            onPress={userLogout}
          >
            Logout
          </Button>
        </View>
      </LinearGradient>
    );
  }
}

const Actions = {
  navigate,
  userLogout,
  navigateAndReset,
};

const HomeScreenContainer = withStyles(HomeScreen, () => ({
  container: {
    paddingTop: 8,
    backgroundColor: "transparent",
  },
  item: {
    flex: 1,
    height: 130,
    maxWidth: itemWidth,
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: "transparent",
    color: "#2f0bbd",
  },
  detailsContainer: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
    height: 250,
  },
  buttonContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  nameLabel: {
    marginTop: 16,
    color: "#004d8c",
    fontWeight: 700,
  },
  profileAvatar: {
    width: 124,
    height: 124,
  },
}));

function mapStateToProps(state) {
  return {
    gender: state.auth.user.gender,
    profileImage: state.auth.user.image,
  };
}

export default connect(mapStateToProps, Actions)(HomeScreenContainer);
