import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SolicitationsPage from '../pages/SolicitationsPage';

const StackInstitutionNavigator = createStackNavigator({
    SolicitationsPage: {
        screen: SolicitationsPage,
        navigationOptions: () => ({
            title: "Solicitações"
        })
    }
});

export default StackInstitutionNavigator;