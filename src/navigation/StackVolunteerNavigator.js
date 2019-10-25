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
            header: (
                <SearchBar />
            )
        }
    },
    InstitutionDetailsPage: {
        screen: InstitutionDetailsPage,
        mavigationOptions: {
            title: "Detalhes da institutição"
        }
    },
    SolicitationRequestPage: {
        screen: SolicitationRequestPage,
        mavigationOptions: {
            title: "Solicitação"
        }
    }
});

export default StackVolunteerNavigator;