/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const VerifyBlock = props => {
	if (props.registered && props.registered.userRegistered) {
		return(
			<div
				css={css`
					background-color: #ffd3d3;
					border: 1px solid #ff5e5e;
					margin-block-end: 1em;
					padding: 0 1rem;
				`}
			>
				<p>An email has been sent to Minuteman Project Admins for verification. You will be notified when your account has been approved.</p>
			</div>
		)
	} else {
		return false;
	}
}

export default VerifyBlock;