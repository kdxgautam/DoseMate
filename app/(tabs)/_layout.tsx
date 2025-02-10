import { Tabs, useRouter } from "expo-router";

import Entypo from "@expo/vector-icons/Entypo";

import { useEffect, useState } from "react";
import { getLocalStorage } from "@/service/Storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";


export default function TabLayout() {
  const router = useRouter();

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    if (!userInfo) {
      router.replace("/login");
    }
  };

  useEffect(() => {
    GetUserDetail();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
