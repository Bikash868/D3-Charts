import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {isEmpty} from 'lodash';
import { Grid } from '@mui/material';

import { LineChart } from './Chart';
import { Tooltip } from './elements';
import { ChartContainer } from './elements';
import { AppBarTitle } from '@components/AppBar/Title';
import { SelectDropDown } from '@components/SelectDropDown';

// export const generateTooltip = ({ data }) => {
// 	console.log("Data:",data)
// 	const tooltipString = data
// 		.map((d) => {
// 			return `<span style="font-family:cursive;">${d.name}&nbsp;:&nbsp;${d.x}&nbsp;&nbsp;<strong style="color: ${d.color};">${d.y}</strong></span>`;
// 		})
// 		.join('');

// 	return tooltipString;
// };

export const generateTooltip = ({ data }) => {
	const tooltipString = data
		.map((d) => {
			return `<span style="font-family:cursive;">${d.x}&nbsp;&nbsp;<strong style="color: ${d.color};">${d.y}</strong></span>`;
		})
		.join('');

	return tooltipString;
};

export default (props) => {
	const { name, isDiscrete, axisLabel, title, data } = props;
	const [lineData, setLineData] = useState({});
	const [selectedFrequency, setSelectedFrequency] = useState('Monthly');
	const frequencyOptions = ['Monthly', 'Weekly'];
	const departmentOptions = ["HR", "Lead", "Manager","BA"]

	useEffect(() => {
		console.log('in line chart props chane',data)
		const applyMargin = {
			top: 10,
			bottom: 20,
			left: 85,
			right: 30,
		};

		let lineConfig = {
			name: name,
			lineType: {
				discrete: false,
				forecasted: false,
			},
			datasets: data,
			axisLabels: {
				x: axisLabel.x,
				y: axisLabel.y,
			},
			axisTicks: {
				x: (val) => val,
				y: (val) => { return `${val/1000000} M`},
			},
			valueFormat: {
				x: 'date',
				y: 'number'
			}
			,
			dimensions: {
				margin: applyMargin,
				padding: {
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				},
			},
			tooltip: {
				generator: generateTooltip,
				type: {
					slide: true,
				},
				format: {
					x: (val) => (val),
					y: (val) => (Number.parseFloat(val).toFixed(1)),
				},
			},
			boundaries: {
				xMin: 0,
				xMax: 0,
				yMin: 0,
				yMax: 0,
			},
			forcedBoundaries: {
				x: undefined,
				y: undefined,
			},
			additionalParams: {
				percentage: false,
			},
		};

		setLineData(lineConfig);
	}, [data]);

	const onFrequencyChange = (e) => {
		const selectedOption  = e.target.value;
		setSelectedFrequency(selectedOption);

		// const isMonthly = selectedOption === 'Monthly';
		// const xLabel = isMonthly ? 'Months' : 'Weeks';
		// const newDataSet =  isMonthly ? MonthlyData : WeeklyData;

		// setLineData({
		// 	...lineData,
		// 	datasets: newDataSet,
		// 	axisLabels: {
		// 		...lineData.axisLabels,
		// 		x: xLabel
		// 	}
		// })

	}

	return (
		<div style={{padding:'1rem', boxShadow: '0px 2px 9px 0px rgba(0, 0, 0, 0.12)',background:'#fff', borderRadius:'0.25rem'}}>
			<Grid container gap={2} justifyContent={'space-between'}>
				<Grid item>
					<AppBarTitle title={title}/>
				</Grid>
				{/* <Grid item sx={{display:'flex', width:'15rem'}}>
					<SelectDropDown  options={frequencyOptions} onSelect={onFrequencyChange} selectedValue={selectedFrequency} />
					<SelectDropDown  options={departmentOptions} onSelect={()=>{}} selectedValue={'HR'} applyMargin/>
				</Grid> */}
			</Grid>
			{!isEmpty(lineData) && (
				<ChartContainer>
					<LineChart data={lineData}/>
					<Tooltip id="tooltip" />
				</ChartContainer>
			)}
		</div>
	);
};

/*
{
	name: '',
	chartType: 'line',
	lineType: {
		discrete: false,
		forecasted: false,
	}
	datasets:[
		{
			name: '',
			display_marker: '',
			dashed: false,
			color: '',
			items: [{
				date:'',
				value:''
			}],
		},
		{
			name: '',
			display_marker: '',
			dashed: false,
			color: '',
			items: [{
				date:'',
				value:''
			}],
		}
	],
	axisLabels: {
		x:'',
		y:''
	},
	axisTicks: {
		x: 'string', //Ideally it should be functions
		y: 'percentage' || 'currency' //Ideally it should be functions
	},
	dimension: {
		margin: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		},
		padding: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		}
	},
	tooltip: {
		type: {
			static: true,
			slide: false,
		},
		format: {
			x: () => {},
			y: () => {}
		}
	},
	shape: {
		type: 'line',
		datasets:[]
	}
}

ANY ADDITIONAL PROPS
 */
