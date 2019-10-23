import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import InstitutionProfilePage from '../pages/InstitutionProfilePage';

const BottomTabNavigator = createBottomTabNavigator({
    // Index: {
    //     screen: IndexPage
    // },
    InstitutionProfilePage: {
        screen: InstitutionProfilePage,
        navigationOptions: {
            title: "Perfil"
        }
    }
});

export default BottomTabNavigator;