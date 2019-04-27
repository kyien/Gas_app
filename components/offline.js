import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  
const { width } = Dimensions.get('window')


export default class OfflineNotice extends Component {
  
   componentDidMount(){
    loc(this)
   }

   componentWillUnMount() {
    rol()
    
  }
  render() {
    
    return (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
          <Icon
                name="md-refresh"
                color="#000000"
                size={40}
                onPress={() =>this.forceUpdate()}
                style={styles.menuicon}
            />
        </View>
      )
   
  }



}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height:hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    width,
    position: 'absolute',
    top:hp('0%')
  },
  offlineText: { 
    color: '#fff',
    fontSize:15,
    marginBottom:hp('5%')

  },
  menuicon:{

  }
})
