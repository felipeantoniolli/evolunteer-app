import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import WorkCreatePage from '../pages/WorkCreatePage';
import WorkPage from '../pages/WorkPage';

const StackWorkNavigator = createStackNavigator({
    WorkPage: {
        screen: WorkPage,
        navigationOptions: {
            title: "Atividades"
        }
    },
    WorkCreatePage: {
        screen: WorkCreatePage,
        navigationOptions: {
            title: "Nova Atividade"
        }
    }
},
{
    initialRouteName: "WorkPage",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#FFD29C',
        }
    }
});

export default StackWorkNavigator;