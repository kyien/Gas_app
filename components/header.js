import  React,{Component } from "react"
import {StyleSheet,Text}from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'
import {Header} from 'native-base'
import Menubar from "./menubar"

export default class HeaderBar extends Component {
constructor(props){
    super(props)
}

render(){

    return(

        <Header style={styles.drawerHeader}>
        <Menubar navigation={this.props.navigation} />
        <Text style={styles.title}>{this.props.title}</Text>

        </Header>

    )
}


}

const styles=StyleSheet.create({
   
    
    drawerHeader: {
        flex:0,
        backgroundColor: '#F56006',
        paddingTop: hp('4%'),
        zIndex:1
      },
    title:{
        fontSize:20,
        color:'#fff',
        left:wp('2%'),
        top:hp('-2%'),
        zIndex:2
    }

})