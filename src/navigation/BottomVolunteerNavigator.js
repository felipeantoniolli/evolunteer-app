import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import VolunteerProfilePage from '../pages/VolunteerProfilePage';

const BottomTabNavigator = createBottomTabNavigator({
    // Index: {
    //     screen: IndexPage
    // },
    VolunteerProfilePage: {
        screen: VolunteerProfilePage,
        navigationOptions: {
            title: "Perfil"
        }
    }
});

export default BottomTabNavigator;