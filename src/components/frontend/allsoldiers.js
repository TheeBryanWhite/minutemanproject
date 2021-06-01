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

class AllSoldiers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allSoldiers: []
		}
	}
	componentDidMount() {
		const soldiersUrl = 'http://localhost:3001/v1/soldiers';
		const self = this;
		axios.get(soldiersUrl, {})
		.then(function (response) {
			self.setState({allSoldiers: response.data.results});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render() {
		if(!this.state.allSoldiers.length) {
			return <Loading />
		}

		return(
			<div>
				<h2>All Soldiers</h2>
				<div>
					<TableContainer component={Paper}>
						<Table aria-label="all soldiers table">
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Personnum</TableCell>
									<TableCell>Compnum</TableCell>
									<TableCell>Rank 1</TableCell>
									<TableCell>Rank 2</TableCell>
									<TableCell>Prefix</TableCell>
									<TableCell>First Name</TableCell>
									<TableCell>Middle name</TableCell>
									<TableCell>Last name</TableCell>
									<TableCell>Suffix</TableCell>
									<TableCell>Town</TableCell>
									<TableCell>Alt. First Name</TableCell>
									<TableCell>Alt. Last Name</TableCell>
									<TableCell>TextId 1</TableCell>
									<TableCell>TextId 2</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
								this.state.allSoldiers.map((soldier, index) => (
									<TableRow key={index}>
										<TableCell component="th" scope="row">{soldier.id}</TableCell>
										<TableCell component="th" scope="row">{soldier.personnum}</TableCell>
										<TableCell component="th" scope="row">{soldier.compnum}</TableCell>
										<TableCell component="th" scope="row">{soldier.rank1}</TableCell>
										<TableCell component="th" scope="row">{soldier.rank2}</TableCell>
										<TableCell component="th" scope="row">{soldier.prefix}</TableCell>
										<TableCell component="th" scope="row">{soldier.firstname}</TableCell>
										<TableCell component="th" scope="row">{soldier.middlename}</TableCell>
										<TableCell component="th" scope="row">{soldier.lastname}</TableCell>
										<TableCell component="th" scope="row">{soldier.suffix}</TableCell>
										<TableCell component="th" scope="row">{soldier.othertown}</TableCell>
										<TableCell component="th" scope="row">{soldier.altfirstname}</TableCell>
										<TableCell component="th" scope="row">{soldier.altlastname}</TableCell>
										<TableCell component="th" scope="row">{soldier.textid}</TableCell>
										<TableCell component="th" scope="row">{soldier.textid2}</TableCell>

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

export default AllSoldiers;