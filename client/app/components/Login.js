import React, { Component } from 'react'

class Login extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h5>Login</h5>
				<form>
					<div className="col">
						<div className="error-info">
							{
								this.props.emailError.status === 'error'
									&& <p>The e-mail or password entered does not match any account.</p>
							}
							{
								this.props.passwordError.text === 'incorrect-length' || this.props.passwordError.text === 'no-length'
									&& "Your password needs to be at least 7 characters long."
							}
						</div>
						<label>Email</label>
						<input
							name="email"
							type="text"
							placeholder="test@jflynn.com"
							onChange={this.props.action}
							value={this.props.email} />
					</div>
					<div className="col">
						<label>Password</label>
						<input
							name="password"
							type="password"
							placeholder="Jakeiscool1"
							onChange={this.props.action}
							value={this.props.password} />
						<button className="hyperlink forgotten">Forgotten?</button>
					</div>
					<div className="col">
						<button onClick={this.props.logIn}>Log In</button>
						<span>or <button className="hyperlink" onClick={this.props.changeMode}>Sign Up</button></span>
					</div>
				</form>
			</div>
		)
	}
}

export default Login
