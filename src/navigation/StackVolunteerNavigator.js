import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SearchPage from '../pages/SearchPage';
import SearchBar from '../components/SearchBar';
import InstitutionDetailsPage from '../pages/InstitutionDetailsPage';
import SolicitationRequestPage from '../pages/SolicitationRequestPage';

const StackVolunteerNavigator = createStackNavigator({
    SearchPage: {
        screen: SearchPage,
        navigationOptions: {
            title: "Pesquisa"
        }
    },
    InstitutionDetailsPage: {
        screen: InstitutionDetailsPage,
        navigationOptions: {
            title: "Detalhes da institutição"
        }
    },
    SolicitationRequestPage: {
        screen: SolicitationRequestPage,
        navigationOptions: {
            title: "Solicitação"
        }
    }
});

export default StackVolunteerNavigator;