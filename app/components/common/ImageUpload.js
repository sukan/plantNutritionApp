import React, { Component, Fragment } from "react";
import { ActivityIndicator, TouchableOpacity, View, Image } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";

import * as firebase from "firebase";
import firebaseConfig from "@app/config/firebase";

import { PhotoIcon, CameraIcon } from "@app/assets/icons";

firebase.initializeApp(firebaseConfig);
export default class ImageUpload extends Component {
  state = {
    image: null,
    uploading: false,
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image, uploading } = this.state;

    return (
      <View
        style={{
          flexDirection: "row",
          width: 200,
        }}
      >
        {image ? (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        ) : uploading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <Fragment>
            <TouchableOpacity onPress={this._pickImage}>
              <PhotoIcon style={{ width: 100, height: 100 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._takePhoto}>
              <CameraIcon style={{ width: 100, height: 100 }} />
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    );
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        let uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
        this.props.onFinishUploading(
          uploadUrl,
          `data:image/jpeg;base64,${pickerResult.base64}`
        );
      }
    } catch (e) {
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {

  const response = await fetch(uri);
  const blob = await response.blob();

  console.log(blob);

  const ref = firebase
    .storage()
    .ref()
    .child("images/" + new Date().toString());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}
