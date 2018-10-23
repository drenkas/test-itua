import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	createTodoListRequest: ['change'],
	deleteItemRequest: ['payload', 'change'],
	addItemRequest: ['payload', 'handle', 'change'],
	editItemRequest: ['payload', 'handle', 'change'],
	requestSuccess: ['payload'],
	requestFailure: null,
})

export const TodoListTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	list: [],
	isFetching: false
})

/* ------------- Reducers ------------- */

export const createTodoListRequest = (state, action) => {
	return state.merge({isFetching: true})
}

export const addItemRequest = (state, action) => {
	return state.merge({isFetching: true})
}

export const editItemRequest = (state, action) => {
	return state.merge({isFetching: true})
}

export const deleteItemRequest = (state, action) => {
	return state.merge({isFetching: true})
}

export const requestSuccess = (state, action) => {
	return state.merge({
		list: action.payload,
		isFetching: false
	})
}

export const requestFailure = (state, action) => {
	return state.merge({isFetching: false})
}

/* ------------- Hookup Reducers To Types ------------- */

export const TodoListReducer = createReducer(INITIAL_STATE, {
	[Types.CREATE_TODO_LIST_REQUEST]: createTodoListRequest,
	[Types.ADD_ITEM_REQUEST]: addItemRequest,
	[Types.EDIT_ITEM_REQUEST]: editItemRequest,
	[Types.DELETE_ITEM_REQUEST]: deleteItemRequest,
	[Types.REQUEST_SUCCESS]: requestSuccess,
	[Types.REQUEST_FAILURE]: requestFailure,
})