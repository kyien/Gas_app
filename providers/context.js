import React, { createContext } from 'react';
import firebase from 'react-native-firebase'

const UserContext = createContext({
  user:null,
  updateUser: () => {},
});

export class UserProvider extends React.Component {
  updateUsername = newUser => {
    this.setState({ user: newUser });
  };

  state = {
    user: null,
    updateUsername: this.updateUsername,
  }

  fetchUser=()=>{
     const user=firebase.auth()
     this.setState({user})
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const UserConsumer = UserContext.Consumer;