import styled from '@emotion/styled';

export const Tooltip = styled('div')`
	width: auto;
	max-width: 15rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: auto;
	display: none;
	padding: 0.75rem;
	background: #fff;
	position: absolute;
	border-radius: 0.25rem;
	border: 1px solid #f2f4f7;
	box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.12);
`;

export const ChartContainer = styled.div`
	height: 400px;
	width: 100% !important;
	display: flex;
	flex-grow: 1;
	padding: 1rem !important;
`;
