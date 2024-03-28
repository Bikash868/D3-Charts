import React from 'react';
import { memo } from 'react';
import * as d3 from 'd3';
import PT from 'prop-types';
import { useState } from 'react';
import { isEmpty } from 'lodash';
// import { tooltip } from '@components/ChartTooltip';
import {useWindowResize} from '../../hooks';
import { getWindowDimensions } from '../../utils';

function PieChart(props) {
	const { name, datasets: data } = props?.data || {};
	const { isLines = true, centeredText = false, addChartLegend = true } = props?.data?.additionalProps || {};

	const idName = `pie-${name}`;
	const defaultDim = { width: null, height: null };
	const [windowDimensions, setWindowDimensions] = useState(defaultDim);

	const container = document.getElementById(idName);
	const width = container?.offsetWidth;
	const height = container?.offsetHeight;

	useWindowResize(() => {
		setWindowDimensions(getWindowDimensions());
	});

	React.useEffect(() => {
		drawChart();
	}, [props, windowDimensions]);

	function midAngle(d) {
		return d.startAngle + (d.endAngle - d.startAngle) / 2;
	}

	// function displayTooltip(event, d) {
	// 	let num = d.value * 100;
	// 	num = num.toFixed(1); //.replace(/\.00$/, '');
	// 	let text = `${d.data.label}: ${num} %`;
	// 	tooltip
	// 		.html(text)
	// 		.style('left', event.pageX + 10 + 'px')
	// 		.style('top', event.pageY - 28 + 'px')
	// 		.style('top', event.pageY - 28 + 'px')
	// 		.style('font-size', '0.85rem')
	// 		.style('display', 'flex');
	// }

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
			.style('transform', `translate(${addChartLegend ? '30%' : '50%'}, 50%)`);

		if (!isEmpty(data) && width && height) {
			//translating the graph to center
			const innerRadius = 0;
			const outerRadius = (Math.min(height, width) * 45) / 100; //40% of height
			const outerRadiusBreak = (Math.min(height, width) * 47) / 100; //40% of height

			// create an arcGenerator which will be used to draw the sectors of the pie
			const arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

			const arcGeneratorForLine = d3
				.arc()
				.innerRadius(outerRadius * 0.75)
				.outerRadius(outerRadius);

			var outerArc = d3.arc().outerRadius(outerRadiusBreak).innerRadius(outerRadiusBreak);

			//compute the necessary angles to represent our data as a pie
			const pieGenerator = d3
				.pie()
				.padAngle(0)
				.value((d) => d.value)
				.sort((a, b) => a.value - b.value)
				.startAngle(Math.PI / 4)
				.endAngle(Math.PI * 2 + Math.PI / 4);

			//svg group with the computed data
			var arc = svg.selectAll().data(pieGenerator(data)).enter();

			//Append path to each sector
			arc
				.append('path')
				.attr('d', arcGenerator)
				.style('fill', (d) => d.data.color)
				.style('stroke', '#ffffff')
				.style('stroke-width', 0)
				.style('pointer-events', 'all')
				// .on('mouseover', function (event, d) {
				// 	return displayTooltip(event, d);
				// })
				// .on('pointermove', (event, d) => {
				// 	return displayTooltip(event, d);
				// })
				// .on('mouseout', function () {
				// 	tooltip.transition().duration(0).ease(d3.easeCubicInOut).style('display', 'none');
				// });

			//Append text labels
			if (centeredText) {
				arc
					.append('text')
					.attr('text-anchor', 'middle')
					.attr('alignment-baseline', 'middle')
					.text((d) => {
						let num = d.value * 100;
						let text = `${num.toFixed(1)} %`;
						return text;
					})
					.style('fill', '#fff')
					.style('font-size', '0.75em')
					.attr('transform', (d) => {
						const [x, y] = arcGenerator.centroid(d); //positioning text labels wrt to centroid of pie
						return `translate(${x}, ${y})`;
					});
			}

			if (addChartLegend) {
				const xTranslateLegend = (width * 50) / 100;
				//adding legends
				var legendG = svg
					.selectAll('.legend')
					.data(pieGenerator(data))
					.enter()
					.append('g')
					.attr('transform', function (d, i) {
						return `translate(${xTranslateLegend}, ${10 + -20 * i})`;
					})
					.attr('class', 'legend')
					.style('margin', 2);

				legendG
					.append('circle')
					.attr('r', '0.225em')
					.attr('fill', (d) => d.data.color)
					.attr('transform', function () {
						return `translate(${-2}, ${5})`;
					});

				legendG
					.append('text')
					.text(function (d) {
						let num = d.value * 100;
						num = num.toFixed(1); //.replace(/\.00$/, '');
						return `${d.data.label} : ${num} %`;
					})
					.style('font-size', '0.75em')
					.attr('y', 10)
					.attr('x', 11);
			}

			if (isLines) {
				let textPos = width * 0.25;
				arc
					.append('text')
					.attr('transform', function (d) {
						var pos = outerArc.centroid(d);
						pos[0] = midAngle(d) < Math.PI ? textPos + 5 : -(textPos + 40);
						return 'translate(' + pos + ')';
					})
					.text(function (d) {
						let num = d.value * 100;
						num = num.toFixed(1); //.replace(/\.00$/, '');
						return `${num} %`;
					})
					.style('font-size', '0.75em')
					.attr('dy', '0.25em');
				arc
					.append('polyline')
					.attr('stroke', '#616161')
					.attr('stroke-width', 0.5)
					.attr('fill', 'none')
					.attr('points', function (d) {
						var posA = arcGeneratorForLine.centroid(d); // line insertion in the slice
						var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
						var posC = outerArc.centroid(d); // Label position = almost the same as posB
						posC[0] = textPos * (midAngle(d) <= Math.PI ? 1 : -1);
						return [posA, posB, posC];
					});
			}
		} else {
			//Add loading here
		}
	}

	return <div id={`${idName}`} style={{ height: '100%', width: '100%', display: 'flex', flexGrow: '1'}} />;
}

export default memo(PieChart);

PieChart.propTypes = {
	data: PT.shape({
		name: PT.string.isRequired,
		datasets: PT.object.isRequired,
		isLines: PT.bool,
		addChartLegend: PT.bool,
		additionalProps: PT.object,
	}),
};
