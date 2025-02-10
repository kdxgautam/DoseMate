import Colors from "@/constant/Colors";
import { GetDateRangeToDisplay } from "@/service/ConvertDateTime";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { db } from "@/config/FirebaseConfig";
import { useRouter } from "expo-router";

import { getLocalStorage } from "@/service/Storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import MedicationCardItem from "@/components/MedicationCardItem";
import EmptyState from "@/components/EmptyState";



export default function History() {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  const [dateRange, setDateRange] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [medList, setMedList] = useState<any[]>([]);
 
  const router = useRouter();
 
  const GetDateLIst = () => {
    const dates = GetDateRangeToDisplay();
    setDateRange(dates);
  };

  const GetMedicationList = async (selectedDate: any) => {
    setLoading(true);
    const user = await getLocalStorage("userDetail");
    setMedList([]);

    try {
      const q = query(
        collection(db, "medications"),
        where("userEmail", "==", user?.email),
        where("dates", "array-contains", selectedDate)
      );
      // console.log("q ==>",q)

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        setMedList((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetDateLIst();
    GetMedicationList(selectedDate);
  }, []);

  return (

    <FlatList 
    style={{
      height: "100%",
      backgroundColor:'white'
    }}
    data={null}
    renderItem={null}
    ListHeaderComponent={
      <View style={styles.mainContainer}>
        <Image
          style={styles.imageBanner}
          source={require("./../../assets/images/med-history.png")}
        />
        <Text style={styles.header}>Medication History</Text>
        <FlatList
          data={dateRange}
          horizontal
          style={{ marginTop: 14 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                setSelectedDate(item.formatedDate);
                 GetMedicationList(item.formatedDate)
              }}
              style={[
                styles.dateGroup,
                {
                  backgroundColor:
                    item.formatedDate == selectedDate
                      ? Colors.PRIMARY
                      : Colors.LIGHT_GRAY_BORDER,
                },
              ]}
              key={index}
            >
              <Text
                style={[
                  styles.day,
                  {
                    color: item.formatedDate == selectedDate ? "white" : "black",
                  },
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.date,
                  {
                    color: item.formatedDate == selectedDate ? "white" : "black",
                  },
                ]}
              >
                {item.date}
              </Text>
            </Pressable>
          )}
        />
  
        {medList.length>0? 
              <FlatList
              data={medList}
              onRefresh={()=>GetMedicationList(selectedDate)}
              refreshing={loading}
              renderItem={({item,index})=>(
                <Pressable onPress={()=>router.push({pathname:'/action-modal',params:{...item,selectedDate:selectedDate}})}>
                  <MedicationCardItem selectedDate={selectedDate} medicine={item} />
                  </Pressable>
              )}
        
              />:<Text style={{fontSize:25,padding:30,fontWeight:"bold",color:Colors.GRAY,textAlign:"center"}}>No medication Found</Text>}
      </View>} 
    />

  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    backgroundColor: "white",
  },
  imageBanner: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  dateGroup: {
    padding: 13,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
    display: "flex",
    alignItems: "center",
    marginRight: 18,
    borderRadius: 10,
  },
  day: {
    fontSize: 18,
  },
  date: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
