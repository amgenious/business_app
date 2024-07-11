import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CatergoryItem({category,onCategoryPress}) {
  return (
    <TouchableOpacity onPress={(category)=>onCategoryPress(category)}>
        <View 
        style={{
            padding:15,backgroundColor:'white',
            borderRadius:99,marginRight:15,
        }}
        >
      <Image 
      source={{uri:category.icon}}
      style={{
          width:40,
          height:40
          }}
          />
          </View>
          <Text
          style={{
            fontSize:12,
            fontFamily:"outfit-medium",
            textAlign:'center',
            marginTop:5,
            marginLeft:-15
          }}
          >{category.name}</Text>
    </TouchableOpacity>
  )
}