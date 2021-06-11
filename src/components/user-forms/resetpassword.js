/** @jsxRuntime classic */
/** @jsx jsx */
import React,{ Component } from 'react';
import { css, jsx } from '@emotion/react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ResetPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			"buttonDisable": true,
			"formSubmitted": false,
			"password": '',
			"passwordConfirm": '',
			"passwordValid": null,
			"passwordsMatch": null
		}

		this.buttonDisable = this.buttonDisable.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.debounceThis = debounce(this.debounceThis.bind(this), 500);
		this.submitHandler = this.submitHandler.bind(this);
		this.validateThis = this.validateThis.bind(this);
	}

	buttonDisable = () => {
		if (this.state.password !== '' && this.state.passwordConfirm !== '') {
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
		
		if (this.state.passwordValid) {
			const self = this;
			const resetUrl = `http://localhost:3001/v1/auth/reset-password${this.props.location.search}`;
			axios.post(resetUrl, {
				password: self.state.password
			})
			.then(function () {
				self.props.history.push({
					pathname: '/',
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}

	validateThis() {
		const passwordPattern = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;

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
									css={css`
										height: 100%;
									`}
									disabled={this.state.buttonDisable}
									onClick={this.submitHandler}
									type="submit"
									variant="contained"
								>
									Reset
								</Button>
							</Grid>
						</Grid>
					</form>
					<p><Link to="/">&#8592; Back</Link></p>
				</Card>
			</Container>
		)
	}
}

export default ResetPassword;