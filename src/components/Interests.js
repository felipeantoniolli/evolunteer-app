import React from 'react';
import { View, Text } from 'react-native';

const Interest = ({ interests, style }) => {
    const interest = interests.map(interest => {
        return (
            <Text style={style} key={interest.id_interest}>
                { getInterestType(interest.type) }
            </Text>
        );
    });

    return interest;
}

const getInterestType = type => {
    switch(type) {
        case 1:
            return 'Crianças';
        case 2:
            return 'Animais';
        case 3:
            return 'Idosos';
        default:
            return 'nenhum';
    }
}

export default Interest;