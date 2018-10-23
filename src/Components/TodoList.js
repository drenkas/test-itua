import React from 'react'
import TodoTask from './TodoTask';

class TodoList extends React.Component {

	render() {
		const text = "No tasks"
		return (
			<section className="todo-wrapper">
				{this.props.todoList ?
					this.props.todoList.map((task, index) =>
						<TodoTask
							key = {task.key}
							task = {task}
							onDeleteItem = {this.props.onDeleteItem}
							showEditModal = {this.props.showEditModal}
						/>
					) : text
				}
			</section>
		)
	}
}

export default TodoList