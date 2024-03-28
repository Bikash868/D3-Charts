import Styled from '@emotion/styled';
import { css } from '@emotion/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const IndicatorControlsWrapper = Styled('div')`
	display: flex;
	grid-gap: 0.5rem;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;

export const ButtonCss = css`
	width: 2.5rem;
	height: 2.5rem;
	display: flex;
	cursor: pointer;
	border-radius: 4px;
	align-items: center;
	justify-content: center;
	border: 1px solid #d7dbe9;
	background-color: transparent;
`;

export const IconCss = css`
	color: '#344054',
	margin: '0.5em',
`;

export const NextButton = Styled('button')`${ButtonCss}`;
export const PreviousButton = Styled('button')`${ButtonCss}`;

export const NextIcon = Styled(ArrowForwardIcon)`${IconCss}`;
export const PreviousIcon = Styled(ArrowBackIcon)`${IconCss}`;
