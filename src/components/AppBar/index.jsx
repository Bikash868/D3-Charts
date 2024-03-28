import PropTypes from 'prop-types';

import { AppbarWrapper } from './elements';
import { AppbarLeftContent } from './elements';
import { AppbarRightContent } from './elements';
import { AppbarCenterContent } from './elements';

export function AppBar(props) {

	return (
		<AppbarWrapper
			shrunk={props.shrunk}
			noEnd={!props.endAdornment}
			noStart={!props.startAdornment}
			noCenter={!props.centerAdornment}
			id="top-app-bar"
		>
			<AppbarLeftContent>
				{props.startAdornment && props.startAdornment}
			</AppbarLeftContent>

			<AppbarCenterContent alignLeft={!props.centerAdornment}>
				{props.centerAdornment && props.centerAdornment}
			</AppbarCenterContent>

			<AppbarRightContent>{props.endAdornment && props.endAdornment}</AppbarRightContent>
		</AppbarWrapper>
	);
}

AppBar.propTypes = {
	shrunk: PropTypes.bool,
	endAdornment: PropTypes.node,
	startAdornment: PropTypes.node,
	centerAdornment: PropTypes.node,
};
