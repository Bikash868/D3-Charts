import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Chart from './Chart';
import { createValidId } from '@utils';

const useStyles = makeStyles(() => ({
	chartContainer: {
		height: '100%',
		width: '100%',
		display: 'table',
		// justifyContent: 'center',
		// alignItems: 'center',
		// border: '1px solid red',
	},
}));
function ParentSingleNps({ name, score }) {
	const classes = useStyles();

	const dimensions = {
		margin: {
			top: 90,
			bottom: 10,
			left: 10,
			right: 10,
		},
	};
	return (
		<Box className={classes.chartContainer}>
			<Chart dimensions={dimensions} score={score} name={createValidId(name)} />
		</Box>
	);
}
export default ParentSingleNps;
