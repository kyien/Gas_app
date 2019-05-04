import React from "react";
import {Platform,Dimensions} from "react-native";
import {createDrawerNavigator,createAppContainer,
createStackNavigator,createSwitchNavigator} from 'react-navigation'

//navigation pages
import CheckAuth from './checkauth'
import Home from './screens/home'
import SettingsScreen from './screens/settings'
import Menudrawer from "./components/menudrawer";
import SalesForm from './screens/sales'
import Cash from './screens/pettycash' 
import Register from './screens/register' 
import Login from './screens/login' 
import Dashrouter from './screens/admin/router'

const WIDTH=Dimensions.get('window').width
// const navigation=this.props.navigation
const Drawerconfig={
    drawerWidth:WIDTH*0.75,
    contentComponent:(props)=>{
        return(<Menudrawer {...props}/>)
    }
}

export const signedin= createDrawerNavigator({
   
    Home:{
        screen:Home
      },

      Sales_Form:{
          screen:SalesForm
      },
      Settings:{
        screen:SettingsScreen
      },
      
      Cash:{
          screen:Cash
      },
     Dashrouter:{
         screen:Dashrouter
     }
      
    },
    Drawerconfig
)

export const signedout=createStackNavigator({
    Login:{
        screen:Login
    },
    Register:{
        screen:Register
    }

},{
    headerMode: 'none'
}

)

//  const createRootNavigator = (signedIn = false) => {
    const RootNav=createSwitchNavigator(
        {
           checkauth:{
                screen:CheckAuth
           },
            signedin:{
                screen:signedin
            },
            signedout:{
                screen:signedout
            }
        },
        {

            // initialRouteName: 'signedin'
            initialRouteName: 'checkauth'
            // headerMode: 'none'

            // initialRouteName: signedIn ? "signedin" : "signedout"
        })

//         return <RootNav/>
// }
// const Drawer=createAppContainer(Drawernavigator)
export default createAppContainer(RootNav)