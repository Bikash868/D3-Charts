import React from 'react';
import Button from '@mui/material/Button';
import COLUMN_MAP_IMAGE from '@assets/map.png';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

const MapColumn = () => {
  const navigate = useNavigate();

  const gotoDashboard = () => {
    navigate('/dashboard/adoption');
  }

  const openPreview = () => {
    alert('Preview is not available yet');
  }
  return (
    <Grid container justifyContent={'center'} sx={{width: '100%',p:'4rem'}}>

      <Grid item container xs={5} gap={5} justifyContent={'center'}>
        <Grid item xs={12}>
          <Typography textAlign={'center'} fontSize={'2rem'} variant='h4'>Mapping Data Points</Typography>
        </Grid>
        <Grid item xs={12}>
          <img src={COLUMN_MAP_IMAGE} alt='column map-image' style={{height:'100%', width:'100%', objectFit:'fill'}}/>
        </Grid>

        <Grid item container justifyContent={'center'} gap={2} alignItems={'center'}>
          <Button variant="contained" sx={{color:'#1b2031', background:'#fff', textTransform:'none'}} onClick={openPreview}>Preview</Button>
          <Button variant="contained" sx={{color:'#fff', background:'#1B2031', textTransform:'none'}} onClick={gotoDashboard}>Save</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MapColumn;