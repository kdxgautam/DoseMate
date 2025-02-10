import Colors from "@/constant/Colors";
import { useRouter } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";
export default function EmptyState() {
    const router = useRouter();
  return (
    <View
      style={{
        marginTop: 80,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 100, height: 100 }}
        source={require("./../assets/images/medicine.png")}
      />
      <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 25 }}>
        NO Medications!
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: Colors.DARK_GRAY,
          textAlign: "center",
          marginTop: 15,
        }}
      >
        You have 0 medication setup, Kindly setup a new One
      </Text>

      <Pressable
        onPress={() => router.push("/add-new-medication")}

        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 13,
          marginTop: 20,
          borderRadius: 10,
          width: "100%",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 17, color: "white" }}>
          + Add New Medication
        </Text>
      </Pressable>
    </View>
  );
}
