/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

const Header = () => {
	return(
		<header 
			className="App-header"
			css={css`
				text-align: center;
			`}
		>
			<h1>Minuteman Project</h1>
		</header>
	)
}

export default Header;