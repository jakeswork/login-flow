import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import 'whatwg-fetch';
import queryString from 'query-string'
import Loading from './Loading'
import Login from './Login'
import Register from './Register'
import UserDashboard from './UserDashboard'

class Landing extends Component {
	constructor(props) {
		super(props)
		this.handleInput = this.handleInput.bind(this)
		this.registerUser = this.registerUser.bind(this)
		this.changeMode = this.changeMode.bind(this)
		this.logIn = this.logIn.bind(this)
		this.state = {
			mode: 'logIn',
			loading: true,
			user: {
				loggedIn: false
			},
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

	logIn(e) {
		e.preventDefault()
		this.setState({
			loading: true,
			user:{
				loggedIn: false
			}
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
				fetch('/api/users/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify(this.state)
				})
					.then((res) => {
						if(res.ok) {
							return res.json()
						} else {
							this.setState({emailError:{status:'error'}, loading: false})
							throw new Error('Unable to login')
						}
					})
						.then(data => {
							this.setState({
								loading: false,
								passwordError: {},
								emailError: {},
								user: { data: data.docs[0], loggedIn: true}
							})
						})
						.catch(err => console.log(err))
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

	registerUser(e) {
		e.preventDefault()
		this.setState({
			loading: true
		})
		if(this.state.name) {
			this.setState({
				nameError :{
					status: '',
					text: ''
				}
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
					fetch('/api/users/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						},
						body: JSON.stringify(this.state)
					})
						.then((res) => {
							if(res.ok) {
								return res.json()
							} else {
								this.setState({loading: false})
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
								throw new Error('Unable to register')
							}
						})
							.then(data => {
								this.setState({
									passwordError: {},
									emailError: {},
									registerComplete: true,
									loading: false
								})
							})
							.catch(err => console.log(err))
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
		} else {
			this.setState({
				nameError: {
					status: 'error',
					text: 'no-length'
				}
			})
		}
	}

	componentDidMount() {
		this.setState({
			loading: false
		})
	}

	render() {
		return (
			<div className="full-page">
				{ this.state.loading && <Loading /> }
				{ this.state.user.loggedIn
					? <Redirect to={{
							pathname:"/account",
							referrer: this.state.user
						}}/>
					:
						this.state.registerComplete
						? <div className="login-modal">
								<h5>Success!</h5>
								<p>Thanks for registering</p>
								<p>You can now <button className="hyperlink" onClick={this.changeMode}>log in</button> to your account.</p>
							</div>

						: <div className="login-modal">
							{
								this.state.mode === 'logIn'
									? <Login
											email={this.state.email}
											password={this.state.password}
											action={this.handleInput}
											passwordError={this.state.passwordError}
											emailError={this.state.emailError}
											changeMode={this.changeMode}
											logIn={this.logIn}
										/>
									: <Register
											email={this.state.email}
											password={this.state.password}
											action={this.handleInput}
											passwordError={this.state.passwordError}
											emailError={this.state.emailError}
											changeMode={this.changeMode}
											registerUser={this.registerUser}
										/>
							}
							</div>
					}
			</div>
		)
	}
}

export default Landing
