import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native"

import HeaderBar from "../components/header"

export default class SettingsScreen extends Component {
  

    render() {
        return (

            <View style={styles.container}>
                <HeaderBar navigation={this.props.navigation} title={'Settings'}/>                

                <Text>Settings page</Text>
            </View>
        )
    }

}



const styles = StyleSheet.create({
    icon: {
        height: 24,
        width: 24
    },
        container: {
          flex: 1,
          backgroundColor: '#fff',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        }
      
})