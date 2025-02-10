import { getLocalStorage } from "@/service/Storage";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { View, Text, Image,Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from "@/constant/Colors";

import { useRouter } from "expo-router";
export default function Header() {
  const [user, setUser] = useState<User>();

  const router = useRouter()

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    setUser(userInfo);
  };
  return (
    <View style={{ marginTop: 20 ,width:'100%'}}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" ,width:'100%'}}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={require("./../assets/images/smiley.png")}
        />
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Hello {user?.displayName} 👋
        </Text>
        
          
        </View>
        <Pressable onPress={()=>router.push('/add-new-medication')}>
        <Ionicons name="medkit-outline" size={32} color={Colors.PRIMARY} />
        </Pressable>
      </View>
    </View>
  );
}
