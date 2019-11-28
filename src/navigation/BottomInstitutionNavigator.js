import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import StackInstitutionProfileNavigator from '../navigation/StackInstitutionProfileNavigator';
import StackInstitutionNavigator from './StackInstitutionNavigator';
import StackWorkNavigator from './StackWorkNavigator';

const InstitutionBottomTabNavigator = createMaterialBottomTabNavigator({
    StackWorkNavigator: {
        screen: StackWorkNavigator,
        navigationOptions: {
            title: "Trabalhos"
        }
    },
    Solicitations: {
        screen: StackInstitutionNavigator,
        navigationOptions: {
            title: "Solicitações"
        }
    },
    InstitutionProfilePage: {
        screen: StackInstitutionProfileNavigator,
        navigationOptions: {
            title: "Perfil"
        }
    }
},
{
    initialRouteName: 'Solicitations',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {
        backgroundColor: '#694fad'
    }
});

export default InstitutionBottomTabNavigator;