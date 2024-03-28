import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MenuItem } from './components';
import { MenuContainer } from './elements';
import { ToggleMenuLogo } from './components';
import { AppBarMenuWrapper } from './elements';

import { useOutsideClick } from '@utils/hooks/useOutsideClick';
import { toggleDashboardMenu } from '@store/actions/dashboardActions';

export function AppBarMenu(props) {
	const ref = React.useRef(null);
	const history = useHistory();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const username = useSelector((state) => state.UserReducer?.user?.display_name);
	const { toggleDashboardMenuOpen, menuOpenStatus } = useSelector((state) => state.dashboardEntities);
	const { isTourRunning } = useSelector((state) => state.TourHelperReducer);
	const floatingMenuVisible = history.location.pathname !== '/dashboard';
	const dashboard = window.location.pathname === '/dashboard';

	//CASE: when tour is running and you clicked outside the tour popup
	useOutsideClick([ref], () => {
		if (!isTourRunning && floatingMenuVisible) {
			closeMenu();
		}
	});

	function closeMenu() {
		if (dashboard && toggleDashboardMenuOpen) {
			dispatch(toggleDashboardMenu({ isDashboard: true }));
		}

		if (!dashboard && menuOpenStatus) {
			dispatch(toggleDashboardMenu());
		}
	}

	function handleLogoClick() {
		props.onClick();
		if (!dashboard && menuOpenStatus) {
			dispatch(toggleDashboardMenu());
		}
	}

	return (
		<AppBarMenuWrapper ref={ref} className={props.className}>
			<ToggleMenuLogo
				logoBrightness={props.logoBrightness}
				dashboard={props?.dashboard}
				visible={true}
				onLogoClick={handleLogoClick}
			/>
			{!dashboard && menuOpenStatus && floatingMenuVisible && (
				<MenuContainer>
					<MenuItem name={username} onSignout={props.onSignout} closeMenu={closeMenu} />
				</MenuContainer>
			)}
		</AppBarMenuWrapper>
	);
}

AppBarMenu.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	onSignout: PropTypes.func.isRequired,
	logoBrightness: PropTypes.oneOf(['light', 'dark']),
};
