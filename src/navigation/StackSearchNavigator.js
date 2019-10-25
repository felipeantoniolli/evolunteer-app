import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SearchPage from '../pages/SearchPage';
import SearchBar from '../components/SearchBar';
import InstitutionDetailsPage from '../pages/InstitutionDetailsPage';

const StacSearchkNavigator = createStackNavigator({
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
    }
});

export default StacSearchkNavigator;