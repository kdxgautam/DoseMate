import { db } from '@/config/FirebaseConfig'
import Colors from '@/constant/Colors'
import { GetDateRangeToDisplay } from '@/service/ConvertDateTime'
import { getLocalStorage } from '@/service/Storage'
import { collection,  getDocs,  query, where } from 'firebase/firestore'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native'
import MedicationCardItem from './MedicationCardItem'
import EmptyState from './EmptyState'
import { useRouter } from 'expo-router'


export default function MedicationList() {
    const [medList,setMedList] = useState<any[]>([])
    const [dateRange,setDateRange] = useState<any[]>([])
    const [selectedDate,setSelectedDate] = useState(moment().format('MM/DD/YYYY'))
    const [loading,setLoading] = useState<boolean>(false)

    const router = useRouter()

    useEffect(()=>{
        GetDateRangeList()
        GetMedicationList(selectedDate)
     
    },[])

    const GetDateRangeList=()=>{
        const dateRange = GetDateRangeToDisplay()
        setDateRange(dateRange)

    }

    const GetMedicationList=async(selectedDate:any)=>{
        setLoading(true)
        const user = await getLocalStorage("userDetail");
        setMedList([])

        try {
            const q = query(collection(db,'medications'),
            where('userEmail','==',user?.email),
            where('dates','array-contains',selectedDate))
            // console.log("q ==>",q)

            const querySnapshot = await getDocs(q)
            
            
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
        
                setMedList((prev)=>[...prev,doc.data()])
              });
            
        } catch (error) {
            console.log(error)
            
        }finally{
            setLoading(false)
        }
    }


  return (
    <View style={{marginTop:20}}>
      <Image
        style={{width: '100%', height: 200 ,borderRadius:15}}      
      source={require('./../assets/images/medication.jpeg')} />
      <FlatList 
      data={dateRange}
      horizontal
      style={{marginTop:14}}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
            <Pressable 
            onPress={()=>{
                setSelectedDate(item.formatedDate)
                GetMedicationList(item.formatedDate)
            }} 
            
            style={[styles.dateGroup, {backgroundColor:item.formatedDate==selectedDate?Colors.PRIMARY:Colors.LIGHT_GRAY_BORDER}]} key={index}>
                <Text style={[styles.day ,{color:item.formatedDate==selectedDate?'white':'black'}]}>{item.day}</Text>
                <Text style={[styles.date,{color:item.formatedDate==selectedDate?'white':'black'}]}>{item.date}</Text>
             
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

      />:<EmptyState />}
    </View>
  )
}


const styles = StyleSheet.create({
    dateGroup:{
        padding:13,
        backgroundColor:Colors.LIGHT_GRAY_BORDER,
        display:'flex',
        alignItems:'center',
        marginRight:18,
        borderRadius:10
        
    },  
    day:{
        fontSize:18,
    },
    date:{
        fontSize:24,
        fontWeight:'bold'
    }
})