import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../loading';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { 
	setPageTitle
} from '../../redux/actions';
import { TownSoldiers } from './index';

/*
	For an exhaustive breakdown of what's going on here, check out the SingleCompany component.
	It's commented like crazy and there's nothing going on here that isn't going on there.
*/

class Town extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allCompanies: [],
			allCompaniesByTown: [],
			allSoldiers: [],
		}
	}

	componentDidMount() {
		this.props.setPageTitle('Town Details');
		const companiesUrl = 'http://localhost:3001/v1/companies';
		const companiesByTownUrl = `http://localhost:3001/v1/companies/bytown/${this.props.location.state.townId}`;
		const soldiersUrl = `http://localhost:3001/v1/soldiers/bytown/${this.props.location.state.townId}`;
		const self = this;

		axios.get(companiesUrl, {})
		.then(function (response) {
			self.setState({allCompanies: response.data.results});
		})
		.catch(function (error) {
			console.log(error);
		});

		axios.get(companiesByTownUrl, {})
		.then(function (response) {
			self.setState({allCompaniesByTown: response.data});
		})
		.catch(function (error) {
			console.log(error);
		});

		axios.get(soldiersUrl, {})
		.then(function (response) {
			self.setState({allSoldiers: response.data});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render() {
		if(!this.state.allCompanies.length) {
			return <Loading />
		}

		let SoldiersTable;
		if (this.state.allSoldiers.length) {
			SoldiersTable = <TownSoldiers companyData={this.state.allCompaniesByTown} soldierData={this.state.allSoldiers} townData={this.props.location.state.town} />
		}

		return(
			<div>
				<div>
					<h3>List of Companies for the town of {this.props.location.state.town}</h3>
					<div>
						<TableContainer component={Paper}>
							<Table aria-label="company table">
								<TableHead>
									<TableRow>
										<TableCell>Town</TableCell>
										<TableCell>Name</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										this.state.allCompaniesByTown.map((company, index) => {
											return(
												<TableRow key={index}>
													<TableCell component="th" scope="row">
														<p>{this.props.location.state.town}</p>
													</TableCell>
													<TableCell component="th" scope="row">
														<p>
															<Link
																to={{
																	pathname: '/company',
																	state: {
																		companyData: company,
																	}
																}}
															>
																{company.companyname}
															</Link>
														</p>
													</TableCell>
												</TableRow>
											)
										})
									}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>
				{SoldiersTable}
			</div>
		)
	}
}

export default connect(null, {setPageTitle})(Town);