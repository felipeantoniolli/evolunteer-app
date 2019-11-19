import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import worksReducer from '../reducers/worksReducer';

const WorksCard = ({work, onPress = null}) => {
    return (
        <TouchableOpacity
            style={styles.worksButton}
            key={user.id_user}
            onPress={() => console.log('')}
        >
            <View style={styles.worksView}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.name}>{work.name}</Text>
                    <Text style={styles.content}>{work.content}</Text>
                    <Text style={styles.date}>{work.work_date}</Text>
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
    worksButton: {
        backgroundColor: '#F2F9F8',
        marginVertical: 15
    },
    worksView: {
        flexDirection: 'row',
        marginVertical: 10
    },
    content: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
    date: {
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

export default WorksCard;