/** @jsxRuntime classic */
/** @jsx jsx */
import React,{ Component, Fragment } from 'react';
import { css, jsx } from '@emotion/react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { SearchResults } from './index';

class Search extends Component {
	constructor(props) {
		super(props) 

		this.state = {
			allCompanies: [],
			allTowns: [],
			companyLoading: false,
			companyOpen: false,
			companyOptions: [],
			companyQuery: '',
			fNameLoading: false,
			fNameOpen: false,
			fnameOptions: [],
			fnameQuery: '',
			lNameLoading: false,
			lNameOpen: false,
			lnameOptions: [],
			lnameQuery: '',
			searchResponse: [],
			townLoading: false,
			townOpen: false,
			townOptions: [],
			townQuery: '',
		}

		this.changeHandler = this.changeHandler.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.fetchSoldierByComplexData = this.fetchSoldierByComplexData.bind(this);
		this.fetchFNameData = debounce(this.fetchFNameData.bind(this), 500);
		this.fetchLNameData = debounce(this.fetchLNameData.bind(this), 500);
		this.fetchCompanyData = debounce(this.fetchCompanyData.bind(this), 500);
		this.fetchTownData = debounce(this.fetchTownData.bind(this), 500);
		this.setOpen = this.setOpen.bind(this);
	}

	changeHandler(event) {
		switch(event.target.id) {
			case 'lastname':
				this.setState({lnameQuery: event.target.value});
				this.fetchLNameData();
				this.setState({lNameLoading: true});
				if (event.target.value === '') {
					this.setState({lNameLoading: false});
				}
				break;

			case 'firstname':
				this.setState({fnameQuery: event.target.value});
				this.fetchFNameData();
				this.setState({fNameLoading: true});
				if (event.target.value === '') {
					this.setState({fNameLoading: false});
				}
				break;

			case 'company':
				this.setState({companyQuery: event.target.value});
				this.fetchCompanyData();
				this.setState({companyLoading: true});
				if (event.target.value === '') {
					this.setState({companyLoading: false});
				}
				break;

			case 'town':
				this.setState({townQuery: event.target.value});
				this.fetchTownData();
				this.setState({townLoading: true});
				if (event.target.value === '') {
					this.setState({townLoading: false});
				}
				break;

			default:
				return false;
		}
	}

	clickHandler(event) {
		event.preventDefault();
		this.fetchSoldierByComplexData();
	}

	fetchFNameData() {
		const soldiersUrl = `http://localhost:3001/v1/soldiers/byfirstname/${this.state.fnameQuery}`;
		const self = this;
		axios.get(soldiersUrl, {})
		.then(function (response) {
			const firstNames = response.data.map((person) => {
				return person.firstname;
			});
			const uniqueFirstNames = [...new Set(firstNames)];
			self.setState({
				fnameOptions: uniqueFirstNames,
				fNameLoading: false
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	fetchLNameData() {
		const soldiersUrl = `http://localhost:3001/v1/soldiers/bylastname/${this.state.lnameQuery}`;
		const self = this;
		axios.get(soldiersUrl, {})
		.then(function (response) {
			const lastNames = response.data.map((person) => {
				return person.lastname;
			});
			const uniqueLastNames = [...new Set(lastNames)];
			self.setState({
				lnameOptions: uniqueLastNames,
				lNameLoading: false
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	fetchCompanyData() {
		const companiesUrl = `http://localhost:3001/v1/companies/byname/${this.state.companyQuery}`;
		const self = this;
		axios.get(companiesUrl, {})
		.then(function (response) {
			const companies = response.data.map((company) => {
				return {
					id: company.id,
					name: company.companyname
				}
			});
			const uniqueCompanies = [...new Set(companies.map((company) => ({id: company.id, name: company.name})))];
			self.setState({
				companyOptions: uniqueCompanies,
				companyLoading: false
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	fetchSoldierByComplexData() {
		const complexUrl = `http://localhost:3001/v1/soldiers/bycomplex?company=${(this.state.companyQuery ? this.state.companyQuery : '')}&firstname=${(this.state.fnameQuery ? this.state.fnameQuery : '')}&lastname=${(this.state.lnameQuery ? this.state.lnameQuery : '')}&town=${(this.state.townQuery ? this.state.townQuery : '')}`;
		const self = this;
		axios.get(complexUrl, {})
		.then(function (response) {
			self.setState({
				searchResponse: response.data,
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	fetchTownData() {
		const townsUrl = `http://localhost:3001/v1/towns/byname/${this.state.townQuery}`;
		const self = this;
		axios.get(townsUrl, {})
		.then(function (response) {
			const towns = response.data.map((town) => {
				return {
					id: town.id,
					name: town.town
				};
			});
			const uniqueTowns = [...new Set(towns.map((town) => ({id: town.id, name: town.name})))];
			self.setState({
				townOptions: uniqueTowns,
				townLoading: false
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	setOpen(target, status) {
		this.setState({[target]: status})
	}

	componentDidMount() {
		const allCompaniesUrl = 'http://localhost:3001/v1/companies';
		const allTownsUrl = 'http://localhost:3001/v1/towns';
		const self = this;
		axios.get(allCompaniesUrl, {})
		.then(function (response) {
			self.setState({
				allCompanies: response.data.results
			});
		})
		.catch(function (error) {
			console.log(error);
		});
		axios.get(allTownsUrl, {})
		.then(function (response) {
			self.setState({
				allTowns: response.data.results
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render() {

		let Results;
		if (this.state.searchResponse.length > 0) {
			Results = <SearchResults companyData={this.state.allCompanies} resultsData={this.state.searchResponse} townData={this.state.allTowns} />
		}

		return(
			<Grid 
				item
				xs={12}
			>
				<Card>
					<div>
					<form 
						autoComplete="off"
						noValidate
						onSubmit={this.submitHandler}
					>
						<Grid
							container
							css={css`
								padding: 1rem;
							`}
							spacing={3}
						>
							<Grid 
								item 
								xs={12} 
								md={6}
							>
								<Autocomplete
									id="lastname"
									style={{ width: '100%' }}
									open={this.state.lNameOpen}
									onOpen={() => {
										this.setOpen('lNameOpen', true);
									}}
									onClose={(event) => {
										this.setOpen('lNameOpen', false);
										this.setState({lnameQuery: event.target.innerText});
									}}
									getOptionSelected={(option, value) => option.lastname === value.lastname}
									getOptionLabel={(option) => option }
									options={this.state.lnameOptions}
									loading={this.state.lNameLoading}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Last Name"
											variant="outlined"
											onChange={this.changeHandler}
											InputProps={{
												...params.InputProps,
												endAdornment: (
												<Fragment>
													{this.state.lNameLoading ? <CircularProgress color="inherit" size={20} /> : null}
												</Fragment>
												),
											}}
										/>
									)}
								/>
							</Grid>
							<Grid 
								item 
								xs={12} 
								md={6}
							>
								<Autocomplete
									id="firstname"
									style={{ width: '100%' }}
									open={this.state.fNameOpen}
									onOpen={() => {
										this.setOpen('fNameOpen', true);
									}}
									onClose={(event) => {
										this.setOpen('fNameOpen', false);
										this.setState({fnameQuery: event.target.innerText});
									}}
									getOptionSelected={(option, value) => option.firstname === value.firstname}
									getOptionLabel={(option) => option }
									options={this.state.fnameOptions}
									loading={this.state.fNameLoading}
									renderInput={(params) => (
										<TextField
											{...params}
											label="First Name"
											variant="outlined"
											onChange={this.changeHandler}
											InputProps={{
												...params.InputProps,
												endAdornment: (
												<Fragment>
													{this.state.fNameLoading ? <CircularProgress color="inherit" size={20} /> : null}
												</Fragment>
												),
											}}
										/>
									)}
								/>
							</Grid>
							<Grid 
								item 
								xs={12} 
								md={6}
							>
								<Autocomplete
									id="company"
									style={{ width: '100%' }}
									open={this.state.companyOpen}
									onOpen={() => {
										this.setOpen('companyOpen', true);
									}}
									onClose={() => {
										this.setOpen('companyOpen', false);
									}}
									onChange={(event, value) => {
										this.setState({
											companyQuery: value.id
										});
									}}
									getOptionLabel={(option) => option.name }
									options={this.state.companyOptions}
									loading={this.state.companyLoading}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Company"
											variant="outlined"
											onChange={this.changeHandler}
											InputProps={{
												...params.InputProps,
												endAdornment: (
												<Fragment>
													{this.state.companyLoading ? <CircularProgress color="inherit" size={20} /> : null}
												</Fragment>
												),
											}}
										/>
									)}
								/>
							</Grid>
							<Grid 
								item 
								xs={12} 
								md={6}
							>
								<Autocomplete
									id="town"
									style={{ width: '100%' }}
									open={this.state.townOpen}
									onOpen={() => {
										this.setOpen('townOpen', true);
									}}
									onClose={() => {
										this.setOpen('townOpen', false);
									}}
									onChange={(event, value) => {
										this.setState({
											townQuery: value.id
										});
									}}
									getOptionLabel={(option) => option.name }
									options={this.state.townOptions}
									loading={this.state.townLoading}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Town"
											variant="outlined"
											onChange={this.changeHandler}
											InputProps={{
												...params.InputProps,
												endAdornment: (
												<Fragment>
													{this.state.townLoading ? <CircularProgress color="inherit" size={20} /> : null}
												</Fragment>
												),
											}}
										/>
									)}
								/>
							</Grid>
							<Grid item 
								xs={12} 
							>
								<Button 
									css={css`
										height: 100%;
										width: 100%;
									`}
									onClick={this.clickHandler}
									type="submit"
									variant="contained"
								>
									Search
								</Button>
							</Grid>
						</Grid>
					</form>
					</div>
				</Card>
				<Card
					css={css`
						margin-top: 1rem;
					`}
				>
					{Results}
				</Card>
			</Grid>
		)
	}
}
	
export default Search;