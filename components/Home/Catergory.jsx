import { View, Text, FlatList } from 'react-native'
import React,{ useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import CatergoryItem from './CatergoryItem'
import { useRouter } from 'expo-router'

export default function Catergory({explore=false, onCategorySelect}) {
    const [categoryList, setCategoryList] = useState([]);
    const router = useRouter();
  useEffect(()=>{
    GetCategoryList()
  },[])

    const GetCategoryList=async()=>{
    setCategoryList([])
    const q=query(collection(db,'Category'));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc)=>{
        setCategoryList(prev=>[...prev,doc.data()])
      })
    }
    const onCategoryPressHander=(item)=>{
      if(!explore){
        router.push('/businesslist/'+item.name)
      }else{
        onCategorySelect(item.name)
      }
    }
  return (
    <View>
       {!explore && <View
        style={{
        display:'flex',
        flexDirection:'row',
        padding:20, 
        justifyContent:'space-between',
        marginTop:10,
        }}
        >
      <Text style={{ 
        fontFamily:'outfit-bold',
       
        fontSize:20,
        }}>Catergory
        </Text>
        <Text
        style={{color:Colors.PRIMARY, fontFamily:'outfit-medium'}}
        >View All</Text>
    </View>}
    <FlatList 
    data={categoryList}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    style={{
        marginLeft:20
    }}
    renderItem={({item, index})=>(
        <CatergoryItem 
        category={item}
        onCategoryPress={(category) => onCategoryPressHander(item)} 
        key={index} />
    )}
    />
    </View>
  )
}