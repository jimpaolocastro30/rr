import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Container, Text, Label, Icon } from "native-base";
import { AccountStyle as styles } from "../../styles";

export default function AccountScreen({ navigation }) {
  return (
    <Container>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.firstContainer}>
            <View style={styles.inputContainer}>
              <Label>Username</Label>
              <TextInput style={styles.textInput} />
            </View>
            <View style={styles.inputContainer}>
              <Label>Password</Label>
              <TextInput secureTextEntry style={styles.textInput} />
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
