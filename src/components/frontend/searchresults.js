import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const SearchResults = (props) => {
	console.log(props);
	return(
		<div>
			<TableContainer component={Paper}>
				<Table aria-label="soldiers table">
					<TableHead>
						<TableRow>
							<TableCell>First Name</TableCell>
							<TableCell>MI</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Company</TableCell>
							<TableCell>Town</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							props.resultsData.map((soldier) => (
								<TableRow>
									<TableCell component="th" scope="row">
										<p>{soldier.firstname}</p>
									</TableCell>
									<TableCell component="th" scope="row">
										<p>{soldier.middlename}</p>
									</TableCell>
									<TableCell component="th" scope="row">
										<p>{soldier.lastname}</p>
									</TableCell>
									<TableCell component="th" scope="row">
										{
											props.companyData.map((company, index) => {
												if (soldier.compnum === company.id) {
													return (
														<Link
															key={index}
															to={{
																pathname: '/company',
																state: {
																	compamny: company.companyname,
																	townId: company.id
																}
															}}
														>
															{company.companyname}
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
											props.townData.map((town, index) => {
												if (soldier.othertown === town.id) {
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
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default SearchResults;