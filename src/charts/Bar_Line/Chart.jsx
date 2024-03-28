import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import * as d3 from 'd3';

export const BarLineChart = ({data}) => {
    const {name} = data;
    const { datasets, axisLabels } = data;
    const { x: xAxisLabel, y: yAxisLabel } = axisLabels;
    const [prevItems, setPrevItems] = React.useState([]);

    useEffect(()=>{
        if(!isEmpty(datasets)) {
            drawChart();
        }
    },[])

    const margin = {
        'top': 10,
        'bottom': 20,
        'left': 50,
        'right': 30,
    }

    function drawChart() {
        const svgId = `#${name}`;
        //Remove old svg
        d3.select(svgId).select('svg').remove();

        //Adding new svg
        const svg = d3
            .select(svgId)
            .append('svg')
            .attr('height','calc(100%)')
            .attr('width','calc(100%)')
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        //

        //Calculate xMin, xMax, yMin and yMax
        const xMin = 0, xMax = 10, yMin = 0, yMax = 45;

        const container = document.getElementById(name);
        const width = container?.offsetWidth - margin.left - margin.right;
        const height = container?.offsetHeight - margin.top - margin.bottom;

        const barData = datasets[0].value;    

        //Create axis scales
        const xScale = d3
            .scaleBand()
            .domain(barData.map((x) => x.group))
            .range([0,width])
            .padding(0.25)
            // .paddingInner(0.25)
            // .paddingOuter(0.25)

        const yScale = d3
            .scaleLinear()
            .domain([yMin, yMax])
            .range([height-margin.bottom-margin.top, 0])

        //Create axis
        const x= d3
            .axisBottom(xScale)

        const y = d3
            .axisLeft(yScale);

        //Grouping xAxis
        const xAxisGroup = svg
            .append('g')
            .attr('transform', `translate(0, ${height-margin.top-margin.bottom})`)
            .call(x)

        xAxisGroup
            .select('.domain')
            .attr('color', '#CBD5E1')
            .attr('stroke-width', 0.5)

        xAxisGroup.selectAll('line').attr('stroke', '#CBD5E1').attr('stroke-width', 1).attr('opacity', 0.25);
        

        //Grouping yAxis
        const yAxisGroup = svg.append('g').call(y);

        yAxisGroup
            .select('.domain')
            .attr('color', '#CBD5E1')
            .attr('stroke-width', 0.5);

        yAxisGroup.selectAll('line').attr('stroke', '#CBD5E1').attr('stroke-width', 1).attr('opacity', 0.25);

        const barWidth = xScale.bandwidth();

        //Define the line
        const line = d3
            .line()
            .x((d) => {
                return xScale(d.group) + barWidth/2;
            })
            .y((d) => {
                return yScale(d.value)
            })
            .curve(d3.curveCatmullRom.alpha(0.35))

        datasets.forEach((dataset) => {
            const {color, type, value} = dataset;
            if(type=== 'bar') {
                const bars = svg
                    .selectAll('.rect')
                    .data(value)

                const barWidth = xScale.bandwidth();

                bars
                    .enter()
                    .append("rect")
                    .merge(bars)
                    .transition(1000)
                        .attr("x", function(d) { return xScale(d.group); })
                        .attr("y", function(d) { return yScale(d.value); })
                        .attr("width", barWidth)
                        .attr("height", function(d) { return height - margin.top- margin.bottom- yScale(d.value); })
                        .attr("fill", color)
                        .attr('opacity',0.65)
            } else if(type === 'line') {
                svg
                    .selectAll('circle')
                    .data(value)
                    .enter()
                    .append('circle')
                    .attr("cx", function(d) { 
                        return xScale(d.group)+ barWidth/2; 
                    })
                    .attr("cy", function(d) { 
                        return yScale(d.value); 
                    })
                    .attr("r",4)
                    .attr("fill","#0506dd")

                svg
                    .selectAll('.line')
                    .data([value])
                    .enter()
                    .append('path')
                    .attr('fill', 'none')
                    .attr('stroke', "#0506dd")
                    .attr('stroke-width',2)
                    .attr('d',(d) => line(d))
                    .style('stroke-opacity', 1)
            }
            
        });

        svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dx', -height / 2)
            .attr('transform', `rotate(-90) translate(0, ${-30})`)
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
    }

  return (
    <div id={name} style={{height:'100%', width:'100%', flexGrow:1}}/>
  )
}