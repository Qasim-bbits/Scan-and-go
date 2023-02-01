import React from 'react';
import Box from "@mui/material/Box";
import {Button, IconButton, Typography, Paper, useMediaQuery, ListItem, Divider} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function SelectPlateForm(props) {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '99%',
      backgroundColor: '#fff',
      height: '100%'
    }}>
      <Box sx={{display: 'flex', backgroundColor: '#14a7e0', width: '100%'}}>
        {/* <IconButton
          color="inherit"
          edge="end"
          onClick={props.back}
        >
          <ArrowBackIcon />
        </IconButton> */}
      </Box>
      <Box sx={{display: 'flex', width: '80%', justifyContent: 'space-between', alignItems: 'flex-end', color: 'black'}}>
        <Typography variant='h5' align='left' sx={{marginTop: 5, color: 'primary.main'}} >
          <IconButton
            color="inherit"
            edge="start"
          >
            <DirectionsCarIcon />
          </IconButton>
          Select Plate
        </Typography>
      </Box>
      <Box sx={{width: '80%', textAlign: 'end'}}>
        <Button size='large' variant='contained' onClick={props.addPlateDrawer}>
          Add Plate
        </Button>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' ,marginTop: '2%', padding: '0 1% 0 1%',width: '100%'}}>
        {props.plates.map((x, index) => (
          <Paper elevation={1} sx={{display: 'flex', height: 120, width: '80%', backgroundColor:'#f0f2f5', marginBottom: '5px'}}>
            <ListItem>
              <Box
                sx={{display: 'flex', flexDirection: 'column', borderRight: '2px solid #b5b5b7'}}
              >
              <IconButton
                color="primary"
                edge="start"
                onClick={()=>props.onPlateEdit(x,index)}
              >
                <EditIcon />
              </IconButton>
                <Divider
                  variant='fullWidth'
                  sx={{width: '100%', backgroundColor: '#b5b5b7', borderBottomWidth: 2}}

                />
              <IconButton
                color="primary"
                edge="start"
                onClick={()=>props.onPlateDel(index)}
              >
                <DeleteIcon />
              </IconButton>
              </Box>
              <ListItem
                onClick={()=>props.onPlateSelect(x)}
                sx={{cursor: 'pointer'}}
              >
                <Typography variant='h5' sx={{marginLeft: '10%'}}>
                  {x}
                </Typography>
              </ListItem>
            </ListItem>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default SelectPlateForm;