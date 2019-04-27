
import React, {Component} from 'react'
import NetInfo from "@react-native-community/netinfo"
import SplashScreen from 'react-native-smart-splash-screen'
import OfflineNotice from './components/offline'



import RootNav from './router'


export default class App extends Component {
  constructor(){

    super()

    this.state={

      connection_Status : true,
      // // user: null,
      // checksignedin:false,
      // signedIn:false
    }

  }
  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 1000,
      delay: 500,
   })
   NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange)
   console.log('mounted...')
  

  }
  componentWillUnmount() {
    
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange)
  }

  handleConnectivityChange = (isConnected) => {

    if(isConnected == true)
      {
        this.setState({connection_Status : true})
      }
      else
      {
        this.setState({connection_Status : false})
      }
  }

 
  
  render() {

    if(!this.state.connection_Status){


      return (
        <OfflineNotice/>
        // <Drawer/>
      
      );
    } 
    else{
      //   if(!this.state.user){
      //      return(<Login/>)
      //   }
      console.log('accessing router..')
      // return (
      //   // <OfflineNotice/>
      //   <Drawer/>
     return <RootNav/>
      // );
      // if (!checksignedin) {
      //   return null;
      // }
  
      // const Layout = createRootNavigator(signedIn);
      // return <Layout />;
      // this.props.navigation.navigate(this.state.checksignedin?'signedin':'signedout')
    }
   
}
}




