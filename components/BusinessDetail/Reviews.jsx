import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '../../constants/Colors'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';

import { useUser } from '@clerk/clerk-expo';

export default function Reviews({business}) {
    const [rating,setRating] = useState(4);
    const [userInput, setUserInput] = useState("")
    const {user}=useUser()

    const onSubmit=async()=>{
        console.log(rating,userInput)
        const docRef=doc(db,'BusinessList', business.id)
        await updateDoc(docRef,{
            reviews:arrayUnion({
                rating:rating,
                comment:userInput,
                userName:user?.fullName,
                userImage:user?.imageUrl,
                userEmail:user?.primaryEmailAddress?.emailAddress
            })
        })
        ToastAndroid.show('Comment Addded Successfully !', ToastAndroid.BOTTOM)
    }
  return (
    <View style={{
        padding:20,
        backgroundColor:"white"
    }}>
      <Text
      style={{
        fontFamily:"outfit-bold",
        fontSize:20,
      }}
      >Reviews</Text>
      <View>
        <Rating 
        showRating = {false}
        imageSize={20}
        onFinishRating={(rating) => setRating(rating)}
        style={{
            paddingVertical:10 
        }}
        />
        <TextInput 
        value={userInput}
        onChangeText={(value)=> setUserInput(value)}
        keyboardType='default'
        style={{
            borderWidth:1,
            padding:10,
            borderRadius:10,
            borderColor:Colors.GRAY,
            textAlignVertical:'top'
        }}
        numberOfLines={4}
        placeholder='Write your comments'
        />
        <TouchableOpacity
        disabled={!userInput}
        onPress={onSubmit}
        style={{
            padding:10,
            backgroundColor:Colors.PRIMARY,
            borderRadius:6,
            marginTop:10
        }}
        >
            <Text
            style={{
                fontFamily:'outfit',
                color:'white',
                textAlign:"center"
            }}
            >Submit</Text>
        </TouchableOpacity>
      </View>
      <View>
        {business?.reviews?.map((item,index) => (
            <View key={index} style={{
                display:"flex",
                flexDirection:"row",
                gap:10,
                alignItems:"center",
                padding:10,
                borderWidth:1,
                borderColor:Colors.GRAY,
                borderRadius:15,
                marginTop:10
            }}>
                <Image source={{uri:item.userImage}}
                style={{
                    width:50,
                    height:50,
                    borderRadius:99
                }}
                />
                <View style={{
                    display:'flex',
                    gap:5
                }}>
                <Text style={{
                    fontFamily:'outfit-medium'
                }}>{item.userName}</Text>
                <Rating 
                style={{
                    alignItems:"flex-start"
                }}
                ratingCount={item.rating}
                imageSize={20}/>
                <Text>{item.comment}</Text>
                </View>
            </View>
        ))}
      </View>
    </View>
  )
}