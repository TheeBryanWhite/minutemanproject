/** @jsxRuntime classic */
/** @jsx jsx */
import { Component } from 'react';
import { css, jsx } from '@emotion/react';
import { Link } from "react-router-dom";
import debounce from 'lodash.debounce';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"buttonDisable": true,
			"email": '',
			"emailValid": null,
			"formSubmitted": false,
			"password": '',
			"passwordConfirm": '',
			"passwordValid": null,
			"passwordsMatch": null,
			"username": '',
			"usernameValid": null
		}

		this.buttonDisable = this.buttonDisable.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.debounceThis = debounce(this.debounceThis.bind(this), 500);
		this.submitHandler = this.submitHandler.bind(this);
		this.validateThis = this.validateThis.bind(this);
	}

	buttonDisable = () => {
		if (this.state.email !== '' && this.state.password !== '' && this.state.passwordConfirm !== '' && this.state.username !== '') {
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
		this.validateThis();
		this.buttonDisable();
	}

	submitHandler(event) {
		event.preventDefault();
		this.setState({formSubmitted: true});
		if (this.state.emailValid && this.state.passwordValid && this.state.usernameValid) {
			const self = this;
			const regUserUrl = 'http://localhost:3001/v1/auth/register';
			axios.post(regUserUrl, {
				email: self.state.email,
				name: self.state.username,
				password: self.state.password
			})
			.then(function () {
				self.props.history.push({
					pathname: '/send-verification',
					state: {
						email: self.state.email,
						userRegistered: true
					}
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}

	validateThis() {
		const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
		const passwordPattern = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
		const usernamePattern = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g;

		// Make sure password meets the criteria (>= 8 chars, >= 1 number, >= 1 special character)
		if (this.state.password.match(passwordPattern)) {
			this.setState({passwordValid: true});
		} else {
			this.setState({passwordValid: false});
		}

		// Make sure passwords match
		if (this.state.password === this.state.passwordConfirm) {
			this.setState({passwordsMatch: true});
		} else {
			this.setState({passwordsMatch: false});
		}

		// Make sure email is valid 
		if (this.state.email.match(emailPattern)) {
			this.setState({emailValid: true});
		} else {
			this.setState({emailValid: false});
		}
		// Make sure username is valid
		if (this.state.username.match(usernamePattern)) {
			this.setState({usernameValid: true});
		} else {
			this.setState({usernameValid: false});
		}
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
									id="username"
									label="Username"
									onChange={this.changeHandler}
									required
									value={this.state.username.value}
									variant="outlined"
								/>
								{(this.state.formSubmitted && !this.state.usernameValid ? <p>Username is invalid. Name may include letters, numbers, and underscore</p> : '')}
							</Grid>
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
								{(this.state.formSubmitted && !this.state.emailValid ? <p>Please provide a valid email address.</p> : '')}
							</Grid>
							<Grid 
								item 
								xs={12} 
							>
								<TextField
									css={css`
										width: 100%;
									`}
									id="password"
									label="Password"
									onChange={this.changeHandler}
									required
									type="password"
									value={this.state.password.value}
									variant="outlined"
								/>
								{(this.state.formSubmitted && !this.state.passwordValid ? <p>Valid passwords must be greater than 8 characters, include at least one number and one special character.</p> : '')}
							</Grid>
							<Grid 
								item 
								xs={12} 
							>
								<TextField
									css={css`
										width: 100%;
									`}
									id="passwordConfirm"
									label="Password Confirm"
									onChange={this.changeHandler}
									required
									type="password"
									value={this.state.passwordConfirm.value}
									variant="outlined"
								/>
								{(this.state.formSubmitted && !this.state.passwordsMatch ? <p>Passwords do not match.</p> : '')}
							</Grid>
							<Grid 
								item 
								xs={12} 
							>
								<Button 
									disabled={this.state.buttonDisable}
									onClick={this.submitHandler}
									type="submit"
									variant="contained"
								>
									Register
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

export default Register;