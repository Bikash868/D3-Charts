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
			{x: 1,y:8},
			{x: 5,y:6},
			{x: 7,y:10},
			{x: 9,y:9.5},
			{x: 12,y:9},
		]
	},
	{
		color: "green",
		display_marker: "circle",
		name: 'course B',
		opacity: 1,
		type: 'scatter',
		value: [
			{x: 1,y:3},
			{x: 5,y:4},
			{x: 7,y:1},
			{x: 9,y:6},
			{x: 12,y:12},
		]
	},
	{
		color: "orange",
		display_marker: "circle",
		name: 'course C',
		opacity: 1,
		type: 'scatter',
		value: [
			{x: 1,y:2},
			{x: 5,y:3},
			{x: 7,y:4},
			{x: 9,y:3},
			{x: 12,y:6},
		]
	},
	{
		color: "blue",
		display_marker: "circle",
		name: 'course D',
		opacity: 1,
		type: 'scatter',
		value: [
			{x: 1,y:6},
			{x: 5,y:5.5},
			{x: 7,y:7.75},
			{x: 9,y:11},
			{x: 12,y:10.5},
		]
	},
	{
		color: "rgb(1, 166, 240)",
		display_marker: "line",
		name: 'Avg',
		opacity: 1,
		type: 'line',
		value: [
			{x: 1,y:4},
			{x: 5,y:5},
			{x: 7,y:7},
			{x: 9,y:9},
			{x: 12,y:10},
		]
	}
]

const ScatterPlotParent = (props) => {
	const {
		name,
		data,
		axisLabel,
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
					x: axisLabel.x,
					y: axisLabel.y,
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
				<Tooltip id="tooltip" />
			</ChartContainer>
    	</div>
	)
};

export default memo(ScatterPlotParent);
