import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Container, Text, Label, Icon, Thumbnail } from "native-base";
import { SettingStyle as styles } from "../../styles";
import { AntDesign } from "@expo/vector-icons";
import { Switch } from "react-native-switch";

export default function Setting({ navigation }) {
  const [toggle, setToggle] = useState({
    location: false,
    push: false
  })

  const handleToggle = (e, name) => {
    setToggle({...toggle, [name]: !toggle[name]})
  }
  return (
    <Container>
      <View style={styles.secondContainer}>
        <TouchableOpacity style={styles.touchContainer}>
          <View style={styles.account}>
            <Switch
              circleSize={30}
              circleBorderWidth={0}
              circleActiveColor="#20639B"
              circleInActiveColor="#C70039"
              backgroundActive="#E8E9EC"
              backgroundInactive="#E8E9EC"
              switchWidthMultiplier={2}
              value={toggle.location}
              onValueChange={e => handleToggle(e, "location")}
            />
            <Text style={styles.grabText}>Location Access</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.borderLine} />
        <View style={styles.borderLine} />
        <TouchableOpacity style={styles.touchContainer}>
          <View style={styles.account}>
          <Switch
              circleSize={30}
              circleBorderWidth={0}
              circleActiveColor="#20639B"
              circleInActiveColor="#C70039"
              backgroundActive="#E8E9EC"
              backgroundInactive="#E8E9EC"
              changeValueImmediately
              switchWidthMultiplier={2}
              value={toggle.push}
              onValueChange={e => handleToggle(e, "push")}
            />
            <Text style={styles.grabText}>Push Notification</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.borderLine} />
      </View>
    </Container>
  );
}
