import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
	
	componentWillMount() {
		const config = {
			apiKey: "AIzaSyDItlB2PuTkIZE720d639E6EyjR5Ru6nHU",
			authDomain: "manager-5575b.firebaseapp.com",
			databaseURL: "https://manager-5575b.firebaseio.com",
			projectId: "manager-5575b",
			storageBucket: "manager-5575b.appspot.com",
			messagingSenderId: "686114674382"
		};
		firebase.initializeApp(config);
	}

	render() {
		const store = createStore(reducers, { }, applyMiddleware(ReduxThunk));
		return (
			<Provider store={store}>
				<View style={{ flex:1 }}>
					<Router />
				</View>
			</Provider>
			);
	}
}

export default App;
