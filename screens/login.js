import React  from 'react'
import { 
    View, Text, TextInput,ToastAndroid,
     Image,TouchableOpacity,StyleSheet} 
from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'

  import AsyncStorage from '@react-native-community/async-storage'
   
  import ValidationComponent from 'react-native-form-validator'
  import {Header} from 'native-base'

// import Register from './register'
import firebase from "react-native-firebase"

//local components
import Loader from "../components/loading"
import KeyboardShift from "../components/keyboardshift"

export default class Login extends ValidationComponent{
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      isloading:true
      
    }
  }
  componentDidMount(){
    this.setState({isloading:false})
    loc(this)
   
}

componentWillUnMount() {
      rol()
      
    }


  
   
  

    login=()=>{
        this.setState({isloading:true})

        this.validate({
            email: { required: true},
            password: {required: true},
           
          });

          if(this.isFormValid()){
           
              firebase.auth()
              .signInWithEmailAndPassword(this.state.email, this.state.password)
              .then((AuthUser)=>{ 
              
                  
                global.user=AuthUser.user
                
                AsyncStorage.setItem('AuthUser', JSON.stringify(AuthUser.user));
                  this.setState({isloading:false})
                  ToastAndroid.showWithGravity(
                    'Success!',
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    )
                    this.props.navigation.navigate('Home')
                }).catch((error)=>{
                  
                  console.log(error)
                  this.setState({isloading:false})
                  ToastAndroid.showWithGravity(
                    'Login Failed!',
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    )
                })
              
          }
          else{
            this.setState({isloading:false})
 
          }
    }

  render(){
      
    return(
      <KeyboardShift>
      {() => (
      <View style={styles.container}>
      <Loader
          isloading={this.state.isloading} />
      <Header style={styles.drawerHeader}> 
      <Text style={styles.title}>Login</Text>
      </Header>        
          <View style={styles.holder}>
            <View style={styles.sub_container}>

                    
                    
                <View style={styles.fields} >
                  <View style={{alignItems:'center'}}>
                  <Image
                            source={ require('../assets/icon.png')}
                            style={styles.image_icon}
                        />
                  </View>
                 
                    <Text  style={styles.inputlabel}>Email:</Text>

                    <TextInput style = {styles.input}   
                        ref="email"
                        returnKeyType="go" 
                        // placeholder='unit_price' 
                        keyboardType='email-address'
                        value={this.state.email}
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(email) => this.setState({email})}
                        // onEndEditing={this.calculateTotal}


                        />
   <Text> {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text style={styles.err_field}>{errorMessage}</Text>) }</Text>
  
 
                    <Text  style={styles.inputlabel}>Password:</Text>

                    <TextInput style = {styles.input}   
                        ref="password"
                        returnKeyType="go" 
                        // placeholder='password' 
                        secureTextEntry={true}
                        keyboardType='default'
                        value={this.state.password}
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(password) => this.setState({password})}


                        />
    <Text>{this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text style={styles.err_field}>{errorMessage}</Text>) }</Text>

                 

                         <TouchableOpacity style={styles.buttonContainer} 
                    onPress={this.login}
                    >      
                        <Text  style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                  <Text style={{color:'#ff0000'}}> don't have an account? <Text style={styles.link_text}
                        onPress={() => this.props.navigation.navigate('Register')}>
                        {/* // onPress={() => {return (<Register/>)}}> */}
                    click here to register
                    </Text>
                    </Text>
                    </View>
                   
            </View>
            </View>

      </View>
       )}
      </KeyboardShift>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#b2afaf',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  },
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
},
  image_icon:{
    marginTop: hp('2%'),

    width:wp('30%'), 
    height:hp('15%') ,
    borderRadius:wp('18%'),

  },
  err_field:{
    marginBottom:hp('2%'),
    color:'#F30C0C'
},
  holder:{
    alignItems:'center'
},
sub_container:{
    // flex:1,
    paddingLeft:wp('-10%'),
    marginTop: hp('2%'),
    borderRadius:hp('1%'),
    backgroundColor:'#fff',
    alignItems: 'center',
    width:wp('90%'),
    height:hp('80%'),
    // left:wp('0%')

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
   buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
   },
   link_text:{
    color: 'blue',
    fontSize:13 ,
    textDecorationLine: 'underline'  
   },
fields:{
    flex:1,
    marginTop:hp('2%'),
  
    // alignItems:'flex-start'
},
input:{
    height:hp('6%'),
    width:wp('70%'),
    backgroundColor: '#9B928D',
    borderRadius: 2,
    // marginBottom:hp('0.5%'),
    // paddingLeft:wp('10%'),
    color: '#fff'
},
inputlabel:{
    color:'#27ae60',
    fontSize:15
}

})