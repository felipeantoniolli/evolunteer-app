import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const AppNavigator = createSwitchNavigator({
  Login: {
    screen: LoginPage
  },
  Home: {
    screen: HomePage
  }
});

export default AppNavigator;