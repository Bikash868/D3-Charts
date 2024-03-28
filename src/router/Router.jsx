import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export function ApplicationRouter(props) {
	return (
		<Router>
			<Routes>
				<Route path="*" element={<div>Page Not Found</div>}/>

				{props.routes.map((route, index) => (
					<Route
						key={index}
						path={route.path}
						exact={route.exact}
						element={
							<route.layout {...props}>
								<route.component {...props} />
							</route.layout>
						}
					/>
				))}
			</Routes>
		</Router>
	);
}

ApplicationRouter.propTypes = {
	routes: PropTypes.arrayOf(
		PropTypes.shape({
			exact: PropTypes.bool,
			path: PropTypes.string,
			private: PropTypes.bool,
			layout: PropTypes.func,
			component: PropTypes.func,
		})
	),
};
