import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Alert, ToastAndroid } from 'react-native';
import {Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../Config';

export default class WriteStoryScreen extends React.Component{
    constructor(){
        super();
        this.state={
            title: '',
            author: '',
            storyText: '', 
        }
    }

    SubmitStory=()=>{
        db.collection('stories').add({
            title: this.state.title,
            author: this.state.author,
            storyText: this.state.storyText,
        })
        this.setState({
            title: '',
            author: '',
            storyText: '',
        })
        ToastAndroid.show('The Story has been Submitted', ToastAndroid.SHORT);
    }

    render(){
        return(
           <KeyboardAvoidingView style = {styles.container} behavior = 'padding' enabled >
              <Header centerComponent = {{text: 'Story Hub', 
              style: {color: 'black', 
              fontSize: 20, 
              fontWeight: 'bold', 
              fontFamily: 'Times New Roman'}}} 
              backgroundColor = "aqua" />
              <TextInput
                style = {styles.title}
                placeholder ={"Story Title"}
                onChangeText={(text)=>{
                    this.setState({
                    title: text
                    })
                }}
                value = {this.state.title}
                />
                <TextInput
                style = {styles.author}
                placeholder ={"Author"}
                onChangeText={(text)=>{
                    this.setState({
                    author: text
                    })
                }}
                value = {this.state.author}
                />
                <TextInput
                style={styles.storyText}
                placeholder ={"Write Your Story"}
                onChangeText={(text)=>{
                    this.setState({
                    storyText: text
                    })
                }}
                multiLine = {true}
                value = {this.state.storyText}
                />
                <TouchableOpacity style = {styles.submitButton} onPress = {()=>{this.SubmitStory()}}>
                    <Text style = {styles.buttonText}> Submit </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        height: 40,
        borderWidth: 2,
        marginTop: 40,
        margin: 10,
        color: 'black',
        padding: 6,
    },
    author: {
        height: 40,
        borderWidth: 2,
        margin: 10,
        padding: 6,
    },
    storyText: {
        height: 250,
        borderWidth: 2,
        margin: 10,
        padding: 6,
    },
    submitButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'pink',
        width: 80,
        height: 40,
        color: 'black',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    }
})