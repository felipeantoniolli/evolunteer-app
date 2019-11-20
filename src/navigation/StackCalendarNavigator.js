import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import CalendarPage from '../pages/CalendarPage';

const StackCalendarNavigator = createStackNavigator({
    CalendarPage: {
        screen: CalendarPage,
        navigationOptions: () => ({
            title: "Calendário"
        })
    }
});

export default StackCalendarNavigator;