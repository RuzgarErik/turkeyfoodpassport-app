import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme, themeColor } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
//Screens
import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";
import About from "../screens/About";
import Wallet from "../screens/Wallet";
import Loading from "../screens/utils/Loading";
// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";
import { AuthContext } from "../provider/AuthProvider";
import MyPassport from "../screens/MyPassport";

// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyBKl5e3tRZO97cVGqV_0JQFqbm1SsuzU9A",
  authDomain: "turkeyfoodpassport.firebaseapp.com",
  projectId: "turkeyfoodpassport",
  storageBucket: "turkeyfoodpassport.appspot.com",
  messagingSenderId: "677629035571",
  appId: "1:677629035571:web:f402e344e630ea31548f46",
  measurementId: "G-P5RR6DE0GV"
};
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Wallet" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"qr-code-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="My Passport"
        component={MyPassport}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="My Passport" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"document-outline"} />
          ),
        }}
      />


 <Tabs.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="About" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"information-circle-outline"} />
          ),
        }}
      />





    </Tabs.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
