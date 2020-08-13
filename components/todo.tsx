import React from 'react'
import {View, Text, Button, ListRenderItemInfo, StyleSheet} from 'react-native'
import {Todo} from '../models/todo.model'

interface TodoProps {
  todo: ListRenderItemInfo<Todo>
  onDelete(index: number): void
}

export const TodoItem = ({ todo, onDelete }: TodoProps) => {

  const handlePress = () => {
    onDelete(todo.index)
  }
  const { item } = todo

  return (
    <View style={styles.list}>
      <View style={styles.content}>
        <Text>{item.name}</Text>
        <Text>{item.timeout}</Text>
      </View>
      <Button title={'удалить'} onPress={handlePress}/>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 15
  },
  content: {
    paddingLeft: 5,
    paddingRight: 5
  }
})
