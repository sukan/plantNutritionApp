import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { List, withStyles, Avatar, Text, Button } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { cameraPlaceholder } from "@app/assets";
import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { NameValidator } from "@app/validators";
import ValidationInput from "../../../components/common/ValidationInput";
import {
  initializeVerification,
  getVerification,
} from "@app/actions/verification";
import { ASYNC_STATUS } from "@app/constants/async";
import Alert from "@app/components/Alert";

class Verification extends Component {
  componentDidMount() {
    const {
      initializeVerification,
      getVerification,
      navigation,
      user: { researchCenter },
    } = this.props;

    console.log(this.props.navigation.state.params.verificationId);

    initializeVerification();
    getVerification({
      verificationId: navigation.state.params.verificationId,
      researchCenter,
    });
  }

  render() {
    const { themedStyle, status, notification, verification } = this.props;
    return (
      <ScrollableAvoidKeyboardComponent style={themedStyle.container}>
        <LinearGradient colors={["#077806", "#ffffff"]} style={{ flex: 1 }}>
          <View style={themedStyle.mainContainer}>
            {verification.image !== "" && (
              <View style={[themedStyle.imageContainer]}>
                <Image
                  source={{ uri: verification.image }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            )}
            {notification !== null && (
              <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
            )}
            {status === ASYNC_STATUS.LOADING && (
              <View>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}
            {verification && (
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
                    {verification.deficiency}
                  </Text>
                </View>
                <View style={themedStyle.findings}>
                  <Text style={{ color: "#ffffff", fontSize: 14 }}>
                    {verification.findings}
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
                  {verification.products.map((product, index) => {
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
                <View style={themedStyle.verificationNote}>
                  <Text style={{ color: "#ffffff", fontSize: 14 }}>
                    {verification.verificationNote}
                  </Text>
                </View>
              </View>
            )}
            <View style={themedStyle.buttonContainer}>
              <Button
                size="large"
                style={themedStyle.SignUpButton}
                onPress={() => this.props.navigateAndReset("Dashboard")}
              >
                Got it
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
  initializeVerification,
  getVerification,
};

const VerificationContainer = withStyles(Verification, () => ({
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
  verificationNote: {
    justifyContent: "center",
    backgroundColor: "#c77512",
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
  buttonContainer: { marginVertical: 8, marginHorizontal: 8, marginBottom: 20 },
}));

function mapStateToProps(state) {
  return {
    remedy: state.remedy.remedy,
    user: state.auth.user,
    verification: state.verification.verification,
    status: state.verification.status,
    notification: state.verification.notification,
  };
}

export default connect(mapStateToProps, Actions)(VerificationContainer);
