import { View, Text, FlatList } from 'react-native'
import React,{ useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import PopularBusinessCard from './PopularBusinessCard';

export default function PopularBusiness() {
    const [popularBusinessList, setPopularBusinessList] = useState([]);
  useEffect(()=>{
    GetPopularBusinessList()
  },[])

    const GetPopularBusinessList=async()=>{
        setPopularBusinessList([])
    const q=query(collection(db,'BusinessList'),limit(10));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc)=>{
        setPopularBusinessList(prev=>[...prev,{id:doc.id, ...doc.data()}])
      })
    }
  return (
    <View
    style={{
      marginBottom:20
    }}>
         <View
        style={{
        display:'flex',
        flexDirection:'row',
        padding:20,
        marginBottom:10, 
        justifyContent:'space-between',
        marginTop:10,
        }}
        >
      <Text style={{ 
        fontFamily:'outfit-bold',
        fontSize:20,
        }}>Popular Business
        </Text>
        <Text
        style={{color:Colors.PRIMARY, fontFamily:'outfit-medium'}}
        >View All</Text>
    </View>
    <FlatList 
    data={popularBusinessList}
    showsHorizontalScrollIndicator={false}
    horizontal={true}
    renderItem={({item,index})=>(
       <PopularBusinessCard 
       business={item}
       key={index}
       />
    )}
    />
    </View>
  )
}