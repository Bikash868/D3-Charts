import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export function BackdropLoader() {
	return (
		<div>
			<Backdrop sx={{ color: '#fff', zIndex: '2000' }} open={open}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}
