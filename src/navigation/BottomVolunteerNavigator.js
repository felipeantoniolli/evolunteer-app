import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import VolunteerProfilePage from '../pages/VolunteerProfilePage';
import StackVolunteerNavigator from './StackVolunteerNavigator';
import StackCalendarNavigator from './StackCalendarNavigator';

const BottomTabNavigator = createBottomTabNavigator({
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
        screen: VolunteerProfilePage,
        navigationOptions: {
            title: "Perfil"
        }
    }
});

export default BottomTabNavigator;