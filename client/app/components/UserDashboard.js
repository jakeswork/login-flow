import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import NotFound from './NotFound'

class UserDashboard extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.updateDetails = this.updateDetails.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.deleteAccount = this.deleteAccount.bind(this)
		this.state = {
			mode: 'overview',
			user: ''
		}
	}

	handleClick(e) {
		e.preventDefault()
		this.setState({
			mode: 'edit'
		})
	}

	updateDetails(e) {
		e.preventDefault()
	}

	handleSubmit(e) {
		e.preventDefault()
		return false
	}

	handleInput(e) {
		const target = e.target,
		value = target.value,
		name = target.name

		this.setState({
			[name]: value
		})
	}

	deleteAccount(e) {
		e.preventDefault()
		console.log(this.state)
	}

	componentDidMount() {
		this.props.location.referrer && this.setState({
			user: this.props.location.referrer.data
		})
	}

	render() {
		const data = this.state.user
		return (
			<div>
				{data
					? <div className="full-page">
							<NavBar user={data} handleClick={this.handleClick} />
							{this.state.mode === 'overview'
								? <h1>Welcome, {data.name}!</h1>
								: <div className="login-modal">
										<h2>Edit details</h2>
										<p>Edit your details below</p>
										<form onSubmit={this.handleSubmit}>
											<div className="col">
												<label>Name</label>
												<input
													name="name"
													type="text"
													placeholder={data.name || 'Jake'}
													onChange={this.handleInput} />
											</div>
											<div className="col">
												<label>Email</label>
												<input
													name="email"
													type="text"
													placeholder={data.email || 'place@holder.com'}
													onChange={this.handleInput} />
											</div>
											<div className="col">
												<label>Current Password</label>
												<input
													name="current-password"
													type="password"
													placeholder="Jakeiscool1"
													onChange={this.handleInput} />
											</div>
											<div className="col">
												<label>New Password</label>
												<input
													name="new-password"
													type="password"
													placeholder="Jakeiscool1"
													onChange={this.handleInput} />
											</div>
											<div className="col">
												<label>Confirm Password</label>
												<input
													name="confirm-password"
													type="password"
													placeholder="Jakeiscool1"
													onChange={this.handleInput} />
											</div>
											<div className="col">
												<button onClick={this.updateDetails}>Update</button>
												<button className="delete" onClick={this.deleteAccount}>Delete Account</button>
											</div>
										</form>
									</div>
							}
						</div>
					:	<NotFound />
				}
			</div>
		)
	}
}

export default UserDashboard
