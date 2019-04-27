import React,{Component}  from 'react'
import { View,Text} from "react-native"

export default class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: new Date().toLocaleString()
      };
    }
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
      this.setState({
        time: new Date().toLocaleString()
      });
    }
    render() {
      return (
          <Text style={{color:'#ff0000'}}>
              The time is {this.state.time}
          </Text>
          
      )
    }
  }