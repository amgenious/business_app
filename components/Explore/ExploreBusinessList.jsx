import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import ExploreBusinessListCard from './ExploreBusinessListCard'

export default function ExploreBusinessList({businessList}) {
  return (
    <ScrollView>
      <FlatList 
      scrollEnabled
      data={businessList}
      renderItem={({item,index}) => (
        <ExploreBusinessListCard business={item} key={index}/>
      )}
      />
      <View style={{
        height:100
      }}></View>
    </ScrollView>
  )
}