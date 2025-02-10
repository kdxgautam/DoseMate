import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import { TextInput } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { useState } from "react";
import { setLocalStorage } from "@/service/Storage";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const onCreateAccount = () => {
    if (!email || !password || !username) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.BOTTOM);
      Alert.alert("Please fill all fields");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in
        const user = userCredential.user;

        await updateProfile(user,{
          displayName: username
        })
        await setLocalStorage("userDetail", user);
        // console.log(user);
        router.push("/(tabs)");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorCode === "auth/email-already-in-use") {
          ToastAndroid.show("Email already in use", ToastAndroid.BOTTOM);
          Alert.alert("Email already in use");
        }
        // ...
      });
  };

  return (
    <View className="p-6">
      <Text className="mt-3 text-3xl font-bold">Create New Account</Text>

      <View>
        <Text>Full Name</Text>
        <TextInput

          onChangeText={(text) => setUsername(text)}
          placeholder="Full Name"
          className="p-2 text-base border rounded-lg mt-2 bg-white"
        />
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
        onPress={onCreateAccount}
        className=" text-white p-4 mt-8 rounded-lg bg-[#007dfc]"
      >
        <Text className="text-base text-white text-center  ">
          Create Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/login/signIn")}
        className=" text-white p-4 border border-[#007dfc] mt-5 rounded-lg bg-white"
      >
        <Text className="text-base text-[#007dfc] text-center ">
          Account already exists? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
