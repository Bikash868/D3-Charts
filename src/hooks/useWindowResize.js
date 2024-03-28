import { useEffect } from 'react';
export function useWindowResize(callback) {
	useEffect(() => {
		callback();

		function handleResize() {
			callback();
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
};
