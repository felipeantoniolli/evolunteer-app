import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import WorkCreatePage from '../pages/WorkCreatePage';
import WorkPage from '../pages/WorkPage';

const StackWorkNavigator = createStackNavigator({
    WorkPage: {
        screen: WorkPage,
        navigationOptions: {
            title: "Trabalhos"
        }
    },
    WorkCreatePage: {
        screen: WorkCreatePage,
        navigationOptions: {
            title: "Novo Trabalho"
        }
    }
},
{
    initialRouteName: "WorkPage",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#ffd29c',
        }
    }
});

export default StackWorkNavigator;