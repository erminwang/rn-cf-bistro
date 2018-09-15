import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

class ContactUs extends Component {

    render() {
        return (
            <Card title="Contact Information">
                <Text>599 Dansey Avenue</Text>
                <Text>Coquitlam, BC</Text>
                <Text>Canada</Text>
                <Text>Tel: +1 778 892 3858</Text>
                <Text>Email: erminwang1@gmail.com</Text>
            </Card>
        );
    }
}

export default ContactUs;