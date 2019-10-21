import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import StackNavigator from './StackNavigator';
import LoginPage from '../pages/LoginPage';
import BottomNavigator from  './BottomNavigator';

const AppNavigator = createSwitchNavigator({
  Login: {
    screen: LoginPage
  },
  Register: {
    screen: StackNavigator
  },
  Home: {
    screen: BottomNavigator
  }
});

export default AppNavigator;