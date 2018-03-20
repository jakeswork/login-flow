import React, { Component } from 'react'

class Register extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h5>Register</h5>
				<form onSubmit={this.props.handleSubmit}>
					<div className="col">
						<div className="error-info">
							{
								this.props.emailError.text === 'already-exists'
									? <p>It looks like this e-mail address already exists.</p>
									: this.props.emailError.status === 'error'
										&& <p>Please enter your full e-mail address.</p>
							}
							{
								this.props.passwordError.text === 'incorrect-length' || this.props.passwordError.text === 'no-length'
									&& "Your password needs to be at least 7 characters long."
							}
						</div>
						<label>Name</label>
						<input
							className={this.props.nameError.status}
							name="name"
							type="text"
							placeholder="Jake"
							onChange={this.props.action}
						/>
					</div>
					<div className="col">
						<label>Email</label>
						<input
							className={this.props.emailError.status}
							name="email"
							type="text"
							placeholder="place@holder.com"
							onChange={this.props.action} />
					</div>
					<div className="col">
						<label>Password</label>
						<input
							className={this.props.passwordError.status}
							name="password"
							type="password"
							placeholder="Jakeiscool1"
							onChange={this.props.action} />
					</div>
					<div className="col">
						<button onClick={this.props.registerUser}>Sign Up</button>
						<span>or <button className="hyperlink" onClick={this.props.changeMode}>Log In</button></span>
					</div>
				</form>
			</div>
		)
	}
}

export default Register
