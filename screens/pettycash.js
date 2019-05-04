import React  from 'react'
import { 
    View, Text, TextInput,Picker,Alert,Platform,ToastAndroid,
     Image,ScrollView,TouchableOpacity,StyleSheet} 
from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'

  //custom components
 import Loader from "../components/loading";
 import HeaderBar from "../components/header"
 import ValidationComponent from 'react-native-form-validator'

 
 import firebase from "react-native-firebase"
 import ImagePicker from 'react-native-image-picker'


  export default class Cash extends ValidationComponent{
      constructor(props){
        super(props)
        this.state={
            quantity:'',
            item:'',
            description:'',
            unit_price:'',
            total:'0',
            imageUrl:'',
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

        checkerr=(field)=>{

            if(this.isFieldInError(field) && this.getErrorsInField(field).length>0){

                return this.getErrorsInField(field)
                .map(errorMessage => <Text style={styles.err_field}>{errorMessage}</Text>)
            }
            else{
                return null
            }
      }

        id_gen =()=> {
             
            let id='PS'+ Math.floor(100000 + Math.random() * 900000)   
           
           return id
        
      }
      clearinputs=()=> {
        this.setState({quantity:''})
        this.setState({unit_price:''})
        this.setState({description:''})
        this.setState({item:''})
        this.setState({imageUrl:'xxxx.jpg'})
        this.setState({total:''})
     // this.forceUpdate()
    }
        calculateTotal=()=>{
            const total=this.state.unit_price * this.state.quantity
            console.log(total.toString())
            let final_total=total.toString()
        this.setState({total:final_total}) 
    }

        chooseFile(){
            
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
           
            ImagePicker.showImagePicker(options, (response) => {
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

                  firebase.storage().ref('petty_cash').child(imageName)
                  .put(response.uri, { contentType : 'image/jpeg' }) //--> here just pass a uri
                  .then((snapshot) => {
                    console.log(JSON.stringify(snapshot.downloadURL))
                    this.setState({imageUrl:snapshot.downloadURL})
                    this.setState({isloading:false})

                  }).catch((error)=> console.log(error))
                }
                

            })
          
          }


          OnSubmit=()=> {
            //   console.log(this.id_gen())
            this.setState({isloading:true})

            this.validate({
                quantity: { required: true,numbers:true},
                unit_price: {required: true,numbers:true},
                item: {required: true},
                description: {required: true},
                imageUrl: {required: true},
              });

              if(this.isFormValid()){
                  this.pettycashref =firebase.firestore().collection('Petty_cash_records')
                  console.log(this.pettycashref)
                  const pettycashDoc= {
                      item:this.state.item,
                      item_total:this.state.total,
                      quantity:this.state.quantity,
                      imageUrl:this.state.imageUrl,
                      unit_price:this.state.unit_price,
                      description:this.state.description,
                      created_at:firebase.firestore.FieldValue.serverTimestamp()
                  }
                  console.log( pettycashDoc)
                  this.pettycashref.doc(this.id_gen()).set(pettycashDoc)
        
                  .then((doc)=> {
                    console.log("document written successfully!");
                    this.setState({isloading:false})
                    this.clearinputs()              
                     ToastAndroid.showWithGravity(
                        'Record created succesfully!',
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                      )
                })
                .catch(function(error) {
                    this.setState({isloading:false})
                    console.error("Error writing document: ", error)
                    ToastAndroid.showWithGravity(
                        'Unable to create record!',
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                      )
                });
              }
              else{

                 // console.log(this.getErrorMessages())
                  this.setState({isloading:false})
              }

          }




    render(){
        return(
            <View style={styles.container}>
            <Loader
          isloading={this.state.isloading} />
            <HeaderBar navigation={this.props.navigation} title={'Petty Cash Form'}/>
            <View style={styles.holder}>
            <View style={styles.sub_container}>

                <ScrollView style={styles.fields} showsVerticalScrollIndicator={false}>
                 
                    <Text  style={styles.inputlabel}>Quantity:</Text>

                    <TextInput style = {styles.input}   
                        ref="quantity"
                        returnKeyType="go" 
                        // placeholder='unit_price' 
                        keyboardType='numeric'
                        value={this.state.quantity}
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(quantity) => this.setState({quantity})}
                        onEndEditing={this.calculateTotal}
                        />
                   <Text>{this.checkerr('quantity')}</Text>

                        <Text  style={styles.inputlabel}>unit_price:</Text>

                        <TextInput style = {styles.input}   
                            ref="unit_price"
                            returnKeyType="go" 
                            // placeholder='unit_price' 
                            keyboardType='numeric'
                            value={this.state.unit_price}
                            placeholderTextColor='#DDDBDA' 
                            onChangeText={(unit_price) => this.setState({unit_price})}
                            onEndEditing={this.calculateTotal}

                            />
                   <Text>{this.checkerr('unit_price')}</Text>


                    <Text  style={styles.inputlabel}>Item:</Text>

                    <TextInput style = {styles.input}   
                        ref="item"
                        returnKeyType="go" 
                        // placeholder='unit_price' 
                        keyboardType='default'
                        value={this.state.item}
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(item) => this.setState({item})}


                        />

                   <Text>{this.checkerr('item')}</Text>

                        <Text  style={styles.inputlabel}>Description:</Text>

                        <TextInput style = {styles.desc_input}   
                            ref="description"
                            returnKeyType="go" 
                            multiline={true}
                            numberOfLines={3}
                            // placeholder='unit_price' 
                            keyboardType='default'
                            value={this.state.description}
                            placeholderTextColor='#DDDBDA' 
                            onChangeText={(description) => this.setState({description})}


                            />
                   <Text>{this.checkerr('description')}</Text>


                    
                    <Text  style={styles.inputlabel}>Total</Text>

                    <TextInput style = {styles.input}   
                        returnKeyType="go" 
                        ref="total"
                        placeholderTextColor='#fff' 
                        editable={false}
                        value={this.state.total}
                        />

                    <TouchableOpacity style={styles.uploadbtn} 
                    onPress={() =>this.chooseFile()}
                    >      
                        <Text  style={styles.buttonText}>UPLOAD RECEIPT</Text>
                        </TouchableOpacity>
                      
                        {this.state.imageUrl ?
                        <Image ref='imageUrl'
                            source= {{uri: this.state.imageUrl}}
                    
                            style={{ width:wp('70%'), height: hp('30%') }}
                        />:
                        <Image  ref='imageUrl'
                            source={require('../assets/generic_avatar.jpg')}
                    
                            style={{ width:wp('70%'), height: hp('30%') }}
                        />}
                   
                   <Text>{this.checkerr('imageUrl')}</Text>

                    <TouchableOpacity style={styles.buttonContainer} 
                    onPress={this.OnSubmit}
                    >      
                        <Text  style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
        
                    </ScrollView>
            </View>
            </View>
            </View>
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
        holder:{
            alignItems:'center'
        },
        sub_container:{
            // flex:1,
            paddingLeft:wp('-10%'),
            marginTop: hp('5%'),
            borderRadius:hp('1%'),
            backgroundColor:'#fff',
            alignItems: 'flex-start',
            width:wp('90%'),
            height:hp('80%'),
            // left:wp('0%')
    
        },
        buttonContainer:{
            backgroundColor: '#2980b6',
            paddingVertical:hp('1.6%'),
            width:wp('50%'),
            left:wp('7%'),
            marginBottom:hp('2%')
            // paddingTop:20
            // flexGrow:0.4
           },
           uploadbtn:{
            marginTop: hp('4%'),
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
            marginTop:hp('5%'),
            // paddingLeft:wp('10%'),
            left:wp('7%')
    
            // alignContent: '',
            // alignItems:'flex-start'
        },
        input:{
            height:hp('6%'),
            width:wp('70%'),
            backgroundColor: '#9B928D',
            borderRadius: 2,
            marginBottom:hp('1.5%'),
            paddingLeft:wp('10%'),
            color: '#fff'
        },
        desc_input:{
            height:hp('9%'),
            width:wp('70%'),
            backgroundColor: '#9B928D',
            borderRadius: 2,
            marginBottom:hp('2%'),
            paddingLeft:wp('10%'),
            color: '#fff'
        },
        inputlabel:{
            color:'#27ae60',
            fontSize:15
        },
        err_field:{
            marginBottom:hp('2%'),
            color:'#F30C0C'
        }
      
})