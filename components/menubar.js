import React, { Component } from 'react'
import {StyleSheet,Text} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

export default class Menubar extends Component{

    render(){

        return(
            <Icon
                name="md-menu"
                color="#000000"
                size={32}
                onPress={() =>this.props.navigation.openDrawer()}
                style={styles.menuicon}
            />
        )
    }
}

const styles= StyleSheet.create({

    menuicon:{
        zIndex: 0,
        position:'absolute',
        top:'32%',
        left:'5%'
    }
})
 