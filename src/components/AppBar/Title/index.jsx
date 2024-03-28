import PropTypes from 'prop-types';
import { Title } from './elements';

export function AppBarTitle(props) {
	return (
		<Title variant="h6">{props.title}</Title>
	);
}

AppBarTitle.propTypes = {
	title: PropTypes.string.isRequired,
};
