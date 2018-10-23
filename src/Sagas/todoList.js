import { put } from 'redux-saga/effects'
import TodoListTypes from '../Redux/todoList'
import { showNotification } from '../assets/showNotif'

export const createTodoList = function * (action) {
	try {
		let oldStorage = localStorage.getItem("TodoList") === null ? [] : JSON.parse(localStorage.getItem("TodoList"))
		oldStorage.forEach((item, i, arr) => {
			item.key = i
		})
		yield put(TodoListTypes.requestSuccess(oldStorage))
		action.change(oldStorage)
	} catch (error){
		let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
		showNotification('error', msg, desc, action.actionFail, 2)
		yield put(TodoListTypes.requestFailure())
	}
}

export const addItem = function * (action) {
	try {
		let oldStorage = localStorage.getItem("TodoList") === null ? [] : JSON.parse(localStorage.getItem("TodoList"))
		oldStorage.push(action.payload)
		oldStorage.forEach((item, i, arr) => {
			item.key = i
		})
		localStorage.setItem("TodoList", JSON.stringify(oldStorage))
		yield put(TodoListTypes.requestSuccess(oldStorage))
		action.change(oldStorage)
	} catch (error){
		let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
		showNotification('error', msg, desc, action.actionFail, 2)
		yield put(TodoListTypes.requestFailure())
	}
	action.handle()
}

export const editItem = function * (action) {
	try {
		const values = action.payload.values
		let oldStorage = localStorage.getItem("TodoList") === null ? [] : JSON.parse(localStorage.getItem("TodoList"))
		oldStorage.forEach((item, i, arr) => {
			if (Number(item.key) === Number(action.payload.key)){
				item.title = values.title
				item.project = values.project
				item.priority = values.priority
				item.discription = values.discription
			}
		})
		localStorage.setItem("TodoList", JSON.stringify(oldStorage))
		yield put(TodoListTypes.requestSuccess(oldStorage))
		action.change(oldStorage)
	} catch (error){
		let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
		showNotification('error', msg, desc, action.actionFail, 2)
		yield put(TodoListTypes.requestFailure())
	}
	action.handle()
}

export const deleteItem = function * (action) {
	try {
		let oldStorage = localStorage.getItem("TodoList") === null ? [] : JSON.parse(localStorage.getItem("TodoList"))
		oldStorage.splice(action.payload.rowKey, 1)
		oldStorage.forEach((item, i, arr) => {
			item.key = i
		})
		localStorage.setItem("TodoList", JSON.stringify(oldStorage))
		yield put(TodoListTypes.requestSuccess(oldStorage))
		action.change(oldStorage)
	} catch (error){
		let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
		showNotification('error', msg, desc, action.actionFail, 2)
		yield put(TodoListTypes.requestFailure())
	}
}