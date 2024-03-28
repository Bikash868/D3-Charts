import Styled from '@emotion/styled';
import { Icon, Tab } from '@mui/material';
import { Tabs } from '@mui/material';
import Button from '@mui/material/Button';

export const AppbarTabSelectorWrapper = Styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: ${(props) => (props.alignLeft ? 'flex-start' : 'center')};
	grid-gap: 1rem;
`;

export const StyledTabs = Styled(Tabs)`
	padding: 0.25rem;
	border-radius: 0.5rem;
	background-color: #F2F4F7;

	@media(min-width: 2560px) {
		padding: 0.5rem;
		border-radius: 0.25rem;
	}

	& .MuiTabs-indicator {
		background-color: transparent;
		box-shadow: 5px 5px 5px #E5E5E5;
	}

	& .MuiTab-root.Mui-selected {
		color: #344054;
		font-weight: 600;
		background-color: white;
	}

	& .MuiTabs-flexContainer {
		overflow-x: auto;
		&::-webkit-scrollbar {
			height: 0.2em;
		  }
		  &::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.00);
		  }
		  &::-webkit-scrollbar-thumb {
			background-color: rgba(0,0,0,.1);
		  }
	}

	${(props) => props.disabled && `display: none;`}
`;

export const StyledTab = Styled(Tab)`
	color: #667085;
	margin: 1px 4px;
	height: 1.25rem;
	font-size: 1rem;
	font-weight: 600;
	text-transform: none;
	min-height: 48px !important;

	@media(min-width: 2560px) {
		padding: 0.8rem !important;
	}

	&.Mui-selected {
		box-shadow: 1px 2px 3px rgba(16, 24, 40, 0.1), 1px 2px 2px rgba(16, 24, 40, 0.06);
		border-radius: 6px;
		z-index: 10;
	}
`;

export const TabSelectorBackButton = Styled(Button)`
	width: 2rem;
	height: 2rem;
	display: flex;
	min-width: 0%;
	margin-right: 1rem;
	align-items: center;
	border-radius: 0.5rem;
	justify-content: center;
	background-color: #F9FAFB;
	color: #1B2031;

	&,
	& * {
		cursor: pointer !important;
	}

	& .MuiButton-startIcon {
		margin-left: 0 !important;
		margin-right: 0 !important;
	}
`;

export const StyledIcon = Styled(Icon)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;
