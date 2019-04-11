import React, { Component } from "react";
import {Platform,Dimensions} from "react-native";
import {createDrawerNavigator,createAppContainer} from 'react-navigation'

//navigation pages
import Home from './screens/home'
import SettingsScreen from './screens/settings'
import Menudrawer from "./components/menudrawer";
import SalesForm from './screens/sales'

   
const WIDTH=Dimensions.get('window').width

const Drawerconfig={
    drawerWidth:WIDTH*0.75,
    contentComponent:({navigation})=>{
        return(<Menudrawer navigation={navigation}/>)
    }
}

const Drawer= createDrawerNavigator({
    Home:{
        screen:Home
      },
      Sales_Form:{
          screen:SalesForm
      },
      Settings:{
        screen:SettingsScreen
      }
    },
    Drawerconfig
)

// const Drawer=createAppContainer(Drawernavigator)
export default createAppContainer(Drawer)