import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NavBar from './NavBar'
import Loading from './Loading'
import NotFound from './NotFound'

class UserDashboard extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.updateDetails = this.updateDetails.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.deleteAccount = this.deleteAccount.bind(this)
		this.confirmPassword = this.confirmPassword.bind(this)
		this.state = {
			mode: 'overview',
			user: '',
			deleteFlow: 'unconfirmed',
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

	handleClick(e) {
		e.preventDefault()
		this.setState({
			mode: 'edit'
		})
	}

	updateDetails(e) {
		e.preventDefault()
		const id = this.state.user._id
		if(this.state.email || this.state.name) {
			this.setState({loading: true})
			fetch(`/api/users/update/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(this.state)
			})
				.then((res) => {
					if(res.ok) {
						this.setState({userUpdated: true, loading: false, emailError: {}, passwordError: {}})
					} else {
						this.setState({emailError: {status: 'error', text: 'invalid-email'}, loading: false})
					}
				})
				.catch(err => console.log(err))
		}
		if(this.state.confirmPassword && this.state.confirmPassword.length) {
			fetch(`/api/users/update/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(this.state)
			})
				.then((res) => {
					if(res.ok) {
						this.setState({userUpdated: true, loading: false, emailError: {}, passwordError: {}})
					} else {
						this.setState({passwordError: {status: 'error', text: 'too-short'}, loading: false})
					}
				})
				.catch(err => console.log(err))
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

	confirmPassword(e) {
		const target = e.target,
		value = target.value,
		name = target.name

		this.setState({
			confirmPassword: true
		})

		if(this.state.currentPassword === this.state.user.password) {
			if(this.state.newPassword === value) {
				this.setState({confirmPassword: value})
			} else {
				this.setState({
					passwordError: {
						status: 'no-match',
						text: 'Passwords do not match'
					}
				})
			}
		} else {
			this.setState({
				passwordError: {
					status: 'incorrect',
					text: 'Password is incorrect'
				}
			})
		}
	}

	deleteAccount(e) {
		e && e.preventDefault()
		const id = this.state.user._id
		this.state.deleteFlow === 'unconfirmed'
			&& this.setState({
				deleteFlow: 'confirm'
			})
		if(this.state.deleteFlow === 'confirmed') {
			fetch(`/api/users/remove/${id}`, {
				method: 'DELETE'
			})
				.then((res) => {
					if(res.ok) {
						this.setState({deleteFlow: 'complete', loading: false, user: {}})
					}
				})
				.catch(err => console.log(err))
		}
	}

	componentDidUpdate() {
		this.state.deleteFlow === 'confirmed'
			&& this.deleteAccount()
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
				{this.state.loading && <Loading />}
				<div>
					{
						this.state.deleteFlow === 'confirm'
							&&
							<div className="overlay">
								<div className="modal">
									<h2>Confirm</h2>
									<p>Are you sure you would like to delete your account?</p>
									<p>This action is irreversible.</p>
									<button className="delete confirm" onClick={(e) => {
											e.preventDefault()
											this.setState({deleteFlow: 'confirmed', loading: true})
										}}>I understand, delete my account</button>
									<button onClick={(e) => {
											e.preventDefault()
											this.setState({deleteFlow: 'unconfirmed'})
										}}>Cancel</button>
								</div>
							</div>
					}
					{
						this.state.deleteFlow === 'complete'
							&&
							<div className="overlay">
								<div className="modal">
									<h2>Success</h2>
									<p>Your account has been successfuly deleted.</p>
									<Link to="/" className="hyperlink">Close</Link>
								</div>
							</div>
					}
					{
						this.state.userUpdated
							&&
							<div className="overlay">
								<div className="modal">
									<h2>Success</h2>
									<p>Your account has been successfuly updated.</p>
									<button className="hyperlink" onClick={(e) => {
											e.preventDefault()
											this.setState({userUpdated: false})
										}}>Close</button>
								</div>
							</div>
					}
				</div>
				<div>
					{data
						? <div className="full-page">
								<NavBar user={data} handleClick={this.handleClick} />
								{this.state.mode === 'overview'
									? <h1>Welcome, {data.name}!</h1>
									: <div className="modal">
											<h2>Edit details</h2>
											<p>Edit your details below</p>
											<form onSubmit={(e) => {e.preventDefault()}}>
												<div className="col">
													<div className="error-info">
														{
															this.state.emailError.status === 'error'
																&& <p>Please enter your full e-mail address.</p>
														}
														{
															this.state.passwordError.text === 'incorrect-length' || this.state.passwordError.text === 'no-length'
																&& <p>Your password needs to be at least 7 characters long.</p>
														}
														{
															this.state.passwordError.status === 'no-match'
															 && <p>Your passwords do not match.</p>
														}
														{
															this.state.passwordError.status === 'incorrect'
															 && <p>Your password is incorrect.</p>
														}
													</div>
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
														name="currentPassword"
														type="password"
														placeholder="Jakeiscool1"
														onChange={this.handleInput} />
												</div>
												<div className="col">
													<label>New Password</label>
													<input
														name="newPassword"
														type="password"
														placeholder="Jakeiscool1"
														onChange={this.handleInput} />
												</div>
												<div className="col">
													<label>Confirm Password</label>
													<input
														name="confirmPassword"
														type="password"
														placeholder="Jakeiscool1"
														onChange={this.confirmPassword} />
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
			</div>
		)
	}
}

export default UserDashboard
