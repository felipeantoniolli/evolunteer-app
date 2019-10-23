import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import RegisterPage from '../pages/RegisterPage';
import VolunteerRegisterPage from '../pages/VolunteerRegisterPage';
import InstitutionRegisterPage from '../pages/InstitutionRegisterPage';
import InterestPage from '../pages/InterestPage';

const StackNavigator = createStackNavigator({
    RegisterPage: {
        screen: RegisterPage
    },
    VolunteerRegisterPage: {
        screen: VolunteerRegisterPage 
    },
    InstitutionRegisterPage: {
        screen: InstitutionRegisterPage
    },
    InterestPage: {
        screen: InterestPage
    }
});

export default StackNavigator;