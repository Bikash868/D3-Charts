import React, { memo } from 'react';
import Chart from './Chart';
import { isEmpty } from 'lodash';
import { Tooltip } from '../Line/elements';
import { ChartContainer } from '../Line/elements';
import { percentageFormat, currencyFormat, numberFormat, dateFormat } from '../../utils';

export const generateTooltip = ({ data }) => {
	const tooltipString = data
		.map((d) => {
			return `<span>${d.name}&nbsp;:&nbsp;${d.date}&nbsp;&nbsp;<strong style="color: ${d.color};">${d.value}</strong></span>`;
		})
		.join('');

	return tooltipString;
};

const demoData = [
	{
		color: "yellow",
		display_marker: "circle",
		name: 'course A',
		opacity: 1,
		type: 'scatter',
		value: [
			{x: 1,y:8, r: 1},
			{x: 1.25,y:7, r: 6},
			{x: 3,y:10, r: 10},
			{x: 4,y:9.5, r: 9.5},
			{x: 3.5,y:9, r: 2},
            {x: 3.75,y:9, r: 9},
            {x: 4.5,y:9, r: 4},
		]
	},
	{
		color: "green",
		display_marker: "circle",
		name: 'course B',
		opacity: 1,
		type: 'scatter',
		value: [
			{x: 1,y:3, r: 1},
			{x: 2.5,y:4, r: 4},
			{x: 3.75,y:1, r: 1},
			{x: 2.25,y: 3.5, r: 6},
			{x: 4.15,y:4, r: 12},
            {x: 2.5,y: 2.5, r: 6},
			{x: 4.35,y:4, r: 12},
		]
	},
	{
		color: "orange",
		display_marker: "circle",
		name: 'course C',
		opacity: 1,
		type: 'scatter',
		value: [
			{x: 8.5,y:2, r: 10},
			{x: 8,y:1.3, r: 1},
			{x: 9,y:0.6, r: 0.5},
			{x: 10,y:3.5, r: 3},
			{x: 12,y:4.25, r: 4},
            {x: 8.75,y:3.5, r: -4},
			{x: 10.3,y:4.25, r: 4},
		]
	},
	{
		color: "blue",
		display_marker: "circle",
		name: 'course D',
		opacity: 1,
		type: 'scatter',
		value: [
			{x: 7.3,y:7.5, r: 0},
			{x: 8,y:8.25, r: 3},
			{x: 9.5,y:10.5, r: 14},
			{x: 9.21,y:9.2, r: 11},
			{x: 9.4,y:8.25, r: 12},
            {x: 9.51,y:9.2, r: 11},
			{x: 8.4,y:7, r: 12},
		]
	},
]

const BubblePlotParent = (props) => {
	const {
		name,
		data,
		xAxisLabel = 'Courses',
		yAxisLabel = 'Values',
		percentage = false,
		xCoordinate = 'x',
		xType = 'number',
		yCoordinate = 'y',
		yType = 'number',
		tooltip_date_format = 'MM/DD/YYYY',
		yaxis_currency_type = '',
	} = props;
	const [lineScatterData, setLineScatterData] = React.useState({});
	const applyMargin = {
		top: 10,
		bottom: 20,
		left: 50,
		right: 30,
	};
	React.useEffect(()=>{

		if(!isEmpty(demoData)) {
			const yAxisFormat = percentage ? percentageFormat : yaxis_currency_type ? currencyFormat : numberFormat;
		
			let chartData = {
				name: name,
				datasets: demoData, //[{line data},{scatter data}]
				coordinates: {
					x: {
						name: xCoordinate,
						type: xType,
					},
					y: {
						name: yCoordinate,
						type: yType,
					},
				},
				axisLabels: {
					x: xAxisLabel,
					y: yAxisLabel,
				},
				axisTicks: {
					x: (val) => val,
					y: yAxisFormat,
				},
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
						x: (val) => dateFormat(tooltip_date_format, val),
						y: yAxisFormat,
					},
				},
			};

			setLineScatterData(chartData);
		}

	},[])

	// return (
	// 	<>
	// 		{!isEmpty(lineScatterData) && (
	// 			<ChartContainer>
	// 				<Chart data={lineScatterData} percentage={percentage} />
	// 				<Tooltip id="tooltip" />
	// 			</ChartContainer>
	// 		)}
	// 	</>
	// );

	return (
		<div style={{padding:'1rem', boxShadow: '0px 2px 9px 0px rgba(0, 0, 0, 0.12)',background:'#fff', borderRadius:'0.25rem'}}>
			<p style={{fontSize:'1.25rem', fontWeight:600, marginLeft:'0.5rem'}}>Average time spent</p>
			<ChartContainer>
				{!isEmpty(lineScatterData) && (
					<Chart data = {lineScatterData}/>
				)}
			</ChartContainer>
    	</div>
	)
};

export default memo(BubblePlotParent);
