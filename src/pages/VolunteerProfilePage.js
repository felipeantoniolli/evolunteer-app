import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';
import Interests from '../components/Interests';
import Birth from '../components/Birth';
import { TouchableOpacity } from 'react-native-gesture-handler';

class VolunteerProfilePage extends React.Component {
    render() {
        const { name, last_name, birth } = this.props.user.volunteer;
        const { city, state } = this.props.user;
        const { navigation } = this.props;
        const interests = this.props.user.interest;

        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image
                        style={{height: 200, width: 200}}
                        source={require('../assets/no-image.png')}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('VolunteerEditPage', {editing: true})}
                    style={styles.button}
                >
                    <Text>Editar Perfil</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.lastName}>{last_name}</Text>
                </View>
                <View>
                    <Birth birth={birth} style={styles.text} />
                </View>
                <View>
                    <Text style={styles.text}>{city} - {state}</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>
                        Interesses
                    </Text>
                </View>
                <View>
                    <Interests interests={interests} style={styles.interest} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}></Text>
                    <Button 
                        title="Deslogar"
                        onPress={() => {
                            this.props.dispatchUserLogout()
                            this.props.navigation.navigate("Login");
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        alignSelf: 'center',
        fontSize: 35,
    },
    lastName: {
        alignSelf: 'center',
        fontSize: 30,
        marginBottom: 10
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
        flex: 1,
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
    const { user } = state;
    return { user };
};

export default connect(
    mapStateToProps,
    {
        dispatchUserLogout: logout
    }
)(VolunteerProfilePage);