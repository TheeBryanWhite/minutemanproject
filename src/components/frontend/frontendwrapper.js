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
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";
import { 
	AllCompanies,
	AllSoldiers,
	AllText
} from './index';
import Burger from '../burger';

class FrontEndWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			anchorEl: null
		}

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
			<Container>
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
						<Switch>
							<Route path="/mmp-admin/all-soldiers" component={AllSoldiers} />
							<Route path="/all-companies" component={AllCompanies} />
							<Route path="/mmp-admin/all-text" component={AllText} />
						</Switch>
					</Router>
				</Card>
			</Container>
		)
	}
}

export default FrontEndWrapper;