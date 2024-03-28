import React from 'react';
import { memo } from 'react';

import Chart from './Chart';
import { isEmpty } from 'lodash';
import { ChartContainer } from '../Line/elements';
import { colorRange } from '../../data/ColorRange';

const heatMapDemoData = {
	values: [
		{variable: 'Row1', group:'col1', value: 0},
		{variable: 'Row2', group:'col1', value:11},
		{variable: 'Row3', group:'col1', value:34},

		{variable: 'Row1', group:'col2', value:12},
		{variable: 'Row2', group:'col2', value:23},
		{variable: 'Row3', group:'col2', value:11},

		{variable: 'Row1', group:'col3', value:17},
		{variable: 'Row2', group:'col3', value:9},
		{variable: 'Row3', group:'col3', value:28},

		{variable: 'Row1', group:'col4', value:0.25},
		{variable: 'Row2', group:'col4', value:17},
		{variable: 'Row3', group:'col4', value:6},
	],
	groups: ['col1', 'col2','col3','col4'],
	vars: ['Row1','Row2','Row3'],
	groupTooltips: {'col1':'column1', 'col2':'column2','col3':'column3','col4':'column4'},
	varTooltips: {'Row1':'Variable1','Row2':'Variable2','Row3':'Variable3'}
}

function HeatmapParent(props) {
	const {name} = props;
	const [heatMapData, setHeatMapData] = React.useState({});
	const dimensions = {
		height: 250,
		width: 950,
		margin: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		},
	};

	React.useEffect(()=>{
		const additionalProps = {
			sortable : false,
			default: false,
			sortRows: () => {},
			onClear: () => {}
		}
		const heatMapConfig = {
			...heatMapDemoData,
			name: name,
			dimensions: dimensions,
			additionalProps: additionalProps,
			colorRange: colorRange
		}

		setHeatMapData(heatMapConfig);

	},[])

	return (
		<div style={{padding:'1rem', boxShadow: '0px 2px 9px 0px rgba(0, 0, 0, 0.12)',background:'#fff', borderRadius:'0.25rem'}}>
			<p style={{fontSize:'1.25rem', fontWeight:600, marginLeft:'0.5rem'}}>Engagement unleashed</p>
			<ChartContainer>
			{
				!isEmpty(heatMapData) && (
					<Chart data={heatMapData}/>
				)
			}
			</ChartContainer>
    	</div>
	)
}
export default memo(HeatmapParent);

/**
heatMapConfig : {
	dataset: {
		values: [],
		groups: [],
		variables: [],
		groupTooltips: {}
		varTooltips: {}
	},
	additionalParams: {
		sortable : false,
		sortRows: () => {},
		onClear: () => {}
	},

}
 */
