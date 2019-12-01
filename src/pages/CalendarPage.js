import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import api from '../config/api';
import { setCalendarData } from '../actions/calendarActions';
import Loading from '../components/Loading';
import WorksCard from '../components/WorksCard';

class CalendarPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            calendar: null
        };
    }

    componentDidMount() {
        this.findCalendar();
    }

    refreshResults() {
        this.setState({calendarData: null});
        this.findCalendar();
    }

    async findCalendar() {
        this.setState({isLoading: true});
        const { id_volunteer } = this.props.user.volunteer;

        await api
            .post('calendar/find-by-volunteer', {
                'id_volunteer': id_volunteer
            })
            .then(response => {
                const calendars = response.data.data;
                this.props.dispatchCalendarData(calendars);

                const calendarData = calendars.map((calendar) => {
                    return (
                        <WorksCard
                            key={calendar.work.id_work}
                            work={calendar.work}
                            institution={calendar.work.institution}
                            onPressHandler={() => console.log("Você não é uma instituição")}
                        />
                    );
                });

                this.setState({isLoading: false, calendar: calendarData});
            })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
            })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Próximas atividades
                </Text>
                <View style={styles.content}>
                    <TouchableOpacity
                        onPress={() => this.refreshResults()}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Recarregar resultados</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {
                        this.state.calendar
                        ? this.state.calendar
                        : <View style={styles.container}>
                            <Text style={styles.notFound}>Não há nenhum trabalho novo!</Text>
                        </View>
                    }
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
    content: {
        alignItems: 'center'
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
    textButton: {
        fontWeight: 'bold',
        fontSize: 15
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20
    },
    notFound: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 20
    }
});

const mapStateToProps = (state) => {
    const { user, calendar } = state;
    return { user, calendar };
};

export default connect(
    mapStateToProps,
    {
        dispatchCalendarData: setCalendarData
    }
)(CalendarPage);