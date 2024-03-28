import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as CreditCoinIcon } from '@assets/svg/creditcoin.svg';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Typography } from '@mui/material';

import { APPLICATION } from '@store/actionTypes';
import * as actionTypes from '@store/actionTypes';
import { toggleDashboardMenu } from '@store/actions/dashboardActions';

import { AppbarLogo } from './elements';
import { HamburgerContainer } from './elements';
import { LogoutButton, MenuItemWrapper, ShortNameAvatar, UserNameWrapper } from './elements';

import { Image } from '@components/Image';
import { Flex } from '@components/Utility/Flex';
import { Fade as Hamburger } from 'hamburger-react';
import InfoTooltip from '@components/InfoTooltip';
import { ButtonList } from '@components/ButtonList';
import { LoadingOverlay } from '@components/LoadingOverlay';

import LOGO_WHITE from '@assets/svg/LOGO-WHITE.svg';
import LOGO_BLACK from '@assets/svg/logo-blue.svg';

const _ = require('lodash');

export function MenuItem({ name, onSignout, closeMenu, dashboardMenu = false }) {
	const dispatch = useDispatch();
	const menu = useSelector((state) => state.UserReducer?.user?.menu);
	const [shortName, setShortName] = useState('');
	const history = useHistory();
	const { remainingCredits, creditTooltip } = useSelector((state) => state.EngageReducer);

	useEffect(() => {
		const names = name.split(' ');
		let len = names.length;
		const firstChar = names[0][0];
		const lastChar = len != 1 ? names[len - 1][0] : '';
		const shortNaotation = `${firstChar}${lastChar}`;
		setShortName(shortNaotation);
	}, []);

	const completeProfile = () => {
		history.push('/userOnBoard');
	};

	const handleClick = ({ route = '', isDisabled = false, text = '' }) => {
		if (!isDisabled && route && typeof route !== 'function') {
			history.push(route);
		}

		switch (text) {
			case 'Tutorial':
				openTutorialPopup();
				break;
			case 'Contact Us':
				openContactForm();
				break;
			case 'skip':
				break;
			default:
				break;
		}

		closeMenu();
	};

	const openContactForm = () => {
		dispatch({
			type: APPLICATION.CONTACT_FORM_STATUS,
			payload: true,
		});
	};

	const openTutorialPopup = () => {
		dispatch({
			type: actionTypes.TUTORIAL_POPUP_STATUS,
			payload: true,
		});
	};

	return (
		<MenuItemWrapper className="menu" dashboardMenu={dashboardMenu}>
			<Box sx={{ height: _.isEmpty(menu) ? '80%' : 'auto' }}>
				{_.isEmpty(menu) ? (
					<LoadingOverlay />
				) : (
					<>
						<ButtonList navItems={menu?.main || []} onClick={handleClick} divider={true} />
						<ButtonList navItems={menu?.sub || []} onClick={handleClick} divider={false} />
					</>
				)}
				<LogoutButton startIcon={<LogoutIcon />} onClick={onSignout}>
					Logout
				</LogoutButton>
			</Box>
			<UserNameWrapper onClick={completeProfile}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<ShortNameAvatar>
						<Typography alignItems="center" variant="h6" color="white">
							{shortName}
						</Typography>
					</ShortNameAvatar>
					<Typography alignItems="center" color="#313B59" ml={1}>
						{name}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center' }} className="menu_credits">
					<Typography sx={{ marginBottom: '0.3rem' }}>{remainingCredits}</Typography>
					<CreditCoinIcon style={{ transform: 'scale(1.5)', marginLeft: '0.5rem' }} />
					<Typography variant="h5" fontSize="1.125em" sx={{ display: 'flex' }}>
						<InfoTooltip plotInfo={creditTooltip} />
					</Typography>
				</Box>
			</UserNameWrapper>
		</MenuItemWrapper>
	);
}

export function ToggleMenuLogo(props) {
	const dispatch = useDispatch();
	const logos = useSelector((state) => state.UserReducer?.user?.logos);
	const { toggleDashboardMenuOpen, menuOpenStatus } = useSelector((state) => state.dashboardEntities);

	function toggleMenu() {
		dispatch(toggleDashboardMenu({ isDashboard: props?.dashboard }));
	}

	return (
		<div style={{ display: 'flex', visibility: props.visible ? 'visible' : 'hidden' }}>
			<HamburgerContainer background="primary">
				<Hamburger
					rounded
					size={24}
					color={'#000'}
					label="Show menu"
					toggled={props.dashboard ? toggleDashboardMenuOpen : menuOpenStatus}
					onToggle={toggleMenu}
				/>
			</HamburgerContainer>
			{logos && (
				<Flex align={'center'} gap={'1rem'}>
					{logos.map((logo, index) => {
						return (
							<AppbarLogo onClick={props.onLogoClick} key={index}>
								<Image
									width={'10rem'}
									src={props.logoBrightness === 'light' ? LOGO_WHITE : require(`../../../assets/svg/${logo}.svg`)}
									orientation="landscape"
								/>
							</AppbarLogo>
						);
					})}
				</Flex>
			)}
			{!logos && (
				<Flex align={'center'} gap={'1rem'}>
					<AppbarLogo onClick={props.onLogoClick}>
						<Image
							width={'10rem'}
							src={props.logoBrightness === 'light' ? LOGO_WHITE : LOGO_BLACK}
							orientation="landscape"
						/>
					</AppbarLogo>
				</Flex>
			)}
		</div>
	);
}
