import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import BusinessListCard from '../../components/BusinessList/BusinessListCard'
import { Colors } from '../../constants/Colors'

export default function BusinessListByCategory() {
    const navigation = useNavigation()
    const {category} = useLocalSearchParams()

    const [BusinessList,setBusinessList] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerShown:true,
            headerTitle:category
        })
        getBusinessList()
    },[])
    const getBusinessList =async() => {
      setLoading(true)
        setBusinessList([])
        const q=query(collection(db,'BusinessList'), where("category","==",category));
        const querySnapshot =await getDocs(q)

        querySnapshot.forEach((doc) => {
            setBusinessList(prev=>[...prev,{id:doc?.id, ...doc.data()}])
        })
        setLoading(false)
    }

  return (
    <View>
      {
        BusinessList?.length > 0 && loading==false ?
        <FlatList
      data={BusinessList}
      onRefresh={getBusinessList}
      refreshing={loading}
      renderItem={({item, index}) =>(
        <BusinessListCard 
        business={item}
        key={index}
        />
      )}
      />:loading?<ActivityIndicator 
      style={{
        marginTop:"60%"
      }}
      size={'large'}
      color={Colors.PRIMARY}
      /> :
      <Text
      style={{
        fontSize:20,
        fontFamily:"outfit-bold",
        color:Colors.GRAY,
        textAlign:"center",
        marginTop:"50%"
      }}
      >No Business Found</Text>
      }
    </View>
  )
}