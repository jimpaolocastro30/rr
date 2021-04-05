import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, Alert } from "react-native";
import Expo from "expo"
import Dialog, { DialogContent } from "react-native-popup-dialog";
import { Container, Text, Thumbnail, Label } from "native-base";
import { LoginPageStyle as styles } from "../../styles";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../../graphql/mutations/login/loginMutation";
import { useQuery } from "@apollo/react-hooks";
import { CHECK_EXISTING_USER } from "../../graphql/queries/UsersModule/checkUser";
import { CREATE_USER } from "../../graphql/mutations/register/registerMutation";
import * as SecureStore from "expo-secure-store";
import * as Facebook from 'expo-facebook';
import * as Google from "expo-google-app-auth";

function CheckExistingUser(mobileNumber, email, skip) {
  // console.log(mobileNumber, email, skip)
  const { loading, error, data } = useQuery(CHECK_EXISTING_USER, {
    variables: { mobileNumber: mobileNumber, email: email },
    // skip: skip
  });

  if (loading) {
    return null;
  }

  return data;
}

export default function LoginPage({ navigation }) {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "123",
    email: "",
    skip: true
  });

  const existingUser = CheckExistingUser(loginDetails.username, loginDetails.email, loginDetails.skip)

  const [popup, setPopup] = useState({
    error: "",
    visible: false
  });

  const [login] = useMutation(LOGIN_USER);
  const [register] = useMutation(CREATE_USER);

  function onChangeHandler(event, name) {
    event.persist();
    setLoginDetails({
      ...loginDetails,
      [name]: event.nativeEvent.text
    });
  }

  async function LoginHandler(event) {
    if(event) {
      event.preventDefault();
    }
    const res = await login({
      variables: {
        username: loginDetails.username.toLowerCase(),
        password: loginDetails.password
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => {
        return error.message;
      });
      Alert.alert(res.graphQLErrors[0].message);
    });

    if (res.data.tokenAuth) {
      await SecureStore.setItemAsync("jwt_token", res.data.tokenAuth.token);
      await SecureStore.setItemAsync("UserId", res.data.tokenAuth.user.id);
      await SecureStore.setItemAsync("UserName", res.data.tokenAuth.user.username)
      if(res.data.tokenAuth.user.referralSet.length > 0) {
        await SecureStore.setItemAsync("ReferralCode", res.data.tokenAuth.user.referralSet[0].referralCode)
      }
      navigation.navigate("HomePage");
    }
  }

  async function RegisterHandler(name) {
    const res = await register({
      variables: {
        username: loginDetails.username,
        password: "123",
        emailAddress: loginDetails.email,
        firstName: name,
        lastName: "",
        contactNumber: loginDetails.username
      },
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => {
        return error.message;
      });
      // Alert.alert(res.graphQLErrors[0].message);
      Alert.alert("Try logging in Again.");
    });
    
    if (res.data.createUser.ok) {
      event => LoginHandler(event)
    }
  }

  async function SignInGoogle() {
    try {
      const res = await Google.logInAsync({
        androidClientId: "284630498860-abbviju9f8ds7ut23c0e3v5j0jmsb2vh.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (res.type === "success") {
        setLoginDetails({
          ...loginDetails,
          "username": res.user.id,
          "email": res.user.email,
          "skip": false
        });
        if(await existingUser) {
          if(existingUser.checkExisting) {
            LoginHandler()
          } else {
            RegisterHandler(res.user.name)
          }
        }
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  async function SignInFaceBook() {
    try {
      await Facebook.initializeAsync('917890541970069');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
        behavior: 'native',
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`);
        const data = await response.json()
        setLoginDetails({
          ...loginDetails,
          "username": data.id,
          "email": "",
          "skip": false
        });
        if(await existingUser) {
          if(existingUser.checkExisting) {
            LoginHandler()
          } else {
            RegisterHandler(data.name)
          }
        }
      } else {
        type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  

  return (
    <Container style={styles.container}>
      <Text style={styles.signInText}> Sign in </Text>
      <View style={styles.inputContainer}>
        <Label>Mobile no. / Email</Label>
        <TextInput
          style={styles.textInput}
          onChange={event => onChangeHandler(event, "username")}
        />
      </View>
      <View style={styles.inputContainer}>
        <Label>Password</Label>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          onChange={event => onChangeHandler(event, "password")}
        />
      </View>
      <TouchableOpacity
        onPress={event => LoginHandler(event)}
        style={styles.loginButton}
      >
        <Text uppercase={false} style={styles.loginText}>
          Login
        </Text>
      </TouchableOpacity>
      <View style={styles.midContainer}>
        <View style={styles.line} />
        <Text style={styles.signInLabel}>or sign in with one click</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          onPress={SignInFaceBook}
          // onPress={() => Alert.alert("Currently unavailable.")}
        >
          <Thumbnail
            source={{
              uri: "https://www.facebook.com/images/fb_icon_325x325.png"
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={SignInGoogle}
          // onPress={() => Alert.alert("Currently unavailable.")}
        >
          <Thumbnail
            source={{ uri: "https://blog.hubspot.com/hubfs/image8-2.jpg" }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.registerText}
        onPress={() => navigation.navigate("RegistrationPage")}
      >
        <Text style={styles.noAccountLabel}>
          Don't have an account yet? Register here!
        </Text>
      </TouchableOpacity>

      {/* <Dialog
        visible={popup.visible}
        onTouchOutside={() => {
          setPopup({ ...popup, error: "", visible: false });
        }}
      >
        <DialogContent>
          <Text style={{ fontSize: 48 }}>{popup.error}</Text>
        </DialogContent>
      </Dialog> */}
    </Container>
  );
}
