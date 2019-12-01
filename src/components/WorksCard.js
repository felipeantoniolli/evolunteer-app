import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { convertDateTimeToString } from '../helpers/parsers';

const WorksCard = ({work, onPressHandler = null, institution = null}) => {
    let { date, hour } = convertDateTimeToString(work.work_date);

    return (
        <TouchableOpacity
            style={styles.worksButton}
            onPress={onPressHandler}
        >
            <View style={styles.worksView}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.name}>{work.name}</Text>
                    {
                        institution
                        ? <Text style={styles.content}>{institution.fantasy}</Text>
                        : null
                    }
                    <Text style={styles.content}>{work.content}</Text>
                    <Text style={styles.date}>{date} às {hour}hrs</Text>
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
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#9EAFFF',
        padding: 10,
        width: 300,
        marginBottom: 10
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20
    },
    image: {
        borderRadius: 10,
        aspectRatio: 1,
        width: 80,
        height: 80,
        marginLeft: 15
    },
    worksButton: {
        backgroundColor: '#F2F9F8',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10
    },
    worksView: {
        flexDirection: 'row',
        marginVertical: 10
    },
    address: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
        color: "#FFA02D"
    },
    content: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 15
    },
    date: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 15
    }
});

export default WorksCard;