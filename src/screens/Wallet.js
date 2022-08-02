import React, {useEffect} from "react";
import { View } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
  TextInput
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import QRCode from 'react-native-qrcode-svg';

import * as SecureStore from 'expo-secure-store';



export default function ({ navigation }) {

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      onChangeResult(result);
    } else {
      alert('No values stored under that key.');
    }
  }
  
  
  const onScreenLoad = () => {
    getValueFor("eth")
}
useEffect(() => {
    // write your code here, it's like componentWillMount
    onScreenLoad();
}, [])
  

  const { isDarkmode } = useTheme();
  const [value, onChangeValue] = React.useState('');
  const [result, onChangeResult] = React.useState('placeholder');
  let key = "eth";
  return (
    <Layout>
          <TopNav

        middleContent="TURKEY FOOD PASSPORT"
    />
      <TopNav
        middleContent="My Wallet"
        height={40}
        leftAction={() => navigation.goBack()}
        backgroundColor="#616161"
        middleTextStyle={{ color: 'white' }}
      />
      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
          padding: 50
        }}
      >
    
        <QRCode 
        value={result}
        size={250}
        />

        <Text size="h4" style={{fontWeight: "bold"}}>{result}</Text>
        
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
        }}
      >
        
        <TextInput placeholder="Enter Your Ethereum Wallet Address" onChangeText={text => onChangeValue(text) } value={value}/>
        <Button text="Save" onPress={ () => {
                    save(key,value)
                    onChangeValue('')
                    getValueFor("eth")
        }

        }
        />
        </View>
    </Layout>
  );
}
