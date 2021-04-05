import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Container, Text, Label, Icon, Thumbnail, Button } from "native-base";
import { PersonalStyle as styles } from "../../styles";
import { useQuery } from "@apollo/react-hooks";
import { PERSONAL_INFO } from "../../graphql/queries/personalInfo";
import * as SecureStore from "expo-secure-store";
import { ObjectCache } from "apollo-boost";

export default function PersonalInfoPage({ id, navigation }) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: ""
  });
  const [userId, setUserId] = useState('')
  const [editMode, setEditMode] = useState(false);
  async function GetUserID() {
    const id = await SecureStore.getItemAsync("UserId")
    if (id) {
      setUserId(id)
    }
  }

  useEffect(() => {
    GetUserID()
  }, [])

  const { loading, error, data } = useQuery(PERSONAL_INFO, {
    variables: { id: userId },
    onCompleted(data) {
      const temp = {};
      Object.keys(state).map(key => 
        data.getUser[key] && Object.assign(temp, {[key]: data.getUser[key]}))
      Object.keys(state).filter(key => !state[key]).map(key =>
        data.getUser.userdetailsSet[0][key] && Object.assign(temp, {[key]: data.getUser.userdetailsSet[0][key]}))
        setState({...state, temp})
    }
    
  });

  const onChangeHandler = (e, name) => {
    const { text } = e.nativeEvent
    setState({...state,[name]: text})
  }

  if (loading) {
    return null;
  }

  const PersonalInfo = data.getUser;

  return (
    <Container>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.topContainer}>
            <Thumbnail
              large
              source={{
                uri: "https://img2.pngio.com/united-states-avatar-organization-information-png-512x512px-user-avatar-png-820_512.jpg"
              }}
            />
          </View>
          <View style={styles.firstContainer}>
            <View style={styles.nameContainer}>
              <View>
                <Label>Firstname</Label>
                <TextInput
                  style={editMode ? styles.nameInput : styles.nameInputBorderless}
                  placeholder={PersonalInfo.userdetailsSet[0].firstName}
                  editable={editMode}
                  value={state.firstName}
                  onChange={e => onChangeHandler(e, "firstName")}
                />
              </View>
              <View>
                <Label style={styles.lastName}>Lastname</Label>
                <TextInput
                  style={editMode ? styles.lastNameInput : styles.lastNameInputBorderless}
                  placeholder={PersonalInfo.userdetailsSet[0].lastName}
                  value={state.lastName}
                  editable={editMode}
                  onChange={e => onChangeHandler(e, "lastName")}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Label>Phone Number</Label>
              <TextInput
                style={editMode ? styles.textInput : styles.textInputBorderless}
                editable={editMode}
                value={state.contactNumber}
                placeholder={String(PersonalInfo.userdetailsSet[0].contactNumber)}
                onChange={e => onChangeHandler(e, "contactNumber")}
              />
            </View>
            <View style={styles.inputContainer}>
              <Label>Email</Label>
              <TextInput
                placeholder={PersonalInfo.email}
                style={editMode ? styles.textInput : styles.textInputBorderless}
                editable={editMode}
                value={state.email}
                onChange={e => onChangeHandler(e, "email")}
              />
            </View>
          </View>
        </View>
        <View>
          {
            editMode ?
              <View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setEditMode(false)}
                >
                  <Text style={styles.saveText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={() => console.log(state)}
                >
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
              :
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setEditMode(true)}
              >
                <Text style={styles.saveText}>Edit</Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    </Container>
  );
}
