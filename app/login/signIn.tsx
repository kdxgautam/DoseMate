import { useRouter } from "expo-router";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import { TextInput } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/FirebaseConfig";
import { setLocalStorage } from "@/service/Storage";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const OnSignInClick = () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.BOTTOM);
      Alert.alert("Please fill all fields");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in
        const user = userCredential.user;
        await setLocalStorage('userDetail',user)
        router.push("/(tabs)");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        if(errorCode === 'auth/invalid-credential') {
          ToastAndroid.show('User not found', ToastAndroid.BOTTOM)
          Alert.alert('User not found')
        }
      });
  };

  return (
    <View className="p-6">
      <Text className="mt-3 text-3xl font-bold">Let's Sign You In</Text>
      <Text className="mt-2 color-[#C0C0C0] text-3xl font-bold">
        Welcome Back
      </Text>
      <Text className=" mt-2 color-[#C0C0C0] text-3xl font-bold">
        You've been missed!
      </Text>
      <View>
        <Text>Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          className="p-2 text-base border rounded-lg mt-2 bg-white"
        />
        <Text>Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder="Password"
          className="p-2 text-base border rounded-lg mt-2 bg-white"
        />
      </View>
      <TouchableOpacity
        onPress={OnSignInClick}
        className=" text-white p-4 mt-8 rounded-lg bg-[#007dfc]"
      >
        <Text className="text-base text-white text-center  ">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/login/signUp")}
        className=" text-white p-4 border border-[#007dfc] mt-5 rounded-lg bg-white"
      >
        <Text className="text-base text-[#007dfc] text-center ">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
