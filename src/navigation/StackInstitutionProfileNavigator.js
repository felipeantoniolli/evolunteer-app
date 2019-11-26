import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import InstitutionRegisterPage from '../pages/InstitutionRegisterPage';
import InstitutionProfilePage from '../pages/InstitutionProfilePage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ImageUploadPage from '../pages/ImageUploadPage';

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
    },
    ChangeInstitutionPassword: {
        screen: ChangePasswordPage,
        navigationOptions: {
            title: "Alterar Senha"
        }
    },
    ImageInstitutionPage: {
        screen: ImageUploadPage,
        navigationOptions: {
            title: "Alterar imagem"
        }
    }
},
{
    initialRouteName: "InstitutionPage",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#ffd29c',
        }
    }
});

export default StackInstitutionProfileNavigator;