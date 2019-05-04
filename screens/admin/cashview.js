import React,{Component}  from 'react'
import { 
    View, Text, FlatList,Alert,Dimensions,TextInput,
     Image,ScrollView,TouchableOpacity,StyleSheet} 
from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  import {Header,Icon,Left,Right,Body,Thumbnail,ListItem,List} from 'native-base'

  //custom components
 import Loader from "../../components/loading"

 import DateTimePicker from "react-native-modal-datetime-picker"

 import firebase from "react-native-firebase"


 const cardWidth = Dimensions.get('window').width*0.85


  export default class AllExpenses extends Component{
      constructor(props){
        super(props)
        this.state={
           pettycashdata:[],
            isloading:true,
            isFromDateTimePickerVisible: false,
            isToDateTimePickerVisible: false,
            showfilter:false,
            fromdate:'',
            todate:''

        }
      }

    componentDidMount(){
        loc(this)
        this.get_pettycash_data()
       
    }
    get_pettycash_data= async ()=>{
        const pettycash=[]
        this.cashdata= await firebase.firestore().collection('Petty_cash_records').get()
         .then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                console.log(doc.data())
                pettycash.push(doc.data())
                this.setState({pettycashdata:pettycash})
            })
        }).catch((error)=>{
            console.log(error)
        })
        this.setState({isloading:false})


    }
    toggle_filter=()=>{
        if(!this.state.showfilter){
            this.setState({showfilter:true})
        }
        else{
            this.setState({showfilter:false})
        }
    }
    showFromDateTimePicker = (type) => {
        this.setState({ isFromDateTimePickerVisible: true })
      }
    showToDateTimePicker = (type) => {
        this.setState({ isToDateTimePickerVisible: true })
      }
    
      hideFromDateTimePicker = () => {
        this.setState({ isFromDateTimePickerVisible: false })
      }
      hideToDateTimePicker = () => {
        this.setState({ isToDateTimePickerVisible: false })
      }
    
      handleFromDatePicked = (date) => {
            this.setState({fromdate:date.toString()})
        this.hideFromDateTimePicker()
      }
      handleToDatePicked = (date) => {
        this.setState({todate:date.toString()})

        this.hideToDateTimePicker()
      }
      filter_data=()=>{
        this.setState({isloading:true})
        let from=this.state.fromdate
        let To=this.state.todate
        let saldat=this.state.pettycashdata
       
        // let filter=[]
        if(from && To){
           let filtered = saldat.filter((sal)=>{
                  return  new Date(sal.created_at) >= new Date(from
                       )  && new Date(sal.created_at) <= new Date
                       (To)    
                    
                    })
                    // filter.push(filtered)
            this.setState({pettycashdata:filtered})
            console.log(this.state.pettycashdata)
        }
        else if(from  && !To){

       
            let filtered=  saldat.filter((sal)=>{
            
            return  new Date(sal.created_at) >= new Date(from
                )
            })
                // filter.push(filtered)
            this.setState({pettycashdata:filtered})
           console.log(this.state.pettycashdata)
        }
        else if(!from  && To){

        let filtered=  saldat.filter((sal)=>{
            
            return  new Date(sal.created_at) >= new Date(To
                )
            })
                // filter.push(filtered)
            this.setState({pettycashdata:filtered})
            console.log(this.state.pettycashdata)
    }
    else{

        Alert.alert('Please pick a date range')
    }
    this.setState({isloading:false})
}
getitem(id){

    let item=this.state.pettycashdata.filter((sal)=>{
        return sal.id == id
    })
    this.props.navigation.navigate('CashItem',{item})
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
                        onPress={() =>this.props.navigation.goBack()}
                    />
      <Text style={styles.title}>All Petty_cash_records</Text>
      </Header>               
       <View style={styles.holder}>
            
       {
         this.state.isFromDateTimePickerVisible ? 
    <DateTimePicker
          isVisible={this.state.isFromDateTimePickerVisible}
          onConfirm={this.handleFromDatePicked}
          onCancel={this.hideFromDateTimePicker}
        /> :
        <DateTimePicker
          isVisible={this.state.isToDateTimePickerVisible}
          onConfirm={this.handleToDatePicked}
          onCancel={this.hideToDateTimePicker}
        />
        }

         <ScrollView >
      <Text style={{ color:'#27ae60',fontSize:15, marginTop:hp('2%')}}>Filter petty cash Records:</Text>   
               
      <TouchableOpacity style={styles.uploadbtn} onPress={this.toggle_filter}>      
                <Text style={styles.filter_text}>Filter pettycash</Text>
            </TouchableOpacity>

          { this.state.showfilter ? <View>
           <Text style={{paddingLeft:wp('4%')}}>From:</Text>

             <View style={{flexDirection: 'row',marginTop:hp('2%')}}>   
            
             <TouchableOpacity style={styles.uploadbtn} onPress={this.showFromDateTimePicker}>      
                <Text style={styles.buttonText}>CHOOSE DATE</Text>
            </TouchableOpacity>
             <TextInput
                
                style={styles.cust_input}
                value={new Date(this.state.fromdate).toDateString()}
                editable={false}
                onEndEditing={this.filter_data}
                />  
              

                 </View>
            <Text style={{paddingLeft:wp('4%')}}>TO:</Text>

             
             <View style={{flexDirection: 'row',marginTop:hp('2%'),marginBottom:hp('5%')}}>   
    
             <TouchableOpacity style={styles.uploadbtn} onPress={this.showToDateTimePicker}>      
                <Text style={styles.buttonText}>CHOOSE DATE</Text>
            </TouchableOpacity>
             <TextInput
            
            style={styles.cust_input}
                value={new Date(this.state.todate).toDateString()}

                    editable={false}
                    onEndEditing={this.filter_data}


                />  
            

                 </View> 
                 <TouchableOpacity style={styles.filterbtn} onPress={this.filter_data}>      
                <Text style={styles.buttonText}>GO</Text>
            </TouchableOpacity>
                 </View>
                 :  null }
               
               
                <FlatList 
                    data={this.state.pettycashdata}
                 renderItem={({ item: rowData }) => {
                     return(
                        <ListItem avatar button={true} 
                     onPress={()=>{this.getitem(rowData.id)}}
                     >
                    <Left>
                        <Thumbnail square source={{ uri:rowData.imageUrl}} />
                    </Left>
                    <Body>
                        <Text style={{color:'#000'}} >{rowData.id}</Text>
                        <Text note>{new Date(rowData.created_at).toLocaleTimeString()}</Text>
                    </Body>
                    <Right>
                    <Icon name="arrow-dropright" />
                    </Right>
                    </ListItem>
                     )     
                        }}
                keyExtractor={(item, index) => index.toString()}
                    />
                       </ScrollView>

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
        cust_input:{
            height:hp('6%'),
            width:wp('65%'),
            backgroundColor: '#9B928D',
            borderRadius: 2,
            marginBottom:hp('2%'),
            left:wp('11%'),
            color: '#fff'
        },
        uploadbtn:{
            marginTop:hp('0.5%'),
            backgroundColor: '#2980b6',
            // paddingVertical:hp('0.5%'),
            left:wp('3%'),
            height:hp('5%'),
            width:wp('20%')
        },
        filterbtn:{
            backgroundColor: '#2980b6',
            // paddingVertical:hp('0.5%'),
            left:wp('70%'),
            height:hp('4%'),
            width:wp('20%')
        },
        title:{
            fontSize:20,
            color:'#fff',
            left:wp('2%'),
            top:hp('-2%'),
            zIndex:2
        },
        buttonText:{
            color: '#fff',
            paddingVertical:hp('1%'),
            textAlign: 'center',
            fontSize:10
           },
           filter_text:{
            color: '#fff',
            paddingVertical:hp('1%'),
            textAlign: 'center',
            fontSize:12
           },
        holder:{
            marginTop:hp('7%'),
            backgroundColor: '#fff',

        },
        scroll_container:{
          
            marginTop: hp('5%'),
         
          
    
        }
      
       
      
})