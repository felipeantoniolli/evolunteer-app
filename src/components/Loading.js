import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loading = ({size = "large"}) => {
    return <ActivityIndicator size={size} color="#0000ff" />;
}

export default Loading;