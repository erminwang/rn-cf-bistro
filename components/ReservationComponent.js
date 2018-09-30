import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button } from 'react-native';
import { Card } from 'react-native-element';
import DatePicker from 'react-native-datepicker';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guest: 1,
            smoking: false,
            date: ''
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                    </Picker>
                </View> 

            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
})

export default Reservation;