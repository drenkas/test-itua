import React from 'react'
import { Row, Col, Button } from 'antd';

class TodoTask extends React.Component {

	toggleDiscription = (e) => {
		e.target.firstChild.innerHTML = this.taskDesc.style.display !== 'none' ? 'Развернуть' : 'Свернуть'
		this.taskDesc.style.display = this.taskDesc.style.display === 'none' ? 'inline' : 'none'
		
	}

	render() {
		return (
			<section className="todo-task" data-rowkey={this.props.task.key}>
				<h1 className="todo-task__title">{this.props.task.title}</h1>
				<Row className="todo-task__content">
					<Col span={12} className="todo-task__left">Проект: {this.props.task.project}</Col>
					<Col span={12} className="todo-task__right">Приоритет: {this.props.task.priority}</Col>
				</Row>
				<span className="todo-task__discription" ref={(node) => { this.taskDesc = node; }} style={{display: "none"}}>
					{this.props.task.discription}
				</span>
				<Row className="todo-task__buttons">
					<Col span={8} >
						<Button className="todo-task__left" data-rowkey={this.props.task.key} onClick={this.props.showEditModal}>Изменить</Button>
					</Col>
					<Col span={8} style={{textAlign: "center"}}>
						<Button data-rowkey={this.props.task.key} onClick={this.props.onDeleteItem} >Закрыть</Button>
					</Col>
					<Col span={8} >
						<Button className="todo-task__right" onClick={this.toggleDiscription}>Развернуть</Button>
					</Col>
				</Row>
			</section>
		)
	}
}

export default TodoTask