import React, { Component } from "react";
import { View,Text, StyleSheet,Platform,Dimensions,Image,ScrollView} from "react-native"
import {Container,List,ListItem,Left,Header,Right,Content,Body,Icon} from 'native-base'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
   
// const WIDTH=Dimensions.get('window').width
// const HEIGHT=Dimensions.get('window').height

export default class Menudrawer extends Component{

componentDidMount(){
    loc(this)
}

componentWillUnMount() {
      rol()
    }
    
render(){

    return(
        <Container style={styles.container}>
            <Header style={styles.drawerHeader}>

                 <Icon name="arrow-back" 
                    style={styles.back_arrow} 
                        onPress={() =>this.props.navigation.closeDrawer()}
                    />
               
            <Body>
               
                   
                <Image
                style={styles.drawerImage}
                source={require('../assets/icon.png')} />

                
            </Body>
            </Header>
            <ScrollView>
            <ListItem onPress={()=>this.props.navigation.navigate('Home')} last>
            <Icon type="FontAwesome" name="home" style={{color:'white'}}></Icon>
            <Text style={styles.nav_text} >Home</Text>
            </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate('Sales_Form')}last>
            <Icon type="FontAwesome" name="plus" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>Add sale</Text>
             </ListItem>
            <ListItem last>
            <Icon type="FontAwesome" name="users" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>DashBoard</Text>
             </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate('Settings')} last>
            <Icon type="FontAwesome" name="users" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>Settings</Text>
             </ListItem>
            <ListItem last>
            <Icon type="FontAwesome" name="comment" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>Chats</Text>
             </ListItem>
           
            <ListItem last>
            <Icon type="FontAwesome" name="sign-out" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>Logout</Text>
             </ListItem>
             </ScrollView>
        </Container>
    )
}
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        // alignItems: 'center',

        backgroundColor:'#F56006'
    },nav_text:{
        color:'#fff',
        fontWeight: 'normal',
        paddingLeft: 50,
      },
      drawerHeader: {
        height: hp('20%'),
        backgroundColor: '#b2afaf'
      },
      drawerImage: {
        height: hp('15%'),
        width: wp('30%'),
        borderRadius: wp('18%'),
        left:'25%',
        position:'absolute',
         marginTop:hp('-7%')
      },
      back_arrow:{
          left:wp('60%'),
          marginTop:hp('1%'),
          position:'absolute'

      }
})