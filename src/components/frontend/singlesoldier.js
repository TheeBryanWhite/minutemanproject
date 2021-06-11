import React,{Component} from 'react';
import { connect } from 'react-redux';
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

import { 
	setPageTitle
 } from '../../redux/actions';

/*
	For an exhaustive breakdown of what's going on here, check out the SingleCompany component.
	It's commented like crazy and there's nothing going on here that isn't going on there.
*/

class Soldier extends Component {
	constructor(props) {
		super(props);

		this.state = {
			theCompany: [],
			theTown: []
		}
	}

	componentDidMount() {
		this.props.setPageTitle('Soldier Details');
		const companysUrl = `http://localhost:3001/v1/companies/${this.props.location.state.soldierData.compnum}`;
		const townsUrl = `http://localhost:3001/v1/towns/${this.props.location.state.townData}`;
		const self = this;
		
		axios.get(companysUrl, {})
		.then(function (response) {
			self.setState({theCompany: response.data});
		})
		.catch(function (error) {
			console.log(error);
		});

		axios.get(townsUrl, {})
		.then(function (response) {
			self.setState({theTown: response.data});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render() {
		if (!this.props.location.state.soldierData) {
			return <Loading />
		}
	
		return(
			<div>
				<TableContainer component={Paper}>
					<Table aria-label="soldier table">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Company</TableCell>
								<TableCell>Rank</TableCell>
								<TableCell>Town</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell component="th" scope="row">
									{`${this.props.location.state.soldierData.firstname} ${this.props.location.state.soldierData.lastname}`}
								</TableCell>
								<TableCell component="th" scope="row">
									<Link
										to={{
											pathname: '/company',
											state: {
												companyData: this.state.theCompany,
											}
										}}
									>
										{this.state.theCompany.companyname}
									</Link>
								</TableCell>
								<TableCell component="th" scope="row">
									{(this.props.location.state.soldierData.rank1 ? this.props.location.state.soldierData.rank1 : '')}
								</TableCell>
								<TableCell component="th" scope="row">
									<Link
										to={{
											pathname: '/town',
											state: {
												townId: this.props.location.state.townData,
											}
										}}
									>
										{this.state.theTown.town}
									</Link>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		)
	}
}

export default connect(null, {setPageTitle})(Soldier);