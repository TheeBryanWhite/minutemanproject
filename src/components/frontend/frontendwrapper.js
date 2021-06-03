/** @jsxRuntime classic */
/** @jsx jsx */
import { Component } from 'react';
import { css, jsx } from '@emotion/react';
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
	AllTowns,
	SingleCompany,
	SingleSoldier,
	SingleTown
} from './index';
import Burger from '../burger';

/* 
This is the wrapper component for the entire user-facing part of the site. This is what 
your average visitor is going to see.

There's two kinds of components in React: Class components and functional components
and I'd be lying if I said I knew exactly why you'd use one over the other. I *THINK* It has something 
to do with components that require a state object. You can have state in a functional component 
but in order to set state you need to use a series of hooks. It's not a major pain, I just find it
easier to user class components when I need state.

For an example of what I mean, check the burger or the loading component. They're components but they're
very simple and have no state.
*/ 
class FrontEndWrapper extends Component {
	constructor(props) {
		super(props);

		// When you're using component state instead of Redux, you always initialize the state object in the constructor
		this.state = {
			anchorEl: null
		}

		// And then you have to bind all of your custom functions to 'this' in the constructor or they won't run when you call them
		// You don't have to do this in a functional component.
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.setAnchorEl = this.setAnchorEl.bind(this);
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
				{/* 
					A nested router? Oh yeah. You better believe it. This router lives inside the router in App.js 
					It's a closed environment, though. The parent Router object is not available here. The local
					router object takes over. Scroll down and you'll see another Switch component.
				*/}
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
								Search The Rosters of the Battle of April 19th, 1775
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
											to="/"
										>
											Search
										</Link>
									</MenuItem>
									<MenuItem>
										<Link
											onClick={this.handleClose}
											to="/all-companies"
										>
											All Companies
										</Link>
									</MenuItem>
									<MenuItem>
										<Link
											onClick={this.handleClose}
											to="/all-towns"
										>
											All Towns
										</Link>
									</MenuItem>
								</Menu>
							</div>
						</Grid>
					</Grid>
					{/*
						This one is just like the switch in App.js but because this is a child of App.js, the App component
						stays mounted AROUND FrontEndWrapper. The components in the list below are children of this
						component, so FrontEndWrapper stays mounted while the listed components switch in and out of it, depending
						on the path.
					*/}
					<Switch>
						<Route path="/all-companies" component={AllCompanies} />
						<Route path="/all-towns" component={AllTowns} />
						<Route path="/company" component={SingleCompany} />
						<Route path="/soldier" component={SingleSoldier} />
						<Route path="/town" component={SingleTown} />
					</Switch>
				</Router>
			</Card>
		)
	}
}

export default FrontEndWrapper;