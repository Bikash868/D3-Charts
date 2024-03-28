import Styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const AppBarTitleWrapper = Styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	grid-gap: 0.5rem;
`;

export const AppBarTitleIcon = Styled('div')`
	height: 1.25rem;
	width: 1.25rem;
	margin-left: 1px;
`;

export const Title = Styled(Typography)`
	cursor: pointer;
	text-align: center;
`;
