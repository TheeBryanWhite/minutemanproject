/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import ReactLoading from 'react-loading';

const Loading = () => {
	return(
		<div
			css={css`
				align-items: center;
				display: flex;
				flex-direction: column;
				justify-content: center;
			`}
		>
			<p>Loading</p>
			<ReactLoading type={'bars'} color={'#000'} height={72} width={40} />
		</div>
	)
}

export default Loading