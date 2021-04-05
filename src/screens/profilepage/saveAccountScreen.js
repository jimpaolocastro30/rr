import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Container, Text, Label, Icon, Thumbnail } from "native-base";
import { SaveAccountStyle as styles } from "../../styles";
import { AntDesign } from "@expo/vector-icons";

export default function SaveAccount({ navigation }) {
  return (
    <Container>
      {/* <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon type="AntDesign" name="left" />
        </TouchableOpacity>
        <Text style={styles.text}>Saved Accounts</Text>
      </View> */}
      <View style={styles.secondContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AccountScreen")}
          style={styles.touchContainer}
        >
          <View style={styles.account}>
            <View style={styles.leftContainer}>
              <Thumbnail
                square
                style={styles.thumbnail}
                source={{
                  uri:
                    "https://i.pinimg.com/originals/75/a6/a5/75a6a51ba091ec212aa034e611db63a3.png"
                }}
              />
              <View style={styles.checkContainer}>
                <AntDesign name="check" size={15} style={styles.check} />
              </View>
              <Text style={styles.grabText}>Grab</Text>
            </View>
            <View>
              <Icon type="AntDesign" name="right" />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.borderLine} />
        <TouchableOpacity
          onPress={() => navigation.navigate("AccountScreen")}
          style={styles.touchContainer}
        >
          <View style={styles.account}>
            <View style={styles.leftContainer}>
              <Thumbnail
                square
                style={styles.thumbnail}
                source={{
                  uri:
                    "https://149361674.v2.pressablecdn.com/wp-content/uploads/2017/09/Angkas-Logo-Screen.jpg"
                }}
              />
              <View style={styles.checkContainer}>
                <AntDesign name="check" size={15} style={styles.check} />
              </View>
              <Text style={styles.grabText}>Angkas</Text>
            </View>
            <View>
              <Icon type="AntDesign" name="right" />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.borderLine} />
      </View>
    </Container>
  );
}
