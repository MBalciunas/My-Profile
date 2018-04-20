import React from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Button,  Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Home = () => {
    const goToAbout = () => {
        Actions.about()
     }
  return (
    <View style={{flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'}}>
      <Text style={{fontSize: 40, padding: 10}}>Mangirdas</Text>
      <View style={{padding: 30}}>
        <Image source={require('./home_picture.jpg')} style={{width: 200, height: 300}}/>
        </View>
      <Button color="red" title="My Profile" onPress={goToAbout}/>
    </View>
  );
}

export default Home
