import React  from 'react'
import { 
    View, Text, TextInput,Alert,KeyboardAvoidingView,ToastAndroid,
     Image,ScrollView,TouchableOpacity,StyleSheet} 
from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  
  import { withNavigation } from 'react-navigation';


  import ValidationComponent from 'react-native-form-validator'
  import {Header} from 'native-base'


import firebase from "react-native-firebase"

//local components
import Loader from "../components/loading"
import KeyboardShift from "../components/keyboardshift"

 class Register extends ValidationComponent{
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      name:'',
      isloading:true
      
    }
  }
  componentDidMount(){
    loc(this)
    this.setState({isloading:false})
   
}

componentWillUnMount() {
      rol()
      
    }

    resetfields=()=> {
      this.setState({email:''})
      this.setState({password:''})
      this.setState({name:''})
     
  }
    reg=()=>{
        this.setState({isloading:true})

        this.validate({
            email: {email: true, required: true},
            name: {required: true,minlength:6,maxlength:30},
            password: {required: true,minlength:6,maxlength:30},
           
          });

          if(this.isFormValid()){
            this.salesref =firebase.firestore().collection('users')

            const userdata={
              displayname:this.state.name,
              role:'normal',
              photourl:'https://firebasestorage.googleapis.com/v0/b/gasapp-b6f31.appspot.com/o/users%2Fblank_avatar3.gif?alt=media&token=a39c53a7-0ea6-4f58-a6ad-a1d8f0676f81'
            }
              firebase.auth()
              .createUserWithEmailAndPassword(this.state.email, this.state.password)
              .then((result)=>{ 
              // console.log(result.user.uid)
                this.salesref.doc(result.user.uid).set(userdata)
                .then((doc)=>{
                  console.log('user created successfully!')
                  this.setState({isloading:false})
                  // this.resetfields()              
                  ToastAndroid.showWithGravity(
                    'User created succesfully!',
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    )
                    this.props.navigation.navigate('Login')
                }).catch((error)=>{
                  
                  console.log(error)
                  this.setState({isloading:false})
                  ToastAndroid.showWithGravity(
                    'Encountered an error creating the user!',
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    )

                
                

                })


              })
              .catch((error)=>{
                console.log(error)
                this.setState({isloading:false})
                ToastAndroid.showWithGravity(
                  'Encountered an error!',
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
      <Text style={styles.title}>Registration</Text>
      </Header>        
          <View style={styles.holder}>
            <View style={styles.sub_container}>

                    
                    
                <ScrollView style={styles.fields} >
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

                    <Text  style={styles.inputlabel}>Name:</Text>

                    <TextInput style = {styles.input}   
                        ref="name"
                        returnKeyType="go" 
                        // placeholder='unit_price' 
                        keyboardType='default'
                        value={this.state.name}
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(name) => this.setState({name})}


                        />
       <Text>{this.isFieldInError('name') && this.getErrorsInField('name').map(errorMessage => <Text style={styles.err_field}>{errorMessage}</Text>) } </Text> 

                         <TouchableOpacity style={styles.buttonContainer} 
                    onPress={this.reg}
                    >      
                        <Text  style={styles.buttonText}>REGISTER</Text>
                    </TouchableOpacity>
                    </ScrollView>
                   
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
    marginTop:hp('1%')
   },
   uploadbtn:{
    backgroundColor: '#2980b6',
    paddingVertical:hp('1.6%'),
    marginBottom:hp('3%'),
    width:wp('35%'),
    // left:wp('7%')

   },
   buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
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

export default withNavigation(Register);
