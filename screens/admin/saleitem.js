import React,{Component}  from 'react'
import { 
    View, Text, Modal,Dimensions,Easing,Alert,
     Image,ScrollView,TouchableOpacity,StyleSheet} 
from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  import ImageView from 'react-native-image-view'

  import {Header,Icon,Card,CardItem,Body,Thumbnail,Left,Right} from 'native-base'

  //custom components
 
 import firebase from "react-native-firebase"

 const cardWidth = Dimensions.get('window').width*0.95


 export default class SaleItem extends Component{

    constructor(){
        super()
        this.state={
          
            isvisible:false
        }
    }

        componentDidMount(){
            loc(this)
        }
        componentWillUnMount() {
            rol()
            
          }

          zoom_image(){

           this.setState({isvisible:true})
                    }
        close_modal(){
            this.setState({isvisible:false})

        }

    render(){
    console.log(this.props.navigation.state.params.item)
    console.log(this.props.navigation.state.params.item[0].Total)
    const params =this.props.navigation.state.params.item[0]
        const images=[{
            source:{uri:params.receipt},
            width:wp('100%'),
            height:hp('80%'),
        }]
        return(

    <View style={styles.container}>


 <Header style={styles.drawerHeader}> 
                <Icon name="arrow-back" 
                    style={styles.back_arrow} 
                        onPress={() =>this.props.navigation.goBack()}
                    />

                <Text style={styles.title}>Sale Record</Text>
      </Header>   

            <ScrollView style={styles.cardview}>

       <View style={styles.holder}>

       {/* <Modal 
       visible={this.state.isvisible} 
       animationType={'slide'}
       onRequestClose={()=>{this.close_modal()}}
       transparent={true}>

                    </Modal> */}

                        <ImageView
                        images={images}
                        imageIndex={0}
                        isVisible={this.state.isvisible}
                    />


             <Card style={{width:cardWidth,height:null,flex:1}}>
                            
                            <View style={{flexDirection:'row'}}>
                            <CardItem header>
                            <Text style={{color:'#000'}} >Sale ID: <Text style={{fontWeight:'bold',color:'#ff0000'}}>{params.id}</Text></Text>
                            </CardItem>
                            <CardItem >
                             <Text style={{fontWeight:'bold',color:'#000'}}>{new Date(params.created_at).toDateString()}  {new Date(params.created_at).toLocaleTimeString()}</Text>
                            </CardItem>

                            </View>

                            <CardItem >
                            <Text style={{color:'#000'}} >Customer Name: <Text style={{fontWeight:'bold',color:'#000'}}>{params.CustomerName}</Text></Text>
                            </CardItem>
                            
                            <CardItem>
                            <Text style={{color:'#000'}} >Customer No: <Text style={{fontWeight:'bold',color:'#000'}}>{params.CustomerPhone}</Text></Text>

                            </CardItem>
                            <CardItem>
                            <CardItem cardBody>
                               <TouchableOpacity onPress={()=>{this.zoom_image()}}>
                                <Image
                                 style={{ height:hp('30%'), width:wp('85%')}}
                                  source={{uri:params.receipt}} 
                                
                                  />
                                </TouchableOpacity>
                            </CardItem>
                            </CardItem>
                            {/* <Right>
                            <CardItem>
    
                            <Text  style={{color:'#000',fontWeight:'bold'}} >Particulars</Text>
                            </CardItem></Right> */}
                            <View style={{flexDirection:'row'}}>
                            <CardItem>
    
                            <Text  style={{color:'#000',fontWeight:'bold'}} >Quantity</Text>
                            </CardItem>
                            
                            <CardItem>
    
                            <Text  style={{color:'#000',fontWeight:'bold'}} >Particular(KG)</Text>
                            </CardItem>
                            <CardItem>
    
                            <Text  style={{color:'#000',fontWeight:'bold'}} >Item_total(Ksh.)</Text>
                            </CardItem>
                            
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <CardItem>
    
                            <Text  style={{color:'#000'}} >{ params['6kg'] }</Text>
                            </CardItem>
                            
                            <CardItem>
    
                            <Text  style={{color:'#000'}} >                           6</Text>
                            </CardItem>
                            <CardItem>
    
                            <Text  style={{color:'#000'}} >                { params['6kg'] * 6 * params.unit_price}</Text>
                            </CardItem>
                            
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <CardItem>
    
                            <Text  style={{color:'#000'}} >{ params['13kg'] }</Text>
                            </CardItem>
                            
                            <CardItem>
    
                            <Text  style={{color:'#000'}} >                           13</Text>
                            </CardItem>
                            <CardItem>
    
                            <Text  style={{color:'#000'}} >              { params['13kg'] * 13 * params.unit_price}</Text>
                            </CardItem>
                            
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <CardItem>
    
                            <Text  style={{color:'#000'}} >{ params['others'] }</Text>
                            </CardItem>
                            
                            <CardItem>
    
                            <Text  style={{color:'#000'}} >               others:{params.quantity}</Text>
                            </CardItem>
                            <CardItem>
    
                            <Text  style={{color:'#000'}} >              { params['others'] * params.quantity * params.unit_price}</Text>
                            </CardItem>
                            
                            </View>

                            <CardItem>
    
                            <Text  style={{color:'#000',fontWeight:'bold',left:wp('35%'),marginTop:hp('3%')}} >Grand Total:
                            <Text style={{fontWeight:'bold',color:'#ff0000'}}>Kshs.{params.Total}</Text></Text>
                            </CardItem>
    
                            <CardItem footer>
                            {/* <Text> 
                           {new Date(params.created_at).toDateString()}
                           <Text> {new Date(rowData.created_at).toLocaleTimeString()} </Text></Text> 
                              */}
                              <Text  style={{color:'#000'}} >E & O E</Text>

                            </CardItem>
                              
                            
                       </Card> 

       </View>
            </ScrollView>


            </View>
        )
    }
 }

 const styles=StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#b2afaf',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      },
      holder:{
        alignItems:'center'
    },
    cardview:{
        // backgroundColor:'#fff',
        marginTop:hp('2%')
    },
      drawerHeader: {
        flex:0,
        backgroundColor: '#F56006',
        paddingTop: hp('4%'),
        zIndex:1
      },
      back_arrow:{
        left:wp('5%'),
        marginTop:hp('2%'),
        position:'absolute',
        color:'#fff'

    },
    title:{
        fontSize:20,
        color:'#fff',
        left:wp('2%'),
        top:hp('-2%'),
        zIndex:2
    }
 })