import {persist} from 'mobx-persist'
import {computed, observable} from 'mobx'
import moment from 'moment'

export class Todo {
  @persist
  @observable
  id: number = Math.random()

  @persist
  @observable
  name: string = ''

  @persist
  @observable
  timeout: string = moment().format()

  @persist
  @observable
  inProgress: boolean = false
}
