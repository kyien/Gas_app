import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage'
import firebase from "react-native-firebase"

import DrawerItem from './draweritems'
   
  
// const WIDTH=Dimensions.get('window').width
// const HEIGHT=Dimensions.get('window').height

export default class Menudrawer extends Component{
    constructor(props){
        super(props)
        this.state={
            usersdoc:null,
          
        }
    }
    
componentWillMount(){

    firebase.firestore().collection('users').doc(global.user.uid)
            .get().then((doc)=>{
            if(doc.exists){

            global.userdoc=doc
        this.setState({usersdoc:doc})
            console.log(global.userdoc)
            }
            else {
        console.log('not found ...')
            }
        }).catch((error)=>{
            console.log(error)
        })
    // AsyncStorage.getItem('userData').then((user_data_json) => {
    //     let userData = JSON.parse(user_data_json)
    //     this.setState({
    //     usersdoc: userData,
    //     });
    //   });

}

componentDidMount(){
    console.log(this.state.usersdoc)

    
}

logout= async()=>{
    try {
        await firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    } catch (e) {
        console.log(e);
    }

}

    
render(){
console.log(this.state.usersdoc)
   return this.state.usersdoc ? <DrawerItem logout={this.logout} navigation={this.props.navigation} userdata={this.state.usersdoc}/>:null
       

}
}


