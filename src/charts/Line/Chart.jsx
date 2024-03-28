import React from 'react';
import { useState } from 'react';
import * as d3 from 'd3';
import {useWindowResize} from '../../hooks';
import { getWindowDimensions } from '../../utils';

const dateFormat = (format, date) => {
	return dayjs(date).format(format);
};


export const LineChart = (props) => {
	const {
		name,
		tooltip,
		lineType,
		dimensions,
		axisTicks,
		boundaries,
		axisLabels,
		forcedBoundaries,
		additionalParams,
		datasets,
		valueFormat
	} = props.data;

	const { margin = {} } = dimensions;
	const { y: yAxisTickFormat } = axisTicks;
	const { percentage } = additionalParams;
	const { x: xType, y: yType } = valueFormat;
	const { x: xAxisLabel, y: yAxisLabel } = axisLabels;
	const { discrete: is_discrete, forecasted: is_forecasted } = lineType;

	const { x: xf, y:yf } = forcedBoundaries;
	let { xMin = 0, xMax = 0, yMin = 0, yMax = 0 } = boundaries;

	const { generator } = tooltip;
	const { slide } = tooltip.type;
	const { x: formatXtooltip, y: formatYtooltip } = tooltip.format;

	const idName = `line-${name}`;
	var verticalLine = '';
	const lineTooltip = d3.select('#tooltip');
	const defaultDim = { width: null, height: null };
	const [prevItems, setPrevItems] = React.useState([]);
	const [windowDimensions, setWindowDimensions] = useState(defaultDim);

	const container = document.getElementById(idName);
	const width = container?.offsetWidth - margin.left - margin.right;
	const height = container?.offsetHeight - margin.top - margin.bottom;

	// console.log("datasets:",datasets)

	useWindowResize(() => {
		setWindowDimensions(getWindowDimensions());
	});

	React.useEffect(() => {
		drawChart();
	}, [props, windowDimensions]);

	const yAxisTitleShift = (val, percentage) => {
		let value = val.toFixed(1);
		let len = value.toString().length - 6 + (percentage ? 1 : 0);
		return -(0.75 * len + 0.25) * 16; // 0.75: text size in rem 0.25:spacing
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

	function drawChart() {
		//Remove old svg
		d3.select(`#${idName}`).select('svg').remove();

		// console.log("added new svg")
		const svg = d3
			.select(`#${idName}`)
			.append('svg')
			.attr('width', 'calc(100%)')
			.attr('height', 'calc(100%)')
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		if (datasets.length && width && height) {
			xMin = d3.min(datasets, (dataset) =>
					d3.min(dataset.data, (d) => (xType === 'date' ? new Date(d.x) : d.x))
				),
				xMax = d3.max(datasets, (dataset) =>
					d3.max(dataset.data, (d) => (xType === 'date' ? new Date(d.x) : d.x))
				);

			yMin = d3.min(datasets, (dataset) =>
					d3.min(dataset.data, (d) => (yType === 'date' ? new Date(d.y) : d.y))
				),
			yMax = d3.max(datasets, (dataset) =>
					d3.max(dataset.data, (d) => (yType === 'date' ? new Date(d.y) : d.y))
				);

			//Configure X domain
			const xScale = d3.scaleTime().domain([xMin, xMax]).range([0, width]);

			//Configure Y domain
			const yScale = d3
				.scaleLinear()
				.domain([yMin, yMax])
				.range([height-margin.bottom-margin.top, 0]);

			const xAxis = d3
				.axisBottom(xScale)
				.ticks();

			const xAxisGroup = svg
				.append('g')
				.attr('transform', `translate(0, ${height-margin.top-margin.bottom})`)
				.call(xAxis);

			xAxisGroup
				.select('.domain')
				.attr('color', '#CBD5E1')
				.attr('stroke-width', 0.5)

			xAxisGroup.selectAll('line').attr('stroke', '#CBD5E1').attr('stroke-width', 1).attr('opacity', 0.75);

			xAxisGroup.selectAll('text').attr('opacity', 1).attr('color', '#000').attr('font-size', '0.75rem');

			// Add Y grid lines with labels
			const yAxis = d3
				.axisLeft(yScale)
				.ticks(5)
				.tickSize(-width)
				.tickFormat(yAxisTickFormat);

			const yAxisGroup = svg.append('g').call(yAxis);

			yAxisGroup
				.select('.domain')
				.attr('color', '#CBD5E1')
				.attr('stroke-width', 0.5)

			yAxisGroup.selectAll('line').attr('stroke', '#CBD5E1').attr('stroke-width', 1).attr('opacity', 0.25);

			yAxisGroup.selectAll('text').attr('opacity', 1).attr('color', '#000').attr('font-size', '0.75rem');

			function tooltipForLine(event) {
				let mouseX = d3.pointer(event)[0];
				let tooltipString = '',
					tooltipHoverData;

				if (slide) {
					//Showing vertical line
					verticalLine.style('display', null);
					verticalLine.attr('transform', `translate(${mouseX}, 0)`).transition().duration(0).ease(d3.easeLinear);

					const hoveredDataPoints = datasets
						.filter((line) => {
							return line.tooltip;
						})
						.map((d) => {
							const arr = d.data.map((item) => xScale(new Date(item.x)));
							const length = arr.length;

							let index = d3.bisect(arr, mouseX); //d3.bisect(arr, x) => Returns the new index where x needs to be inserted to keep the arr sorted (0 base indexing)
							index = index >= length ? length - 1 : mouseX - arr[index - 1] < arr[index] - mouseX ? index - 1 : index;
							let { y, x } = d.data[index];

							return {
								name: d.name,
								x: formatXtooltip(x),
								y: formatYtooltip(y),
								color: d.color,
							};
						});
					tooltipHoverData = hoveredDataPoints;
				} 

				tooltipString = generator({ data: tooltipHoverData });
				displayTooltip(tooltipString, event);
			}

			const line = d3
				.line()
				.x((d) => xScale(d.x))
				.y((d) =>yScale(d.y))
				// .curve(d3.curveCatmullRom.alpha(0.5));

			const lines = svg
				.selectAll('.line')
				.data(datasets)
				.enter()
				.append('path')
				.attr('fill', 'none')
				.attr('stroke', (d) => d.color)
				.attr('stroke-width', 2)
				.attr('d', (d) => {
					const lineData = d.data.map(l =>({x:new Date(l.x), y:new Date(l.y)}))
					return line(lineData);
				})
				.style('stroke-dasharray', (d) => (d.dashed ? '3,3' : ''))
				.style('stroke-opacity', (d) => d.opacity)


			// Use stroke-dashoffset for transition
			lines.each((d, i, nodes) => {
				const element = nodes[i],
					name = d.name;
				const length = element.getTotalLength();
				if (!prevItems.includes(name)) {
					d3.select(element)
						.attr('stroke-dasharray', `${length},${length}`)
						.attr('stroke-dashoffset', length)
						.attr('stroke-width', 2)
						.transition()
						.duration(750)
						.ease(d3.easeLinear)
						.attr('stroke-dashoffset', 0);
				}

                const { color, opacity: shapeOpacity } = d;

                var shapes = svg
                    .selectAll('shape')
                    .data(d.data)
                    .enter()
                    .append(() => {
                        return document.createElementNS(d3.namespaces.svg, 'circle');
                    });

                shapes.each(function (d) {
                    d3.select(this)
                        .attr('r', is_discrete ? 3.5 : 0)
                        .attr('cx', (d) => xScale(d.x))
                        .attr('cy', (d) => yScale(d.y))
                        .style('fill', color)
                        .attr('opacity', shapeOpacity)
                        .append('title');
                });
			});



			setPrevItems(datasets.map(({ name }) => name));

			//Adding y axis labels
			let yTitleShift = yAxisTitleShift(yMax, percentage);
			svg
				.append('text')
				.attr('text-anchor', 'middle')
				.attr('dx', -height / 2)
				.attr('transform', `rotate(-90) translate(0, ${yTitleShift})`)
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

			if (slide) {
				verticalLine = svg
					.append('line')
					.attr('y1', 0)
					.attr('y2', height)
					.attr('stroke', '#313B46')
					.attr('stroke-width', '0.5px')
					.style('display', 'none');

				svg
					.append('rect')
					.attr('class', 'overlay')
					.attr('width', width)
					.attr('height', height)
					.attr('fill', 'transparent')
					.style('background', 'transparent')
					.on('mouseover', tooltipForLine)
					.on('mousemove', tooltipForLine)
					.on('mouseout', () => {
						verticalLine.transition().duration(0).ease(d3.easeCubicInOut).style('display', 'none');
						lineTooltip.transition().duration(0).ease(d3.easeCubicInOut).style('display', 'none');
					});
			}
		}
	}

	return <div id={`${idName}`} style={{ height: '100%', width: '100%', display: 'flex', flexGrow: '1'}} />;
};