import AddMedicationCard from '@/components/AddMedicationCard'
import AddMedicationForm from '@/components/AddMedicationForm'
import { View, Text, ScrollView } from 'react-native'

export default function AddNewMedication() {
  return (
    <ScrollView>
      <AddMedicationCard/>
      <AddMedicationForm/>
    </ScrollView>
  )
}