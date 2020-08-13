import {persist} from 'mobx-persist'
import {action, observable} from 'mobx'
import {Todo} from './models/todo.model'

export class TodoStore {
  @persist('list')
  @observable
  list: Todo[] = []

  @action
  addTodo = (name: string | null = null) => {
    if (!name) {
      return
    }
    const todo = new Todo()
    todo.name = name
    this.list = [todo, ...this.list]
  }

  @action
  deleteTodo = (index: number) => {
    this.list.splice(index, 1)
  }

  @action
  start = (index: number) => {
    this.list[index].inProgress = !this.list[index].inProgress
  }
}
