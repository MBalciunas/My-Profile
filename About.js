import React from 'react'
import { TouchableOpacity } from 'react-native';
import {  AsyncStorage, StyleSheet, Text, View, Button,  Image, TextInput, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class About extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    aboutMe: '',
    temperature: '',
    symbols: ''
    }
  }

  componentDidMount = async () =>{
       await AsyncStorage.getItem('aboutMe').then(value => this.setState({aboutMe: value, symbols: value.length}));

       fetch('http://api.openweathermap.org/data/2.5/weather?q=Vilnius&appid=1e4a1153b2c034893f23e22d7088de15', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
        let temp = Math.round(data.main.temp - 273);
        this.setState({'temperature': temp});
      })
      .catch((error) => {
         alert(error);
      });
  }

  setText = (value) =>{
    AsyncStorage.setItem('aboutMe', value);
    this.setState({ aboutMe: value, symbols: value.length });
 }


  goGitHub = () => {
    Linking.openURL('https://github.com/MBalciunas/FibonacciDP');
  }
  render(){
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection:'row'}}>
          <Image source={require('./about_picture.jpg')} style={{width: 100, height: 150, marginTop: 10, marginLeft: 10 }}/>
          <Text style={{fontSize: 30, marginLeft: 20, textAlignVertical: 'center'}}>Mangirdas</Text>
        </View>
        <Text style={{color: 'gray', marginLeft: 10}}>About me</Text>
        <TextInput  style={{fontSize: 15, lineHeight: 15}} maxLength={120} multiline={true} textBreakStrategy={"highQuality"} onChangeText={this.setText} value= {this.state.aboutMe}/>  
        <Text style={{color: 'gray', fontSize: 10, alignSelf: 'flex-end', marginLeft: 10}}>{this.state.symbols}/120</Text> 
        <Text style={{fontSize: 20, marginTop: 20, marginHorizontal: 20, textAlign: 'center'}}>I live in city where current temperature is</Text>
        <Text style={{alignSelf: 'center', fontSize: 30, marginTop: 10}}>{this.state.temperature} °C</Text>
        <View style={{ alignSelf: 'center', height: 50, width: 100, marginTop: 20}}>
          <Button title="My GitHub profile" color="red" onPress={this.goGitHub} />
        </View>
      </View>
    );
  }
}