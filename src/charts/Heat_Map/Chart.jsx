import React from 'react';
import * as d3 from 'd3';
import { useState } from 'react';
import { useEffect } from 'react';
import { useWindowResize } from '../../hooks';
import { getWindowDimensions } from '../../utils';
import { isEmpty } from 'lodash';

const leftStrokeArr = [];
/*
		group
		______________
variable| 12.4
variable| 10.5
*/

export function HeatMapChart(props) {
	const { name, dimensions, additionalProps, colorRange } = props?.data || {};
	const {values: data, groups, vars, groupTooltips, varTooltips } = props?.data || {};
	const { margin } = dimensions;
	const {sortable: isSortable,default: isDefault } = additionalProps;
	const {sortRows: Sort, onClear} = additionalProps;
	const idName = `heatmapChart-container-${name}`;


	const [maxValue, setMaxValue] = useState(0);
	const [minValue, setMinValue] = useState(0);
	const [heatMapData, setHeatMapData] = useState(data || []);
	const [grps, setGrps] = useState(groups || []);
	const [variables, setVariables] = useState(vars || []);
	const [activeSortCell, setActiveSortCell] = useState({}); //cell name by which we are sorting {name:"18-29", value: 0/1/2}
	const defaultDim = { width: null, height: null };
	const [windowDimensions, setWindowDimensions] = useState(defaultDim);

	useWindowResize(() => {
		setWindowDimensions(getWindowDimensions());
	});

	const assignColor = (val,minV, maxV) => {
		let numBuckets = Object.keys(colorRange).length;
		let bucketWidth = (maxV - minV) / numBuckets;
		let bucketId = Math.floor(Math.abs(val - minV) / bucketWidth);

		if (bucketId >= 0 && bucketId <= 20) {
			return  colorRange[bucketId];
		} 
		return ['#fff', '#000'];
	}

	useEffect(() => {
		if(!isEmpty(data)) {
			const arr = data.map(x => x.value);
			const minV = d3.min(arr);
			const maxV = d3.max(arr);

			setGrps(groups);
			setVariables(vars);
			setMinValue(minV);
			setMaxValue(maxV);
			setHeatMapData(data);
			setActiveSortCell({
				name: 'Response',
				value: 0,
			});
		}
	}, [props]);

	useEffect(() => {
		drawChart();
	}, [heatMapData, windowDimensions]);

	// function Sort(event) {
	// 	let classname = event.target.className['animVal'].split(' ')[0];
	// 	if (classname.split('_')[0] === name) {
	// 		let sortBy = classname.split('_')[1];
	// 		let val =
	// 			Object.keys(activeSortCell) === 0 || activeSortCell['name'] !== sortBy ? 1 : activeSortCell['value'] + 1;

	// 		//when graph is not already sorted and you are clicking on reset => Reverse the answer order
	// 		//OR already answer is reversed and you clicked on Response cell => Reverse again
	// 		if ((Object.keys(activeSortCell).length === 0 || activeSortCell?.name === 'Response') && sortBy === 'clear') {
	// 			// take the current instance and reverse it here and then return
	// 			let tempheatMapData = [...heatMapData],
	// 				tempvars = [...variables].reverse(),
	// 				reversedData = [];
	// 			for (const variable of tempvars) {
	// 				const groupData = tempheatMapData.filter((d) => d.variable === variable);
	// 				reversedData = [...reversedData, ...groupData];
	// 			}

	// 			setHeatMapData(reversedData);
	// 			setVariables(tempvars);
	// 			setActiveSortCell({
	// 				name: 'Response',
	// 				value: 0,
	// 			});
	// 			return;
	// 		}

	// 		const { preparedData, groups, vars } = SortByClassName(rawData, sortBy, val);

	// 		setHeatMapData(preparedData);
	// 		setGrps(groups);
	// 		setVariables(vars);

	// 		if (sortBy === 'clear') {
	// 			setActiveSortCell({
	// 				name: 'Response',
	// 				value: val,
	// 			});
	// 		} else {
	// 			setActiveSortCell({
	// 				name: sortBy,
	// 				value: val,
	// 			});
	// 		}
	// 	}
	// }

	// function displayTooltip(event, d) {
	// 	if (d.hasOwnProperty('tooltip')) {
	// 		tooltip
	// 			.html(d.tooltip)
	// 			.style('left', event.pageX + 10 + 'px')
	// 			.style('top', event.pageY - 28 + 'px')
	// 			.style('font-size', '0.85rem')
	// 			.style('display', 'flex');
	// 	}
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
			.append('g');

		const container = document.getElementById(idName);
		const clientWidth = container.offsetWidth;
		const clientHeight = container.offsetHeight;

		const innerWidth = clientWidth - margin.left - margin.right;
		const innerHeight = clientHeight - margin.top - margin.bottom;

		if (heatMapData.length) {
			//Adding empty data for extra cell
			let empty_data = [
				{
					variable: 'Empty',
					group: 'Empty',
					value: '',
				},
			];
			grps.forEach((g) => {
				empty_data.push({
					variable: 'Empty',
					group: g,
					value: g,
					tooltip: groupTooltips[g],
				});
			});
			variables.forEach((g) => {
				empty_data.push({
					variable: g,
					group: 'Empty',
					value: g,
					tooltip: varTooltips[g],
				});
			});

			let updatedData = [...heatMapData, ...empty_data],
				updatedGrps = ['Empty', ...grps],
				updatedVars = ['Empty', ...variables];

			const firstColumnWidth = innerWidth * 0.25;
			const firstColumnCellPadding = 10;

			// Build X scales and axis:
			const x = d3.scaleBand().range([firstColumnWidth, innerWidth]).domain(grps).padding(0);

			function customScaleBand(domain, range, padding = 0) {
				const bandSize = (range[1] - range[0]) / domain.length;
				const offset = bandSize * padding;
				const mappingFunction = (value, index) => range[0] + offset + index * bandSize;
				return (value) => mappingFunction(value, domain.indexOf(value));
			}
			const xTest = customScaleBand(grps, [firstColumnWidth, innerWidth], 0);

			const xAxis = d3.axisTop(x).tickSize(0).tickValues([]);
			const xAxisGroup = svg
				.append('g')
				.call(xAxis)
				.style('font-size', '12px')
				.style('line-height', '14px');

			xAxisGroup
				.select('.domain')
				.attr('color', '#CBD5E1')
				.attr('stroke-width', '0.5px');

			// xAxisGroup.select(".domain").remove();

			// Build X scales and axis:
			const y = d3.scaleBand().range([0, innerHeight]).domain(updatedVars).padding(0);

			const yAxis = d3.axisLeft(y).tickSize(0).tickValues([]);

			const yAxisGroup = svg
				.append('g')
				.attr('transform', `translate(${margin.left}, ${margin.top})`)
				.call(yAxis)
				.style('font-size', '12px')
				.style('line-height', '14px');

			yAxisGroup.select('.domain').attr('color', '#CBD5E1').attr('stroke-width', '0.5px');


			// Truncate the text if it exceeds a certain length
			var truncatedText = function (d) {
				const cellwidth = d.group === 'Empty' ? firstColumnWidth : x.bandwidth();
				let charsfit = cellwidth / 8;
				const value = `${d.value.includes('|') ? '∗' : ''} ${d.value}`; //0.85em =13
				const is4kResolution = window.innerWidth >= 2560;

				if (is4kResolution) {
					charsfit = charsfit - 5;
				}

				if (value.length > charsfit) {
					return value.substr(0, charsfit) + '..'; // add an ellipsis at the end of the truncated text
				} else {
					return value;
				}
			};

			//Read the data
			var cells = svg
				.selectAll()
				.data(updatedData, function (d) {
					return d.group + ':' + d.variable;
				})
				.join('rect')
				.attr('class', (d) => {
					return d.variable === 'Empty' ? (d.group === 'Empty' ? `${name}_clear` : `${name}_${d.group}`) : 'cell';
				})
				.attr('x', function (d) {
					const startX = d.group === 'Empty' ? 0 : xTest(d.group);
					return startX;
				})
				.attr('y', function (d) {
					return y(d.variable);
				})
				.attr('width', (d) => {
					const wid = d.group === 'Empty' ? firstColumnWidth : x.bandwidth();
					return wid;
				})
				.attr('height', y.bandwidth())
				.attr('transform', `translate(${margin.left}, ${margin.top})`)
				.style('fill', function (d) {
					const num = d.value;
					if (typeof num === 'string') {
						return '#FFFFFF';
					} else {
						if (d.value < 0) {
							return '#bdbdbd';
						}
						let colorArr = assignColor(num, minValue, maxValue);
						return colorArr[0];
					}
				})
				.style('stroke', '#CBD5E1')
				.attr('stroke-width', '0.5px')
				.style('text-overflow', 'ellipsis') // add an ellipsis at the end of the truncated text
				.style('overflow', 'hidden');

			// if (name === 'ResponseDemographics') {
			// 	var imposedCell = svg
			// 		.selectAll()
			// 		.data(updatedData, function (d) {
			// 			return d.group + ':' + d.variable;
			// 		})
			// 		.join('rect')
			// 		.attr('class', (d) => {
			// 			return d.variable === 'Empty'
			// 				? d.group === 'Empty'
			// 					? `${name}_clear`
			// 					: `${name}_${d.group} visualize_demo_column`
			// 				: 'cell';
			// 		})
			// 		.attr('x', function (d) {
			// 			const startX = d.group === 'Empty' ? 0 : xTest(d.group);
			// 			return startX;
			// 		})
			// 		.attr('y', function (d) {
			// 			return y(d.variable);
			// 		})
			// 		.attr('width', (d) => {
			// 			const wid = d.group === 'Empty' ? firstColumnWidth : x.bandwidth();
			// 			return wid;
			// 		})
			// 		.attr('height', y.bandwidth())
			// 		.attr('transform', `translate(${margin.left}, ${margin.top})`)
			// 		.style('fill', 'transparent')
			// 		.style('stroke', (d) => {
			// 			if (leftStrokeArr.includes(d.group)) {
			// 				return `#555555`;
			// 			} else {
			// 				return 'none';
			// 			}
			// 		})
			// 		.attr('stroke-width', '2px')
			// 		.attr('stroke-dasharray', (d) => {
			// 			if (leftStrokeArr.includes(d.group)) {
			// 				let cellWidth = d.group === 'Empty' ? firstColumnWidth : x.bandwidth(),
			// 					cellHeight = y.bandwidth();
			// 				return `0,${2 * cellWidth + cellHeight},${cellHeight}`;
			// 			} else {
			// 				return 0;
			// 			}
			// 		});

			// 	imposedCell
			// 		.on('mouseover', (event, d) => displayTooltip(event, d))
			// 		.on('pointermove', (event, d) => displayTooltip(event, d))
			// 		.on('mouseout', function () {
			// 			tooltip.transition().duration(0).ease(d3.easeCubicInOut).style('display', 'none');
			// 		});
			// }
			//Uncomment line 444, 478 to align Response text to middle
			var texts = svg
				.selectAll('text')
				.data(updatedData, function (d) {
					return d.group + ':' + d.variable;
				})
				.enter()
				.append('text')
				.text(function (d) {
					let value = d.value;
					//Not adding text if its a default chart
					if (isDefault) return '';
					if (typeof value === 'string') {
						if (d.group === 'Empty') return truncatedText(d);

						return Object.keys(activeSortCell).length === 0
							? `${value}`
							: activeSortCell.name === value
							? activeSortCell.value % 2 == 0
								? `${value}  ${isSortable ? '\u{1F869}' : ''}`
								: `${value}  ${isSortable ? '\u{1F86B}' : ''}`
							: `${value}`;
					} else {
						return value < 0 ? '' : `${value}%`;
					}
				})
				.attr('x', function (d) {
					if (d.group === 'Empty') {
						if (d.variable === 'Empty') {
							//Response ⇅
							// return margin.left + firstColumnWidth / 2;
							return margin.left + firstColumnCellPadding;
						} else {
							return margin.left + firstColumnCellPadding;
						}
					} else {
						return margin.left + xTest(d.group) + x.bandwidth() / 2;
					}
				})
				.attr('y', function (d) {
					return y(d.variable);
				})
				.attr('class', (d) => {
					return d.variable === 'Empty' ? (d.group === 'Empty' ? `${name}_clear` : `${name}_${d.group}`) : 'cell';
				})
				.attr('transform', (d) => {
					let ty = margin.top + y.bandwidth() / 2;
					return `translate(${0}, ${ty})`;
				})
				.style('fill', function (d) {
					const num = d.value;
					if (typeof num === 'string') {
						return '#1E293B';
					} else {
						let colorArr = assignColor(num, minValue, maxValue);
						return colorArr[1];
					}
				})
				.style('text-anchor', (d) => {
					if (d.group === 'Empty') {
						if (d.variable === 'Empty') {
							return 'start';
						} else {
							return 'start';
						}
					} else {
						return 'middle';
					}
				})
				.style('alignment-baseline', 'middle')
				.style('text-align', 'middle')
				.style('font-size', (d) => {
					return typeof d.value === 'string' ? '0.85em' : '0.80em';
				})
				.style('font-weight', (d) => {
					return typeof d.value === 'string' ? '700' : '500';
				});

			//Adding tooltip to cells
			// cells
			// 	.on('mouseover', (event, d) => displayTooltip(event, d))
			// 	.on('pointermove', (event, d) => displayTooltip(event, d))
			// 	.on('mouseout', function () {
			// 		tooltip.transition().duration(0).ease(d3.easeCubicInOut).style('display', 'none');
			// 	});

			//Adding tooltip to text
			// texts
			// 	.on('mouseover', (event, d) => displayTooltip(event, d))
			// 	.on('pointermove', (event, d) => displayTooltip(event, d))
			// 	.on('mouseout', function () {
			// 		tooltip.transition().duration(0).ease(d3.easeCubicInOut).style('display', 'none');
			// 	});

			if (isSortable) {
				svg.selectAll('rect').on('click', (event) => Sort(event));
				svg.selectAll('text').on('click', (event) => Sort(event));
			}
		}
	}

	return <div id={`${idName}`} style={{ height: '100%', width: '100%' }} />;
}

export default HeatMapChart;
