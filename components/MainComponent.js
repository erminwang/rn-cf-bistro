import React, { Component } from 'react';
import { View, Text, Platform, Image, StyleSheet, ScrollView } from 'react-native';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Dishdetail from './DishdetailComponent';
import Reservation from './ReservationComponent'
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
});

const universalHeader = ({ navigation }) => ({
    headerStyle: {
        backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',   // for icons
    headerTitleStyle: {
        color: '#fff',   // for text
    },
    headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
});

const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: universalHeader
    },
    Dishdetail: {
        screen: Dishdetail
    }
}, {
    initialRouteName: 'Menu'
});

const HomeNavigator = createStackNavigator({
    Home: {
        screen: Home
    }
}, {
    navigationOptions: universalHeader
});

const ContactNavigator = createStackNavigator({
    ContactUs: {
        screen: ContactUs
    }
}, {
    navigationOptions: universalHeader
});

const AboutNavigator = createStackNavigator({
    AboutUs: {
        screen: AboutUs
    }
}, {
    navigationOptions: universalHeader
});

const ReservationNavigator = createStackNavigator({
    Reservation: {
        screen: Reservation
    }
}, {
    navigationOptions: universalHeader
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={StyleSheet.container} forceInset={{ top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon name='home' type='font-awesome' size={24} color={tintColor} />
            )
        }
    },
    AboutUs: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon name='info-circle' type='font-awesome' size={24} color={tintColor} />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon name='list' type='font-awesome' size={24} color={tintColor} />
            )
        }
    },
    ContactUs: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon name='address-card' type='font-awesome' size={22} color={tintColor} />
            )
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor }) => (
                <Icon name='cutlery' type='font-awesome' size={24} color={tintColor} />
            )
        }
    }
}, {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
});

class Main extends Component {

    componentDidMount() {
        // Prefetch all the data for other screens
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);