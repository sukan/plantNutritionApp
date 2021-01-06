import React, { Component } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { List, withStyles, Avatar, Text, Button } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { cameraPlaceholder } from "@app/assets";
import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { NumberValidator } from "@app/validators";
import ValidationInput from "../../../components/common/ValidationInput";
import ImageUpload from "@app/components/common/ImageUpload";
import { getRemedyDetails } from "@app/actions/remedy";
import Alert from "@app/components/Alert";
import { ASYNC_STATUS } from "@app/constants/async";

class ScanRemedy extends Component {
  constructor() {
    super();

    this.state = {
      image: "",
      baseString: "",
      phValue: "",
      cvValue: "",
      mvValue: "",
      cValue: "",
    };
  }

  onImageUpload = (image, baseString) => {
    this.setState({
      ...this.state,
      image,
      baseString,
    });
  };

  onChangeFormField = (value) => {
    this.setState({
      ...this.state,
      ...value,
    });
  };

  onSubmitDetails = () => {
    const { image, baseString, phValue, mvValue, cValue, cvValue } = this.state;

    this.props.getRemedyDetails(image, baseString, {
      phValue,
      mvValue,
      cValue,
      cvValue,
    });
  };

  render() {
    const { themedStyle, notification, status } = this.props;
    const { phValue, cValue, cvValue, mvValue } = this.state;

    return (
      <ScrollableAvoidKeyboardComponent style={themedStyle.container}>
        <LinearGradient colors={["#077806", "#ffffff"]} style={{ flex: 1 }}>
          <View style={themedStyle.mainContainer}>
            <View style={[themedStyle.imageContainer]}>
              <ImageUpload onFinishUploading={this.onImageUpload} />
            </View>
            <View style={themedStyle.valueContainer}>
              <Text
                style={{ color: "#ffffff", fontSize: 18, marginBottom: 10 }}
              >
                Insert the following values:
              </Text>
              <ValidationInput
                style={themedStyle.textInput}
                label="PH Value"
                validator={NumberValidator}
                value={phValue}
                onChangeText={(phValue) => this.onChangeFormField({ phValue })}
              />
              <ValidationInput
                style={themedStyle.textInput}
                label="CV Value"
                validator={NumberValidator}
                value={cvValue}
                onChangeText={(cvValue) => this.onChangeFormField({ cvValue })}
              />
              <ValidationInput
                style={themedStyle.textInput}
                label="MV Value"
                validator={NumberValidator}
                value={mvValue}
                onChangeText={(mvValue) => this.onChangeFormField({ mvValue })}
              />
              <ValidationInput
                style={themedStyle.textInput}
                label="C Value"
                validator={NumberValidator}
                value={cvValue}
                onChangeText={(cvValue) => this.onChangeFormField({ cvValue })}
              />
            </View>
            {notification !== null && (
              <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
            )}
            {status === ASYNC_STATUS.LOADING ? (
              <View style={themedStyle.buttonContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            ) : (
              <View style={themedStyle.buttonContainer}>
                <Button
                  size="large"
                  style={themedStyle.SignUpButton}
                  onPress={this.onSubmitDetails}
                >
                  Predict
                </Button>
              </View>
            )}
          </View>
        </LinearGradient>
      </ScrollableAvoidKeyboardComponent>
    );
  }
}

const Actions = {
  navigate,
  navigateAndReset,
  getRemedyDetails,
};

const ScanRemedyContainer = withStyles(ScanRemedy, () => ({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
  },
  valueContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  textInput: {
    marginTop: 8,
  },
  buttonContainer: { marginVertical: 8, marginHorizontal: 8, marginBottom: 20 },
}));

function mapStateToProps(state) {
  return {
    notification: state.remedy.notification,
    status: state.remedy.status,
  };
}

export default connect(mapStateToProps, Actions)(ScanRemedyContainer);
