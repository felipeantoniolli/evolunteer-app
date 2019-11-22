import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import StackInstitutionProfileNavigator from '../navigation/StackInstitutionProfileNavigator';
import StackInstitutionNavigator from './StackInstitutionNavigator';
import StackWorkNavigator from './StackWorkNavigator';

const BottomTabNavigator = createBottomTabNavigator({
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
});

export default BottomTabNavigator;