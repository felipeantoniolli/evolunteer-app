import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import RegisterPage from '../pages/RegisterPage';
import VolunteerRegisterPage from '../pages/VolunteerRegisterPage';
import InstitutionRegisterPage from '../pages/InstitutionRegisterPage';
import LoginPage from '../pages/LoginPage';
import InterestPage from '../pages/InterestPage';
import ImageUploadPage from '../pages/ImageUploadPage';

const StackNavigator = createStackNavigator({
    Login: {
        screen: LoginPage
    },
    RegisterPage: {
        screen: RegisterPage
    },
    VolunteerRegisterPage: {
        screen: VolunteerRegisterPage,
        navigationOptions: {
            title: "Cadastro"
        }
    },
    InstitutionRegisterPage: {
        screen: InstitutionRegisterPage,
        navigationOptions: {
            title: "Cadastro"
        }
    },
    InterestPage: {
        screen: InterestPage,
        navigationOptions: {
            title: "Cadastro"
        }
    },
    UploadImage: {
        screen: ImageUploadPage,
        navigationOptions: {
            title: "Alterar Imagem"
        }
    }
});

export default StackNavigator;