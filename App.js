
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import SplashScreen from 'react-native-smart-splash-screen'
import Drawer from './DrawerNavigator'

export default class App extends Component {
  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 1000,
      delay: 500,
   })
  //  loc(this)
 
  }
  // componentWillUnMount() {
  //   rol()
  // }
  render() {
    return (

      <Drawer/>
    
    );
  }
}


