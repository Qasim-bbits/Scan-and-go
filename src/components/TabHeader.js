import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import test from '../assets/images/test.jpg'

export default function TabHeader(prop) {
  
  return (
    <>
        <div className="text-end d-sm-block d-xs-block d-md-none d-lg-none d-xl-none">
            <IconButton 
            type="button"
            sx={{ position: 'absolute', right: '15px', top: '80px', padding: '2px' }}
            className="btn-black"
            onClick={prop.setLeftDrawer}>
                <ArrowCircleLeftIcon />
            </IconButton>
        </div>
        <Paper
            component="form"
            sx={{ display: 'flex', alignItems: 'center'}}
            className='search-bar'
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search brands or products"
                onClick={()=>prop.setOpenSearchModal()}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        <Paper className='mt-3' sx={{backgroundImage: 'url('+test+')'}}>
            <div className='row'>
            <div className="col-6 align-self-center font-bold" style={{color: '#fff'}}>Footwear</div>
            <div className="col-6 text-end">
                <img src={test} width='100px'/>
            </div>
            </div>
        </Paper>
        <Typography variant="subtitle1" component="h2" className='mt-3 font-bold'>
            FEARURED BRANDS
        </Typography>
        <div className='row mt-1'>
          <div className="col-6 mt-2 pl-0">
              <Paper className='mt-1'>
                <img src={test} width='100%'/>
              </Paper>
          </div>
          <div className="col-6 mt-2 pr-0">
              <Paper className='mt-1'>
                <img src={test} width='100%'/>
              </Paper>
          </div>
          <div className="col-6 mt-2 pl-0">
              <Paper className='mt-1'>
                <img src={test} width='100%'/>
              </Paper>
          </div>
          <div className="col-6 mt-2 pr-0">
              <Paper className='mt-1'>
                <img src={test} width='100%'/>
              </Paper>
          </div>
          <Button className="btn-black mt-3">VIEW ALL BRANDS</Button>
        </div>
    </>
  );
}
