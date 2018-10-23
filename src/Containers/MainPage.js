import React from 'react'
import { Layout, Row, Col, Spin } from 'antd'
import { connect } from 'react-redux'
import TodoListTypes from '../Redux/todoList'
import TodoList from '../Components/TodoList'
import BottomMenu from './BottomMenu';
import ModalForm from '../Components/ModalForm'
import Immutable from 'seamless-immutable'


const { Header, Content } = Layout

class MainPage extends React.Component {

	state = {
		visible: false,
		filterBy: 'all',
		sortByPriority: false,
		list: [],
		task: {}
	}

	componentDidMount() {
		this.props.createTodoList(this.changeState)
	}

	showCreateModal = () => {
		this.setState({
			task: {
				title: '',
				project: '',
				priority: '1',
				discription: '',
				edit: false
			},
			visible: true,
		})
	}

	showEditModal = (e) => {
		const rowKey = e.target.dataset.rowkey
		const task =  this.state.list.find(el => {
			return Number(rowKey) === el.key
		})
		this.setState({
			task: {
				title: task.title,
				project: task.project,
				priority: task.priority,
				discription: task.discription,
				key: rowKey,
				edit: true
			},
			visible: true,
		})
	}

	hideModal = () => {
		this.setState({
			visible: false,
		})
	}

	changeState = (newList) => {
		let tmp = newList
		if (this.state.filterBy !== 'all'){
			tmp = newList.filter(item => {
				return item.project === this.state.filterBy
			})
		}
		if (this.state.sortByPriority){
			tmp.sort((a, b) => {
				return a.priority - b.priority;
			})
		}
		this.setState({
			list: tmp,
		})
	}

	changeSort = () => {
		this.setState({
			sortByPriority: this.state.sortByPriority ? false : true,
		}, () => {
			this.changeState(Immutable.asMutable(this.props.TodoList.list))
		})
	}

	changeFilter = (value) => {
		this.setState({
			filterBy: value,
		}, () => {
			this.changeState(Immutable.asMutable(this.props.TodoList.list))
		})
		
	}

	onDeleteItem = (e) => {
		const rowKey = e.target.dataset.rowkey
		this.props.deleteItem({
			rowKey: rowKey
		}, this.changeState)
	}

	render() {
		return (
			<Layout>
				<Header>
					<h1 style={{ color: 'white' }}>Softindex Test</h1>
				</Header>
				<Content style={{ padding: '30px 0', backgroundColor: '#fff' }}>
					<Row>
						<Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }} md={{ span: 16, offset: 4 }} >
							{this.props.TodoList.isFetching ?
							<Spin size="large" /> :
							<TodoList
								todoList = {this.state.list}
								onDeleteItem = {this.onDeleteItem}
								showEditModal = {this.showEditModal}
							/>}
						</Col>
					</Row>
				</Content>
				<BottomMenu 
					todoList = {this.props.TodoList.list}
					showCreateModal = {this.showCreateModal}
					changeSort = {this.changeSort}
					changeFilter = {this.changeFilter}
				/>
				<ModalForm 
					addItem = {this.props.addItem}
					editItem = {this.props.editItem}
					visible = {this.state.visible}
					hideModal = {this.hideModal}
					isFetching = {this.props.TodoList.isFetching}
					task = {this.state.task}
					changeState = {this.changeState}
				/>
			</Layout>
		)
	}
}

const mapStateToProps = (state) => ({
	TodoList: state.TodoList,
})

const mapDispatchToProps = dispatch => {
	return {
		createTodoList: (change) => dispatch(TodoListTypes.createTodoListRequest(change)),
		addItem: (payload, handle, change) => dispatch(TodoListTypes.addItemRequest(payload, handle, change)),
		editItem: (payload, handle, change) => dispatch(TodoListTypes.editItemRequest(payload, handle, change)),
		deleteItem: (payload, change) => dispatch(TodoListTypes.deleteItemRequest(payload, change))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)