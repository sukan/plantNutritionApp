import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { List, withStyles, Avatar, Text, Button } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { cameraPlaceholder } from "@app/assets";
import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { NameValidator } from "@app/validators";
import ValidationInput from "../../../components/common/ValidationInput";
import Alert from "@app/components/Alert";
import { ASYNC_STATUS } from "@app/constants/async";

import { getResearchDetails, resetResearch } from "@app/actions/remedy";
import { createVerification } from "@app/actions/verification";

class RemedyResearches extends Component {
  componentDidMount() {
    const {
      remedy: { remedyClass },
      user: { researchCenter },
    } = this.props;

    this.props.resetResearch();
    this.props.getResearchDetails({ deficiency: remedyClass, researchCenter });
  }

  onRequestVerifications = () => {
    const {
      user: { username, researchCenter },
      research,
      remedy: {
        image,
        result_percentage,
        nValue,
        pValue,
        kValue,
        remedyClass: deficiency,
      },
    } = this.props;

    this.props.createVerification({
      verificationId: `${username}-${new Date().toString()}`,
      username,
      deficiency,
      stage: this.getRemedyStage(result_percentage),
      findings: research ? research.findings : "",
      products: research ? research.products : [],
      researchCenter,
      image,
      nValue,
      pValue,
      kValue,
      checked: false,
    });
  };

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
      remedy: { image },
      notification,
      research,
      status,
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
            {notification !== null && (
              <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
            )}
            {status === ASYNC_STATUS.LOADING && (
              <View>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}
            {research && (
              <View style={themedStyle.researchContainer}>
                <View style={themedStyle.topic}>
                  <Text
                    style={{
                      color: "#00420a",
                      fontSize: 24,
                      lineHeight: 50,
                      marginBottom: 10,
                      alignSelf: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {research.deficiency}
                  </Text>
                </View>
                <View style={themedStyle.findings}>
                  <Text style={{ color: "#ffffff", fontSize: 14 }}>
                    {research.findings}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginHorizontal: 8,
                    marginVertical: 8,
                    alignSelf: "center",
                  }}
                >
                  Products
                </Text>
                <ScrollView horizontal={true} style={themedStyle.products}>
                  {research.products.map((product, index) => {
                    return (
                      <View key={index} style={themedStyle.productCard}>
                        {product.verified && (
                          <Text
                            style={{
                              color: "#20ff08",
                              fontSize: 10,
                              fontWeight: "bold",
                              textAlign: "right",
                            }}
                          >
                            VERIFIED
                          </Text>
                        )}
                        <Text
                          style={{
                            color: "#ffffff",
                            fontSize: 16,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {product.productName}
                        </Text>
                        <Text
                          style={{
                            color: "#ffffff",
                            fontSize: 12,
                            fontWeight: "300",
                            textAlign: "center",
                          }}
                        >
                          {product.vendor}
                        </Text>
                        <Text
                          style={{
                            color: "#63e010",
                            fontWeight: "700",
                            fontSize: 16,
                            fontWeight: "300",
                            textAlign: "center",
                          }}
                        >
                          {`Rs ${parseFloat(product.unitPrice).toFixed(2)}`}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}
            <View style={themedStyle.buttonContainer}>
              <Button
                size="large"
                style={themedStyle.SignUpButton}
                onPress={this.onRequestVerifications}
              >
                Request Verification
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
  getResearchDetails,
  resetResearch,
  createVerification,
};

const RemedyResearchesContainer = withStyles(RemedyResearches, () => ({
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
    marginHorizontal: 8,
    marginVertical: 8,
  },
  researchContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  textInput: {
    marginTop: 8,
  },
  topic: {
    flex: 1,
    justifyContent: "center",
  },
  findings: {
    justifyContent: "center",
    backgroundColor: "#19852a",
    marginHorizontal: 8,
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
  },
  products: {
    marginHorizontal: 8,
    marginVertical: 8,
    flexDirection: "row",
    width: "100%",
    overflow: "scroll",
  },
  productCard: {
    width: 200,
    justifyContent: "center",
    backgroundColor: "#00420a",
    marginHorizontal: 8,
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
    marginBottom: 20,
    marginTop: 20,
  },
}));

function mapStateToProps(state) {
  return {
    remedy: state.remedy.remedy,
    notification: state.remedy.notification,
    status: state.remedy.status,
    user: state.auth.user,
    research: state.remedy.research,
  };
}

export default connect(mapStateToProps, Actions)(RemedyResearchesContainer);
