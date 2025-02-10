
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'firebase/auth';


export const setLocalStorage=async(key:string,value:User)=> {
    await AsyncStorage.setItem(key,JSON.stringify(value));
}


export const getLocalStorage=async(key:string) =>{
    const result = await AsyncStorage.getItem(key);
    return result ? JSON.parse(result) : null;
}

export const removeLocalStorage=async(key:string) =>{
    await AsyncStorage.clear()
}