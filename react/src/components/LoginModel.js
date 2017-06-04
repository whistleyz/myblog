import React from 'react'
import { Modal, Button, Icon, Form, Input, Checkbox } from 'antd'

import Style from './LoginModel.module.less'

const FormItem = Form.Item

const ModelFooter = (props) => {

	const { onSubmit } = props

	return (
		<div className={Style.footer}>
			<div style={{float: 'left'}}>Social account: <Icon type="github" /> <Icon type="apple" /> <Icon type="chrome" /></div>
			<div style={{float: 'right'}}>
				<Button type="primary" onClick={onSubmit} htmlType="submit" className="login-form-button">
	            	Login
	          	</Button>
			</div>
		</div>
	)
}

const LoginForm = (props) => {

	const { getFieldDecorator } = props.form


	return (
		<Form onSubmit={() => {}} className="login-form">
	        <FormItem>
	          	{getFieldDecorator('username', {
	            	rules: [{ required: true, message: 'Please input your username!' }],
	          	})(
	            	<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
	          	)}
	        </FormItem>
	        <FormItem>
	          	{getFieldDecorator('password', {
	            	rules: [{ required: true, message: 'Please input your Password!' }],
	          	})(
	            	<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
	          	)}
	        </FormItem>
	        <FormItem className={Style.lastFromItem}>
	          	{getFieldDecorator('remember', {
	            	valuePropName: 'checked',
	            	initialValue: true,
	          	})(
            		<Checkbox>Remember me</Checkbox>
	          	)}
	          	<a className={Style.loginFormForgot}>Forgot password ?</a>
	        </FormItem>
	    </Form>
		)
}

const ModelBody = Form.create()(LoginForm)

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: false,
			visible: false
		}

	}

	showModal = () => {
		this.setState({
			visible: true,
		})
	}

	handleOk = (data) => {
		
		this.setState({ loading: true })
		setTimeout(() => {
			this.setState({ loading: false, visible: false })
		}, 3000)
	}
	
	handleCancel = () => {
		this.setState({ visible: false })
	}

	handleSubmit = () => {
		const { doLogin } = this.props
		const form = this.refs.form

		form.validateFields((err, values) => {
			if (err === null) {
				typeof doLogin==='function' && this.props.doLogin({
					...values,
					callback: this.handleCancel
				})
			}
		})
	}

	componentDidMount() {
	}
	
	render() {

		return (
			<div>
				<span style={{cursor: 'pointer'}} onClick={this.showModal}>Login</span>	
				<Modal
					width={450}
					visible={this.state.visible}
					title="Login"
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={<ModelFooter onSubmit={this.handleSubmit} />}
				>
					<ModelBody ref="form" />	
				</Modal>
			</div>
		)
	}
}

export default App
