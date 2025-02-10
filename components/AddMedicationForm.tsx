import {
  TextInput,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constant/Colors";
import { TypeList, WhenToTake } from "@/constant/Options";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { ConvertDate, formatDateForText, formatTime, getDatesRange } from "../service/ConvertDateTime";
import { db } from "@/config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getLocalStorage } from "@/service/Storage";
import { useRouter } from "expo-router";

interface FormData {
  name?: string;
  type?: { name: string; icon: string };
  dose?: string;
  when?: string;
  startDate?: Date | number;
  endDate?: Date | number;
  reminder?: Date | number;
}


export default function AddMedicationForm() {
  const [formData, setFormData] = useState<FormData>({});
  const [showStartDate, setShowStartDate] = useState<boolean>(false);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [loading,setLoading]=useState<boolean>(false)
  const router = useRouter()

  const onHandleInputChange = (
    field: keyof FormData,
    value: string | Date | number | { name: string; icon: string }
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
   
  };

  const SaveMedication=async()=>{
    const docId = Date.now().toString()
    const user = await getLocalStorage("userDetail")
    if(!(formData?.name || formData.type || formData.dose || formData.when || formData.startDate || formData.endDate || formData.reminder)){
      Alert.alert("Please fill all the fields")
      return;
    }

    const dates=getDatesRange(formData?.startDate,formData?.endDate)
    console.log(dates)
    setLoading(true)

    try {
      await setDoc(doc(db, "medications", docId),{
        ...formData,userEmail:user?.email,docId:docId,
        dates:dates
      })
      console.log("Medication Added");
      Alert.alert("Success", "Medication Added successfully", [
        {
          text: "Ok",
          onPress: () => router.push("/(tabs)")
        }
      ])
    } catch (error) {
      console.log(error);

      
    }finally{
      setLoading(false)
    }
  }

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.header}> Add New Medication</Text>

      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="medkit-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Medicine Name"
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>

      <FlatList
        horizontal
        style={{ marginTop: 4 }}
        showsHorizontalScrollIndicator={false}
        data={TypeList}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => onHandleInputChange("type", item)}
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name == formData?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name == formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </Pressable>
        )}
      />

      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="eyedrop-outline"
          size={24}
          color="black"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Dose Ex. 2, 5ml"
          onChangeText={(value) => onHandleInputChange("dose", value)}
        />
      </View>
      {/* when to take*/}
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="time-outline"
          size={24}
          color="black"
        />
        <Picker
          style={{
            width: "85%",
          }}
          selectedValue={formData?.when}
          onValueChange={(value, index) => onHandleInputChange("when", value)}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* start and end */}
      <View style={styles.dateInputGroup}>
        <Pressable
          onPress={() => setShowStartDate(true)}
          style={[styles.inputGroup, { flex: 1 }]}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formData?.startDate
              ? formatDateForText(new Date(formData.startDate))
              : "Start Date"}
          </Text>
        </Pressable>
        {showStartDate && (
          <RNDateTimePicker
            value={
              formData?.startDate ? new Date(formData.startDate) : new Date()
            }
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "startDate",
                ConvertDate(event.nativeEvent.timestamp)
              );
              setShowStartDate(false);
            }}
          />
        )}

        <Pressable
          onPress={() => setShowEndDate(true)}
          style={[styles.inputGroup, { flex: 1 }]}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formData?.endDate
              ? formatDateForText(new Date(formData.endDate))
              : "End Date"}
          </Text>
        </Pressable>
        {showEndDate && (
          <RNDateTimePicker
            value={formData?.endDate ? new Date(formData.endDate) : new Date()}
            minimumDate={new Date(formData?.startDate || Date.now())}
            onChange={(event) => {
              onHandleInputChange(
                "endDate",
                ConvertDate(event.nativeEvent.timestamp)
              );
              setShowEndDate(false);
            }}
          />
        )}
      </View>

      {/* set reminder */}
      <View style={styles.dateInputGroup}>
        <Pressable
          onPress={() => setShowTimePicker(true)}
          style={[styles.inputGroup, { flex: 1 }]}
        >
          <Ionicons
            style={styles.icon}
            name="timer-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formData?.reminder ? formatTime(new Date(formData.reminder).getTime()) : "Set Reminder"}
          </Text>
        </Pressable>
        {showTimePicker && (
          <RNDateTimePicker
            value={
              formData?.reminder ? new Date(formData.reminder) : new Date()
            }
            mode="time"
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange("reminder",formatTime(event.nativeEvent.timestamp));
              
              setShowTimePicker(false);
            }}
          />
        )}
      </View>
        <Pressable style={styles.button} onPress={()=>SaveMedication()}>
          {loading? <ActivityIndicator size={'large'} color={'white'} />:
          <Text style={styles.buttonText}>Add New Medication</Text>}
        </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 8,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: Colors.GRAY,
  },
  typeText: {
    fontSize: 16,
  },
  text: {
    fontSize: 14,
    padding: 4,
    flex: 1,
    marginLeft: 8,
  },
  dateInputGroup: {
    flexDirection: "row",
    gap: 8,
  },
  button:{
    padding: 12,
    backgroundColor: Colors.PRIMARY,

    borderRadius: 15,

    marginTop: 20,
    width: "100%",
  },
  buttonText:{
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  }
});
