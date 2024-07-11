import { View, Text, TextInput } from 'react-native'
import React, {useState } from 'react'
import {Colors} from "../../constants/Colors"
import { Ionicons } from '@expo/vector-icons';
import Catergory from '../../components/Home/Catergory';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';

export default function Explore() {
  const [businessList, setBusinessList] = useState([])
  

  const GetBusinessByCategory=async(category)=>{
    setBusinessList([])
    const q=query(collection(db,"BusinessList"),where('category',"==",category))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList(prev=>[...prev,{id:doc.id, ...doc.data()}])
    })
  }
  return (
    <View style={{
      padding:20,

    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>Explore More</Text>
        <View style={{
        display:'flex', flexDirection:'row',gap:10, alignItems:"center",backgroundColor:'white', padding:10,
        marginVertical:10, marginTop:15, borderRadius:8, borderColor:Colors.PRIMARY, borderWidth:1
      }}>
      <Ionicons name="search" size={24} color={Colors.PRIMARY} />
      <TextInput placeholder='Search...'
      style={{
        fontFamily:'outfit',
        fontSize:16
      }}
      />
      </View>
      <Catergory 
      explore={true}
      onCategorySelect={(category)=> GetBusinessByCategory(category)}
      />
      <ExploreBusinessList businessList={businessList}/>
    </View>
  )
}