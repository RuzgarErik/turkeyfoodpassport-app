import React, { useState, useEffect } from 'react';
import { View, Linking } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, ImageBackground } from 'react-native';
import { ThemeProvider } from "react-native-rapi-ui";
import * as SecureStore from 'expo-secure-store';



export default function ({ navigation }) {

  const baseURL = "https://eth-goerli.g.alchemy.com/v2/SWwAWvvU60NS0eqGVwDeI65V3luUPxwL/getNFTs/";
  const contractAddr = "0xf8e73f42f02e4a6c430cc3f1284f16747f2dcb35";
  
  
  
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  
  const [items, setItems] = useState([]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [result, onChangeResult] = React.useState("");

  var requestOptions = {
    method: 'get',
    redirect: 'follow'
  };


  

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      onChangeResult(result);
      console.log("veri alındı")
    } else {
      alert('Please Save Your Token Compatible ETH Wallet Address in Wallet Tab');
    }
  }

useEffect (() => {getValueFor("eth")}, []);


  useEffect(() => {

    const url = `${baseURL}?owner=${result}&contractAddresses[]=${contractAddr}`;
    
      fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => setItems(json))
      .catch((error) => {});
    

     

  }, [result]);



  return (
    <Layout>
    <TopNav

  middleContent="TURKEY FOOD PASSPORT"
  middleTextStyle={{ color: '#111111' }}
/>
<TopNav
  middleContent={"My Passport "}
  height={40}
  leftAction={() => navigation.goBack()}
  backgroundColor="#616161"
  middleTextStyle={{ color: 'white' }}
/>

     <FlatGrid
      itemDimension={150}
      data={items.ownedNfts}
      style={styles.gridView}
      spacing={10}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
            <ImageBackground source={{uri: item.media[0].raw}} resizeMode="cover" style={styles.image}>
          <Text style={styles.itemName}>{item.title}</Text>
          </ImageBackground>
        </View>
      )}
    /> 
      



    </Layout>
  );
}
const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 4,
  },
  paragraph: {
    fontSize: 30,
    color: 'black',
    fontWeight: '600',
  },

});