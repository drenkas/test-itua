import { all, takeEvery } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { TodoListTypes } from '../Redux/todoList'

/* ------------- Sagas ------------- */

import { createTodoList, addItem, editItem, deleteItem } from './todoList'

export default function * root () {
	yield all([
		takeEvery(TodoListTypes.CREATE_TODO_LIST_REQUEST, createTodoList),
		takeEvery(TodoListTypes.ADD_ITEM_REQUEST, addItem),
		takeEvery(TodoListTypes.EDIT_ITEM_REQUEST, editItem),
		takeEvery(TodoListTypes.DELETE_ITEM_REQUEST, deleteItem),
	])
}