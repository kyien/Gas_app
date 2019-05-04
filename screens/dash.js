import React,{Component}  from 'react'
import { 
    View, Text, TextInput,Picker,Alert,Platform,Dimensions,
     Image,ScrollView,TouchableOpacity,StyleSheet} 
from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  import firebase from 'react-native-firebase'
 import { BarChart,LineChart } from "react-native-chart-kit"
  //custom components
 import Loader from "../components/loading"
 import HeaderBar from "../components/header"
 
 const cardWidth = Dimensions.get('window').width*0.85

  export default class Dash extends Component{

    constructor(){
        super()
        this.state={
            isloading:true,
            totals:[],
            // allsales:null
        }
    }

    componentDidMount(){
        loc(this)
        this.get_total_sales()
        this.setState({isloading:false})
    }
    componentWillUnmount(){
        rol()

    }
    get_total_sales= async ()=>{
        const total=[]
        let salestotal= await firebase.firestore().collection('sales')
        let salesquery=salestotal.get()
        .then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                console.log(doc.data().Total)
                total.push(doc.data().Total)
                this.setState({totals:total})
                // this.setState({allsales:doc.data()})
                
            })
              console.log(this.state.allsales)
            //   this.set_sal_data(this.state.allsales)

        }).catch((error)=>{
            console.log(error)
        })
        
        
    }

    // set_sal_data= async (doc)=>{
    //     await AsyncStorage.setItem('saldat', JSON.stringify(doc))
    //     .then( ()=>{
    //         console.log('sal data written successfully')
    //         } )
    //         .catch( ()=>{
    //         console.log('There was an error saving the product')
    //         } )
    // }




    render(){
      
        const chartConfig = {
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2 // optional, default 3
          }
          const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
              data: [ 20, 45, 28, 80, 99, 43 ],
            //   data: this.state.totalsales,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }]
          }

        return(
            <View style={styles.container}>
            <Loader
          isloading={this.state.isloading} />
                        <HeaderBar navigation={this.props.navigation} title={'DashBoard'}/>
            
                <Picker
                    selectedValue={this.state.language}
                    style={{height:hp('10%'), width:wp('50%')}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.props.navigation.navigate(itemValue)
                    }>
                    <Picker.Item label="View records" value="xx" />
                    <Picker.Item label="SalesView" value="Sales" />
                    <Picker.Item label="CashView" value="PettyCash" />
                    </Picker>
                <View style={styles.sub_container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <LineChart
                    data={data}
                    width={cardWidth}
                    height={220}
                    bezier
                    chartConfig={chartConfig}
                    style={styles.chart}
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
        }
        ,
        sub_container:{
          alignItems: 'center',
        },
        chart:{
            borderRadius:7,
            marginTop: hp('15%'),
            // left:wp('5%')
 
        }
      
    })