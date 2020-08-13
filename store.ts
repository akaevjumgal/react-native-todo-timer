import {create} from 'mobx-persist'
import {AsyncStorage} from 'react-native'
import {TodoStore} from './todo.store'

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

class RootStore {
  todoStore = new TodoStore()

  constructor() {
    hydrate('todos', this.todoStore)
  }
}

export default new RootStore()
