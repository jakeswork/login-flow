import React, { Component } from 'react'
import 'whatwg-fetch';
import queryString from 'query-string'

class LogIn extends Component {
	constructor(props) {
		super(props)
		this.handleInput = this.handleInput.bind(this)
		this.registerUser = this.registerUser.bind(this)
		this.changeMode = this.changeMode.bind(this)
		this.state = {
			mode: 'logIn'
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
		this.state.mode === 'logIn' ? this.setState({mode: 'register'}) : this.setState({mode: 'logIn'})
	}

	registerUser(e) {
		e.preventDefault()
		fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(this.state)
		})
			.then(res => res.json())
			.then(json => console.log(json))
	}

	render() {
		return (
			<div className="full-page">
				{ this.state.mode === 'logIn' ?
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
