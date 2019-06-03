import React, { Component } from 'react';
import {View, Text, ScrollView, TouchableOpacity,StyleSheet} from 'react-native';


import api from '../../services/api';

export default class Main extends Component {
  state = {
    data: [],
  };

  componentDidMount = async () => {
    const res = await api.get('/task');
    this.setState({ data: res.data });
  };

  updateCompleted = async (id) => {
    await api.put(`/task/${id}`, { completed: true });
    this.componentDidMount();
  };

  updateNotCompleted = async (id) => {
    await api.put(`/task/${id}`, { completed: false });
    this.componentDidMount();
  };

  render() {
    const { data } = this.state;
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.viewContainer}>
          <Text style={styles.tittle}> Tarefas </Text>

          {data.map(task => (!task.completed ? (
            <TouchableOpacity key={task._id} onPress={() => this.updateCompleted(task._id)}>
              <Text style={styles.touchText}> {task.task}</Text>
            
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={task._id} onPress={() => this.updateNotCompleted(task._id)}>
              <Text style={styles.touchText2}>{task.task}</Text>
            </TouchableOpacity>
            
          )))}
        </View>
      </ScrollView>
    );
  }
}

const styles=StyleSheet.create({
  viewContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#b0c4de',
  },
  scrollContainer:{
    flex: 1, 
    backgroundColor: '#b0c4de'
  },
  tittle:{
    fontSize: 30,
    color: '#00000f'
  },
  touchText:{
    fontSize: 35,
    textAlign: 'center',
    margin: 5,
    color: 'red',
    fontWeight: 'bold',
  },
  touchText2:{
    fontSize: 35,
    textAlign: 'center',
    textDecorationLine: 'line-through',
    margin: 5,
    color: 'green',
    fontWeight: 'bold',
  }
})