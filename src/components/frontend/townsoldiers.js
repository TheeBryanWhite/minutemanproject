import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class TownSoldiers extends Component {
	render() {
		return(
			<div>
				<h3>Soldiers enlisted in companies from other towns, but showing {this.props.townData} on their roster</h3>

				<TableContainer component={Paper}>
					<Table aria-label="company table">
						<TableHead>
							<TableRow>
								<TableCell>Other Town</TableCell>
								<TableCell>Soldier</TableCell>
								<TableCell>Company</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								this.props.soldierData.map((soldier, index) => {
									return(
										<TableRow key={index}>
											<TableCell component="th" scope="row">
												<p>{this.props.townData}</p>
											</TableCell>
											<TableCell component="th" scope="row">
												<Link
													key={index}
													to={{
														pathname: '/soldier',
														state: {
															soldierData: soldier,
														}
													}}
												>
													{`${soldier.firstname} ${soldier.lastname}`}
												</Link>
											</TableCell>
											<TableCell component="th" scope="row">
												{
													this.props.companyData.map((company, index) => {
														if (company.id === soldier.compnum) {
															return(
																<Link
																	key={index}
																	to={{
																		pathname: '/company',
																		state: {
																			companyData: company,
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
										</TableRow>
									)
								})
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		)
	}
}

export default TownSoldiers;