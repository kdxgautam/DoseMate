import { View, Text, Image, TouchableOpacity } from 'react-native'
import  Colors  from '@/constant/Colors'
import { useRouter } from 'expo-router'



export default function LoginScreen() {
  const router = useRouter()

  return (
    <View>
      <View className='flex items-center mt-[40px]'>
        <Image source={require('../../assets/images/login.png')} className='w-[180px] h-[400px] rounded-md' />
      </View>
      <View style={{ padding: 25, backgroundColor: Colors.PRIMARY, height:'100%' }}>
        <Text className='text-3xl text-center font-bold color-white '>Stay on Track, Stay Healthy!</Text>
        <Text style={{fontSize:14}} className='mt-4 color-white text-center'>Track Your meds, Take control of your health, Stay consistent, stay confident</Text>
        <TouchableOpacity onPress={()=>router.push('/login/signIn')} className='p-4 mt-5 rounded-full bg-white'>
          <Text style={{color:Colors.PRIMARY}} className='text-center text-xl font-semibold'>Continue</Text>
        </TouchableOpacity>
        <Text className='text-white mt-2 text-sm'>Note: By clicking Continue, You agree to our Terms and conditions</Text>
      </View>
    </View>
  )
}