import MedicationCardItem from "@/components/MedicationCardItem";
import Colors from "@/constant/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { arrayUnion,  doc,  updateDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import moment from "moment";
import { useState } from "react";




export default function MedicationActionModal() {

  const medicine = useLocalSearchParams();
  const router = useRouter();


  const UpdateActionStatus=async(status:string)=>{
    try {
        const docRef=doc(db,'medications',medicine?.docId as string)
        await updateDoc(docRef,{
            action:arrayUnion({
                status:status,
                time:moment().format('LT'),
                date:medicine?.selectedDate
            })
        })
        Alert.alert(status,'Response saved',[
            {text:'ok',
            onPress:()=>router.back()}
        ])
    } catch (error) {
        console.log(error)
        
    }
  }


  return (
    <View style={styles.container}>
      <Image
        style={{ width: 100, height: 100 }}
        source={require("./../../assets/images/notification.gif")}
      />

      <Text style={{ fontSize: 16 }}>{medicine?.selectedDate}</Text>
      <Text style={{ fontSize: 34, color: Colors.PRIMARY, fontWeight: "bold" }}>
        {medicine?.reminder}
      </Text>
      <Text style={{ fontSize: 16 }}>It's time to take</Text>

      {/* <MedicationCardItem medicine={medicine} selectedDate={Array.isArray(medicine?.selectedDate) ? medicine.selectedDate[0] : medicine?.selectedDate} />
 */}

      <View style={styles.btnContainer}>
        <Pressable style={styles.successbutton} onPress={()=>{UpdateActionStatus('Taken')}}>
          <Ionicons name="checkmark-done" size={24} color="white" />
          <Text style={{ fontSize: 20, color: "white" }}>Taken</Text>
        </Pressable>
        <Pressable onPress={()=>{UpdateActionStatus('Missed')}} style={styles.closebutton}>
          <Ionicons name="close-outline" size={24} color="red" />
          <Text style={{ fontSize: 20, color: "red" }}>Missed</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => router.back()}
        style={{ position: "absolute", bottom: 25 }}
      >
        <AntDesign name="closecircle" size={44} color={Colors.GRAY} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  closebutton: {
    padding: 10,
    flexDirection: "row",
    gap: 6,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "red",
    borderRadius: 10,
  },
  successbutton: {
    padding: 10,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",

    backgroundColor: Colors.GREEN,
    borderRadius: 10,
  },
});
