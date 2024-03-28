import React from 'react';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Typography } from '@mui/material';


export const SelectDropDown = ({ options, onSelect, selectedValue, title = '', applyMargin }) => {
    return (
      <FormControl fullWidth sx={{ml: applyMargin ? '0.5rem': '0'}}>
        {
            title && (
                <Typography style={{marginBottom:'0.5rem'}}>{title}</Typography>
            )
        }
        <Select
          displayEmpty
          onChange={onSelect}
          value={selectedValue}
          inputProps={{ "aria-label": "Without label" }}
          size='small'
        >
          {
            options.map((option, index) => (
              <MenuItem value={option} key={index}>{option}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    )
  }