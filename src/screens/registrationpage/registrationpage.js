import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { Container, Text, Input, Thumbnail, Label } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { RegistrationPageStyle as styles } from "../../styles";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER, CREATE_USER_DETAILS } from "../../graphql/mutations/register/registerMutation";

export default function RegistrationPage({ navigation }) {
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    mobileNumber: ""
  });

  const [register] = useMutation(CREATE_USER);

  function onChangeHandler(event, name) {
    event.persist();
    setState({
      ...state,
      [name]: event.nativeEvent.text,
    });
  }

  async function SubmitHandler(event) {
    event.preventDefault();
    const res = await register({
      variables: {
        username: state.username,
        password: state.password,
        emailAddress: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        contactNumber: state.username
      },
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => {
        return error.message;
      });
      Alert.alert(res.graphQLErrors[0].message);
      // Alert.alert("Username already Exists");
    });
    
    if (res.data.createUser.ok) {
      console.log(res.data.createUser.user.id)
        navigation.navigate("Login");
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.signInText}> Register </Text>
        <View style={styles.nameContainer}>
          <View>
            <Label>Firstname</Label>
            <TextInput 
              style={styles.nameInput} 
              onChange={(event) => onChangeHandler(event, "firstName")}
            />
          </View>
          <View>
            <Label style={styles.lastName}>Lastname</Label>
            <TextInput 
              style={styles.lastNameInput} 
              onChange={(event) => onChangeHandler(event, "lastName")}
            />
          </View>
        </View>
        {/* <View style={styles.inputContainer}>
          <Label>Username</Label>
          <TextInput
            style={styles.textInput}
            onChange={(event) => onChangeHandler(event, "username")}
          />
        </View> */}
        <View style={styles.inputContainer}>
          <Label>Mobile Number</Label>
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            // onChange={(event) => onChangeHandler(event, "mobileNumber")}
            onChange={(event) => onChangeHandler(event, "username")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Label>Email</Label>
          <TextInput
            style={styles.textInput}
            onChange={(event) => onChangeHandler(event, "email")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Label>Password</Label>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            onChange={(event) => onChangeHandler(event, "password")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Label>Confirm Password</Label>
          <TextInput secureTextEntry={true} style={styles.textInput} />
        </View>
        <View style={styles.inputContainer}>
          <Label>Referral Code(Optional)</Label>
          <TextInput
            style={styles.textInput}
            onChange={(event) => onChangeHandler(event, "referralCode")}
          />
        </View>
        <TouchableOpacity onPress={SubmitHandler} style={styles.loginButton}>
          <Text uppercase={false} style={styles.loginText}>
            Register
          </Text>
        </TouchableOpacity>
        <View style={styles.midContainer}>
          <View style={styles.line} />
          <Text style={styles.signInLabel}>or register with one click</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.bottomContainer}>
          <Thumbnail
            source={{
              uri: "https://www.facebook.com/images/fb_icon_325x325.png",
            }}
          />
          <Thumbnail
            source={{ uri: "https://blog.hubspot.com/hubfs/image8-2.jpg" }}
          />
        </View>
        <TouchableOpacity
          style={styles.registerText}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.noAccountLabel}>
            Do you have an account already? Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
