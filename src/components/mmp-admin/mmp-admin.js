/** @jsxRuntime classic */
/** @jsx jsx */
import React,{ Component } from 'react';
import { css, jsx } from '@emotion/react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";

import { 
	AllCompanies,
	AllSoldiers,
	AllText,
	AllUsers
} from './index';
import Burger from '../burger';

/*
	Go through all the components in frontend first and then come back to this, if you haven't seen them already.
	This is the wrapper component for the admin module. The client will use these components to manage minuteman data.
*/

class TacConAdmin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			anchorEl: null
		}

		this.logoutController = this.logoutController.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.setAnchorEl = this.setAnchorEl.bind(this);
	}

	componentDidMount() {
		if (!this.props.accessToken) {
			this.props.history.push({
				pathname: '/adm-lgin'
			});
		}

		if (!this.props.isEmailVerified) {
			this.props.history.push({
				pathname: '/adm-lgin'
			});
		}
	}

	logoutController() {
		const logoutUrl = 'http://localhost:3001/v1/auth/logout';
		const self = this;
		axios.post(logoutUrl, {
			'refreshToken': self.props.refreshToken
		})
		.then(function () {
			self.props.history.push({
				pathname: '/'
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	handleClick(event) {
		this.setAnchorEl({anchorEl: event.currentTarget});
	};

	handleClose() {
		this.setAnchorEl({anchorEl: null});
	};

	setAnchorEl(event) {
		this.setState(event);
	}

	render() {
		return(
			<Card
				css={css`
					padding: 3rem;
				`}
			>
				<Router>
					<Grid
						container 
						spacing={3}
					>
						<Grid 
							item
							xs={12}
							md={10}
						>
							<h1
								css={css`
									font-size: 1.5rem;
								`}
							>
								Welcome, {this.props.username}! You are logged in.
							</h1>
						</Grid>
						<Grid 
							css={css`
								@media (min-width: 768px) {
									text-align: right;
								}
							`}
							item
							xs={12}
							md={2}
						>
							<div
								css={css`
									align-items: center;
									display: flex;
									height: 100%;
									justify-content: flex-end;
								`}
							>
								<Button 
									aria-controls="simple-menu" 
									aria-haspopup="true" 
									onClick={this.handleClick}
								>
									<Burger
										css={css`
											height: 35px;
											width: 35px;
										`}
									/>
								</Button>
								<Menu
									anchorEl={this.state.anchorEl}
									id="taccon-admin-menu"
									keepMounted
									onClose={this.handleClose}
									open={Boolean(this.state.anchorEl)}
								>
									<MenuItem>
										<Link
											onClick={this.handleClose}
											to="/mmp-admin/all-companies"
										>
											All Companies
										</Link>
									</MenuItem>
									<MenuItem>
										<Link
											onClick={this.handleClose}
											to="/mmp-admin/all-soldiers"
										>
											All Soldiers
										</Link>
									</MenuItem>
									<MenuItem>
										<Link
											onClick={this.handleClose}
											to="/mmp-admin/all-text"
										>
											All Texts
										</Link>
									</MenuItem>
									<MenuItem>
										<Link
											onClick={this.handleClose}
											to="/mmp-admin/all-users"
										>
											All Users
										</Link>
									</MenuItem>
									<MenuItem 
										onClick={this.logoutController}
									>
										Logout
									</MenuItem>
								</Menu>
							</div>
						</Grid>
					</Grid>
					<Switch>
						<Route path="/mmp-admin/all-users" component={AllUsers} />
						<Route path="/mmp-admin/all-companies" component={AllCompanies} />
						<Route path="/mmp-admin/all-soldiers" component={AllSoldiers} />
						<Route path="/mmp-admin/all-text" component={AllText} />
					</Switch>
				</Router>
			</Card>
		)
	}
}

const mapStateToProps = state => ({
	accessToken: state.tokenreducer.accessToken,
	isEmailVerified: state.userreducer.isEmailVerified,
	refreshToken: state.tokenreducer.refreshToken,
	username: state.userreducer.username,
})

export default connect(mapStateToProps, null)(TacConAdmin)