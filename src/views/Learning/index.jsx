import React from 'react';
import { Grid } from '@mui/material';

import Pie from '../../charts/Pie';
import Line from '../../charts/Line';
import HeatMap from '../../charts/Heat_Map';
import BubbleChart from '../../charts/Bubble';
import { MonthlyData } from '@data/lineData';

const LearningDashboard = () => {
  return (
    <Grid container spacing={2} p={4}>
        <Grid item xs={6}>
          <BubbleChart name='dash2-bubble'  title={'Engagement Matrix'} axisLabel={{x:'Engagement Score', y:'Active %'}}/>
        </Grid>
        <Grid item xs={6}>
          <Pie name='dash-2-pie' title={'Course Distribution'} axisLabel={{x:'Department', y:'Count'}}/>
        </Grid>
        <Grid item xs={6 }>
          <Line name='dash-2-line' title={'Department level Engagement'} axisLabel={{x:'Department', y:'Count'}} data={MonthlyData}/>
        </Grid>
        <Grid item xs={6}>
          <HeatMap name='dash-2-heatmap'  title={'Department level Engagement'} axisLabel={{x:'Department', y:'Count'}}/>
        </Grid>
      </Grid>
  )
}

export default LearningDashboard;