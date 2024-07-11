import { View, Text } from 'react-native'
import React from 'react'
import Userinter from '../../components/Profile/Userinter'
import MenuList from '../../components/Profile/MenuList'

export default function Profile() {
  return (
    <View style={{
      padding:20
    }}>
      <Text
      style={{
        fontFamily:'outfit-bold',
        fontSize:35
      }}
      >Profile</Text>
      <Userinter />
      <MenuList />
    </View>
  )
}