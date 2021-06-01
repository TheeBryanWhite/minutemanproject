/** @jsxRuntime classic */
/** @jsx jsx */
import { Component } from 'react';
import { css, jsx } from '@emotion/react';
import { connect } from 'react-redux'
import axios from 'axios';
import debounce from 'lodash.debounce';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { 
	setAccessToken,
	setEmailVerified,
	setRefreshToken,
	setUsername
 } from '../../redux/actions';
import { 
	AccountRoutes,
	IncorrectLogin
} from './index';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			'buttonDisable': true,
			'email': '',
			"formSubmitted": false,
			'loginError': false,
			'password': ''
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

	componentDidMount() {
		if (this.props.accessToken) {
			this.props.history.push({
				pathname: '/mmp-admin'
			});
		}
	}

	debounceThis(input) {
		this.setState({[input.id]: input.value});
		this.buttonDisable();
	}

	submitHandler(event) {
		event.preventDefault();
		this.setState({formSubmitted: true});
		const self = this;
		const loginUrl = 'http://localhost:3001/v1/auth/login';
		axios.post(loginUrl, {
			email: this.state.email,
			password: this.state.password
		})
		.then(function (response) {
			console.log(response);
			self.setState({loginError: false});
			self.props.setAccessToken(response.data.tokens.access);
			self.props.setEmailVerified(response.data.user.isEmailVerified);
			self.props.setRefreshToken(response.data.tokens.refresh);
			self.props.setUsername(response.data.user.name);
			self.props.history.push({
				pathname: '/mmp-admin'
			});
		})
		.catch(function () {
			self.setState({loginError: true});
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
					<IncorrectLogin error={this.state.loginError} />
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
									Log In
								</Button>
							</Grid>
						</Grid>
					</form>
					<AccountRoutes />
				</Card>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	accessToken: state.tokenreducer.accessToken,
	isEmailVerified: state.userreducer.isEmailVerified
});
	
export default connect(
	mapStateToProps, 
	{
		setAccessToken, 
		setEmailVerified,
		setRefreshToken, 
		setUsername
	}
)(Login);