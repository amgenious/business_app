import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useNavigation } from 'expo-router'
import {Colors} from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select'
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import {db, storage} from "../../configs/FirebaseConfig"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {
  const navigaton =useNavigation()
  const {user} =useUser()
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [about, setAbout] = useState();
  const [website, setWebsite] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    navigaton.setOptions({
      headerShown:true,
      headerTitle:'Add New Business'
    })
    GetCategoryList()
  },[])
  const onImagePick =async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri)
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }
  const GetCategoryList=async()=> {
    setCategoryList([])
    const q=query(collection(db,'Category'));
    const snapShot = await getDocs(q)
    snapShot.forEach((doc) => {
      setCategoryList(prev=>[...prev,{
        label:(doc.data()).name,
        value:(doc.data()).name,
      }])
    })
  }
  const onAddNewBusiness =async()=>{
    setLoading(true)
    const fileName =Date.now().toString()+".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob()

    const imageRef = ref(storage,'businessList/'+fileName);
    uploadBytes(imageRef,blob).then((snapShot)=>{
      console.log("file uploaded")
    }).then(resp =>{
      getDownloadURL(imageRef).then(async(downloadUrl) => {
        console.log(downloadUrl)
        saveBusinessDetails(downloadUrl)
      })
    })
    setLoading(false)
  }
  const saveBusinessDetails =async(imageUrl) => {
    await setDoc(doc(db,'BusinessList',Date.now().toString()),{
      name:name,
      address:address,
      contact:contact,
      email:email,
      website:website,
      about:about,
      category:category,
      imageUrl:imageUrl,
      username:user?.fullName,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userImage:user?.imageUrl
    })
    setLoading(false)
    ToastAndroid.show('New business added...',ToastAndroid.LONG)
  }
  return (
    <View
    style={{
      padding:20
    }}
    >
      <Text
      style={{
        fontFamily:"outfit-bold",
        fontSize:25
      }}
      >Add New Business</Text>
      <Text
      style={{
        fontFamily:"outfit",
        color:Colors.GRAY
      }}
      >Fill all details in order to add new business</Text>
      <ScrollView>

      <TouchableOpacity
      style={{
        marginTop:20
      }}
      onPress={()=> onImagePick()}
      >
      {!image ? <Image 
      source={require('../../assets/images/camera.png')}
      style={{
        width:100,
        height:100
        }}
        />:<Image 
        source={{uri:image}}
        style={{
          width:100,
          height:100,
          borderRadius:15
          }}
          />
          }
        </TouchableOpacity>
        <View>
          <TextInput 
           value={name}
           onChangeText={(value)=> setName(value)}
           style={{
             padding:10,
             borderWidth:1,
             borderRadius:10,
             fontSize:17,
             backgroundColor:"white",
             marginTop:10,
             borderColor:Colors.PRIMARY,
             fontFamily:"outfit"
             }}
             placeholder='Name'
             />
          <TextInput 
           value={address}
           onChangeText={(value)=> setAddress(value)}
           style={{
             padding:10,
             borderWidth:1,
             borderRadius:10,
             fontSize:17,
             backgroundColor:"white",
             marginTop:10,
             borderColor:Colors.PRIMARY,
             fontFamily:"outfit"
             }}
             placeholder='Address'
             />
          <TextInput 
           value={contact}
           onChangeText={(value)=> setContact(value)}
           style={{
             padding:10,
             borderWidth:1,
             borderRadius:10,
             fontSize:17,
             backgroundColor:"white",
             marginTop:10,
             borderColor:Colors.PRIMARY,
             fontFamily:"outfit"
             }}
             placeholder='Contact'
             />
          <TextInput 
           value={email}
           onChangeText={(value)=> setEmail(value)}
           style={{
             padding:10,
             borderWidth:1,
             borderRadius:10,
             fontSize:17,
             backgroundColor:"white",
             marginTop:10,
             borderColor:Colors.PRIMARY,
             fontFamily:"outfit"
             }}
             placeholder='Email'
             />
          <TextInput 
           value={website}
           onChangeText={(value)=> setWebsite(value)}
           style={{
             padding:10,
             borderWidth:1,
             borderRadius:10,
             fontSize:17,
             backgroundColor:"white",
             marginTop:10,
             borderColor:Colors.PRIMARY,
             fontFamily:"outfit"
             }}
             placeholder='Website'
             />
          <TextInput
           value={about}
           onChangeText={(value)=> setAbout(value)}
           multiline
           numberOfLines={5} 
           style={{
             padding:10,
             borderWidth:1,
             borderRadius:10,
             fontSize:17,
             backgroundColor:"white",
             marginTop:10,
             borderColor:Colors.PRIMARY,
             fontFamily:"outfit",
             height:100
             }}
             placeholder='About'
             />
          <View style={{
            borderWidth:1,
            borderRadius:10,
            fontSize:17,
            backgroundColor:"white",
            marginTop:10,
            borderColor:Colors.PRIMARY,
            }}>
            <RNPickerSelect 
            value={category}
            onValueChange={(value)=>setCategory(value)}
            items={categoryList}
            />
          </View>
        </View>
        <TouchableOpacity
        disabled={loading}
        onPress={() => onAddNewBusiness()}
        style={{
          padding:15,
          backgroundColor:Colors.PRIMARY,
          borderRadius:5,
          marginTop:20
          }}
          >
         {loading? <ActivityIndicator 
         size={'large'}
         color="white"
         />: <Text
         style={{
           textAlign:"center",
           fontFamily:"outfit-medium",
           color:"white",
           fontSize:17
           }}
           >Add New Business</Text>}
        </TouchableOpacity>
           </ScrollView>
    </View>
  )
}