import Styled from '@emotion/styled';

export const AppbarWrapper = Styled('div')`
	display: grid;
	direction: row;
	background: #fff;
	align-items: center;
	padding: 0.5rem;
	grid-template-columns: 1fr 2fr 1fr;
	`;

AppbarWrapper.displayName = 'AppbarWrapper';

export const AppbarLeftContent = Styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	grid-gap: 5.5rem;
`;
AppbarLeftContent.displayName = 'AppbarLeftContent';

export const AppbarCenterContent = Styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	grid-gap: 5.5rem;
`;

AppbarCenterContent.displayName = 'AppbarCenterContent';

export const AppbarRightContent = Styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	grid-gap: 5.5rem;
`;

AppbarRightContent.displayName = 'AppbarRightContent';
