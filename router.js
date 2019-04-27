import React, { Component } from "react";
import {Platform,Dimensions} from "react-native";
import {createDrawerNavigator,createAppContainer,
createStackNavigator,createSwitchNavigator} from 'react-navigation'

//navigation pages
import CheckAuth from './checkauth'
import Home from './screens/home'
import SettingsScreen from './screens/settings'
import Menudrawer from "./components/menudrawer";
import SalesForm from './screens/sales'
import Dash from './screens/dash'
import Cash from './screens/pettycash' 
import Register from './screens/register' 
import Login from './screens/login' 
import { CheckBox } from "native-base"
import AllSales from './screens/admin/salesview'
import AllExpenses from './screens/admin/cashview'

const WIDTH=Dimensions.get('window').width

const Drawerconfig={
    drawerWidth:WIDTH*0.75,
    contentComponent:({navigation})=>{
        return(<Menudrawer navigation={navigation}/>)
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
      Dash:{
          screen:Dash
      },
      Cash:{
          screen:Cash
      },
      Sales:{
          screen:AllSales
      },
      PettyCash:{
          screen:AllExpenses
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

            initialRouteName: 'signedin'
            // initialRouteName: 'checkauth'
            // headerMode: 'none'

            // initialRouteName: signedIn ? "signedin" : "signedout"
        })

//         return <RootNav/>
// }
// const Drawer=createAppContainer(Drawernavigator)
export default createAppContainer(RootNav)