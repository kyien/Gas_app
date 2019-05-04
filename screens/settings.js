import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,ToastAndroid,TouchableHighlight,
    Image,TouchableOpacity
} from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'

  import ImagePicker from 'react-native-image-picker'
  import Icon from "react-native-vector-icons/Ionicons"
  import ImageView from 'react-native-image-view'


import HeaderBar from "../components/header"
import Loader from "../components/loading";
import AsyncStorage from '@react-native-community/async-storage'
import firebase from "react-native-firebase"

import KeyboardShift from "../components/keyboardshift"
import { TextInput, ScrollView } from "react-native-gesture-handler";


export default class SettingsScreen extends Component {
  
    constructor(props){
        super(props)
        this.state={
        //  userdoc:null,
         newdisplayname:this.props.navigation.state.params.user.displayname,
         showinput:false,
         profileUrl:this.props.navigation.state.params.user.photourl,
         isloading:false,
         isVisible:false
        }
    }

    
    componentDidMount(){
      // this.get_user_data()
        console.log(this.state.userdoc)
        loc(this)

    }
    // get_user_data = async()=>{
    //     try {
    //         const retrievedItem =  await AsyncStorage.getItem('AuthUser');
    //         const item = JSON.parse(retrievedItem);
    //         this.setState({userdoc:item})

    //         console.log(item)
    //       } catch (error) {
    //         console.log(error.message);
    //       }
    //       this.setState({isloading:false})

    // }
    
    componentWillUnMount() {
          rol()
          
        }
        zoom_image(){

          this.setState({isvisible:true})
                   }

        toggle_input=()=>{

          if(!this.state.showinput){

            this.setState({showinput:true})
          }
          else{
            this.setState({showinput:false})

          }
        }
        async chooseFile(){

            let options = {
              title: 'Select Image',
              customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
              ],
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            }
           
          await  ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                  console.log('User cancelled photo picker');
                }
                else if (response.error) {
                  console.log('ImagePicker Error: '+response.error);
                }
                else if (response.customButton) {
                  console.log('User tapped custom button: '+response.customButton);
                }
                else {
                    const sessionId = new Date().getTime()

                const imageName=sessionId+'.jpg'
                this.setState({isloading:true})

                  firebase.storage().ref('users').child(imageName)
                  .put(response.uri, { contentType : 'image/jpeg' }) //--> here just pass a uri
                  .then((snapshot) => {
                    console.log(JSON.stringify(snapshot.downloadURL))
                    
                    this.setState({profileUrl:snapshot.downloadURL})
                    // this.setState({newprofileUrl:snapshot.downloadURL})
                    this.setState({isloading:false})

                  }).catch((error)=> console.log(error))
                }
                

            })
          
          }

          change_profile=async ()=>{

            await firebase.firestore().collection('users').doc(global.user.uid)
            .update({
                photourl:this.state.profileUrl,
                displayname:this.state.newdisplayname
            }).then(()=>{
              
              console.log('user doc changed successfully!')
              ToastAndroid.showWithGravity(
                'Profile changed successfully!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                )
              }).catch(error =>console.log(error))
          }
    render() {
      console.log(this.props.navigation.state.params.user)
      const Authuser=this.props.navigation.state.params.user
    //   const images=[{
    //     source:{uri:this.state.profileUrl},
    //     width:wp('100%'),
    //     height:hp('80%'),
    // }]
      // this.setState({ newdisplayname:Authuser.displayname})

        return (

            // <KeyboardShift>
            // {() => (
            <View style={styles.container}>
            <Loader
                isloading={this.state.isloading} />
                        <HeaderBar navigation={this.props.navigation} title={'Settings'}/>
                        {/* <ImageView
                        images={images}
                        imageIndex={0}
                        isVisible={this.state.isvisible}
                    /> */}
                  <ScrollView style={styles.sub_container}>
                <View style={styles.holder}>
      
                   

                          
                      <View style={styles.fields} >

                       
                        <View style={{alignItems:'center'}}>
                            {/* <TouchableOpacity onPress={this.zoom_image}> */}
                            <Image
                                  // source={require('../assets/icon.png')}
                                  source={{uri:this.state.profileUrl}}
                                  style={styles.image_icon}
                              /> 
                              {/* </TouchableOpacity> */}
                             <View style={styles.photo_picker}>
                                <Icon
                                  name="md-camera"
                                  size={32}
                                  color="#fff"
                                  onPress={()=>{this.chooseFile()}} 
                                />
                              </View>
                              <View style={{alignItems:'flex-start'}}>
                              {/* <Text style={styles.inputlabel}></Text> */}
                             <Text> DisplayName: </Text>
                              <View style={{flexDirection:'row'}}>
                              {/* {Authuser.displayname}</Text> */}
                              <TextInput
                                value={this.state.newdisplayname}
                                editable={false}
                                style={styles.cust_input}
                              />
                              <TouchableOpacity style={styles.dis_btn} onPress={this.toggle_input}>      
                              <Text style={styles.dis_buttonText}>CHANGE</Text>
                          </TouchableOpacity>
                              </View>
                          {this.state.showinput ?    <TextInput
                                value={this.state.newdisplayname}
                                style={styles.input}
                                onChangeText={(newdisplayname)=> this.setState({newdisplayname})}
                              /> : null}
                              </View>
                        </View>
                       
                          
                               <TouchableOpacity style={styles.buttonContainer} 
                          onPress={this.change_profile}
                          >      
                              <Text  style={styles.buttonText}>CHANGE PROFILE</Text>
                          </TouchableOpacity>
      
                        
                          </View>
                         
                  </View>
                  </ScrollView>
                  
            </View>
                 
        )
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      },
      inputlabel:{
        color:'#27ae60',
        fontSize:15
    },
      
      image_icon:{
        marginTop: hp('10%'),
        marginBottom: hp('5%'),
        width:wp('50%'), 
        height:hp('25%') ,
        borderRadius:wp('25%'),
    
      },
      cust_input:{
        height:hp('6%'),
        width:wp('50%'),
        backgroundColor: '#9B928D',
        borderRadius: 2,
        marginBottom:hp('2%'),
        paddingLeft:wp('20%'),
        color: '#fff'
    },
      input:{
        height:hp('6%'),
        width:wp('75%'),
        backgroundColor: '#9B928D',
        borderRadius: 2,
        marginBottom:hp('2%'),
        paddingLeft:wp('10%'),
        color: '#fff'
    },
    photo_picker:{
      marginTop:hp('27%'),
      left:wp('45%'),
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: '#0CC2E7',
      width:wp('15%'),
      height:hp('7.5%'),
      position:'absolute',
      borderRadius:wp('7.5%'),
      
    },
     
      holder:{
        alignItems:'center'
    },
    sub_container:{
        // flex:1,
        // paddingLeft:wp('-10%'),
        marginTop: hp('2%'),
        borderRadius:hp('1%'),
        backgroundColor:'#b2afaf',
        // alignItems: 'center',
        width:wp('90%'),
        height:hp('80%'),
        left:wp('4.4%')
    
    },
      buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical:hp('1.6%'),
        width:wp('50%'),
        marginTop:hp('1%'),
        marginBottom:hp('5%')
       },
       uploadbtn:{
        backgroundColor: '#2980b6',
        paddingVertical:hp('1.6%'),
        marginBottom:hp('3%'),
        width:wp('35%')
        // left:wp('7%')
    
       },
       dis_btn:{
        marginTop:hp('0.5%'),
        backgroundColor: '#2980b6',
        // paddingVertical:hp('0.5%'),
        left:wp('3%'),
        height:hp('5%'),
        width:wp('20%')
    },
    dis_buttonText:{
      color: '#fff',
      paddingVertical:hp('1%'),
      textAlign: 'center',
      fontSize:10
     },
       buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
       }
    
      
})