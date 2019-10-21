import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import StackNavigator from './StackNavigator';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

const AppNavigator = createSwitchNavigator({
  Login: {
    screen: LoginPage
  },
  Register: {
    screen: StackNavigator
  },
  Home: {
    screen: HomePage
  }
});

export default AppNavigator;