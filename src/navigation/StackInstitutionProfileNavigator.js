import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import InstitutionRegisterPage from '../pages/InstitutionRegisterPage';
import InstitutionProfilePage from '../pages/InstitutionProfilePage';

const StackInstitutionProfileNavigator = createStackNavigator({
    InstitutionPage: {
        screen: InstitutionProfilePage,
        navigationOptions: {
            title: "Perfil",
        }
    },
    InstitutionEditPage: {
        screen: InstitutionRegisterPage,
        navigationOptions: {
            title: "Editar Perfil"
        }
    }
});

export default StackInstitutionProfileNavigator;