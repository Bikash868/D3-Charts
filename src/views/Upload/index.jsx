import React from 'react';
import { Grid, Typography } from '@mui/material';
import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { SelectDropDown } from '@components/SelectDropDown';

const FileUpload = () => {

  return (
    <Grid container gap={4} justifyContent={'center'} sx={{background:'#f2f2f2', p:'6rem 2rem', borderRadius:'0.75rem'}}>
      <Grid item  sx={{background:'#fff', borderRadius:'50%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <ImportExportRoundedIcon fontSize='medium' sx={{m:'0.5rem', cursor:'pointer'}}/>
      </Grid>
      <Grid item container gap={2}>
        <Grid item xs={12}>
          <Typography fontSize={'1rem'} textAlign={'center'}>Select a CSV or XLS file to import </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography fontSize={'0.75rem'} textAlign={'center'}>or drag and drop file here</Typography>
        </Grid>
      </Grid>
    </Grid>
  )

}

const UploadData = () => {
  const navigate = useNavigate();
  const [category, selectedCategory] = React.useState('');
  const categoryOptions = ['Finance', 'Technology', 'Health Care', 'Human resource', 'Design', 'Operations'];

  const handleCategorySelection = (e) => {
    selectedCategory(e.target.value);
  }

  const gotoColumnMap = () => {
    navigate('/map-column');

  }

  return (
    <Grid container justifyContent={'center'} sx={{width: '100%',p:'4rem'}}>
      <Grid item container xs={5} gap={5} justifyContent={'center'}>
        <Grid item xs={12}>
          <Typography textAlign={'center'} fontSize={'2rem'} variant='h4'>Upload your file</Typography>
        </Grid>
        <Grid item container gap={6} justifyContent={'center'}>
          <Grid item xs={12}>
            <SelectDropDown options={categoryOptions} onSelect={handleCategorySelection} selectedValue={category} title={'Category'}/>
          </Grid>
          <Grid item xs={12}>
            <FileUpload/>
          </Grid>
        </Grid>

        <Grid item>
          <Button variant="contained" sx={{color:'#fff', background:'#1B2031', textTransform:'none'}} onClick={gotoColumnMap}>Next</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UploadData;