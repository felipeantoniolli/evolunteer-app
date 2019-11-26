import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SolicitationsPage from '../pages/SolicitationsPage';
import VolunteerDetailsPage from '../pages/VolunteerDetailsPage';

const StackInstitutionNavigator = createStackNavigator({
    SolicitationsPage: {
        screen: SolicitationsPage,
        navigationOptions: () => ({
            title: "Solicitações"
        })
    },
    VolunteerDetailsPage: {
        screen: VolunteerDetailsPage,
        navigationOptions: () => ({
            title: "Voluntário"
        })
    }
},
{
    initialRouteName: "SolicitationsPage",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#ffd29c',
        }
    }
});

export default StackInstitutionNavigator;