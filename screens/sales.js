import React ,{Component} from 'react'
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
// import RNFetchBlob from 'react-native-fetch-blob'
 import ImagePicker from 'react-native-image-picker'
import HeaderBar from "../components/header"

    // const Blob = RNFetchBlob.polyfill.Blob
    // const fs = RNFetchBlob.fs
    // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    // window.Blob = Blob


    const uploadImage = (uri,imageName,mime = 'image/jpeg') => {
        return new Promise((resolve, reject) => {
          const uploadUri = uri
           
            let uploadBlob = null
            const imageRef = firebase.storage().ref('receipts').child(imageName)
            console.log(imageRef)
            fs.readFile(uploadUri, 'base64')
            .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` })
              console.log(data)
            })
            .then((blob) => {
              uploadBlob = blob
              return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
              uploadBlob.close()
              return imageRef.getDownloadURL()
            })
            .then((url) => {
              resolve(url)
              console.log(url)
            //   this.setState({storageUrl:url})
            })
            .catch((error) => {
              reject(error)
            })
        })
      }

export default class SalesForm extends Component{
    constructor(props){
    super(props)
    this.state={
     quantity:'',
     unit_price:null,
     total_cylinders:null,
     total:'900',
     imageUrl:'',
    }
}
    componentDidMount(){
        loc(this)
    }
    
    componentWillUnMount() {
          rol()
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
                  firebase.storage().ref('receipts').child(imageName)
                  .put(response.uri, { contentType : 'image/jpeg' }) //--> here just pass a uri
                  .then((snapshot) => {
                    console.log(JSON.stringify(snapshot.downloadURL))
                    this.setState({storageUrl:snapshot.downloadURL})
                  })
                }
                
            })
            // ImagePicker.launchImageLibrary({}, response => {
            //     const sessionId = new Date().getTime()

            //     const imageName=sessionId+'.jpg'
            //         // Alert.alert(imageName)
            //     this.setState({storageUrl : imageName })
            //     uploadImage(response.uri,imageName)
            //         .then(url => 
            //         this.setState({storageUrl:url})
            //         )
            //         .catch(error => console.log(error))
         
         
            // })
          }

    render(){

        return(
            <View style={styles.container}>
            <HeaderBar navigation={this.props.navigation} title={'Sale Form'}/>

            <View style={styles.sub_container}>

                <ScrollView style={styles.fields}>
                 <Text  style={styles.inputlabel}>Quantity:</Text>
                 <Picker
                    
                    selectedValue={this.state.quantity}
                    style={{height: 50, width:wp('60%'), color:'#fff'}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({quantity: itemValue})
                    }>
                    <Picker.Item label="3Kg" value="3kg" />
                    <Picker.Item label="6Kg" value="6kg" />
                    <Picker.Item label="13Kg" value="13kg" />
                    <Picker.Item label="25Kg" value="25kg" />
                    <Picker.Item label="40Kg" value="40kg" />
                    <Picker.Item label="45Kg" value="45kg" />
                    <Picker.Item label="50Kg" value="50kg" />
                    <Picker.Item label="50+ Kg" value="bulk" />
                    </Picker>
                    <Text  style={styles.inputlabel}>Unit Price:</Text>

                    <TextInput style = {styles.input}   
                        returnKeyType="go" 
                        placeholder='unit_price' 
                        keyboardType='numeric'
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(unit_price) => this.setState({unit_price})}

                        />
                    <Text  style={styles.inputlabel}>Total Cylinders:</Text>

                    <TextInput style = {styles.input}   
                        returnKeyType="go" 
                        placeholder='total_cylinders' 
                        keyboardType='numeric'
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(total_cylinders) => this.setState({total_cylinders})}

                        />
                    <Text  style={styles.inputlabel}>Total</Text>

                    <TextInput style = {styles.input}   
                        returnKeyType="go" 
                        // placeholder='national id' 
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
                            source={{ uri: this.state.storageUrl}}
                            style={{ width: 250, height: 250 }}
                        />
                        <Text style={{ alignItems: 'center' }}>
                            {this.state.storageUrl}
                        </Text>
                   
        
                    <TouchableOpacity style={styles.buttonContainer} >      
                        <Text  style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
        
                    </ScrollView>
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
    sub_container:{
        // flex:1,
        paddingLeft:wp('-10%'),
        marginTop: hp('5%'),
        borderRadius:hp('1%'),
        backgroundColor:'#fff',
        alignItems: 'flex-start',
        width:wp('90%'),
        height:hp('80%'),
        left:wp('5%')

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
    }
})
