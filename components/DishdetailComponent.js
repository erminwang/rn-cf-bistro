import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Button, Modal } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (newComment) => dispatch(postComment(newComment))
});

function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image}}
            >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon 
                        raised 
                        reverse 
                        name={ props.favorite ? 'heart' : 'heart-o' } 
                        type='font-awesome' 
                        color='#f50' 
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon 
                        raised 
                        reverse 
                        name='pencil'
                        type='font-awesome' 
                        color='purple' 
                        onPress={() => props.onPress2()}
                    />
                </View>
            </Card>

        );
    }

    return (
        <View></View>
    );
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }

    return (
        <Card title="Comments" style={{padding: 20}}>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card> 
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            showModal: false,
            starRating: 0,
            authorText: '',
            commentText: ''
        };
    }
    
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    resetModal = () => {
        this.setState({
            starRating: 0,
            authorText: '',
            commentText: ''
        })
    }

    static navigationOptions = {
        title: 'Dish Details'
    };
 
    render() {
        const dishId = this.props.navigation.getParam('dishId', '');

        return (
            <View>
                <ScrollView>
                    <RenderDish 
                        dish={this.props.dishes.dishes[+dishId]} 
                        favorite={this.props.favorites.some(el => el === dishId)} 
                        onPress={() => this.markFavorite(dishId)}
                        onPress2={() => this.toggleModal()}
                    />
                    <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                </ScrollView>

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={this.state.showModal}
                    onDismiss={() => {
                        this.toggleModal(); 
                        this.resetModal();
                    }}
                    onRequestClose={() => {
                        this.toggleModal();
                        this.resetModal();
                    }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Rating
                            showRating
                            ratingCount={5}
                            type="star"
                            fractions={1}
                            startingValue={0}
                            imageSize={30}
                            onFinishRating={(rating) => this.setState({ starRating: rating })}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={
                                <Icon
                                    name='user-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />
                            }
                            onChangeText={(author) => this.setState({ authorText: author })}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={
                                <Icon
                                    name='comment-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />
                            }
                            onChangeText={(commentText) => this.setState({ commentText: commentText })}
                        />
                        <View style={{ margin: 10 }}>
                            <Button 
                                color='#512DA8'
                                title='Submit'
                                onPress={() => {
                                    this.props.postComment({
                                        id: this.props.comments.comments.length,
                                        dishId: dishId,
                                        rating: this.state.starRating,
                                        comment: this.state.commentText,
                                        author: this.state.authorText,
                                        date: new Date().toISOString()
                                    });
                                    this.toggleModal(); 
                                    this.resetModal();
                                }}
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Button
                                color='grey'
                                title='Cancel'
                                onPress={() => {
                                    this.toggleModal(); 
                                    this.resetModal();
                                }}
                            />
                        </View>
                    </View>                        
                </Modal>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);