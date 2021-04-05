import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, ScrollView, Clipboard } from "react-native";
import { Container, Text, Root, Card, CardItem, Body, Button, Thumbnail } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ReferralStyle as styles } from "../../styles";
import { Switch } from "react-native-switch";
import { Entypo, AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@apollo/react-hooks";
import { REFERRAL_QUERY } from "../../graphql/queries/ReferralModule/referralQuery";
import * as SecureStore from "expo-secure-store";

const ShareViaLogos = [
  {
    uri: "https://s3-eu-west-1.amazonaws.com/makesense.rocks/uploads/sites/10/20190122170402/Facebook-logo.png"
  },
  {
    uri: "https://pngimg.com/uploads/twitter/twitter_PNG32.png"
  },
  {
    uri: "https://whatsappbrand.com/wp-content/themes/whatsapp-brc/images/WhatsApp_Logo_2.png"
  },
  {
    uri: "https://p7.hiclipart.com/preview/477/609/118/logo-computer-icons-clip-art-instagram-logo.jpg"
  },
]

export default function ReferralScreen({ navigation }) {
  const [state, setState] = useState({
    referralCode: ""
  })

  async function GetUserID() {
    const referralCode = await SecureStore.getItemAsync("ReferralCode")
    console.log(referralCode)
    if(referralCode) {
      setState({
        ...state,
        "referralCode": referralCode
      })
    }
  }

  useEffect(() => {
    GetUserID()
  }, [])

  function copyToClipBoard(referralCode) {
    Clipboard.setString(referralCode)
  }

  const { loading, error, data } = useQuery(REFERRAL_QUERY, {
    variables: { referralCode: state.referralCode }
  });

  if (loading) {
    return null;
  }

  const ReferralInfo = data.getReferralInfo;

  return (
    <Container style={{ padding: 10 }}>
      <Grid style={{ marginTop: 20 }}>
        <Row style={{ height: "33%" }}>
          <Col>
            <Card>
              <CardItem header style={{ justifyContent: "center" }}>
                <Text style={styles.titleEarnings}>Referral Earnings</Text>
              </CardItem>
              <CardItem>
                <Body style={{ justifyContent: "center", alignItems: "center" }}>
                  <View style={styles.logoContainer}>
                    <FontAwesome5 style={styles.iconEarnings} name="money-bill-wave" size={40} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 30, paddingTop: 16 }}>{ReferralInfo.length > 0 ? ReferralInfo[0].rideEarnings : 0}</Text>
                  </View>
                </Body>
              </CardItem>
            </Card>
          </Col>

          <Col>
            <Card>
              <CardItem header style={{ justifyContent: "center" }}>
                <Text style={styles.titleNumber}>No. of Referrals</Text>
              </CardItem>
              <CardItem>
                <Body style={{ justifyContent: "center", alignItems: "center" }}>
                  <View style={styles.logoContainer}>
                    <FontAwesome5 style={styles.iconNumber} name="smile-beam" size={40} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 30, paddingTop: 16 }}>{ReferralInfo.length > 0 ? ReferralInfo.length : 0}</Text>
                  </View>
                </Body>
              </CardItem>
            </Card>
          </Col>
        </Row>
        <Row style={{ height: "30%" }}>
          <Col>
            <Card>
              <CardItem header style={{ justifyContent: "center" }}>
                <Text style={styles.titleEarnings}>Referral Code</Text>
              </CardItem>
              <CardItem>
                <Body style={{ justifyContent: "center", alignItems: "center" }}>
                  <View>
                    <TextInput style={{ fontSize: 20, padding: 5, borderWidth: 1, width: 130, textAlign: "center" }} editable={false}>{state.referralCode}</TextInput>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <Button style={{ height: 30, borderRadius: 20 }} onPress={() => copyToClipBoard(state.referralCode)}>
                      <Text style={{ fontSize: 10 }}>Copy to Clipboard</Text>
                    </Button>
                  </View>
                </Body>
              </CardItem>
            </Card>
          </Col>

          <Col>
            <Card>
              <CardItem header style={{ justifyContent: "center" }}>
                <Text style={styles.titleNumber}>Share Code Via</Text>
              </CardItem>
              <CardItem>
                <Body style={{ justifyContent: "center", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", paddingTop: 5 }}>
                    {
                      ShareViaLogos.map((o) => 
                        <TouchableOpacity key={o.uri}>
                          <Thumbnail
                            square
                            small
                            style={{ marginLeft: 5 }}
                            source={{
                              uri: o.uri
                            }}
                          />
                        </TouchableOpacity>
                      )
                    }
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <Button style={{ height: 30, borderRadius: 20 }} onPress={() => copyToClipBoard("DGEJLKGL63781")}>
                      <Text style={{ fontSize: 10 }}>Share Via Link</Text>
                    </Button>
                  </View>
                </Body>
              </CardItem>
            </Card>
          </Col>
        </Row>
        <Row style={{ height: "20%" }}>
          <ScrollView style={{ height: 200 }}>
            <Col>
              <Card>
                <CardItem header>
                  <Text style={{ fontWeight: "bold" }}>Referral Instructions</Text>
                </CardItem>
                <CardItem>
                  <Body>
                      <Text style={{ fontSize: 14 }}>Referral Earnings - This is the total of Ride Radar Tokens that you earned with your referrals.</Text>
                      <Text style={{ fontSize: 14, marginTop: 10 }}>No. Of Referrals - This is the total number of the confirmed referrals you gained.</Text>
                      <Text style={{ fontSize: 14, marginTop: 10 }}>Referral Code - Give this code to your friends and get Ride Radar Tokens in return when they book their first ride.</Text>
                      <Text style={{ fontSize: 14, marginTop: 10 }}>Share Code Via - Sharing your referral code can be easier, with just one click of a button!</Text>
                  </Body>
                </CardItem>
              </Card>
            </Col>
          </ScrollView>
        </Row>
      </Grid>
    </Container>
  );
}

// export default function Referral({ navigation }) {
//   return (
//     <Root>
//       <Container>
//         <Grid>
//           <Row style={styles.firstRow}>
//             <Col style={styles.col}>
//               <Card style={styles.card}>
//                 <CardItem bordered header style={styles.cardHeader}>
//                   <Text style={styles.titleEarnings}>Referral Earnings</Text>
//                 </CardItem>
//                 <CardItem>
//                   <Body style={{ justifyContent: "center", alignItems: "center" }}>
//                     <View style={styles.logoContainer}>
//                       {/* <View style={styles.lineEarnings} /> */}
//                       <FontAwesome5 style={styles.iconEarnings} name="money-bill-wave" size={40} />
//                       {/* <View style={styles.lineEarnings} /> */}
//                     </View>
//                     <View>
//                       <Text style={{ fontSize: 50, paddingTop: 16 }}>
//                         500
//                       </Text>
//                     </View>
//                   </Body>
//                 </CardItem>
//               </Card>
//             </Col>
//             <Col style={styles.col}>
//               <Card style={styles.card}>
//                 <CardItem bordered header style={styles.cardHeader}>
//                   <Text style={styles.titleNumber}>
//                     No. of Referrals
//                   </Text>
//                 </CardItem>
//                 <CardItem>
//                   <Body style={{ justifyContent: "center", alignItems: "center" }}>
//                     <View style={styles.logoContainer}>
//                       {/* <View style={styles.lineNumber} /> */}
//                       <FontAwesome5 style={styles.iconNumber} name="smile-beam" size={40} />
//                       {/* <View style={styles.lineNumber} /> */}
//                     </View>
//                     <View>
//                       <Text style={{ fontSize: 50, paddingTop: 16 }}>
//                         500
//                       </Text>
//                     </View>
//                   </Body>
//                 </CardItem>
//               </Card>
//             </Col>
//           </Row>
//           <Row style={styles.secondRow}>
//             <Card style={styles.cardInvite}>
//               <Grid>
//                 <Row style={styles.inviteRow}>
//                   <View style={styles.line} />
//                   <Text style={styles.textInvite}>Refer Friends</Text>
//                   <View style={styles.line} />
//                 </Row>
//                 <Row style={styles.inviteRow} >
//                   <Entypo style={styles.iconFb} name="facebook" size={50} />
//                   <Entypo style={styles.iconTw} name="twitter" size={50} />
//                   <FontAwesome style={styles.iconWh} name="whatsapp" size={50} />
//                 </Row>
//                 <Row style={styles.inviteDivider}>
//                   <Text style={styles.textDivider}>or</Text>
//                 </Row>
//                 <Row style={styles.inviteCode}>
//                   <Button dark bordered>
//                     <Text style={styles.textShare}>SHARE CODE:</Text>
//                     <Text style={styles.textCode}>098shf</Text>
//                   </Button>
//                 </Row>
//               </Grid>
//             </Card>
//           </Row>
//         </Grid>
//       </Container>
//     </Root>
//   );
// }
