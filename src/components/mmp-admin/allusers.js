import { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Loading from '../loading';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class AllUsers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allUsers: []
		}
	}
	componentDidMount() {
		const usersUrl = 'http://localhost:3001/v1/users';
		const self = this;
		axios.get(usersUrl, 
			{ 
				headers: {
					"Authorization" : `Bearer ${this.props.accessToken.token}`
				} 
			}
		)
		.then(function (response) {
			self.setState({allUsers: response.data.results});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render() {
		if(!this.state.allUsers.length) {
			return <Loading />
		}

		return(
			<div>
				<h2>All Users</h2>
				<div>
					<TableContainer component={Paper}>
						<Table aria-label="all users table">
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Role</TableCell>
									<TableCell>Verified</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
								this.state.allUsers.map((user, index) => (
									<TableRow key={index}>
										<TableCell component="th" scope="row">{user.id}</TableCell>
										<TableCell component="th" scope="row">{user.name}</TableCell>
										<TableCell component="th" scope="row">{user.email}</TableCell>
										<TableCell component="th" scope="row">{user.role}</TableCell>
										<TableCell component="th" scope="row">{(user.isEmailVerified ? 'Yes' : 'No')}</TableCell>
									</TableRow>
								))
								}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	accessToken: state.tokenreducer.accessToken
})

export default connect(mapStateToProps, null)(AllUsers)