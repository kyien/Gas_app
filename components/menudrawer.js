import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage'
import firebase from "react-native-firebase"

import DrawerItem from './draweritems'
   
  

export default class Menudrawer extends Component{
    constructor(props){
        super(props)
        this.state={
            usersdoc:global.userdoc,
            isloading:false
          
        }
    }
    // 
// componentWillMount(){

  
//     this.get_user_data()
// }

componentDidMount(){
    console.log(this.state.usersdoc)

}

// get_user_data= ()=>{
// this.setState({isloading:true})
    
//         AsyncStorage.getItem('AuthUser').then((retrievedItem)=>{

//             const item = JSON.parse(retrievedItem);
//             this.setState({usersdoc:item})

//         }).catch(error => console.log(error))
       
//       this.setState({isloading:false})

// }

logout= ()=>{
    // try {
         firebase.auth().signOut().then(() => {
         
         AsyncStorage.removeItem('AuthUser').then(()=>{
                console.log('user removed')
            this.props.navigation.navigate('Login')
         }).catch( ()=> console.log('unable to remove item'))
        
        }).catch(error=>{

            console.log(error)
        })
    }



    
render(){

   return this.state.usersdoc ?
    <DrawerItem logout={this.logout} loading={this.state.isloading}
     navigation={this.props.navigation} userdata={this.state.usersdoc}/>:null
       

}
}


