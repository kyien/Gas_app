import React, {Component} from 'react'
import {View} from 'react-native'

import firebase from "react-native-firebase"
import Loader from "./components/loading"



export default class CheckAuth extends Component{

    constructor(){
        super()
        this.unsubscriber = null;

        this.state={
            signedIn:false,
            checksignedin:false,
            isloading:false,
            // userdoc:null

        }
        // this.get_auth_status
        

    }
    componentDidMount(){
        this.setState({isloading:true})
       

        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            if(user){
            this.setState({ signedIn:user,checksignedin:true });

            }
            else{
                this.setState({ signedIn:false,checksignedin:false });

            }
          })
          this.nav_status()
          console.log(this.state.signedIn)

    }

    componentWillUnmount(){
        if (this.unsubscriber) {
            this.unsubscriber()
          }
    }

    nav_status=()=>{

        this.setState({isloading:false})
        return   this.props.navigation.navigate(this.state.checksignedin ? 'signedin' : 'signedout');
 
    }
   

    render(){
        const { checksignedin, signedIn } = this.state

        return(
           
                <Loader isloading={this.state.isloading}/>
          
        )
      
    }
}