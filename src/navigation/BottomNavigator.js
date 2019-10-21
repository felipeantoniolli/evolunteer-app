import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import IndexPage from '../pages/IndexPage';

const BottomTabNavigator = createBottomTabNavigator({
    Index: {
        screen: IndexPage
    }
});

export default BottomTabNavigator;