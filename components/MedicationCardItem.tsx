import Colors from "@/constant/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Text, Image, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

interface MedicationCardItemProps {
  medicine: Medicine;
  selectedDate: string;
}

interface Medicine {
  action: {
    date: string;
    status: string;
    time: string;
  }[];
  dates: string[];
  docId: string;
  dose: string;
  endDate: number;
  name: string;
  reminder: string;
  startDate: number;
  type: {
    icon: string;
    name: string;
  };
  userEmail: string;
  when: string;
}

interface Status {
  date: string;
  status: string;
  time?: string;
}

export default function MedicationCardItem({
  medicine,
  selectedDate,
}: MedicationCardItemProps) {
  const [status, setStatus] = useState<Status | null>(null);

  const CheckStatus = () => {
    const data: Status | null = (Array.isArray(medicine?.action)
      ? medicine.action.find((item) => item.date === selectedDate)
      : null) || null;
  
    setStatus(data);
  };
  

  useEffect(() => {
    CheckStatus();
  }, [medicine, selectedDate]);

  console.log("Medicine:", medicine);
  console.log("Selected Date:", selectedDate);
  console.log("Status:", status);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: 60, height: 60 }}
            source={{ uri: medicine?.type?.icon }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {medicine?.name}
          </Text>
          <Text style={{ fontSize: 15 }}>{medicine?.when}</Text>
          <Text style={{ color: "white" }}>
            {medicine?.dose} {medicine?.type.name}
          </Text>
        </View>
      </View>
      <View style={styles.reminder}>
        <Ionicons name="timer-outline" size={24} color="black" />
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          {medicine?.reminder}
        </Text>
      </View>
      {status && (
        <View style={styles.statusContainer}>
          {status.status === "Taken" ? (
            <AntDesign name="checkcircle" size={20} color={Colors.GREEN} />
          ) : status.status === "Missed" ? (
            <AntDesign name="closecircle" size={20} color={"red"} />
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 9,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 9,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  imageContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginRight: 13,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reminder: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
  },
  statusContainer: {
    position: "absolute",
    top: 3,
    padding: 4,
  },
});
