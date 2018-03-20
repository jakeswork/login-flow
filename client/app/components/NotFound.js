import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
	<div className="full-page">
		<div>
			<h1>Oops!</h1>
			<p>This page isn't for you!</p>
			<p><Link to="/">Click here</Link> to go home.</p>
		</div>
	</div>
);

export default NotFound;
