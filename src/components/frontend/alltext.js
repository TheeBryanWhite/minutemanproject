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

class AllText extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allText: []
		}
	}
	componentDidMount() {
		const textUrl = 'http://localhost:3001/v1/text';
		const self = this;
		axios.get(textUrl, {})
		.then(function (response) {
			self.setState({allText: response.data.results});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render() {
		if(!this.state.allText.length) {
			return <Loading />
		}

		return(
			<div>
				<h2>All Texts</h2>
				<div>
					<TableContainer component={Paper}>
						<Table aria-label="all text table">
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>TextID</TableCell>
									<TableCell>Text</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
								this.state.allText.map((text, index) => (
									<TableRow key={index}>
										<TableCell component="th" scope="row">{text.id}</TableCell>
										<TableCell component="th" scope="row">{text.textid}</TableCell>
										<TableCell component="th" scope="row">{text.text}</TableCell>
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

export default AllText;