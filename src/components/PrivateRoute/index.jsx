import React from 'react';
import PropTypes from 'prop-types';

import FullScreenLoader from '@components/FullScreenLoader';

const PrivateRoute = (props) => {

	if (!canRender.value) {
		return <FullScreenLoader />;
	}
	return props.orRender;
};

PrivateRoute.propTypes = {
	private: PropTypes.bool,
	orRender: PropTypes.element,
};

export default PrivateRoute;
