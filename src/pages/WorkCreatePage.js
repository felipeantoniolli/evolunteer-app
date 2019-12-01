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
    workClearData,
    setAllWorkContentData
} from '../actions/registerWorkActions';
import api from '../config/api';
import Input from '../components/Input';
import Loading from '../components/Loading';
import MaskedInput from '../components/MaskedInput';
import {
    convertStringToDateTime, convertDateTimeToString
} from '../helpers/parsers';

class WorkCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            isLoading: false,
            dateEvent: null,
            hourEvent: null,
            idWork: null
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
                this.setState({dateEvent: text});
                break;
            case 'work_hour':
                this.setState({hourEvent: text});
                break;
            default:
                return;
        }
    }

    async convertFields() {
        const { dateEvent, hourEvent } = this.state;
        let workDate = convertStringToDateTime(dateEvent, hourEvent);
        this.props.dispatchWorkDateData(workDate);
    }

    async convertDateFields() {
        const { work_date } = this.props.registerWork;
 
        let {date, hour} = convertDateTimeToString(work_date);
        this.setState({dateEvent: date, hourEvent: hour});
    }

    onPressDeleteButton() {
        Alert.alert(
            'Alerta',
            'Você tem certeza?',
            [
                {
                    text: 'Sim', onPress: () => {
                        this.deleteWork()
                    }
                },
                {
                    text: 'Não', onPress: () => {
                        console.log("Ação cancelada!")
                    }
                }
            ]
        );
    }

    async deleteWork() {
        this.setState({isLoading: false});

        await this.convertFields();

        const { id_work } = this.props.registerWork;

        await api
            .delete('work/delete/' + id_work)
            .then(response => {
                Alert.alert(
                    'Sucesso',
                    'Atividade deletada com sucesso!',
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
                    'Houve um erro ao deletar a atividade.',
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

    async onPressButton() {
        this.setState({isLoading: true});

        await this.convertFields();

        const { id_institution } = this.props.user.institution;
        const { name, content, work_date, id_work } = this.props.registerWork;
        const { editing } = this.state;

        let url = '';
        if (editing) {
            url = 'work/update/' + id_work;
        } else {
            url = 'work/create';
        }

        await api
            .post(url, {
                "id_institution": id_institution,
                "name": name,
                "content": content,
                "work_date": work_date
            })
            .then(response => {

                let text = editing ? 'Atividade alterada com sucesso!' : 'Atividade criado com sucesso!';
                Alert.alert(
                    'Sucesso',
                    text,
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

    async refreshPage() {
        this.setState({isLoading: true});

        await this.loadingData();
        this.props.navigation.state.params = null;

        this.setState({isLoading: false});
    }

    componentDidMount() {
        this.setState({isLoading: true});

        this.loadingData();

        this.setState({isLoading: false});
    }

    async loadingData() {
        let { navigation } = this.props;

        if (navigation.getParam('editing')) {
            this.editingData();
        } else {
            this.clearData();
        }

        this.convertDateFields();
    }

    async clearData() {
        await this.props.dispatchWorkClearData();
        await this.setState({dateEvent: null, hourEvent: null});
    }

    editingData() {
        this.setState({editing: true});
        this.convertDateFields();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        const { name, content } = this.props.registerWork;
        const { navigation } = this.props;

        if (navigation.getParam('refresh')) {
            var refresh = navigation.getParam('refresh');

            if (refresh) {
                this.refreshPage();
            }
        }

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
                            <Text style={styles.title}>
                                {
                                    this.state.editing
                                    ? 'Editar Atividade'
                                    : 'Nova Atividade'
                                }
                            </Text>
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
                                lines={4}
                            />
                            <MaskedInput
                                title={'Data do evento'}
                                type={'datetime'}
                                options={{
                                    format: 'DD/MM/YYYY'
                                }}
                                onChangeTextHandler={text => this.onChangeTextHandler('work_date', text)}
                                inputValue={this.state.dateEvent}
                                keyboard={'numeric'}
                            />
                            <MaskedInput
                                title={'Hora do evento'}
                                type={'custom'}
                                options={{
                                    mask: "99:99"
                                }}
                                onChangeTextHandler={text => this.onChangeTextHandler('work_hour', text)}
                                inputValue={this.state.hourEvent}
                                keyboard={'numeric'}
                            />
                            <View style={styles.content}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.onPressButton()}
                                >
                                    <Text style={styles.textButton}>
                                        {
                                            this.state.editing
                                            ?  'Alterar Atividade'
                                            : 'Cadastrar Atividade'
                                        }
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {
                                this.state.editing
                                ?    <View style={[styles.content, styles.deleteContent]}>
                                        <TouchableOpacity
                                            style={[styles.button, styles.deleteButton]}
                                            onPress={() => this.onPressDeleteButton()}
                                        >
                                            <Text style={styles.textButton}>
                                                Excluir Atividade
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                : null
                            }
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
    },
    deleteContent: {
        marginTop: 5
    },
    deleteButton: {
        backgroundColor: "#FF9E9E"
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
        dispatchWorkClearData: workClearData,
        dispatchSetAllWorkData: setAllWorkContentData
    }
)(WorkCreatePage);