import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { List, withStyles, Avatar, Text, Button } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { cameraPlaceholder } from "@app/assets";
import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { NameValidator } from "@app/validators";
import ValidationInput from "../../../components/common/ValidationInput";
import { ASYNC_STATUS } from "@app/constants/async";

import {
  getVerificationsList,
  initializeVerifications,
} from "@app/actions/verification";
import { textTruncate } from "../../../helpers/helpers/reactNative";

class VerificationList extends Component {
  componentDidMount() {
    const {
      getVerificationsList,
      user: { username, researchCenter },
      initializeVerifications,
    } = this.props;

    initializeVerifications();
    getVerificationsList({ username, researchCenter });
  }

  render() {
    const { themedStyle, verifications, status } = this.props;

    return (
      <ScrollableAvoidKeyboardComponent style={themedStyle.container}>
        <LinearGradient colors={["#077806", "#ffffff"]} style={{ flex: 1 }}>
          <View style={themedStyle.mainContainer}>
            {status === ASYNC_STATUS.LOADING && (
              <View>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}
            {verifications &&
              verifications.map((verification) => {
                return (
                  <TouchableOpacity
                    key={verification.verificationId}
                    style={themedStyle.verificationBox}
                    onPress={() =>
                      this.props.navigate("Verification", {
                        verificationId: verification.verificationId,
                      })
                    }
                  >
                    {verification.checked ? (
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
                    ) : (
                      <Text
                        style={{
                          color: "#808080",
                          fontSize: 10,
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        PENDING
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
                      {verification.deficiency}
                    </Text>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 12,
                        fontWeight: "300",
                        textAlign: "center",
                      }}
                    >
                      {verification.stage}
                    </Text>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontWeight: "700",
                        fontSize: 16,
                        fontWeight: "300",
                        textAlign: "center",
                      }}
                    >
                      {textTruncate(verification.findings, 100)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </LinearGradient>
      </ScrollableAvoidKeyboardComponent>
    );
  }
}

const Actions = {
  navigate,
  navigateAndReset,
  getVerificationsList,
  initializeVerifications,
};

const VerificationListContainer = withStyles(VerificationList, () => ({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  verificationBox: {
    backgroundColor: "#09570a",
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
  },
}));

function mapStateToProps(state) {
  return {
    remedy: state.remedy.remedy,
    user: state.auth.user,
    verifications: state.verification.verifications,
    status: state.verification.status,
  };
}

export default connect(mapStateToProps, Actions)(VerificationListContainer);
