import React from 'react';
import {View, Text, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import api from '../config/api';
import { setWorksData } from '../actions/worksActions';
import WorksCard from '../components/WorksCard';

class WorkPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            refresh: false,
            works: null
        };
    }

    refreshPage() {
        this.props.navigation.state.params = null;
        this.findWorks();
    }

    componentDidMount() {
        this.findWorks();
    }

    findWorks() {
        this.setState({isLoading: true});
        const { id_institution } = this.props.user.institution;

        api
            .post('work/find-by-institution', {
                'id_institution': id_institution
            })
            .then(response => {
                const works = response.data.data;

                this.props.dispatchWorksData(works);

                const worksData = works.map((work) => <WorksCard work={work}/>);
                this.setState({isLoading: false, works: worksData});
            })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
            })
    }

    render() {
        const { navigation } = this.props;

        if (navigation.getParam('refresh')) {
            var refresh = navigation.getParam('refresh');

            if (refresh) {
                this.refreshPage();
            }
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Trabalhos
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("WorkCreatePage")}
                    style={styles.button}
                >
                    <Text>Novo trabalho</Text>
                </TouchableOpacity>
                <ScrollView>
                    <ScrollView>
                        {
                            this.state.works
                            ? this.state.works
                            : <Text>Não há nenhum trabalho novo!</Text>
                        }
                    </ScrollView>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
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
    }
});

const mapStateToProps = (state) => {
    const { user, works } = state;
    return { user, works };
};

export default connect(
    mapStateToProps,
    {
        dispatchWorksData: setWorksData
    }
)(WorkPage);