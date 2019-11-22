import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import VolunteerProfilePage from '../pages/VolunteerProfilePage';
import VolunteerRegisterPage from '../pages/VolunteerRegisterPage';

const StackVolunteerProfileNavigator = createStackNavigator({
    VolunteerPage: {
        screen: VolunteerProfilePage,
        navigationOptions: {
            title: "Perfil",
        }
    },
    VolunteerEditPage: {
        screen: VolunteerRegisterPage,
        navigationOptions: {
            title: "Editar Perfil"
        }
    }
});

export default StackVolunteerProfileNavigator;