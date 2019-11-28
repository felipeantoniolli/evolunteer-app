import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import StackVolunteerNavigator from './StackVolunteerNavigator';
import StackCalendarNavigator from './StackCalendarNavigator';
import StackVolunteerProfileNavigator from './StackVolunteerProfileNavigator';

const VolunteerBottomTabNavigator = createMaterialBottomTabNavigator({
    Search: {
        screen: StackVolunteerNavigator,
        navigationOptions: {
            title: "Pesquisa"
        }
    },
    Calendar: {
        screen: StackCalendarNavigator,
        navigationOptions: {
            title: "Calendário"
        }
    },
    VolunteerProfilePage: {
        screen: StackVolunteerProfileNavigator,
        navigationOptions: {
            title: "Perfil"
        }
    }
},
{
    initialRouteName: 'Calendar',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {
        backgroundColor: '#694fad'
    }
});

export default VolunteerBottomTabNavigator;