import React from 'react';
import { Box } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';

export const FullScreenLoader = () => {
	return (
		<Box
			style={{
				backgroundColor: '#fff',
				display: 'flex',
				height: '98vh',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Box mt={8}>
					<ThreeDots
						height="80"
						width="80"
						radius="9"
						color={'blue'}
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						wrapperClassName=""
						visible={true}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default FullScreenLoader;
