import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { setImageData } from '../actions/userActions';

import api from '../config/api';

import ProfileImage from '../components/ProfileImage';
import Loading from '../components/Loading';

class ImageUploadPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            file: null,
            editing: false
        }
    }
    
    componentDidMount() {
        this.getPermissionAsync();
        const { image } = this.props.user;

        if (image) {
            this.setState({image});
        }
    }

    async getPermissionAsync() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Você precisa permitir o acesso para adicionarmos uma imagem');
        }
    }

    async pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri, file: result.base64 });
        }
    };

    async uploadImage() {
        this.setState({isLoading: true});
        const { id_user } = this.props.user;
        const config = { headers: {'Content-type': 'multipart/form-data'}};
        const { file } = this.state;

        let formData = new FormData();
        formData.append('image', file);
        formData.append('id_user', id_user);

        await api
            .post('user/upload-image', formData, config)
            .then(response => {
                const user = response.data.data;

                this.setState({isLoading: false});

                this.props.dispacthImageData(user.image);
                    
                const content = this.state.editing ? 'Imagem alterada ' : 'Imagem inserida ';
                Alert.alert(
                    'Sucesso',
                    content + 'com sucesso :)',
                    [
                        {
                            text: 'OK', onPress: () => {
                               this.navigate()
                            }
                        }
                    ]
                );
            })
            .catch(error => {
                console.log(error);
                const { errors } = error.response.data;

                this.setState({isLoading: false});
                if (errors) {
                    Alert.alert(
                        title="O formato da imagem é inválido"
                    );
                } else {
                    Alert.alert(
                        title="Ocorreu um erro ao inserir a imagem!"
                    );
                }
            });
    }

    navigate() {
        const { interest, type } = this.props.user;

        if (this.state.editing) {
            if (type == 1) {
                this.props.navigation.navigate('VolunteerProfilePage', {register: true});
            } else if (type == 2) {
                this.props.navigation.navigate('InstitutionProfilePage', {register: true});
            } else {
                this.props.navigation.goBack();
            }
        } else if (interest.lenght > 0) {
            if (type == 1) {
                this.props.navigation.navigate('VolunteerProfilePage', {register: true});
            } else if (type == 2) {
                this.props.navigation.navigate('InstitutionProfilePage', {register: true});
            }
        } else {
            this.props.navigation.navigate('InterestPage');
        }
    }

    render() {
        const { image } = this.state;
        
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Escolha uma imagem de perfil</Text>
                <View style={styles.content}>
                    <TouchableOpacity 
                        style={[styles.button, styles.buttonUpload]}
                        onPress={() => this.pickImage()}
                    >
                        <Text>
                            Procurar
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <ProfileImage image={image} style={{height: 300, width: 300}} />
                </View>
                {
                    image
                    ?   <TouchableOpacity 
                            style={[styles.button, styles.buttonConfirm]}
                            onPress={() => this.uploadImage()}
                        >
                            <Text>
                                Salvar imagem
                            </Text>
                        </TouchableOpacity>
                    : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        marginTop: 40,
        fontSize: 20,
        marginBottom: 10
    },
    content: {
        marginTop: 5
    },
    button: {
        marginHorizontal: 45,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 50,
        marginBottom: 20
    },
    buttonUpload: {
        backgroundColor: '#FFA02D',
    },
    buttonConfirm: {
        backgroundColor: '#A0D850'
    }
});

const mapStateToProps = state => {
    const { user } = state;
    return { user };
};

export default connect(
    mapStateToProps,
    {
        dispacthImageData: setImageData
    }
)(ImageUploadPage);
