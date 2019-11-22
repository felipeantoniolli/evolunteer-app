import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import StackVolunteerNavigator from './StackVolunteerNavigator';
import StackCalendarNavigator from './StackCalendarNavigator';
import StackVolunteerProfileNavigator from './StackVolunteerProfileNavigator';

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
        screen: StackVolunteerProfileNavigator,
        navigationOptions: {
            title: "Perfil"
        }
    }
});

export default BottomTabNavigator;