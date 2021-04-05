import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, Alert } from "react-native";
import { Container, Text, Label, Icon } from "native-base";
import { ChangePassStyle as styles } from "../../styles";
import { useMutation } from "@apollo/react-hooks";
import { CHANGEPASS_USER } from "../../graphql/mutations/profile/changePass/changePassMutation";
import * as SecureStore from "expo-secure-store";

export default function ChangePassword({ navigation }) {
  const [state, setState] = useState({
    userId: "",
    username: "",
    password: "",
    confirmPassword: "",
    oldPassword: "",
  });

  const [changePass] = useMutation(CHANGEPASS_USER);

  function onChangeHandler(event, name) {
    event.persist();
    setState({
      ...state,
      [name]: event.nativeEvent.text,
    });
  }

  async function GetUserDetails() {
    const userName = await SecureStore.getItemAsync("UserName")
    const userId = await SecureStore.getItemAsync("UserId")
    
    if (userName || userId) {
      setState({
        ...state,
        "username": userName,
        "userId": userId,
      });
    }
  }

  useEffect(() => {
    GetUserDetails()
  }, [])

  async function SubmitHandler(event) {
    event.preventDefault();
    if (state.password !== state.confirmPassword) {
      return Alert.alert("Password Mismatch");
    }
    const res = await changePass({
      variables: {
        userId: state.userId,
        username: state.username,
        password: state.password,
      },
    }).catch((res) => {
      const errors = res.graphQLErrors.map((error) => {
        return error.message;
      });
    });
    if (res.data.updateUser.ok) {
      Alert.alert("Successfully Change Password");
    }
  }

  return (
    <Container>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.firstContainer}>
            {/* <View style={styles.inputContainer}>
              <Label>Username</Label>
              <TextInput
                style={styles.textInput}
                onChange={(event) => onChangeHandler(event, "username")}
              />
            </View> */}
            <View style={styles.inputContainer}>
              <Label>Old Password</Label>
              <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                onChange={(event) => onChangeHandler(event, "oldPassword")}
              />
            </View>
            <View style={styles.inputContainer}>
              <Label>New Password</Label>
              <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                onChange={(event) => onChangeHandler(event, "password")}
              />
            </View>
            <View style={styles.inputContainer}>
              <Label>Repeat New Password</Label>
              <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                onChange={(event) => onChangeHandler(event, "confirmPassword")}
              />
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={SubmitHandler} style={styles.saveButton}>
            <Text style={styles.saveText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
