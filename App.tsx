import React, {Component} from 'react'
import {
  Button, Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image, SafeAreaView, ScrollView, Alert
} from 'react-native'
import {action, observable} from 'mobx'
import {observer, Provider} from 'mobx-react'
import RootStore from './store'
import moment from 'moment'
const Stopwatch = require('react-native-stopwatch-timer').Stopwatch

interface TodoProgressProps {
  inProgress: boolean
  target: number
}

const TodoProgress = ({inProgress, target}: TodoProgressProps) => {
  return (
    <TouchableOpacity onPress={() => RootStore.todoStore.start(target)}>
      <Image
        style={styles.icon}
        source={inProgress ? require('./icons/stop.png') : require('./icons/play.png')}
      />
    </TouchableOpacity>
  )
}

@observer
export default class App extends Component {

  @observable
  text: string

  deleteTodo = (index: number) => {
    RootStore.todoStore.deleteTodo(index)
  }

  @action
  onChange = (text: string) => {
    this.text = text
  }

  onPress = () => {
    RootStore.todoStore.addTodo(this.text)
    this.text = ''
  }

  render() {
    const confirmDelete = (index: number) =>
      Alert.alert(
        'Удалить запись',
        'Вы уверены?',
        [
          {
            text: 'Нет',
            style: 'cancel'
          },
          {text: 'Да', onPress: () => this.deleteTodo(index)}
        ],
        {cancelable: false}
    )

    return (
      <Provider store={RootStore}>
        <SafeAreaView>
          <View style={styles.button_wrapper}>
            <TextInput
              placeholder={'что будем делать?'}
              value={this.text}
              onChangeText={this.onChange}
              style={styles.input}
            />
            <View style={styles.create}>
              <Button
                title={'Создать'}
                color={'#1e88e5'}
                onPress={this.onPress}
              />
            </View>
          </View>
          <ScrollView style={styles.list_wrapper}>
            {RootStore.todoStore.list.map((todo, index) => (
              <View key={`${todo.id}`} style={styles.list}>
                <View style={styles.content}>
                  <Text>{todo.name}</Text>
                  <Stopwatch
                    laps
                    totalDuration={moment.duration(moment().diff(moment(todo.timeout))).asSeconds()}
                    start={todo.inProgress}
                    options={styles.timer}
                  />
                </View>
                <View style={styles.actions}>
                  <TodoProgress inProgress={todo.inProgress} target={index}/>
                  <TouchableOpacity onPress={() => confirmDelete(index)}>
                    <Image
                      style={styles.icon}
                      source={require('./icons/delete.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 50 : 0
  },
  button_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15
  },
  input: {
    width: '70%'
  },
  create: {
    width: '30%'
  },
  actions: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '20%',
  },
  icon: {
    width: 25,
    height: 25,
    display: 'flex'
  },
  list_wrapper: {
    marginVertical: 10,
    marginHorizontal: 15
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40
  },
  content: {
    paddingLeft: 5,
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  timer: {
    backgroundColor: 'transparent'
  },
})
