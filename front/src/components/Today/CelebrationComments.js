import { useState, useEffect, useCallback } from "react";
import * as Api from "../../api";
// import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CelebrationComments({ date, todayCharacter }) {
    const villagers = todayCharacter.map((villager)=>villager.name_ko)
    
    const [villager, setVillager] = useState('');
  
    const handleChange = (event) => {
        setVillager(event.target.value);
    };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="selectVillager">주민</InputLabel>
          <Select
            labelId="selectVillager"
            id="selectVillager"
            value={villager}
            label="주민"
            onChange={handleChange}
          > 
            {villagers.map((villager, index )=> {
                return (
                    <MenuItem key = {index} value={villager}>{villager}</MenuItem>
                )
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }
