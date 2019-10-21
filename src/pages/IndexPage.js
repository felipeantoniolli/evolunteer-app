import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';

class IndexPage extends React.Component {
    render() {
        // const { name, last_name } = this.props.user.volunteer;
        // const { username } = this.props.user;

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <View style={styles.col1}>

                        </View>
                    </View>
                    <View style={styles.col2}>
                        <Text></Text>
                    </View>
                </View>
                
                <Text style={styles.title}>Bem vindo</Text>
                <Button 
                    title="Deslogar"
                    onPress={() => {
                        this.props.dispatchUserLogout()
                        this.props.navigation.navigate("Login");
                    }}
                />
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
    row: {
        flexDirection: 'row'
    },
    col1: {
        flex: 1
    },
    col2: {
        flex: 2
    },
    title: {
        fontSize: 40,
        marginBottom: 20
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
)(IndexPage);