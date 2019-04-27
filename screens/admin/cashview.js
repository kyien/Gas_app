import React,{Component}  from 'react'
import { 
    View, Text, FlatList,Picker,Alert,Platform,Dimensions,
     Image,ScrollView,TouchableOpacity,StyleSheet} 
from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  import {Header,Icon,Card,CardItem,Body,Thumbnail} from 'native-base'

  //custom components
 import Loader from "../../components/loading";
 
 import firebase from "react-native-firebase"


 const cardWidth = Dimensions.get('window').width*0.85


  export default class AllExpenses extends Component{
      constructor(props){
        super(props)
        this.state={
           pettycashdata:[],
            isloading:true

        }
      }

    componentDidMount(){
        loc(this)
        this.get_pettycash_data()
        this.setState({isloading:false})
       
    }
    get_pettycash_data=()=>{
        const pettycash=[]
        this.cashdata=firebase.firestore().collection('Petty_cash_records').get()
         .then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                console.log(doc.data())
                pettycash.push(doc.data())
                this.setState({pettycashdata:pettycash})
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
    
    componentWillUnMount() {
          rol()
          
        }
    render(){
        console.log(this.state.pettycashdata)
        return(
            <View style={styles.container}>
            <Loader
          isloading={this.state.isloading} />

 <Header style={styles.drawerHeader}> 
                <Icon name="arrow-back" 
                    style={styles.back_arrow} 
                        onPress={() =>this.props.navigation.navigate('Dash')}
                    />
      <Text style={styles.title}>All Petty_cash_records</Text>
      </Header>               
       <View style={styles.holder}>
            

                <FlatList 
                    data={this.state.pettycashdata}
                 renderItem={({ item: rowData }) => {
                     return(
                    <Card style={{width:cardWidth,height:null,flex:1}}>
                            
                        <CardItem header>
                        <Text style={{color:'#33FFC7'}} >Expenses total: <Text style={{fontWeight:'bold',color:'#ff0000'}}>Ksh.{rowData.item_total}</Text></Text>
                        </CardItem>
                        <CardItem>
                        <CardItem cardBody>
                            <Image style={{ height:hp('30%'), width:wp('75%')}} source={{uri:rowData.imageUrl}} />
                            
                        </CardItem>
                        </CardItem>
                        <CardItem>

                        {/* <Text>Unit price:Kshs.{rowData.receiptUrl}</Text> */}
                        <Text  style={{color:'#000',fontWeight:'bold'}} >Unit price:Kshs.{rowData.unit_price}</Text>
                        </CardItem>
                        <CardItem footer>
                        <Text>{rowData.created_at.toString()}</Text>
                        
                        </CardItem>
                          
                        
                   </Card>
                     )     
                        }}
                keyExtractor={(item, index) => index.toString()}
                    />
            
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
        },
        holder:{
            alignItems:'center'
        },
        scroll_container:{
          
            marginTop: hp('5%'),
         
          
    
        }
      
       
      
})