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
   
import firebase from "react-native-firebase"
import ValidationComponent from 'react-native-form-validator';
 import ImagePicker from 'react-native-image-picker'


 //custom components
 import Loader from "../components/loading";
import HeaderBar from "../components/header"
import Clock from '../components/clock'
   

export default class SalesForm extends ValidationComponent{
    constructor(props){
    super(props)
    this.state={
     cust_name:'',
     quantity:'0',
     cust_phone:'',
     unit_price:'0',
     sixkg:'0',
     thirteenkg:'0',
     others:'0',
     receiptUrl:'',
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


        id_gen =()=> {
             
                let id='SL'+ Math.floor(100000 + Math.random() * 900000)   
               
               return id
            
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

       clearinputs=()=> {
           this.setState({cust_name:''})
           this.setState({cust_phone:''})
           this.setState({unit_price:'0'})
           this.setState({sixkg:'0'})
           this.setState({thirteenkg:'0'})
           this.setState({others:'0'})
           this.setState({receiptUrl:''})
           this.setState({total:''})
        // this.forceUpdate()
       }

        calculateTotal=()=>{
            const total=this.state.unit_price * ((this.state.sixkg*6) + 
            (this.state.thirteenkg*13)+(this.state.quantity*this.state.others) )
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

                  firebase.storage().ref('receipts').child(imageName)
                  .put(response.uri, { contentType : 'image/jpeg' }) //--> here just pass a uri
                  .then((snapshot) => {
                    console.log(JSON.stringify(snapshot.downloadURL))
                    this.setState({receiptUrl:snapshot.downloadURL})
                    this.setState({isloading:false})

                  }).catch((error)=> console.log(error))
                }
                

            })
          
          }
          OnSubmit=()=> {
            //   console.log(this.id_gen())
            this.setState({isloading:true})

            this.validate({
                cust_name: { required: true,maxlength:30},
                cust_phone: {required: true,numbers:true,maxlength:10},
                
                receiptUrl:{required:true}
              });

              if(this.isFormValid()){
                  this.salesref =firebase.firestore().collection('sales')
                  console.log(this.salesref)
                  const salesDoc= {
                      id:this.id_gen(),
                      Total:this.state.total,
                      quantity:this.state.quantity ,
                      receipt:this.state.receiptUrl,
                      '13kg':this.state.thirteenkg,
                      '6kg':this.state.sixkg,
                      others:this.state.others,
                      CustomerName:this.state.cust_name,
                      CustomerPhone:this.state.cust_phone,
                      unit_price:this.state.unit_price,
                      created_at:firebase.firestore.FieldValue.serverTimestamp()
                  }
                  console.log(salesDoc)
                  this.salesref.doc(this.id_gen()).set(salesDoc)
        
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
            <HeaderBar navigation={this.props.navigation} title={'Sale Form'}/>
            <View style={styles.holder}>
            <View style={styles.sub_container}>
                    <Clock/>
                <ScrollView style={styles.fields} showsVerticalScrollIndicator={true}>
                 <Text  style={styles.inputlabel}>Customer Name:</Text>

                  <TextInput style = {styles.input}   
                        ref="cust_name"
                        returnKeyType="go" 
                        // placeholder='unit_price' 
                        keyboardType='default'
                        value={this.state.cust_name}
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(cust_name) => this.setState({cust_name})}


                        />
                        <Text>{this.checkerr('cust_name')}</Text>

                 <Text  style={styles.inputlabel}>Customer Phone:</Text>

                  <TextInput style = {styles.input}   
                        ref="cust_phone"
                        returnKeyType="go" 
                        // placeholder='unit_price' 
                        keyboardType='numeric'
                        value={this.state.cust_phone}
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(cust_phone) => this.setState({cust_phone})}


                        />
                            <Text>{this.checkerr('cust_phone')}</Text>


                 <View style={{flex: 1, flexDirection: 'row'}}>

                    <Text  style={styles.inputlabel}>Unit Price:</Text>

                    <TextInput style = {styles.cust_input}   
                        ref="unit_price"
                        returnKeyType="go" 
                        // placeholder='unit_price' 
                        keyboardType='numeric'
                        value={this.state.unit_price}
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(unit_price) => this.setState({unit_price})}
                        onEndEditing={this.calculateTotal}


                        />
       </View>
                 <View style={{flex: 1, flexDirection: 'row'}}>

                    <Text  style={styles.inputlabel}>6 Kg:</Text>

                    <TextInput style = {styles.cust_input}   
                        ref="sixkg"
                        returnKeyType="go" 
                        // placeholder='unit_price' 
                        keyboardType='numeric'
                        value={this.state.sixkg}
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(sixkg) => this.setState({sixkg})}
                        onEndEditing={this.calculateTotal}


                        />
       </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text  style={styles.inputlabel}>13kg:</Text>

                    <TextInput style = {styles.cust_input} 
                         ref="thirteenkg"  
                        returnKeyType="go" 
                        // placeholder='total_cylinders' 
                        keyboardType='numeric'
                        placeholderTextColor='#DDDBDA' 
                        value={this.state.thirteenkg}
                        onChangeText={(thirteenkg) => this.setState({thirteenkg})}
                        onEndEditing={this.calculateTotal}

                        />
            </View>

                 <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text  style={styles.inputlabel}>Others:</Text>
                    <View style={{flex: 1, flexDirection: 'column'}}>

                        <Picker
                    
                    selectedValue={this.state.quantity}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({quantity: itemValue})
                    }>
                    <Picker.Item label="choose" value="0" />
                    <Picker.Item label="3Kg" value="3" />
                    <Picker.Item label="25Kg" value="25" />
                    <Picker.Item label="40Kg" value="40" />
                    <Picker.Item label="45Kg" value="45" />
                    <Picker.Item label="50Kg" value="50" />
            </Picker>
                    <TextInput style = {styles.cust_input} 
                         ref="others"  
                        returnKeyType="go" 
                        // placeholder='total_cylinders' 
                        keyboardType='numeric'
                        placeholderTextColor='#DDDBDA' 
                        value={this.state.others}
                        onChangeText={(others) => this.setState({others})}
                        onEndEditing={this.calculateTotal}

                        />
                        </View>
            </View>

                    <View style={{flex: 1, flexDirection: 'row'}}>

                    <Text  style={styles.inputlabel}>Total(Kshs.):</Text>

                    <TextInput style = {styles.cust_input}   
                        returnKeyType="go" 
                        ref="total"
                        placeholderTextColor='#fff' 
                        editable={false}
                        value={this.state.total}
                        />

                         </View>

                    <TouchableOpacity style={styles.uploadbtn} onPress={() =>this.chooseFile()}>      
                        <Text  style={styles.buttonText}>UPLOAD RECEIPT</Text>
                        </TouchableOpacity>
                       
                        {this.state.receiptUrl ?
                        <Image ref='receiptUrl'
                            source= {{uri: this.state.receiptUrl}}
                    
                            style={{ width:wp('70%'), height: hp('30%') }}
                        />:
                        <Image  ref='receiptUrl'
                            source={require('../assets/generic_avatar.jpg')}
                    
                            style={{ width:wp('70%'), height: hp('30%') }}
                        />}
                        <Text>{this.checkerr('receiptUrl')}</Text>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.OnSubmit}>      
                        <Text  style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
        
                    </ScrollView>
            </View>
            </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'#2c3e50',
        backgroundColor:'#b2afaf',
        // alignItems:'center'
        // padding: 30,
        
    
    },
    holder:{
        alignItems:'center'
    },
    sub_container:{
        // flex:1,
        paddingLeft:wp('-10%'),
        marginTop: hp('4%'),
        borderRadius:hp('1%'),
        backgroundColor:'#fff',
        alignItems: 'flex-start',
        width:wp('90%'),
        height:hp('81%'),
        // left:wp('0%')

    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical:hp('1.6%'),
        width:wp('50%'),
        left:wp('7%'),
        marginBottom:hp('2.5%')
        // paddingTop:20
        // flexGrow:0.4
       },
       uploadbtn:{
        marginTop: hp('4%'),
        backgroundColor: '#2980b6',
        paddingVertical:hp('1.6%'),
        marginBottom:hp('2.5%'),
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
    picker:{
        height: 50, width:wp('30%'), color:'#000', left:wp('30%')
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
    cust_input:{
        height:hp('6%'),
        width:wp('50%'),
        backgroundColor: '#9B928D',
        borderRadius: 2,
        marginBottom:hp('3%'),
        left:wp('20%'),
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
