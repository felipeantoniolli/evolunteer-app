import React from 'react';
import { Platform, StyleSheet, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigation';
import rootReducer from './src/reducers';
import devToolsEnchancer from 'remote-redux-devtools';

const AppContainer = createAppContainer(AppNavigator);

const store = createStore(rootReducer, devToolsEnchancer());

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
  }
}