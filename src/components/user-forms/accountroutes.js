import React from 'react';
import { Link } from "react-router-dom";

const AccountRoutes = () => {
	return(
		<div className="account-options">
			<ul>
				<li><Link to="/register">Register</Link></li>
				<li><Link to="/forgot-password">Forgot your password?</Link></li>
			</ul>
		</div>
	)
}

export default AccountRoutes;