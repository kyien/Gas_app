import  React,{Component } from "react";
import {Text,View,StyleSheet,ImageBackground}from 'react-native'

import {Container,List,ListItem,Left,Header,Right,Content,Body,Icon} from 'native-base'

import HeaderBar from "../components/header";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'

export default class Home extends Component {
   
    componentDidMount(){
        loc(this)
       
    }
    
    componentWillUnMount() {
          rol()
          
        }
 
    
    render() {
        return(
            < ImageBackground 
            source={require('../assets/ssp.jpg')} 

            style={styles.container}>
            <HeaderBar navigation={this.props.navigation} title={'Home'}/>
              
              <Body  style={styles.content}>

         

        

             
    
   
            </Body>
            </ ImageBackground>
                );
            }
        }

    const styles=StyleSheet.create({
        container:{
            flex:1,
            width:null,
            height:null,
            justifyContent: 'center',
            resizeMode: 'cover'
            // backgroundColor: '#fff',       
         },
    
        content:{
            flex:1,
            //  justifyContent: 'center',
            // alignItems: 'center',
        },
       
    })