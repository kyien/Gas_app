import React  from 'react'
import { 
    View, Text, TextInput,Picker,Alert,Platform,
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

   

export default class SalesForm extends ValidationComponent{
    constructor(props){
    super(props)
    this.state={
     quantity:'',
     unit_price:'',
     total_cylinders:'',
     total:'0',
     receiptUrl:'wxdp.jpg',
     counter:'0',
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
            
               let newcounter=this.state.counter+1
               this.setState({counter:newcounter})
               return newcounter
            
          }

       clearinputs=()=> {
           this.setState({quantity:''})
           this.setState({unit_price:''})
           this.setState({total_cylinders:''})
           this.setState({receiptUrl:'xxxx.jpg'})
           this.setState({total:''})
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

                  })
                }
                
            })
          
          }
          OnSubmit=()=> {
            this.setState({isloading:true})

            this.validate({
                quantity: { required: true},
                unit_price: {required: true,numbers:true,},
                total_cylinders: {required: true,numbers:true,},
                total: {required:true},
                receiptUrl:{required:true}
              });

              if(this.isFormValid()){
                  this.salesref =firebase.firestore().collection('sales')
                  console.log(this.salesref)
                  const salesDoc= {
                      Total:this.state.total,
                      quantity:this.state.quantity,
                      receiptUrl:this.state.receiptUrl,
                      total_cylinders:this.state.total_cylinders,
                      unit_price:this.state.unit_price,
                      created_at:firebase.firestore.FieldValue.serverTimestamp()
                  }
                  this.salesref.doc(this.id_gen()).set(salesDoc)
                  .then((doc)=> {
                    console.log("document written successfully!");
                    this.clearinputs()
                    this.setState({isloading:false})
                    
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
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

                <ScrollView style={styles.fields}>
                 <Text  style={styles.inputlabel}>Quantity:</Text>
                 <Picker
                    
                    selectedValue={this.state.quantity}
                    style={{height: 50, width:wp('60%'), color:'#000'}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({quantity: itemValue})
                    }>
                    <Picker.Item label="" value="" />
                    <Picker.Item label="3Kg" value="3kg" />
                    <Picker.Item label="6Kg" value="6kg" />
                    <Picker.Item label="13Kg" value="13kg" />
                    <Picker.Item label="25Kg" value="25kg" />
                    <Picker.Item label="40Kg" value="40kg" />
                    <Picker.Item label="45Kg" value="45kg" />
                    <Picker.Item label="50Kg" value="50kg" />
                    <Picker.Item label="50+ Kg" value="bulk" />
                    </Picker>
            {this.isFieldInError('quantity') && this.getErrorsInField('quantity').map(errorMessage => <Text style={styles.err_field}>{errorMessage}</Text>) }

                    <Text  style={styles.inputlabel}>Unit Price:</Text>

                    <TextInput style = {styles.input}   
                        ref="unit_price"
                        returnKeyType="go" 
                        placeholder='unit_price' 
                        keyboardType='numeric'
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(unit_price) => this.setState({unit_price})}

                        />
            {this.isFieldInError('unit_price') && this.getErrorsInField('unit_price').map(errorMessage => <Text style={styles.err_field}>{errorMessage}</Text>) }

                    <Text  style={styles.inputlabel}>Total Cylinders:</Text>

                    <TextInput style = {styles.input} 
                         ref="total_cylinders"  
                        returnKeyType="go" 
                        placeholder='total_cylinders' 
                        keyboardType='numeric'
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(total_cylinders) => this.setState({total_cylinders})}

                        />
            {this.isFieldInError('total_cylinders') && this.getErrorsInField('total_cylinders').map(errorMessage => <Text style={styles.err_field}>{errorMessage}</Text>) }

                    <Text  style={styles.inputlabel}>Total</Text>

                    <TextInput style = {styles.input}   
                        returnKeyType="go" 
                        ref="total"
                        placeholderTextColor='#fff' 
                        editable={false}
                        value={this.state.total}
                        />

                    <TouchableOpacity style={styles.uploadbtn} onPress={() =>this.chooseFile()}>      
                        <Text  style={styles.buttonText}>UPLOAD RECEIPT</Text>
                        </TouchableOpacity>
                        {/* <Image
                            source={{
                            uri: 'data:image/jpeg;base64,' + this.state.imageUrl.data,
                            }}
                            style={{ width: 100, height: 100 }}
                        /> */}
                        <Image
                            source={{ uri: this.state.receiptUrl}}
                            style={{ width: 250, height: 250 }}
                        />
                        <Text style={{ alignItems: 'center' }}>
                            {this.state.receiptUrl}
                        </Text>
                   
        
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
        left:wp('7%')
        // paddingTop:20
        // flexGrow:0.4
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
        marginTop:hp('5%'),
        // paddingLeft:wp('10%'),
        left:wp('7%')

        // alignContent: '',
        // alignItems:'flex-start'
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
    inputlabel:{
        color:'#27ae60',
        fontSize:15
    },
    err_field:{
        marginBottom:hp('2%'),
        color:'#F30C0C'
    }
})
