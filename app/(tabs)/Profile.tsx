import { View, Text, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import { useStoreRouteInfo } from "expo-router/build/global-state/router-store";
import { useRouter } from "expo-router";
import { removeLocalStorage } from "@/service/Storage";

export default function Profile() {
  const router = useRouter()
  
  const UserLogout = () => {
    signOut(auth).then(async() => {
      // Sign-out successful.
      await removeLocalStorage('userDetails')
      router.push('/login/signIn')
      
    }).catch((error) => {
      // An error happened.
    });
  };
  return (
    <View className="flex mt-10">
      <TouchableOpacity onPress={UserLogout} className="bg-red-600 color-white p-5 text-center"><Text>Logout</Text></TouchableOpacity>
    </View>
  );
}
