import React, { useState } from 'react';
import { Grid } from '@mui/material';

import Line from '../../charts/Line';
import LineBar from '../../charts/Bar_Line';
import LineScatter from '../../charts/Line_Scatter';

import { compRateBarData, engagementlineData, engagementbarData } from '@data/barLineData';
import { MonthlyData } from '@data/lineData';
import { WeeklyData } from '@data/lineData';
import { thinknumData } from '@data/thinknumData';
import DateSlider from '@components/DateSlider';

const AdoptionDashboard = () => {
  const [dailyData, setDailyData] = useState([]);
  const [summationData, setSummationData] = useState([]);

  React.useEffect(()=>{
    let  count = 0;
    const newData = thinknumData[0].data.map((d) => {
      count += d.y;
      return {
        x: d.x,
        y: count
      }
    });

    setDailyData(thinknumData);
    setSummationData([
      {
        ...thinknumData[0],
        data: newData
      }
    ])
  },[])

  console.log("summationData:",summationData)

  const onDateRangeUpdate = (newRange) => {
    console.log("newRange:",newRange)

    const {startDate , endDate} = newRange;
    const newDailyData = dailyData[0].data.filter(d => new Date(d.x) >= new Date(startDate) && new Date(d.x) <= new Date(endDate));
    const newSumData = summationData[0].data.filter(d => new Date(d.x) >= new Date(startDate) && new Date(d.x) <= new Date(endDate));

    setDailyData([{
      ...dailyData[0],
      data: newDailyData
    }]);

    setSummationData([
      {
        ...summationData[0],
        data: newSumData
      }
    ])
  }

  const dateObj = {
    start: new Date('2015-09-08'),
    end: new Date('2024-02-27')
  }

  return (
    <Grid container spacing={2} p={4} sx={{ml: '0px'}}>
      {/* <Grid item xs={12}>
        <DateSlider onChange={onDateRangeUpdate} dateRange={dateObj} appliedRange={dateObj}/>
      </Grid> */}
        <Grid item xs={12}>
          <Line name='daily' title={'Daily record count'} axisLabel={{x:'Months', y:'Values'}} data={dailyData}/>
        </Grid>

        <Grid item xs={12}>
          <Line name='sum' title={'Total record count'} axisLabel={{x:'Months', y:'Values'}} data={summationData}/>
        </Grid>

        {/* <Grid item xs={12}>
          <LineBar name='line-bar' title={'Department level Engagement'} axisLabel={{x:'Department', y:'Engagement (in %)'}} lineData={engagementlineData} barData={engagementbarData}/>
        </Grid>
        <Grid item xs={6}>
          <LineBar name='asdfd' removeLine title={'Course completion on Rate'} axisLabel={{x:'Courses', y:'Completion rate (in %)'}} barData={compRateBarData}/>
        </Grid>
        <Grid item xs={6}>
          <LineScatter name='line-scatter' title={'Average time spent'} axisLabel={{x:'Course IDs', y:'Avg. time spent (in hr)'}}/>
        </Grid> */}
      </Grid>
  )
}

export default AdoptionDashboard;