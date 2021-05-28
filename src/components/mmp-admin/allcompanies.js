import { Component } from 'react';
import axios from 'axios';
import Loading from '../loading';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class AllCompanies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allCompanies: []
		}
	}
	componentDidMount() {
		const usersUrl = 'http://localhost:3001/v1/companies';
		const self = this;
		axios.get(usersUrl, {})
		.then(function (response) {
			self.setState({allCompanies: response.data.results});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render() {
		if(!this.state.allCompanies.length) {
			return <Loading />
		}

		return(
			<div>
				<h2>All Companies</h2>
				<div>
					<TableContainer component={Paper}>
						<Table aria-label="all users table">
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Town</TableCell>
									<TableCell>Note</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
								this.state.allCompanies.map((company, index) => (
									<TableRow key={index}>
										<TableCell component="th" scope="row">{company.companyname}</TableCell>
										<TableCell component="th" scope="row">{company.town}</TableCell>
										<TableCell component="th" scope="row">{company.enterednote}</TableCell>
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

export default AllCompanies;