import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Interests from '../components/Interests'; 

class InstitutionDetailsPage extends React.Component {
    render() {
        const { street, number, city, state } = this.props.institutionDetail;
        const { fantasy } = this.props.institutionDetail.institution;
        const { interest } = this.props.institutionDetail;

        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image
                        style={{height: 200, width: 200}}
                        source={require('../assets/no-image.png')}
                    />
                </View>
                <View>
                    <Text style={styles.name}>{fantasy}</Text>
                </View>
                <View>
                    <Text style={styles.text}>{street}, {number}</Text>
                </View>
                <View>
                    <Text style={styles.text}>{city} - {state}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => console.log("uhu")}
                >
                    <Text>Quero participar</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.subtitle}>
                        Interesses
                    </Text>
                </View>
                <View>
                    {
                        interest
                        ? <Interests interests={interest} style={styles.interest} />
                        : null
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {    
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 35
    },
    text: {
        fontSize: 20
    },
    subtitle: {
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20
    },
    image: {
        justifyContent: 'center'
    },
    content: {
        flex: 1
    },
    title: {
        fontSize: 40,
        marginBottom: 20
    },
    interest: {
        fontSize: 20,
        justifyContent: 'center'
    },
    button: {
        marginHorizontal: 40,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    }
});

const mapStateToProps = state => {
    const { institutionDetail } = state;
    return { institutionDetail };
};

export default connect(
    mapStateToProps
)(InstitutionDetailsPage);