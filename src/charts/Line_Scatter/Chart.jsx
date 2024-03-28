import * as d3 from 'd3';
import React from 'react';
import { isEmpty } from 'lodash';
import { useWindowResize } from '../../hooks';
import { getWindowDimensions } from '../../utils';

/**
 *
 * @param   r              - Radius of dots in px
 * @param   opacity        - Sets the transparency
 * @param   stroke-width   - Sets the width of the stroke(line)
 * @param   stroke         - Defines the color of the outline of line
 * @param   fill           - Defines the fill color for the interior of a shape
 *
 * Info: Please update the json file in the realdata.json file if you add more data sets or data points for scatter and line charts.
 */
  
const ScatterPlot = (props) => {
	const { name, dimensions, axisLabels, axisTicks, tooltip, datasets: data, coordinates } = props.data;
	const { margin } = dimensions;
	const { y: yAxisTickFormat } = axisTicks;
	const { x: formatXtooltip, y: formatYtooltip } = tooltip.format;
	const { x: xAxisLabel, y: yAxisLabel } = axisLabels;
	const { name: xCoordinate, type: xType } = coordinates.x;
	const { name: yCoordinate, type: yType } = coordinates.y;
	const { generator } = tooltip;
	const { slide } = tooltip.type;
	let { percentage } = props;
	const idName = `scatterplot-${name}`;
	const lineTooltip = d3.select('#tooltip');
	const defaultDim = { width: null, height: null };
	const [windowDimensions, setWindowDimensions] = React.useState(defaultDim);

	const container = document.getElementById(idName);
	const width = container?.offsetWidth - margin.left - margin.right;
	const height = container?.offsetHeight - margin.top - margin.bottom;

	const yAxisTitleShift = (val, percentage) => {
		let value = val.toFixed(1);
		let len = value.toString().length - 1 + (percentage ? 1 : 0);
		return -(0.75 * len + 0.25) * 16;
	};

	function displayTooltip(str = '', event) {
		const mouseX = d3.pointer(event)[0];
		const hposition = width - mouseX < 250 ? event.pageX - 250 : event.pageX + 10;
		lineTooltip
			.html(`${str}`)
			.style('left', hposition + 'px')
			.style('top', event.pageY - 28 + 'px')
			.style('font-size', '0.85rem')
			.style('display', 'flex');
	}

	useWindowResize(() => {
		setWindowDimensions(getWindowDimensions());
	});

	React.useEffect(() => {
		drawChart();
	}, [props, windowDimensions]);

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
			.attr('transform', `translate(${margin.left},${margin.top})`);

		if (!isEmpty(data) && width && height) {
			var verticalLine = '';

			const graphXmin = d3.min(data, (dataset) =>
					d3.min(dataset.value, (d) => d.x)
				),
				graphXmax = d3.max(data, (dataset) =>
					d3.max(dataset.value, (d) => d.x)
				);

			let graphYmin = d3.min(data, (dataset) =>
					d3.min(dataset.value, (d) => d.y)
				),
				graphYmax = d3.max(data, (dataset) =>
					d3.max(dataset.value, (d) => d.y)
				);

			//Configure X domain
			const xScale = d3.scaleLinear().domain([0, graphXmax]).range([0, width]);

			//Configure Y domain
			const yScale = d3
				.scaleLinear()
				.domain([0, graphYmax])
				.range([height-margin.bottom-margin.top, 0]);
			
			//Axis
			const x = d3
				.axisBottom(xScale)
				.ticks();

			const xAxisGroup = svg
				.append('g')
				.attr('transform', `translate(0, ${height-margin.top- margin.bottom})`)
				.call(x);

			xAxisGroup
				.select('.domain')
				.attr('color', '#CBD5E1')
				.attr('stroke-width', 0.5)

			xAxisGroup.selectAll('line').attr('stroke', '#CBD5E1').attr('stroke-width', 1).attr('opacity', 0.75);

			// Add Y grid lines with labels
			const yAxis = d3.axisLeft(yScale).ticks();

			const yAxisGroup = svg.append('g').call(yAxis);

			yAxisGroup.select('.domain')
				.attr('color', '#CBD5E1')
				.attr('stroke-width', 0.5)
			
			yAxisGroup.selectAll('line').attr('stroke', '#CBD5E1').attr('stroke-width', 1).attr('opacity', 0.25);
			

			function tooltipForLine(event, d) {
				let mouseX = d3.pointer(event)[0],
					arr = d.values.map((item) => {
						return xScale(new Date(item.date));
					});
				const length = arr.length;
				let index = d3.bisect(arr, mouseX); //d3.bisect(arr, x) => Returns the new index where x needs to be inserted to keep the arr sorted (0 base indexing)

				index = index >= length ? length - 1 : mouseX - arr[index - 1] < arr[index] - mouseX ? index - 1 : index;

				let { value, date } = d.values[index];
				const singleLineTooltipObj = {
					name: d.name,
					date: formatXtooltip(date),
					value: formatYtooltip(value),
					color: d.color,
				};
				const tooltipString = generator({ data: [singleLineTooltipObj] });

				if (slide) {
					verticalLine.style('display', null);
					verticalLine.attr('transform', `translate(${mouseX}, 0)`).transition().duration(0).ease(d3.easeLinear);
				}

				displayTooltip(tooltipString, event);
			}

			//Define line
			const line = d3
				.line()
				.x((d) => xScale(d.x))
				.y((d) => yScale(d.y));

			data.forEach((dataset) => {
				const {type, value, color, name} = dataset;
				if(type === 'line') {
					svg
						.selectAll('.line')
						.data([dataset])
						.enter()
						.append('path')
						.attr('fill', 'none')
						.attr('stroke', color)
						.attr('stroke-width', 2)
						.attr('d', (d) => line(d.value))
						.style('stroke-opacity', 1)
						// .on('mouseover', (e) => tooltipForLine(e, lineDataWithSD))
						// .on('pointermove', (e) => tooltipForLine(e, lineDataWithSD))
						// .on('mouseout', () => {
						// 	if (slide) {
						// 		verticalLine.transition().duration(0).ease(d3.easeCubicInOut).style('display', 'none');
						// 	}
						// 	tooltip.transition().duration(0).ease(d3.easeCubicInOut).style('display', 'none');
						// });
				} else if(type === 'scatter') {
					svg
						.append('g')
						.selectAll('.dot')
						.data(value)
						.join('circle')
						.attr('cx', (d) => xScale(d.x))
						.attr('cy', (d) => yScale(d.y))
						.attr('r', 5)
						.style('fill', color)
						.attr('opacity', 0.75);

				}
			})

			//Adding Axis labels
			svg
				.append('text')
				.attr('text-anchor', 'middle')
				.attr('dx', -height / 2)
				.attr('transform', `rotate(-90) translate(0, ${-35})`)
				.text(yAxisLabel)
				.style('font-size', '1rem')
				.style('fill', '#000')
				.attr('opacity', 1);

			svg
				.append('text')
				.attr('text-anchor', 'middle')
				.attr('dx', width / 2)
				.attr('transform', `translate(${0}, ${height+margin.bottom})`)
				.text(xAxisLabel)
				.style('font-size', '1rem')
				.style('fill', '#000')
				.attr('opacity', 1);

			// if (slide) {
			// 	verticalLine = svg
			// 		.append('line')
			// 		.attr('y1', 0)
			// 		.attr('y2', height)
			// 		.attr('stroke', '#313B46')
			// 		.attr('stroke-width', '0.5px')
			// 		.style('display', 'none');

			// 	svg
			// 		.append('rect')
			// 		.attr('class', 'overlay')
			// 		.attr('width', width)
			// 		.attr('height', height)
			// 		.attr('fill', 'transparent')
			// 		.style('background', 'transparent')
			// 		.on('mouseover', (e) => tooltipForLine(e, lineDataWithSD))
			// 		.on('mousemove', (e) => tooltipForLine(e, lineDataWithSD))
			// 		.on('mouseout', () => {
			// 			verticalLine.transition().duration(0).ease(d3.easeCubicInOut).style('display', 'none');
			// 			lineTooltip.transition().duration(0).ease(d3.easeCubicInOut).style('display', 'none');
			// 		});
			// }
		}
	}

	return <div id={`${idName}`} style={{ height: '100%', width: '100%' }} />;
};

export default ScatterPlot;
