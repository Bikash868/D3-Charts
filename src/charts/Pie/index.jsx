import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';

import Chart from './Chart';
import { ChartContainer } from '../Line/elements';

const demoPieData = [{
	label: 'Management',
	value: 0.23,
	color: '#f34f1c',
},
{
	label: 'Security',
	value: 0.13,
	color: '#34a853',
},
{
	label: 'Sales and Marketing',
	value: 0.09,
	color: '#ffc107',
},
{
	label: 'Testing',
	value: 0.10,
	color: '#01a6f0',
},
{
	label: 'Software Development',
	value: 0.43,
	color: '#4615b2',
}]

export default (props) => {
	const { data, name, metadata } = props;
	const [pieData, setPieData] = useState({});

	useEffect(() => {
		const additionalProps = {
			isLines: true,
			isDefault: false,
			centeredText: false,
			addChartLegend: true,
		};

		if (!isEmpty(demoPieData)) {
			const pieConfig = {
				name: name,
				chartType: 'pie',
				datasets: demoPieData,
				dimension: {
					margin: {
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
					},
					padding: {
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
					},
				},
				tooltip: {
					format: {
						label: (val) => val,
						value: (val) => val,
					},
				},
				additionalProps: additionalProps,
			};
			setPieData(pieConfig);
		}
	}, [props]);

	// return <>{!isEmpty(pieData) && <Chart data={pieData} />}</>;
	return (
		<div style={{padding:'1rem', boxShadow: '0px 2px 9px 0px rgba(0, 0, 0, 0.12)',background:'#fff', borderRadius:'0.25rem'}}>
			<p style={{fontSize:'1.25rem', fontWeight:600, marginLeft:'0.5rem'}}>Course Distribution</p>
			<ChartContainer>
				{!isEmpty(pieData) && (
					<Chart data = {pieData}/>
				)}
			</ChartContainer>
    	</div>
	)
};

/*
PIE CONFIG:
{
	name: '',
	chartType: 'pie',
	datasets:[
		{
			label: '',
			value: '',
			color: '',
		},
		{
			label: '',
			value: '',
			color: '',
		}
	],
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
		format: {
			x: () => {},
			y: () => {}
		}
	},
}
*/
