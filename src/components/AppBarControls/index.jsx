import { useNavigate } from 'react-router-dom';

import { NextIcon } from './elements';
import { NextButton } from './elements';
import { PreviousIcon } from './elements';
import { PreviousButton } from './elements';
import { IndicatorControlsWrapper } from './elements';

export function AppbarControls() {
	const navigate = useNavigate();

	function triggerEvent(event) {
		console.log("event:",event)
		if (event === 'next') {
			navigate('/dashboard/learning');
		} else if (event === 'previous') {
			navigate('/dashboard/adoption');
		} else {
			console.log("event not matching");
		}
	}

	return (
		<IndicatorControlsWrapper>
			<PreviousButton onClick={() => triggerEvent('previous')}>
				<PreviousIcon />
			</PreviousButton>
			<NextButton onClick={() => triggerEvent('next')}>
				<NextIcon />
			</NextButton>
		</IndicatorControlsWrapper>
	);
}
