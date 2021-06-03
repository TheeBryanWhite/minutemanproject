import { Component } from 'react';
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

/*
	For an exhaustive breakdown of what's going on here, check out the AllCompanies component.
	It's commented like crazy and there's nothing going on here that isn't going on there.
*/

class AllCompanies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allTowns: []
		}
	}
	componentDidMount() {
		this.props.setPageTitle('All Towns');
		const townsUrl = 'http://localhost:3001/v1/towns';
		const self = this;

		axios.get(townsUrl, {})
		.then(function (response) {
			self.setState({allTowns: response.data.results});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render() {
		if(!this.state.allTowns.length) {
			return <Loading />
		}

		return(
			<div>
				<TableContainer component={Paper}>
					<Table aria-label="all users table">
						<TableHead>
							<TableRow>
								<TableCell>Town</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
							this.state.allTowns.map((town, index) => {
								if (town.town !== 'Pursued') {
									return (
										<TableRow key={index}>
											<TableCell component="th" scope="row">
												<Link
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
											</TableCell>
										</TableRow>
									)
								} else {
									return false;
								}
							})
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		)
	}
}

export default connect(null, {setPageTitle})(AllCompanies);