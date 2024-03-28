import React from 'react';
import { BarLineChart } from './Chart';
import {ChartContainer} from './elements';
import { isEmpty } from 'lodash';
import { Typography } from '@mui/material';
import { AppBarTitle } from '@components/AppBar/Title';


// var barData = [
//     {group: "A", value: 10,},
//     {group: "B", value: 5},
//     {group: "C", value: 10},
//     {group: "D", value: 8},
//     {group: "E", value: 11},
//     {group: "F", value: 17},
// ];

// var lineData = [
//     {group: "A", value: 5},
//     {group: "B", value: 8},
//     {group: "C", value: 14},
//     {group: "D", value: 6},
//     {group: "E", value: 10},
//     {group: "F", value: 12},
// ]

const LineBarCombined = (props) => {
    const {name, removeLine, axisLabel, title} = props;
    const {barData = [], lineData = []} = props;
    
    const [barLineData, setBarLineData] = React.useState({});

    console.log(" LineBarCombined axisLabel:",axisLabel)

    React.useEffect(()=>{
        let dataArr = [
            {
                name: 'avg',
                display_marker: 'line',
                dashed: false,
                type: 'line',
                color: '#0506dd',
                value: lineData,
            },
            {
                name: 'course bar',
                type: 'bar',
                display_marker: 'bar',
                color: '#0506dd',
                value: barData,
            }
        ]
        if(removeLine) {
            dataArr = dataArr.slice(-1);
        }
        const data = {
            name: name,
            datasets: dataArr,
            axisLabels: {
                x: axisLabel.x,
                y: axisLabel.y
            },
            axisTicks: {
                x: (val) => val,
                y: (val) => val
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
        } 
        setBarLineData(data);
    },[props])

  return (
    <div style={{padding:'1rem', boxShadow: '0px 2px 9px 0px rgba(0, 0, 0, 0.12)',background:'#fff', borderRadius:'0.25rem'}}>
        <div style={{display:'flex'}}>
            <AppBarTitle title={title}/>
        </div>
        <ChartContainer>
            {
                !isEmpty(barLineData) && (
                    <BarLineChart data = {barLineData}/>
                )
            }
        </ChartContainer>
    </div>
  )
}

export default LineBarCombined;


/*
{
	name: '',
	datasets:[
		{
			name: 'line',
			display_marker: '',
			dashed: false,
			color: '',
			data: [{
				date:'',
				value:''
			}],
		},
		{
			name: 'bar',
			display_marker: '',
			dashed: false,
			color: '',
			data: [{
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
}
*/