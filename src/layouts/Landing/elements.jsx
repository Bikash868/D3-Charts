import { Icon } from '@mui/material';
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import Styled from '@emotion/styled';

export const LandingLayoutWrapper = Styled('div')`
	width: 100% !important;
	height: 100% !important;
	background-color: #ffffff;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

export const SubmitQuestionCTAWrapper = Styled('div')`
	right          : 1.5rem;
	bottom         : ${(props) => (props.upgradePlanBarStatus ? '3.625rem' : '0.625rem')};
	display        : flex;
	position       : fixed;
	align-items    : center;
	justify-content: center;
`;

export const SubmitQuestionCTA = Styled(Button)`
	color: white;
	border-radius: 3.125rem;
	background-color: #252E4B;
	font-size: 1.075rem;
	padding: 0.5rem 1.25rem;
`;

export const SubmitQuestionCTAIcon = Styled(Icon)`
	height: 1.875rem;
	width: 1.875rem;
	margin: 0.3125 0;
`;

export const SubmitQuestionCTAIconImage = Styled('img')`
	color: white;
	object-fit: cover;
`;

export const Popup = Styled(Dialog)`
	& .MuiDialog-container {
		& .MuiPaper-root {
			min-width: ${(props) => (props.narrow ? '18rem' : '30rem')};
			padding: 0.5rem;
		},
	}
`;
