import { View, Text, Image, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function AddMedicationCard() {
    const router = useRouter();
  return (
    <View>
      <Image style={{
        height:230,
        width:'100%'
      }} source={require('./../assets/images/consult.png')} />
      <Pressable onPress={()=>router.back()} style={{position:'absolute',top:20,left:20}}>
      <Ionicons name="arrow-back" size={24} color="black" />

      </Pressable>
    </View>
  )
}