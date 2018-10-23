import { combineReducers } from 'redux'
import { TodoListReducer } from './todoList'

export const reducers = combineReducers({
  TodoList: TodoListReducer,
})
