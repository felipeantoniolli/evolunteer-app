import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SearchPage from '../pages/SearchPage';
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
            title: "Detalhes da instituição"
        }
    },
    SolicitationRequestPage: {
        screen: SolicitationRequestPage,
        navigationOptions: {
            title: "Solicitação"
        }
    }
},
{
    initialRouteName: "SearchPage",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#ffd29c',
        }
    }
});

export default StackVolunteerNavigator;