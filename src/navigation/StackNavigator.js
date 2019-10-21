import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import RegisterPage from '../pages/RegisterPage';
import VolunteerRegisterPage from '../pages/VolunteerRegisterPage';
import InstitutionRegisterPage from '../pages/InstitutionRegisterPage';

const StackNavigator = createStackNavigator({
  RegisterPage: {
    screen: RegisterPage
  },
  VolunteerRegisterPage: {
    screen: VolunteerRegisterPage 
  },
  InstitutionRegisterPage: {
    screen: InstitutionRegisterPage
  }
});

export default StackNavigator;