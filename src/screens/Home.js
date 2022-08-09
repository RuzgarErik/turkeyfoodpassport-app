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
import * as Location from 'expo-location';
import { StyleSheet, ImageBackground } from 'react-native';
import { ThemeProvider } from "react-native-rapi-ui";



export default function ({ navigation }) {


  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  
  const [items, setItems] = useState([]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [getLocation, setGetLocation] = useState(false);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let address =  await Location.reverseGeocodeAsync({
        latitude : location.coords.latitude,  
        longitude : location.coords.longitude});

    

      setLocation(location);
      setAddress(address);
      setCity(address[0].region);

  



    })();

    
  }, []);


  let text = 'Waiting..';
 if  (errorMsg) {
    text = errorMsg;
  } else if (city) {
    text = city
    
 }



  useEffect(() => {
  while (city !== undefined && city !== null) {
    fetch(`https://ruzgarerik.com/turkeyfoodpassport/city/${city.toLowerCase()}.json`)
    .then((response) => response.json())
    .then((json) => setItems(json))
    
    .catch((error) => console.error(error))
    break;
  }
  console.log("fonksiyon çalıştı dikkat")

  }, [city]);

    

  return (
    <Layout>
    <TopNav

  middleContent="TURKEY FOOD PASSPORT"
  middleTextStyle={{ color: '#111111', letterSpacing:  0.60}}
  />
<TopNav
  middleContent={text.toUpperCase()}
  height={40}
  leftAction={() => navigation.goBack()}
  backgroundColor="#616161"
  middleTextStyle={{ color: 'white', letterSpacing:  3}}
/>
      <FlatGrid
      itemDimension={150}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
            <ImageBackground source={item.code} resizeMode="cover" style={styles.image}>
          <Text style={styles.itemName}>{item.name}</Text>
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