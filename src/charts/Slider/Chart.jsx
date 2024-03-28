import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { makeStyles } from '@mui/styles';
import { getWindowDimensions } from '@utils';
import { singleNpsbarColors } from '@constants';

const useStyles = makeStyles(() => ({
	container: {
		height: '100%',
		width: '100%',
		display: 'flex',
		// border: '1px solid green',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

const data = [25, 25, 25, 25, 25, 25, 25, 25];

export default ({ score, name, dimensions }) => {
	const classes = useStyles();
	const chartContainer = useRef();
	const idName = `single-nps-${name}`;
	const { margin } = dimensions;
	const min_value = -100,
		max_value = 100;

	const defaultDim = { width: null, height: null };
	const [windowDimensions, setWindowDimensions] = useState(defaultDim);

	useEffect(() => {
		setWindowDimensions(getWindowDimensions()); // Necessary to make sure dimensions are set upon initial load

		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		drawChart();
	}, [score, windowDimensions]);

	function drawChart() {
		//Remove old svg
		d3.select(`#${idName}`).select('svg').remove();

		//Create new svg
		const svg = d3
			.select(`#${idName}`)
			.append('svg')
			.attr('width', 'calc(100%)')
			.attr('height', 'calc(100%)')
			.append('g')
			.attr('transform', 'translate(10, 50)');

		const container = document.getElementById(idName);
		const clientWidth = container.offsetWidth - margin.left - margin.right;
		const clientHeight = container.offsetHeight - margin.top - margin.bottom;

		const width = chartContainer.current.clientWidth;
		const height = chartContainer.current.clientHeight;
		if (score >= -100 && score <= 100) {
			const barGap = 1.5;
			const barWidth = (clientWidth - 7 * barGap - margin.left) / 8,
				barHeight = 60;

			const bars = svg
				.selectAll('rect')
				.data(data)
				.enter()
				.append('rect')
				.attr('x', (d, i) => i * (barWidth + barGap))
				.attr('y', 0)
				.attr('width', barWidth)
				.attr('height', barHeight)
				.style('fill', (d, i) => singleNpsbarColors[i])
				.style('rx', '2px');

			// Text Labels
			const labels = svg
				.append('g')
				.attr('transform', 'translate(0, 40)')
				.selectAll('text')
				.data(d3.range(min_value, max_value + 1, 25))
				.enter()
				.append('text')
				.attr('x', (d, i) => i * (barWidth + barGap))
				.attr('y', 0)
				.attr('text-anchor', 'middle')
				.text((d) => d)
				.attr('transform', `translate(0,40)`)
				.style('font-size', '10px');

			//Center triangle
			const centerX2 = (8 * barWidth + 7 * barGap) / 2;
			const centerY2 = barHeight;

			const topX2 = centerX2;
			const topY2 = centerY2 - 8;

			const leftX2 = centerX2 - 13;
			const leftY2 = centerY2 + 8;

			const rightX2 = centerX2 + 13;
			const rightY2 = centerY2 + 8;

			const diff = max_value - min_value;
			const calculatedPercentage = (score - min_value) / diff; //Calculating % shift of score from min_value and max_value

			//Calculating how much angle should a value take in the total arc(288 deg)
			let xShift = calculatedPercentage * (8 * barWidth + 7 * barGap) - centerX2;

			//bar: 243 triangle:243.5
			var moveableBar = svg
				.append('path')
				.attr('d', `M ${centerX2} 0 L ${centerX2} ${barHeight}`)
				.attr('stroke', '#fff')
				.attr('stroke-width', '2.5')
				.transition()
				.duration(1000)
				.attr('transform', `translate(${xShift - 0.5},0)`);

			var needle2 = svg
				.append('path')
				.attr('class', 'needle2')
				.attr('d', `M ${leftX2} ${leftY2} L ${topX2} ${topY2} L ${rightX2} ${rightY2}`)
				.style('fill', '#475581')
				.transition()
				.duration(1000)
				.attr('transform', `translate(${xShift},0)`)
				.attr('stroke', '#fff')
				.attr('stroke-width', '2.5');

			svg
				.append('rect')
				.attr('x', centerX2 - 25)
				.attr('y', -40)
				.attr('width', 50)
				.attr('height', 30)
				.attr('stroke', '#F2F4F7')
				.attr('stroke-width', 2)
				.style('fill', '#fff')
				.style('rx', 4)
				.transition()
				.duration(1000)
				.attr('transform', `translate(${xShift - 0.5},0)`);

			svg
				.append('text')
				.attr('x', centerX2)
				.attr('y', -20)
				.text(score)
				.attr('font-size', '0.95rem')
				.attr('text-anchor', 'middle')
				.attr('font-weight', 600)
				.transition()
				.duration(1000)
				.attr('transform', `translate(${xShift},0)`);
		} else {
			console.log('Data is not available');
		}
	}

	return <div className={classes.container} id={`${idName}`} ref={chartContainer}></div>;
};
