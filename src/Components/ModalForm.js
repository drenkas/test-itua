import React from 'react'
import { Modal, Form, Input,  Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class ModalForm  extends React.Component {

	handleSubmit = e => {
		e.target.disabled = true
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				if (this.props.task.edit)
					this.props.editItem({
						values: values,
						key: this.props.task.key
					}, this.props.hideModal, this.props.changeState)
				else
					this.props.addItem(values, this.props.hideModal, this.props.changeState)
				this.props.form.resetFields(['title', 'project', 'priority', 'discription'])
			}
			e.target.disabled = false
		})
	}

	

	render() {
		const { getFieldDecorator } = this.props.form
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 24 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 24 }
			}
		}
		return (
			<Modal title="Создание/редактирование задачи"
				visible={this.props.visible}
				onOk={this.handleSubmit}
				confirmLoading={this.props.isFetching}
				onCancel={this.props.hideModal}
			>
				<Form layout="vertical" onSubmit={this.handleSubmit}>
					<FormItem {...formItemLayout} label="Название задачи">
						{getFieldDecorator('title', {
							rules: [
								{
									type: 'string',
									message: 'The input is not valid title!'
								},
								{
									required: true,
									message: 'Please input a title'
								}
							],
							initialValue: this.props.task.title
						})(<Input />)}
					</FormItem>
					<FormItem {...formItemLayout} label="Название проекта">
						{getFieldDecorator('project', {
							rules: [
								{
									type: 'string',
									message: 'The input is not valid project name!'
								},
								{
									required: true,
									message: 'Please input a project name!'
								}
							],
							initialValue: this.props.task.project
						})(<Input />)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="Приоритет"
					>
						{getFieldDecorator('priority', {
							rules: [
								{
									required: true,
									message: 'Please input a priority!'
								}
							],
							initialValue: this.props.task.priority
						})(<Select >
							<Option value="1">1</Option>
							<Option value="2">2</Option>
							<Option value="3">3</Option>
							<Option value="4">4</Option>
						</Select>)}
					</FormItem>
					<FormItem {...formItemLayout} label="Описание">
						{getFieldDecorator('discription', {
							rules: [
								{
									type: 'string',
									message: 'The input is not valid project name!'
								},
								{
									required: true,
									message: 'Please input a project name!'
								}
							],
							initialValue: this.props.task.discription
						})(<Input />)}
					</FormItem>
				</Form>
			</Modal>
		)
	}
}

const WrappedModalForm = Form.create()(ModalForm)

export default WrappedModalForm