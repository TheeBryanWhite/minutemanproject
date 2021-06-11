import React from 'react';
import Container from '@material-ui/core/Container';
import VerifyBlock from './verifyblock';

const SendVerificationEmail = (props) => {
	return(
		<Container>
			<VerifyBlock registered={props.location.state} />
		</Container>
	)
}

export default SendVerificationEmail;