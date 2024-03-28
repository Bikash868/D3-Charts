import React, { useRef, memo, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { debounce as _debounce } from 'lodash';
import dayjs from 'dayjs';
/**
 * 
 * @param {object} dateRange      -whole date range 
 * @param {object} appliedRange   -currently applied date range
 * @param {function} onChange     -triggered on slider interaction 
 */

function DateSlider({ dateRange, onChange, appliedRange }) {
	const [value, setValue] = useState([0, 0]);
	const maxValue = useRef(100);

    React.useEffect(()=>{
        let limitStartDate = dayjs(dateRange.start, 'YYYY-MM-DD');
		let limitEndDate = dayjs(dateRange.end, 'YYYY-MM-DD');
		const sliderLimit = limitEndDate.diff(limitStartDate, 'day');
		maxValue.current = sliderLimit; //max no of days

        const appliedValue = getRange(appliedRange);
        setValue(appliedValue);
    },[])

	const getRange = (range) => {

		if ( range && range.start && range.end) {
            let limitStartDate = dayjs(dateRange.start, 'YYYY-MM-DD');
			let rangeStartDate = dayjs(range.start, 'DD/MM/YYYY');
			let rangeEndDate = dayjs(range.end, 'DD/MM/YYYY');

			let rangeStart = rangeStartDate.diff(limitStartDate, 'day');
			let rangeEnd = rangeEndDate.diff(limitStartDate, 'day');
			return [rangeStart, rangeEnd];
		}

		return [0, 0];
	}

	const convertDateRange = (newValue) => {
		const limitStart = dayjs(dateRange.start, 'YYYY-MM-DD');
		const newStartDate = limitStart.add(newValue[0], 'day');
		const newEndDate = limitStart.add(newValue[1], 'day');

		let appliedRange = {
			startDate: newStartDate.format('DD/MM/YYYY'),
			endDate: newEndDate.format('DD/MM/YYYY'),
		};
		return appliedRange;
	}

	const handleChange = (value, newValue) => {
		let appliedRange = convertDateRange(newValue);
        setValue(newValue)
		onChange(appliedRange);
	}

	const handleAllGraphsRangeSet = (value, newValue) => {
        console.log("triggering handleAllGraphsRangeSet onCommitted")
		// let appliedRange = convertDateRange(newValue);
		// dispatch(setVisualizeDateRange(appliedRange));
	}

	const sliderValue = getRange(appliedRange)

	return (
		<Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
			<Slider
				value={value}
				onChange={handleChange}
				onChangeCommitted={handleAllGraphsRangeSet}
				valueLabelDisplay="auto"
				disableSwap
				sx={{ color: '#757575' }}
				min={0}
				max={maxValue.current}
				valueLabelFormat={(value) => {
					const limitStart = dayjs(dateRange.start, 'YYYY-MM-DD');
					const newStartDate = limitStart.add(value, 'day').format('MMM DD, YYYY');
					return <div>{newStartDate}</div>;
				}}
			/>
		</Box>
	);
}

export default memo(DateSlider);
