import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';

import {
    setWorkNameData,
    setWorkContentData,
    setWorkDateData,
    workClearData
} from '../actions/registerWorkActions';
import api from '../config/api';
import Input from '../components/Input';
import Loading from '../components/Loading';

class WorkCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    onChangeTextHandler(field, text) {
        switch (field) {
            case 'name':
                this.props.dispatchWorkNameData(text);
                break;
            case 'content':
                this.props.dispatchWorkContentData(text);
                break;
            case 'work_date':
                this.props.dispatchWorkDateData(text);
                break;
            default:
                return;
        }
    }

    onPressButton() {
        this.setState({isLoading: false});

        const { id_institution } = this.props.user.institution;
        const { name, content, work_date } = this.props.registerWork;

        api
            .post('work/create', {
                "id_institution": id_institution,
                "name": name,
                "content": content,
                "work_date": work_date
            })
            .then(response => {
                Alert.alert(
                    'Sucesso',
                    'Atividade criado com sucesso!',
                    [
                        {
                            text: 'Ok', onPress: () => {
                                this.props.navigation.navigate('WorkPage', {refresh: true})
                            }
                        }
                    ]
                );
            })
            .catch(error => {
                console.log(error);
                Alert.alert(
                    'Erro',
                    'Houve um erro ao criar a atividade.',
                    [
                        {
                            text: 'Ok', onPress: () => {
                                this.setState({isLoading: false});
                            }
                        }
                    ]
                );
            });
    }

    componentDidMount() {
        this.props.dispatchWorkClearData();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        const { name, content, work_date } = this.props.registerWork;

        return (
            <KeyboardAvoidingView 
                style={styles.teste}
                behavior="padding"
                keyboardVerticalOffset={100}
                enabled
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.title}>Nova Atividade</Text>
                        </View>
                        <View style={styles.content}>
                            <Input
                                title={'Nome da atividade'}
                                onChangeTextHandler={text => this.onChangeTextHandler('name', text)}
                                inputValue={name}
                                onSubmit={() => {this.content.focus()}}
                            />
                            <Input
                                title={'Descrição'}
                                onChangeTextHandler={text => this.onChangeTextHandler('content', text)}
                                inputValue={content}
                                reference={(input) => {this.content = input}}
                                onSubmit={() => {this.workDate.focus()}}
                                lines={4}
                            />
                            <Input
                                title={'Data do evento'}
                                onChangeTextHandler={text => this.onChangeTextHandler('work_date', text)}
                                inputValue={work_date}
                                reference={(input) => {this.workDate = input}}
                            />
                            <View style={styles.content}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.onPressButton()}
                                >
                                    <Text style={styles.textButton}>Cadastrar Atividade</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    teste: {
        paddingBottom: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        marginTop: 15
    },
    input: {
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        width: 300
    },
    title: {
        marginTop: 20,
        fontSize: 30,
        marginBottom: 10
    },
    field: {
        fontSize: 20
    },
    button: {
        marginHorizontal: 40,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#FFA02D',
        padding: 10,
        width: 300,
        marginBottom: 10
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 15
    }
});

const mapStateToProps = (state) => {
    const { registerWork, user } = state;
    return { registerWork, user };
};

export default connect(
    mapStateToProps,
    {
        dispatchWorkNameData: setWorkNameData,
        dispatchWorkContentData: setWorkContentData,
        dispatchWorkDateData: setWorkDateData,
        dispatchWorkClearData: workClearData
    }
)(WorkCreatePage);