import Styled from '@emotion/styled';
import { Avatar, Button, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const backgroundColor = {
	primary: '#EEF0F2',
	secondary: 'rgba(0, 0, 0, 0.6)',
};

export const AppBarMenuWrapper = Styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

export const HamburgerContainer = Styled('div')`
	border-radius: 8px;
	margin-right: 1.2rem;
	backgroundColor: ${(props) => (props.isOpen ? backgroundColor[props.background] : '')};
`;

export const AppbarLogo = Styled('div')`
	min-width: 8rem;
	cursor: pointer !important;
	& * {
		cursor: pointer !important;
	}
`;

export const MenuContainer = Styled('div')`
	z-index: 10;
	position: absolute;
	top: 4.5rem;
	left: 1.5rem;
	height: 45rem;
	width: 20rem;
`;

export const MenuItemWrapper = Styled('div')`
	border: ${(props) => (!props.dashboardMenu ? '1px solid #EAECF0' : 'none')};
	width: 100%;
	height: 100%;
	padding: 1.25rem;
	display: flex;
	flex-direction: column;
	background: #FFFFFF;
	box-shadow: ${(props) =>
		!props.dashboardMenu
			? '0px 12px 16px -4px rgba(16, 24, 40, 0.12), 0px 4px 6px -2px rgba(16, 24, 40, 0.07)'
			: 'none'};
	border-radius: 0.5rem;
	position: relative;
	justify-content: space-between;
`;

// 300523: Adding !important to styles since these are being overridden by Mui Styles
export let LogoutButton = Styled(Button)`
	display: flex;
	align-items: center;
	justify-content: flex-start !important;
	line-height: 0px;
	width: 100%;
	font-size: 1rem;
	padding: 6px 5px !important;
	color: #0070ef !important;
	@media(min-width: 2560px) {
		font-size: 0.85rem !important;
	}
	&:hover {
		background-color: #DEE1E4;
		border-radius: 0.5rem;
		font-weight: 700;
		color: #151927 !important;
	}
`;

export const UserNameWrapper = Styled('div')`
	display: flex;
	align-items: center;
	cursor: pointer;
	justify-content: space-between;
	width: 100%;
`;

export const ShortNameAvatar = Styled(Avatar)`
	background-color: #1B2031;
	height: 2rem;
	width: 2rem;
`;

export const StyledDivider = Styled(Divider)`
	width: 15%;
	border-bottom: 1px solid #000;
	margin: 1rem 0rem;
`;

export const StyledListItemText = Styled(ListItemText)`
	font-size: 0.875rem;

	${(props) => {
		return props.type === 'tutorialButton' || props.type === 'skipButton'
			? `
		  	display: flex;
			justify-content: center;
			`
			: ``;
	}}
`;

export const StyledListItemButton = Styled(ListItemButton)`
	padding: 0 !important;
	border-radius   : 4px !important;
	width: 100%;

	&.tutorialButton {
		background: #1976d2;
		color: #fff;
		text-align: center;

		&:hover {
			background-color: #1565c0;
		}
	}

	&.skipButton {
		color: grey;
		background: #fff;
		text-align: center;

		&:hover {
			background: #EAEAEA;
		}
	}

`;

export const StyledList = Styled(List)`
	padding: 0 !important;
	${(props) =>
		!props.visible &&
		`
		display: none;
	`}
`;

export const StyledListItemIcon = Styled(ListItemIcon)`
	min-width: 25px;
`;

export const SubItemsWrapper = Styled('div')`
	margin-left: 1.5rem;
	border-left: 2px solid #EBEDF4;
	padding-left: 0.875rem;
	margin-top: 0.3rem;
	margin-bottom: 0.3rem;
`;
