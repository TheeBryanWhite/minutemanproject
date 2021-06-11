import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class AllSoldiers extends Component {
	render() {
		return(
			this.props.soldierData.map((soldier, index) => {
				return(
					<TableRow key={index}>
						<TableCell scope="row">
							<Link
								to={{
									pathname: '/soldier',
									state: {
										soldierData: soldier,
										townData: this.props.townData
									}
								}}
							>
								{`${soldier.firstname} ${soldier.lastname}`}
							</Link>
						</TableCell>
						<TableCell scope="row">{(soldier.rank1 ? soldier.rank1 : 'No rank listed')}</TableCell>
					</TableRow>
				)
			})
		)
	}
}

export default AllSoldiers;