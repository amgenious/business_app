import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import {db}from "../../configs/FirebaseConfig"
import PopularBusinessCard from '../../components/Home/PopularBusinessCard'
import BusinessListCard from '../../components/BusinessList/BusinessListCard'
import { Colors } from '../../constants/Colors'

export default function MyBusiness() {
    const {user}=useUser()
    const navigaton =useNavigation()
    const [businessList, setBusinessList] =useState([])
    const [loading, setLoading] =useState(false)
    useEffect(()=>{
        navigaton.setOptions({
            headerShown:true,
            headerTitle:'My Business',
            headerStyle:{
                backgroundColor:Colors.PRIMARY,
                
            }
          })
        user&&GetUserBusiness()
    },[])
    const GetUserBusiness=async()=>{
        setLoading(true)
        setBusinessList([])
       const q=query(collection(db,'BusinessList'), where('userEmail','==',user?.primaryEmailAddress?.emailAddress)) 
       const querySnapshot = await getDocs(q)

       querySnapshot.forEach((doc)=>{
        console.log(doc.data())
        setBusinessList(prev=>[...prev,{id:doc.id, ...doc.data()}])
       })
       setLoading(false)
    }
  return (
    <View
    style={{
        padding:20
    }}
    >
      <Text
       style={{
        fontFamily:'outfit-bold',
        fontSize:35
      }}
      >My Business</Text>
      <FlatList 
      data={businessList}
      onRefresh={GetUserBusiness}
      refreshing={loading}
      renderItem={({item,index})=>(
        <BusinessListCard 
        business={item} key={index} 
        />
      )}
      />
    </View>
  )
}