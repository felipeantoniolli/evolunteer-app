import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const InstitutionsCard = ({user, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.institutionButton}
            key={user.institution.id_institution}
            onPress={onPress}
        >
            <View style={styles.institutionView}>
                <Image
                    style={styles.image}
                    source={require('../assets/no-image.png')}
                />
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.fantasy}>{user.institution.fantasy}</Text>
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
    search: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20
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
    institutionView: {
        flexDirection: 'row',
        marginVertical: 10
    },
    image: {
        aspectRatio: 1,
        width: 100,
        height: 100,
        marginLeft: 15
    },
    fantasy: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
    institutionButton: {
        backgroundColor: '#F2F9F8',
        marginVertical: 15
    },
    address: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
    interest: {
        fontSize: 15
    }
});

export default InstitutionsCard;