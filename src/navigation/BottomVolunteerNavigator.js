import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import VolunteerProfilePage from '../pages/VolunteerProfilePage';
import StackSearchNavigator from './StackSearchNavigator';

const BottomTabNavigator = createBottomTabNavigator({
    // Index: {
    //     screen: IndexPage
    // },
    Search: {
        screen: StackSearchNavigator,
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