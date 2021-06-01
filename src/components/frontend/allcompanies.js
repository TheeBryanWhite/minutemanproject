import { Component } from 'react';
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

class AllCompanies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allCompanies: [],
			allText: [],
			allTowns: []
		}
	}
	componentDidMount() {
		const companiesUrl = 'http://localhost:3001/v1/companies';
		const textUrl = 'http://localhost:3001/v1/text';
		const townsUrl = 'http://localhost:3001/v1/towns';
		const self = this;
		
		// Get all the companies, put them in the component state
		axios.get(companiesUrl, {})
		.then(function (response) {
			console.log(response);
			self.setState({allCompanies: response.data.results});
		})
		.catch(function (error) {
			console.log(error);
		});

		// Get all the text notes, put them in the component state, too
		axios.get(textUrl, {})
		.then(function (response) {
			console.log(response);
			self.setState({allText: response.data.results});
		})
		.catch(function (error) {
			console.log(error);
		});

		// Get all the text notes, put them in the component state, too
		axios.get(townsUrl, {})
		.then(function (response) {
			console.log(response);
			self.setState({allTowns: response.data.results});
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
									<TableCell>Entered the Contest</TableCell>
									<TableCell>Entered the Contest Notes</TableCell>
									<TableCell>Other Notes</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
								this.state.allCompanies.map((company, index) => (
									<TableRow key={index}>
										<TableCell component="th" scope="row">
											<Link to="/">
												{company.companyname}
											</Link>
										</TableCell>
										<TableCell component="th" scope="row">
											<Link to="/">
												{
													this.state.allTowns.map((town, index) => {
														if (company.town === town.id) {
															return(
																<p key={index}>{town.town}</p>
															)
														}
													})
												}
											</Link>
										</TableCell>
										<TableCell component="th" scope="row">
												{
													this.state.allTowns.map((town, index) => {
														if (company.entered === town.id) {
															return(
																<p key={index}>{town.town}</p>
															)
														}
													})
												}
										</TableCell>
										<TableCell component="th" scope="row">{company.enterednote}</TableCell>
										<TableCell component="th" scope="row">
											{
												this.state.allText.map((text, index) => {
													if (company.textid1 === text.id) {
														return(
															<p key={index}>{text.text}</p>
														)
													}
													if (company.textid2 === text.id) {
														return(
															<p key={index}>{text.text}</p>
														)
													}
												})
											}
										</TableCell>
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