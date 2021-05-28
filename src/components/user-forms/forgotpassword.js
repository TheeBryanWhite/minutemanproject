/** @jsxRuntime classic */
/** @jsx jsx */
import { Component } from 'react';
import { css, jsx } from '@emotion/react';
import { Link } from "react-router-dom";
import axios from 'axios';
import debounce from 'lodash.debounce';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { UnknownEmail } from './index';

class ForgotPassword extends Component {

	constructor(props) {
		super(props);

		this.state = {
			'buttonDisable': true,
			'email': '',
			"formSubmitted": false,
			"reminderError": false
		}

		this.buttonDisable = this.buttonDisable.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.debounceThis = debounce(this.debounceThis.bind(this), 500);
		this.submitHandler = this.submitHandler.bind(this);
	}

	buttonDisable = () => {
		if (this.state.email !== '' && this.state.password !== '') {
			this.setState({buttonDisable: false});
		} else {
			this.setState({buttonDisable: true});
		}
		return false;
	}

	changeHandler(event) {
		const current = event.target
		this.debounceThis(current);
	}

	debounceThis(input) {
		this.setState({[input.id]: input.value});
		this.buttonDisable();
	}

	submitHandler(event) {
		event.preventDefault();
		this.setState({formSubmitted: true});
		const self = this;
		const loginUrl = 'http://localhost:3001/v1/auth/forgot-password';
		axios.post(loginUrl, {
			email: this.state.email
		})
		.then(function () {
			self.setState({loginError: false});
			self.props.history.push({
				pathname: '/password-sent',
			});
		})
		.catch(function () {
			self.setState({reminderError: true});
		});
	}

	render() {
		return (
			<Container>
				<Card 
					css={css`
						padding: 3rem;
					`}
					variant="outlined"
				>
					<UnknownEmail error={this.state.reminderError} />
					<form 
						autoComplete="off"
						noValidate
						onSubmit={this.submitHandler}
					>
						<Grid
							container 
							spacing={3}
						>
							<Grid 
								item 
								xs={12} 
							>
								<TextField
									css={css`
										width: 100%;
									`}
									id="email"
									label="Email"
									onChange={this.changeHandler}
									required
									value={this.state.email.value}
									variant="outlined"
								/>
							</Grid>
							<Grid 
								item 
								xs={12} 
							>
								<Button 
									css={css`
										height: 100%;
									`}
									disabled={this.state.buttonDisable}
									type="submit"
									variant="contained"
								>
									Remind me
								</Button>
							</Grid>
						</Grid>
					</form>
					<p><Link to="/adm-lgin">&#8592; Back</Link></p>
				</Card>
			</Container>
		)
	}
}

export default ForgotPassword;