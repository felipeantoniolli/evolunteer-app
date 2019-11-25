import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ProfileImage from '../components/ProfileImage';

const VolunteersCard = ({user, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.volunteersButton}
            key={user.id_user}
            onPress={onPress}
        >
            <View style={styles.volunteersView}>
                <ProfileImage image={user.image} style={{height: 100, width: 100}} />
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.name}>{user.volunteer.name} {user.volunteer.last_name}</Text>
                    <Text style={styles.address}>{user.city} - {user.state}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        width: 300
    },
    button: {
        marginHorizontal: 40,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20
    },
    image: {
        aspectRatio: 1,
        width: 100,
        height: 100,
        marginLeft: 15
    },
    volunteersButton: {
        backgroundColor: '#F2F9F8',
        marginVertical: 15
    },
    volunteersView: {
        flexDirection: 'row',
        marginVertical: 10
    },
    address: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
});

export default VolunteersCard;