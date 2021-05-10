import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import {SearchBar, Header} from 'react-native-elements';
import db from '../Config'

export default class ReadStoryScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            allStories: [],
            dataSource: [],
            search: '',
        }
    }

    readStories=()=>{
      var allStories = []
      var stories = db.collection('stories').get()
      .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
              allStories.push(doc.data())
          })
          this.setState({
              allStories: allStories
          })
      })
    }

    componentDidMount(){
        this.readStories()
    }

    searchFilter(text){
        const newData = this.state.allStories.filter((item)=>{
            const itemData = item.title?item.title.toUpperCase(): ''.toUpperCase()
            const textData = text.toUpperCase()
            return(itemData.indexOf(textData)>-1)
        })
        this.setState({
            dataSource: newData,
            search: text,
        })
    }

    render(){
        return(
          <View style = {styles.container}>
              <Header backgroundColor = {'pink'} centerComponent = {{text: 'BedTime Stories', style: {color: 'white', fontSize: 20}}} />
              <View style = {{height: 20, width:'100%'}}>
                  <SearchBar placeholder = 'Type Here' onChangeText = {(text)=>{this.searchFilter(text)}} 
                  onClear = {(text)=>{this.searchFilter('')}} value = {this.state.search} />
              </View>
              <FlatList data = {this.state.search === ''?this.state.allStories:this.state.dataSource} 
              renderItem = {({item})=>{
                  <View style = {styles.itemContainer}>
                      <Text> Title: {item.title} </Text>
                      <Text> Author: {item.author} </Text>
                  </View>
              }} keyExtractor = {(item,index)=>{index.toString()}} />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },

    item: {
        backgroundColor: 'pink',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 60,
    },

    title: {
        fontSize: 20,
    },

    itemContainer: {
        height: 80,
        width: '100%',
        borderWidth: 2,
        borderColor: 'pink',
        justifyContent: 'center',
        alignSelf: 'center',
    }
})