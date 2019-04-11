import  React,{Component } from "react";
import {Text,View,StyleSheet,Image}from 'react-native'

import {Container,List,ListItem,Left,Header,Right,Content,Body,Icon} from 'native-base'

import HeaderBar from "../components/header";


export default class Home extends Component {

    // static navigationOptions = ({ navigation }) => ({
    //     header: <HeaderBar title="Home"/>
    //   });
    // state = {
    //     members: []
    //   }

    //   componentDidMount = () => {
    //     axios.get('http://ken.trusoft.tech/members').then(res =>{
    //       const members=res.data
    //       console.log(res.data)
    //       this.setState({members})
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    //   }
      
    
    render() {
        return(
            <Container style={styles.container}>
            <HeaderBar navigation={this.props.navigation} title={'Home'}/>
              
              <Content  style={styles.content}>
    <Text>Welcome Home</Text>
   
            </Content>
            </Container>
                );
            }
        }

    const styles=StyleSheet.create({
        container:{
            flex:1,
            // justifyContent: 'center',
            backgroundColor: '#fff',       
         },
    
        content:{
            flex:1,
            //  justifyContent: 'center',
            // alignItems: 'center',
        },
       
    })