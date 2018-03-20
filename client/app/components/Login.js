import React, { Component } from 'react'
import 'whatwg-fetch';
import queryString from 'query-string'
import Loading from './Loading'

class LogIn extends Component {
	constructor(props) {
		super(props)
		this.handleInput = this.handleInput.bind(this)
		this.registerUser = this.registerUser.bind(this)
		this.changeMode = this.changeMode.bind(this)
		this.state = {
			mode: 'logIn',
			emailError: {
				status: '',
				text: ''
			},
			passwordError: {
				status: '',
				text: ''
			}
		}
	}

	handleInput(e) {
		const target = e.target,
		value = target.value,
		name = target.name

		this.setState({
			[name]: value
		})
	}

	changeMode(e) {
		e.preventDefault()
		this.setState({loading: true})
		this.state.mode === 'logIn' ? this.setState({mode: 'register', loading: false}) : this.setState({mode: 'logIn', loading: false, registerComplete: false})
	}

	registerUser(e) {
		e.preventDefault()
		this.setState({
			loading: true
		})
		if(this.state.email) {
			this.setState({
				emailError: {
					status: '',
					text: ''
				}
			})
			if(this.state.password && this.state.password.length > 6) {
				this.setState({
					passwordError: {
						status: '',
						text: ''
					}
				})
				fetch('/api/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify(this.state)
				})
					.then(res => {
						this.setState({
							loading: false
						})
						res.status === 412 && this.setState({
							emailError: {
								status: 'error',
								text: 'incorrect-syntax'
							}
						})
						res.status === 400 && this.setState({
							emailError: {
								status: 'error',
								text: 'already-exists'
							}
						})
						res.status === 411 && this.setState({
							passwordError: {
								status: 'error',
								text: 'incorrect-length'
							}
						})
						res.status === 200 && this.setState({
							passwordError: {},
							emailError: {},
							registerComplete: true
						})
					})
			} else {
				this.setState({
					passwordError: {
						status: 'error',
						text: 'no-length'
					},
					loading: false
				})
			}
		} else {
			this.setState({
				emailError: {
					status: 'error',
					text: 'no-length'
				},
				loading: false
			})
		}
	}

	render() {
		return (
			<div className="full-page">
				{ this.state.loading && <Loading /> }
				{ this.state.registerComplete ?
					<div className="login-modal">
						<h5>Success!</h5>
						<p>Thanks for registering</p>
						<p>You can now <button className="hyperlink" onClick={this.changeMode}>log in</button> to your account.</p>
					</div>
					:
					this.state.mode === 'logIn' ?
					<div className="login-modal">
						<h5>Login</h5>
						<form>
							<div className="col">
								<label>Email</label>
								<input
									name="email"
									type="text"
									placeholder="test@jflynn.com"
									onChange={this.handleInput} />
							</div>
							<div className="col">
								<label>Password</label>
								<input
									name="password"
									type="password"
									placeholder="Jakeiscool1"
									onChange={this.handleInput} />
								<button className="hyperlink forgotten">Forgotten?</button>
							</div>
							<div className="col">
								<button>Log In</button>
								<span>or <button className="hyperlink" onClick={this.changeMode}>Sign Up</button></span>
							</div>
						</form>
					</div>
					:
					<div className="login-modal">
						<h5>Register</h5>
						<form>
							<div className="col">
								<label>Email</label>
								<input
									className={this.state.emailError.status}
									name="email"
									type="text"
									placeholder="test@jflynn.com"
									onChange={this.handleInput} />
								<div className="error-info">
									{
										this.state.emailError.text === 'already-exists'
											? <p className="animated bounceInDown">It looks like this e-mail address already exists.</p>
											: this.state.emailError.status === 'error'
												&& <p className="animated bounceInDown">Please enter your full e-mail address.</p>
									}
								</div>
							</div>
							<div className="col">
								<label>Password</label>
								<input
									className={this.state.passwordError.status}
									name="password"
									type="password"
									placeholder="Jakeiscool1"
									onChange={this.handleInput} />
								<div>
									{
										this.state.passwordError.text === 'incorrect-length' || this.state.passwordError.text === 'no-length'
											&& "Your password needs to be at least 7 characters long."
									}
								</div>
							</div>
							<div className="col">
								<button onClick={this.registerUser}>Sign Up</button>
								<span>or <button className="hyperlink" onClick={this.changeMode}>Log In</button></span>
							</div>
						</form>
					</div>
				}
			</div>
		)
	}
}

export default LogIn
