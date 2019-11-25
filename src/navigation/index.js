import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import StackNavigator from './StackNavigator';
import LoginPage from '../pages/LoginPage';
import BottomVolunteerNavigator from  './BottomVolunteerNavigator';
import BottomInstitutionNavigator from './BottomInstitutionNavigator';

const AppNavigator = createSwitchNavigator({
    Index: {
        screen: StackNavigator
    },
    Volunteer: {
        screen: BottomVolunteerNavigator
    },
    Institution: {
        screen: BottomInstitutionNavigator
    }
});

export default AppNavigator;