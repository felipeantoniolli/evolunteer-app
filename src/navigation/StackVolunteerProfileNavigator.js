import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import VolunteerProfilePage from '../pages/VolunteerProfilePage';
import VolunteerRegisterPage from '../pages/VolunteerRegisterPage';
import SolicitationsVolunteerPage from '../pages/SolicitationsVolunteerPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ImageUploadPage from '../pages/ImageUploadPage';

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
    },
    SolicitationsVolunteerPage: {
        screen: SolicitationsVolunteerPage,
        navigationOptions: {
            title: "Minhas Solicitações"
        }
    },
    ChangeVolunteerPassword: {
        screen: ChangePasswordPage,
        navigationOptions: {
            title: "Alterar Senha"
        }
    },
    ImageVolunteerPage: {
        screen: ImageUploadPage,
        navigationOptions: {
            title: "Alterar imagem"
        }
    }
});

export default StackVolunteerProfileNavigator;