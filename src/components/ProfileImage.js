import React from 'react';
import { Image } from 'react-native';
import getBaseUrl from '../helpers/baseUrl';

const ProfileImage = ({image, style}) => {
    var source = "";

    if (!image) {
        source = require("../assets/no-image.png");
    } else if (image.match(/file/)) {
        source = {uri: image};
    } else {
        source = {uri: getBaseUrl('image') + image};
    }

    return (
        <Image
            style={style}
            source={source}
        />
    );
}

export default ProfileImage;

