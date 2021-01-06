import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { List, withStyles, Avatar, Text, Button } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { cameraPlaceholder } from "@app/assets";
import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { NameValidator } from "@app/validators";
import ValidationInput from "../../../components/common/ValidationInput";

class RemedyResults extends Component {

  // Getting the Percentage and defining the Stages
  getRemedyStage = (percentage) => {
    let stage = "Stage 1";

    if (parseFloat(percentage) < 30) {
      stage = "Stage 1";
    } else if (parseFloat(percentage) > 30 && parseFloat(percentage) < 70) {
      stage = "Stage 2";
    } else if (parseFloat(percentage) > 70) {
      stage = "Stage 3";
    } else {
      stage = "Stage 1";
    }

    return stage;
  };

  render() {
    const {
      themedStyle,
      remedy: { image, remedyClass, result_percentage },
    } = this.props;
    return (
      <ScrollableAvoidKeyboardComponent style={themedStyle.container}>
        <LinearGradient colors={["#077806", "#ffffff"]} style={{ flex: 1 }}>
          <View style={themedStyle.mainContainer}>
            <View style={[themedStyle.imageContainer]}>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <View style={themedStyle.valueContainer}>
              <Text
                style={{ color: "#ffffff", fontSize: 18, marginBottom: 10 }}
              >
                Disorder Type :
              </Text>
              <Text
                style={{ color: "#00420a", fontSize: 18, marginBottom: 10 }}
              >
                {` ${remedyClass}`}
              </Text>
            </View>
            <View style={themedStyle.valueContainer}>
              <Text
                style={{ color: "#ffffff", fontSize: 18, marginBottom: 10 }}
              >
                Disorder Degree :
              </Text>
              <Text
                style={{ color: "#00420a", fontSize: 18, marginBottom: 10 }}
              >
                {` ${this.getRemedyStage(result_percentage)}`}
              </Text>
            </View>
            <View style={themedStyle.soilContainer}>
              <View style={themedStyle.soilCard}>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  12
                </Text>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 20,
                    fontWeight: "600",
                    marginVertical: 8,
                    marginHorizontal: 4,
                  }}
                >
                  N
                </Text>
              </View>
              <View style={themedStyle.soilCard}>
                <Text
                  style={{ color: "#ffffff", fontSize: 20, fontWeight: "600" }}
                >
                  15
                </Text>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 20,
                    fontWeight: "600",
                    marginVertical: 8,
                    marginHorizontal: 4,
                  }}
                >
                  P
                </Text>
              </View>
              <View style={themedStyle.soilCard}>
                <Text
                  style={{ color: "#ffffff", fontSize: 20, fontWeight: "600" }}
                >
                  23
                </Text>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 20,
                    fontWeight: "600",
                    marginVertical: 8,
                    marginHorizontal: 4,
                  }}
                >
                  K
                </Text>
              </View>
            </View>
            <View style={themedStyle.buttonContainer}>
              <Button
                size="large"
                style={themedStyle.SignUpButton}
                onPress={() => this.props.navigate("Remedy Researches")}
              >
                Check Remedy
              </Button>
            </View>
          </View>
        </LinearGradient>
      </ScrollableAvoidKeyboardComponent>
    );
  }
}

const Actions = {
  navigate,
  navigateAndReset,
};

const RemedyResultsContainer = withStyles(RemedyResults, () => ({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  mainContainer: {
    flex: 1,
  },
  valueContainer: {
    flexDirection: "row",
    marginHorizontal: 8,
    marginVertical: 8,
  },
  textInput: {
    marginTop: 8,
  },
  soilContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 8,
    marginVertical: 8,
  },
  soilCard: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#00420a",
    marginHorizontal: 8,
    marginVertical: 8,
    padding: 30,
    borderRadius: 10,
  },
  buttonContainer: { marginVertical: 8, marginHorizontal: 8, marginBottom: 20 },
}));

function mapStateToProps(state) {
  return {
    remedy: state.remedy.remedy,
  };
}

export default connect(mapStateToProps, Actions)(RemedyResultsContainer);
