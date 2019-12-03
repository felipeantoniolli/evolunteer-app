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
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProfileImage from '../components/ProfileImage';

class InstitutionProfilePage extends React.Component {
    render() {
        const { fantasy } = this.props.user.institution;
        const { city, state, street, number, image } = this.props.user;
        const { navigation } = this.props;
        const interests = this.props.user.interest;

        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <ProfileImage image={image} style={styles.profileImage} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('InstitutionEditPage', {editing: true, refresh: true})}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Editar Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ImageInstitutionPage', {editing: true})}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Alterar Imagem</Text>
                    </TouchableOpacity>
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
                <View>
                    <Text style={styles.subtitle}>
                        Interesses
                    </Text>
                </View>
                <View>
                    <Interests interests={interests} style={styles.interest} />
                </View>
                <View style={styles.content}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ChangeInstitutionPassword')}
                        style={[styles.button, styles.buttonPassword]}
                    >
                        <Text style={styles.textButton}>Alterar Senha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.dispatchUserLogout()
                            this.props.navigation.navigate("Login");
                        }}
                        style={[styles.button, styles.buttonLogout]}
                    >
                        <Text style={styles.textButton}>Sair</Text>
                    </TouchableOpacity>
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
        marginTop: 10,
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
        marginTop: 10,
        color: '#FFA02D'
    },
    image: {
        justifyContent: 'center',
        marginTop: 20
    },
    profileImage: {
        height: 270,
        width: 270,
        borderRadius: 20
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
        width: 145,
        marginHorizontal: 5,
        marginTop: 5,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFA02D'
    },
    textButton: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    buttonPassword: {
        backgroundColor: '#FFD29C',
        width: 300
    },
    buttonSolicitations: {
        backgroundColor: '#9EAFFF',
        width: 300
    },
    buttonLogout: {
        backgroundColor: "#FF9E9E",
        marginBottom: 20,
        width: 300
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
)(InstitutionProfilePage);