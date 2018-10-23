import React from 'react'
import { Layout, Row, Col, Checkbox, Select, Button } from 'antd'

const { Content } = Layout
const Option = Select.Option;

class BottomMenu extends React.Component {

	render() {
		const list = this.props.todoList
		let projects = []
		list.forEach(element => {
			if (!projects.find(el => {
				return el !== element.project ? false : true
			}) ){
				projects.push(element.project)
			}
		})
		
		return (
			<Content style={{ backgroundColor: '#fff' }}>
				<Row>
					<Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }} md={{ span: 16, offset: 4 }} >
						<Row>
							<Col span={8} >
							<Button type="primary" onClick={this.props.showCreateModal}>
								Новая Задача
							</Button>
							</Col>
							<Col span={8} >
								<Checkbox onChange={this.props.changeSort}>По приоритету</Checkbox>
							</Col>
							<Col span={8} >
								<Select defaultValue="all" style={{ width: 120 }} onChange={this.props.changeFilter}>
									<Option value="all">Все</Option>
									{projects.map((elem, index) =>
										<Option key={index} value={elem}>{elem}</Option>
									)}
								</Select>
							</Col>
						</Row>
					</Col>
				</Row>
			</Content>
		)
	}
}

export default BottomMenu