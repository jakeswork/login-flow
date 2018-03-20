import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="nav">
				<div className="log-out">
					<Link to="/" className="hyperlink">Log Out</Link>
				</div>
				<div className="user">
					<button className="hyperlink" onClick={this.props.handleClick}>My Account</button>
				</div>
			</div>
		)
	}
}

export default NavBar
