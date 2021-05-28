/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const UnknownEmail = (props) => {
	if (props.error) {
		return(
			<div
				css={css`
					background-color: #ffd3d3;
					border: 1px solid #ff5e5e;
					margin-block-end: 1em;
					padding: 0 1rem;
				`}
			>
				<p>The provided email doesn't appear to be in our system.</p>
			</div>
		)
	} else {
		return false;
	}
}

export default UnknownEmail;