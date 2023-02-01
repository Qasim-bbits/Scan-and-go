import React from "react";
import { alpha, styled } from '@mui/material/styles';
import { 
    Button, Typography, Table, TableBody, TableContainer,
    TableHead, TableRow, Paper, TablePagination, Switch,
    Collapse, IconButton, InputBase, Grid
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { DeleteForeverOutlined, EditOutlined, KeyboardArrowDown, KeyboardArrowUp, Search } from "@mui/icons-material";
const moment = require('moment-timezone');
moment.tz.setDefault("America/New_York");

const days = [
  {label: 'Mo', name: 'Monday'},
  {label: 'Tu', name: 'Tuesday'},
  {label: 'We', name: 'Wednesday'},
  {label: 'Th', name: 'Thursday'},
  {label: 'Fr', name: 'Friday'},
  {label: 'Sa', name: 'Saturday'},
  {label: 'Su', name: 'Sunday'}
]

const SearchBar = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        border: '1px solid #c9c6c6',
        borderRadius: '5px'
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const GoldSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#c6a215',
      '&:hover': {
        backgroundColor: alpha('#c6a215', theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#c6a215',
    },
  })); 

export default function RatesView(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState('');

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    return (
      <Grid container spacing={3} sx={{placeContent: "center", py: 2}}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" color="primary" className="font-bold font-gray">RATES</Typography>
        </Grid>
        <Grid item xs={6} align="right">
          <Button 
              type="button"
              variant="contained"
              color="primary"
              sx={{minWidth:110}}
              onClick={props.setOpenAddDrawer}
          >
            Add +
          </Button>
        </Grid>
        <Grid item xs={12} alignSelf={"center"}>
          <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ height: '65vh' }}>
                  <Table aria-label="collapsible table" size="small">
                      <TableHead>
                          <TableRow>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell>Zone</StyledTableCell>
                              <StyledTableCell>City</StyledTableCell>
                              <StyledTableCell>Organization</StyledTableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {props.zones
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => {
                              return (
                                  <>
                                      <TableRow key={row.zone_name}>
                                          <TableCell>
                                              <IconButton
                                                  aria-label="expand row"
                                                  size="small"
                                                  onClick={() => {
                                                      if(open !== row._id){props.getRateDetail(row._id)};
                                                      setOpen((row._id === open ? "" : row._id))
                                                  }}
                                              >
                                                  {open === row._id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                              </IconButton>
                                          </TableCell>
                                          <TableCell>
                                              {row.zone_name}
                                          </TableCell>
                                          <TableCell>
                                              {row.city_id?.city_name}
                                          </TableCell>
                                          <TableCell>
                                            Preston Property
                                          </TableCell>
                                      </TableRow>
                                      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                              <Collapse in={open === row._id} timeout="auto" unmountOnExit>
                                                  {props.rateDetail.length>0 && <Paper elevation={1} sx={{ margin: 1 }}>
                                                    <Table size="small">
                                                      <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell>Rate Name</StyledTableCell>
                                                            <StyledTableCell>Days</StyledTableCell>
                                                            <StyledTableCell>Enabled (from - to)</StyledTableCell>
                                                            <StyledTableCell>Time</StyledTableCell>
                                                            <StyledTableCell>Steps</StyledTableCell>
                                                            <StyledTableCell>Action</StyledTableCell>
                                                        </TableRow>
                                                      </TableHead>
                                                      {props.rateDetail.map(x=>{
                                                        return(
                                                          <TableBody>
                                                            <TableRow>
                                                                <TableCell>{x.rate_name} {(x.special_rate == true) ? '(Special Rate)' : '(Regular Rate)'}</TableCell>
                                                                <TableCell>{days.map(el=>{
                                                                  return(x[el.name] == true ? el.label + ', ': '')
                                                                })}</TableCell>
                                                                <TableCell>{(x.special_rate == true) ? 
                                                                  moment(x.start_date).format('MMM/DD/YYYY, hh:mm a') 
                                                                  + ' - ' + 
                                                                  moment(x.end_date).format('MMM/DD/YYYY, hh:mm a') : 'Always'}
                                                                </TableCell>
                                                                <TableCell>{x.start_time} - {x.end_time}</TableCell>
                                                                <TableCell>
                                                                  {x.rate_step.map(y=>{
                                                                    return(
                                                                      <>
                                                                        <span>{(y.time/60).toFixed(2)}h / ${(y.rate/100).toFixed(2)}</span><br/>
                                                                      </>
                                                                    )
                                                                  })}
                                                                </TableCell>
                                                                <TableCell >
                                                                  <Button 
                                                                      type="button" 
                                                                      onClick={()=>props.delItem(x.rate_type_id)} 
                                                                      sx={{color: '#bc0000', background: '#bc00002e', p: '2px', minWidth: 0, m: 1}}
                                                                  >
                                                                      <DeleteForeverOutlined />
                                                                  </Button>
                                                                  <Button
                                                                      type="button" 
                                                                      onClick={()=>{props.editItem(x)}}
                                                                      sx={{color: '#027c92', background: '#027c924d', p: '2px', minWidth: 0, m: 1}}
                                                                  >
                                                                      <EditOutlined/>
                                                                  </Button>
                                                              </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                        )
                                                      })}
                                                    </Table>
                                                  </Paper>}
                                              </Collapse>
                                          </TableCell>
                                      </TableRow>
                                  </>
                              );
                          })}
                      </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                  rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
                  component="div"
                  count={props.zones.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  SelectProps={{
                      MenuProps: { classes: "selectDropdown" }
                  }}
              />
          </Paper> 
        </Grid>
      </Grid>
    );
}
