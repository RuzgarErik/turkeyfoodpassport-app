import React from "react";
import { View, ScrollView} from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

import { getAuth, signOut } from "firebase/auth";

import { Section, SectionContent, SectionImage } from 'react-native-rapi-ui';








export default function ({ navigation }) {
  const { isDarkmode } = useTheme();


  const auth = getAuth();


  return (
    <Layout>
      <TopNav

middleContent="TURKEY FOOD PASSPORT"
middleTextStyle={{ color: '#111111', letterSpacing:  0.60}}
rightContent={
	<Ionicons name="log-out-outline" size={20} color={isDarkmode.black} />
}
rightAction={() =>  signOut(auth)}
/>

<TopNav
middleContent={"About"}
height={40}
leftAction={() => navigation.goBack()}
backgroundColor="#616161"
middleTextStyle={{ color: 'white' }}

/>
<ScrollView>
<Section style= {{padding: 10}}>
    <SectionImage source={require('../../assets/ether.png')}  />
    <SectionContent>
        <Text>Save Your Token Compatible Ethereum Address at the Wallet Tab</Text>
    </SectionContent>
</Section>
<Section style= {{padding: 10}}>
    <SectionImage source={require('../../assets/eat.png')}  />
    <SectionContent>
        <Text>Try Local Foods From Home Tab</Text>
    </SectionContent>
</Section>

<Section style= {{padding: 10}}>
    <SectionImage source={require('../../assets/qr.png')}  />
    <SectionContent>
        <Text>Show Your QR Code To the Merchant To Get Your NFT's</Text>
    </SectionContent>
</Section>
</ScrollView>
    </Layout>
    
  );
 
}
