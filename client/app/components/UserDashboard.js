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
		this.handleSubmit = this.handleSubmit.bind(this)
		this.deleteAccount = this.deleteAccount.bind(this)
		this.state = {
			mode: 'overview',
			user: '',
			deleteFlow: 'unconfirmed'
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
			</div>
		)
	}
}

export default UserDashboard
