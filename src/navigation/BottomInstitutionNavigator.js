import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import StackInstitutionProfileNavigator from '../navigation/StackInstitutionProfileNavigator';
import StackInstitutionNavigator from './StackInstitutionNavigator';
import StackWorkNavigator from './StackWorkNavigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';

const InstitutionBottomTabNavigator = createBottomTabNavigator({
    StackWorkNavigator: {
        screen: StackWorkNavigator,
        navigationOptions: {
            title: "Atividades",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesomeIcon icon={faCalendar} size={20} color={tintColor}/>
            )
        }
    },
    Solicitations: {
        screen: StackInstitutionNavigator,
        navigationOptions: {
            title: "Solicitações",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesomeIcon icon={faUsers} size={20} color={tintColor}/>
            )
        }
    },
    InstitutionProfilePage: {
        screen: StackInstitutionProfileNavigator,
        navigationOptions: {
            title: "Perfil",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesomeIcon icon={faUser} size={20} color={tintColor}/>
            )
        }
    }
},
{
    initialRouteName: "Solicitations",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#ffd29c',
        }
    }
});

export default InstitutionBottomTabNavigator;