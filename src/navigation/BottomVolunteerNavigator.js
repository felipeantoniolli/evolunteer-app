import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import VolunteerProfilePage from '../pages/VolunteerProfilePage';
import StackVolunteerNavigator from './StackVolunteerNavigator';

const BottomTabNavigator = createBottomTabNavigator({
    // Index: {
    //     screen: IndexPage
    // },
    Search: {
        screen: StackVolunteerNavigator,
        navigationOptions: {
            title: "Pesquisa"
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