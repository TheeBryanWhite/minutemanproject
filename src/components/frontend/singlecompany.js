/** @jsxRuntime classic */
/** @jsx jsx */
import {Component} from 'react';
import { 
	css,
	jsx
  } from '@emotion/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../loading';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AllSoldiers } from './index';

/*
	There's a few things happening in this component that differ from the comment festival that is AllCompanies.
	Make sure to look this component over after you look at that one.
*/

class Company extends Component {
	constructor(props) {
		super(props);

		/* 
			When state is expecting an array, you want to initialize with an empty array so we can check to see if there's
			anything in it further down the page when we actually render our data.
		*/
		this.state = {
			allSoldiers: [],
			allTexts: [],
			allTowns: []
		}
	}

	componentDidMount() {
		/*
			This Soldiers endpoint is a little different from the others. It queries the soldiers collection in Mongo
			BY COMPANY ID. We want to get all the soldiers in the collection that are in this company, so we append the
			current company's ID to the /soldiers/bycompany/:companyId endpoint.

			If you ever want to see all the endpoints and the parameters they're expcting you can look up the API docs
			for this app here: http://localhost:3001/v1/docs/#/ when you have the restapi app running locally. Th
			Those docs, by the way, are generated with YAML by way of a really nifty JS lib called Swagger. It all lives
			up in the restapi folder.
		*/
		const soldiersUrl = `http://localhost:3001/v1/soldiers/bycompany/${this.props.location.state.companyData.id}`;
		const textsUrl = 'http://localhost:3001/v1/text';
		const townsUrl = 'http://localhost:3001/v1/towns';
		const self = this;
		
		axios.get(soldiersUrl, {})
		.then(function (response) {
			self.setState({allSoldiers: response.data});
		})
		.catch(function (error) {
			console.log(error);
		});

		axios.get(textsUrl, {})
		.then(function (response) {
			self.setState({allTexts: response.data.results});
		})
		.catch(function (error) {
			console.log(error);
		});

		axios.get(townsUrl, {})
		.then(function (response) {
			self.setState({allTowns: response.data.results});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render() {
		if (!this.props.location.state.companyData) {
			return <Loading />
		}

		/*
			To be clear, I'm not sure if I really need to do it this way, but we're waiting on a couple of state properties
			to be set. Above, we're waiting for the company data to be available, which it should be right off the bat since
			we queried it and set it in the previous component and passed it into this one through the Link component's state
			object.

			Below, however, we need all of the relevant soldier data to return. So we need to wait until it's in state before
			we render the table. I abstract the individual soldier rows out to their own component just for convenience's sake.
			It's easier to write it the way I did here than to cram all of the component markup into the SoldierComponent var.

			See line 197 to see how this pseudo variable is used in the markup.
		*/
		let SoldierComponent;
		if (!this.state.allSoldiers) {
			SoldierComponent = <TableRow><TableCell component="th" scope="row" colSpan={2}><Loading /></TableCell></TableRow>
		}
		if (this.state.allSoldiers) {
			SoldierComponent = <AllSoldiers soldierData={this.state.allSoldiers} townData={this.props.location.state.companyData.town} />
		}
	
		return(
			<div>
				<h2>Company Details</h2>
				<div>
					<TableContainer component={Paper}>
						<Table aria-label="company table">
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Town</TableCell>
									<TableCell>Entered the Contest</TableCell>
									<TableCell>Entered the Contest Notes</TableCell>
									<TableCell css={css`width: 50%;`}>Other Notes</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell component="th" scope="row">{this.props.location.state.companyData.companyname}</TableCell>
									<TableCell component="th" scope="row">
										{
											this.state.allTowns.map((town, index) => {
												if (this.props.location.state.companyData.town === town.id) {
													return (
														<Link
															key={index}
															to={{
																pathname: '/town',
																state: {
																	town: town.town,
																	townId: town.id
																}
															}}
														>
															{town.town}
														</Link>
													)
												} else {
													return false;
												}
											})
										}
									</TableCell>
									<TableCell component="th" scope="row">
										{
											this.state.allTowns.map((town, index) => {
												if (this.props.location.state.companyData.entered === town.id) {
													return (
														<Link
															key={index}
															to={{
																pathname: '/town',
																state: {
																	town: town.town,
																	townId: town.id
																}
															}}
														>
															{town.town}
														</Link>
													)
												} else {
													return false;
												}
											})
										}
									</TableCell>
									<TableCell component="th" scope="row">{this.props.location.state.companyData.enterednote}</TableCell>
									<TableCell component="th" scope="row">
										{
											this.state.allTexts.map((text, index) => {
												if (this.props.location.state.companyData.textid1 === text.id) {
													return (
														<p key={index}>{text.text}</p>
													)
												} 
	
												if (this.props.location.state.companyData.textid2 === text.id) {
													return (
														<p key={index}>{text.text}</p>
													)
												} else {
													return false;
												}
											})
										}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</div>
				<div 
					className="company-soldiers"
					css={css`
						margin-top: 1rem;
					`}
				>
					<h2>All Solders In This Company</h2>
					<div>
						<TableContainer component={Paper}>
							<Table aria-label="soldiers table">
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell>Rank</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{SoldierComponent}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>
			</div>
		)
	}
}

export default Company;