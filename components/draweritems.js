import React,{Component}  from 'react'
import { View,Text, StyleSheet,Platform,Dimensions,Image,ScrollView} from "react-native"

import {Container,List,ListItem,Left,Header,Right,Content,Body,Icon} from 'native-base'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'

  import Loader from './loading'

  export default class DrawerItem extends Component{

    constructor(props){
        super(props)
        this.state={
            user:this.props.userdata          
        }
    }
    componentDidMount(){

        loc(this)
    }
    componentWillUnMount() {
        rol()
      }
    
    render(){
        const user=this.state.user
        console.log(user)
        return(

            <Container style={styles.container}>
        <Loader
          isloading={this.props.loading} />
            <Header style={styles.drawerHeader}>

                 <Icon name="arrow-back" 
                    style={styles.back_arrow} 
                        onPress={() =>this.props.navigation.closeDrawer()}
                    />
               
            <Body>
               
                   
                <Image
                style={styles.drawerImage}
                //  source={require('../assets/icon.png')} />  
                source={{uri:this.state.user.photourl}} />

    <Text style={{ color:'#fff'}}> Welcome <Text style={styles.displayname}>{this.state.user.displayname}</Text></Text>
            </Body>
            </Header>
            <ScrollView>
            <ListItem onPress={()=>this.props.navigation.navigate('Home')} last>
            <Icon type="FontAwesome" name="home" style={{color:'white'}}></Icon>
            <Text style={styles.nav_text} >Home</Text>
            </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate('Sales_Form')}last>
            <Icon type="Ionicons" name="cash" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>Add sale</Text>
             </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate('Cash')}last>
            <Icon type="Ionicons" name="pricetag" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}> Add Petty cash record</Text>
             </ListItem>
             <ListItem onPress={()=>this.props.navigation.navigate('Dash')}last>
            <Icon type="Ionicons" name="analytics" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>Analytics</Text>
             </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate('Settings',{user})} last>
            <Icon type="Ionicons" name="settings" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>Settings</Text>
             </ListItem>
        
           
            <ListItem onPress={this.props.logout}last>
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
        height: hp('28%'),
        backgroundColor: '#b2afaf'
      },
      drawerImage: {
        height: hp('17%'),
        width: wp('34%'),
        borderRadius: wp('18%'),
        left:wp('18%'),
         marginTop:hp('4%'),
         marginBottom: hp('2%'),
      },
      displayname:{
        color:'#8F09BA',
        fontSize:15
      },
      back_arrow:{
          left:wp('60%'),
          marginTop:hp('1%'),
          position:'absolute'

      }
})