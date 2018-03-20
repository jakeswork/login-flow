import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UserDashboard extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="container">
				{this.props.location.referrer
					? <h1>Welcome, {this.props.location.referrer.data.name}!</h1>
					:	<p>You are not logged in. <Link to="/">Click here</Link> to log in.</p>
				}
			</div>
		)
	}
}

export default UserDashboard
