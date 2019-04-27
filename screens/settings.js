import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,TouchableOpacity
} from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'


import HeaderBar from "../components/header"
import Loader from "../components/loading";

import KeyboardShift from "../components/keyboardshift"


export default class SettingsScreen extends Component {
  
    constructor(props){
        super(props)
        this.state={
         userdoc:null,
         profileUrl:'../assets/icon.png',
         isloading:true
        }
    }

    componentWillMount(){
        this.setState({userdoc:global.userdoc})
    }

    componentDidMount(){
        // console.log(global.userdoc)
        // console.log(this.state.userdoc)
        loc(this)
        this.setState({isloading:false})

    }
    
    componentWillUnMount() {
          rol()
          
        }
    render() {
      
        return (

            <KeyboardShift>
            {() => (
            <View style={styles.container}>
            <Loader
                isloading={this.state.isloading} />
                        <HeaderBar navigation={this.props.navigation} title={'Settings'}/>
      
                <View style={styles.holder}>
                  <View style={styles.sub_container}>
      
                          
                          
                      <View style={styles.fields} >
                        <View style={{alignItems:'center'}}>
                        <Image
                                //   source={require('../assets/icon.png')}
                                  source={{uri:this.state.userdoc._data.photourl}}
                                  style={styles.image_icon}
                              />
                              <Text>{this.state.userdoc._data.displayname}</Text>
                        </View>
                       
                          
                               <TouchableOpacity style={styles.buttonContainer} 
                          onPress={this.login}
                          >      
                              <Text  style={styles.buttonText}>CHANGE PROFILE</Text>
                          </TouchableOpacity>
      
                        
                          </View>
                         
                  </View>
                  </View>
      
            </View>
             )}
            </KeyboardShift>
        )
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b2afaf',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      },
      
      
      image_icon:{
        marginTop: hp('10%'),
    
        width:wp('40%'), 
        height:hp('21%') ,
        borderRadius:wp('18%'),
    
      },
     
      holder:{
        alignItems:'center'
    },
    sub_container:{
        // flex:1,
        paddingLeft:wp('-10%'),
        marginTop: hp('2%'),
        borderRadius:hp('1%'),
        backgroundColor:'#fff',
        alignItems: 'center',
        width:wp('90%'),
        height:hp('80%'),
        // left:wp('0%')
    
    },
      buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical:hp('1.6%'),
        width:wp('50%'),
        marginTop:hp('1%'),
        marginBottom:hp('5%')
       },
       uploadbtn:{
        backgroundColor: '#2980b6',
        paddingVertical:hp('1.6%'),
        marginBottom:hp('3%'),
        width:wp('35%')
        // left:wp('7%')
    
       },
       buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
       }
    
      
})