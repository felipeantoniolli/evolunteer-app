import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import StackVolunteerNavigator from './StackVolunteerNavigator';
import StackCalendarNavigator from './StackCalendarNavigator';
import StackVolunteerProfileNavigator from './StackVolunteerProfileNavigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';

const VolunteerBottomTabNavigator = createBottomTabNavigator({
    Search: {
        screen: StackVolunteerNavigator,
        navigationOptions: {
            title: "Pesquisa",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesomeIcon icon={faSearch} size={20} color={tintColor}/>
            )
        }
    },
    Calendar: {
        screen: StackCalendarNavigator,
        navigationOptions: {
            title: "Calendário",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesomeIcon icon={faCalendar} size={20} color={tintColor}/>
            )
        }
    },
    VolunteerProfilePage: {
        screen: StackVolunteerProfileNavigator,
        navigationOptions: {
            title: "Perfil",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesomeIcon icon={faUser} size={20} color={tintColor}/>
            )
        }
    }
},
{
    initialRouteName: "Calendar",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#ffd29c',
        }
    }
});

export default VolunteerBottomTabNavigator;