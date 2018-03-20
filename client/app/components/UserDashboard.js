import React, { Component } from 'react'

class UserDashboard extends Component {
	render() {
		return (
			<div className="container">
				{console.log(this.props)}
				<h1>Welcome, {this.props.user.name}!</h1>
			</div>
		)
	}
}

export default UserDashboard
