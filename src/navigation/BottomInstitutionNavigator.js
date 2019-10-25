import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import InstitutionProfilePage from '../pages/InstitutionProfilePage';
import StackInstitutionNavigator from './StackInstitutionNavigator';

const BottomTabNavigator = createBottomTabNavigator({
    Solicitations: {
        screen: StackInstitutionNavigator,
        navigationOptions: {
            title: "Solicitações"
        }
    },
    InstitutionProfilePage: {
        screen: InstitutionProfilePage,
        navigationOptions: {
            title: "Perfil"
        }
    }
});

export default BottomTabNavigator;