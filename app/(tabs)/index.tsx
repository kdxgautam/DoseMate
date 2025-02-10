
import EmptyState from '@/components/EmptyState'
import Header from '@/components/Header'
import MedicationList from '@/components/MedicationList'
import { FlatList, View} from 'react-native'

export default function HomeScreen() {
  
  return (
    <FlatList
     data={[]} 
     renderItem={null}
     ListHeaderComponent={
      <View style={{padding:23,backgroundColor:'white',height:'100%'}}>
      <Header/>
     
      <MedicationList/>
      
      
    </View>
     }
     
     />
    
  )
}