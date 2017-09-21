import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { LoginForm } from './components/LoginForm';
import { Header, Button, Spinner, CardSection } from './components/common';

class App extends Component {
	state = { loggedIn: null };
	componentWillMount() {
		firebase.initializeApp({
		    apiKey: 'AIzaSyCdAKqsLIdcB7bZ0eDzcTw__islrlztPO4',
		    authDomain: 'authentication-3e79c.firebaseapp.com',
		    databaseURL: 'https://authentication-3e79c.firebaseio.com',
		    projectId: 'authentication-3e79c',
		    storageBucket: 'authentication-3e79c.appspot.com',
		    messagingSenderId: '118842985920'
		  });
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				this.setState({ loggedIn: true });
			}
			else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch(this.state.loggedIn) {
			case true:
				return (
					<CardSection>
						<Button onPress={() => firebase.auth().signOut()}>
							Log Out
						</Button>
					</CardSection>
					);
			case false:
				return <LoginForm />;
			default:
				return (
					<CardSection>
						<Spinner size="large" />
					</CardSection>
					);	
		}
	}

	render(){
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
			);
	}
}

export default App;
