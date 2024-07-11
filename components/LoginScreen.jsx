import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <View style={{display:'flex', alignItems:'center', marginTop:100}}>
       <Image source={require('./../assets/images/login.png')} 
       style={{width:220,height:450, borderRadius:20, borderWidth:2,borderColor:'#000'}}
       />
      </View>
      <View style={styles.subContainer}>
        <Text style={{fontSize:30,fontFamily:'outfit-bold',textAlign:'center'}}>Your Ultimate 
            <Text style={{color:Colors.PRIMARY}}> Community Business Directory </Text> 
            App.
        </Text>
        <Text style={{fontSize:15, fontFamily:'outfit', textAlign:'center', marginVertical:15, color:Colors.GRAY}}>Find your favorite business near you and post your own business to your community.</Text>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={{textAlign:'center', color:"#fff", fontFamily:'outfit'}}>Let's get started</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    subContainer:{
        backgroundColor:'#fff', padding:20, marginTop:-20
    },
    btn:{
        backgroundColor:Colors.PRIMARY,
        padding:16,
        borderRadius:99,
        marginTop:20
    }
})