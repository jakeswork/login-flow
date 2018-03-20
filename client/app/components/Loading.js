import React, { Component } from 'react'

class Loading extends Component {
	render() {
		return (
			<div className="loading-overlay">
				<div className="spinner"></div>
			</div>
		)
	}
}

export default Loading
