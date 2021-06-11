/** @jsxRuntime classic */
/** @jsx jsx */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	css,
	jsx
  } from '@emotion/react'
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

class AllCompanies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allCompanies: [],
			allText: [],
			allTowns: []
		}
	}

	/*
		componentDidMount() is one of React's lifecycle phases. Lifecycle is how a component comes in
		and out of the DOM. There used to be a bunch of phases but one of the last React updates deprecated a couple.
		The two anyone is most likely to use are componentDidMount() and componentWillUnmount() and what these do
		is run whatever functions are inside of them when a component mounts, meaning it loads into the DOM, and 
		WILL unmount, meaning the functions are fired right before it's removed from the DOM.
	*/
	componentDidMount() {
		this.props.setPageTitle('All Companies');
		const companiesUrl = 'http://localhost:3001/v1/companies';
		const textUrl = 'http://localhost:3001/v1/text';
		const townsUrl = 'http://localhost:3001/v1/towns';
		const self = this;
		
		/*
			The next three axios calls below are AJAX calls to the API endpoints that deliver the data we need
			* All companies
			* All text notes
			* All towns
			They run in order. So we invoke axios, we specify the action, in this instance all 3 are GET actions.
			Inside the parens we tell it which URL to hit and the second param (empty braces) is for including any additional
			header or body parameters. Since these are gets, we don't need to provide any additional params.
			After that you see a .then(). This callback fires only after the API provides a response and then runs
			whatever is inside of it. In this case, we're setting state. Usually, you'd run this.setState({foo: bar}) but 
			this is asynchronous, so we have to assign this to a variable. I call it self.
			
			If there's an error, it bombs and spits the error out to the console.
		*/
		axios.get(companiesUrl, {})
		.then(function (response) {
			self.setState({allCompanies: response.data.results});
		})
		.catch(function (error) {
			console.log(error);
		});

		axios.get(textUrl, {})
		.then(function (response) {
			self.setState({allText: response.data.results});
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
		/*
			This is where things start to get a little slippery. Everything happening here is asynchronous. If you try
			to console.log some of this asynchronous data, there's a good chance that it's going to return undefined even
			though it's actually in the DOM. React Developer Tools is a browser extension that makes that uncertainty crystal
			clear, though: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
			
			Even though our Axios calls are inside componentDidMount(), the component is going to mount and THEN 
			call the APIs. The component will be mounted before the APIs send a response. So before we render
			the main component data to the page (the table markup), we want to make sure that the component's state has the 
			data we need in it. If it doesn't yet, we return the Loading component, instead. Once it *IS* available, 
			the entire component updates and then re-renders, returning the main component data.
		*/
		if(!this.state.allCompanies.length) {
			return <Loading />
		}

		return(
			<div>
				<TableContainer component={Paper}>
					<Table aria-label="all users table">
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
							{/*
								Whenever we want to render data sourced from the Mongo to the page, we do it like this below.
								.map() is an ES6 function that basically takes an array and outputs another array from what you
								return in the function. I'm oversimplifying but you can get all the deets here: 
								https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
								
								In React, map works kind of like the WordPress loop. You specify the source. Here, it's the array of data
								stored in this.state.allCompanies. For each index in the array, it's going to iterate and assign the key
								company to each index. Company is the parent key now. So when you call each key INSIDE company, it's going
								to output the value to the page. Index is a param that you have to attach to each parent element in the loop.
								It's a React DOM thing. I don't fully understand it.
							*/}
							{
							this.state.allCompanies.map((company, index) => (
								<TableRow key={index}>
									<TableCell component="th" scope="row">
										{/*
											The Link component, with a capital L, is a React Router component. On top of providing nav links in the app
											it allows you to insert state properties into the Router object. This link will take you to the company detail 
											page so we need to send some properties to that page.

											I'm passing the current company object, ALL the textData and ALL the towns data. On the next page
											we'll be able to access this data by way of the location property. You'll see it in action on that page.
											We also specify which page we're going to by way of pathname prop.
										*/}
										<Link 
											to={{
												pathname: '/company',
												state: {
													companyData: company,
													textData: this.state.allText,
													townsData: this.state.allTowns
												}
											}}
										>
											{company.companyname}
										</Link>
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to="/">
											{/*
												This is a nested map. Because the Towns data lives in another object, we want to match our current town value, 
												a mongo ObjectID string to the corresponding ID of the town we're looking for in the Towns object

											*/}
											{
												this.state.allTowns.map((town, index) => {
													if (company.town === town.id) {
														return (
															<p key={index}>{town.town}</p>
														)
													} else {
														return false;
													}
												})
											}
										</Link>
									</TableCell>
									<TableCell component="th" scope="row">
											{/* Same as above */}
											{
												this.state.allTowns.map((town, index) => {
													if (company.entered === town.id) {
														return (
															<p key={index}>{town.town}</p>
														)
													} else {
														return false;
													}
												})
											}
									</TableCell>
									<TableCell component="th" scope="row">{company.enterednote}</TableCell>
									<TableCell component="th" scope="row">
										{/* Same as above, but we're matching text note IDs to the current textnote ObjectId */}
										{
											this.state.allText.map((text, index) => {
												if (company.textid1 === text.id) {
													return (
														<p key={index}>{text.text}</p>
													)
												} 

												if (company.textid2 === text.id) {
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
							))
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		)
	}
}

export default connect(null, {setPageTitle})(AllCompanies);