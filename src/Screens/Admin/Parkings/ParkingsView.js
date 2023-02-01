import React from "react";
import { alpha, styled } from '@mui/material/styles';
import { 
    Button, Typography, Table, TableBody, TableContainer,
    TableHead, TableRow, Paper, TablePagination, Switch,
    Collapse, IconButton, InputBase, Grid, Box
} from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { DeleteForeverOutlined, EditOutlined, KeyboardArrowDown, KeyboardArrowUp, Search } from "@mui/icons-material";
import moment from 'moment';
import ParkIn from "../../../assets/icons/park_in.png"

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
      width: '100%',
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
      backgroundColor: '#2c3680',
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

export default function ParkingsView(prop) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState('');

    const columns = [
      { field: 'parking_id', headerName: 'Parking ID', width: 100, headerClassName: 'header' },
      { 
        field: 'zone',
        headerName: 'Zone',
        width: 250,
        headerClassName: 'header',
        renderCell: (params) => (
          (params.row.zone == undefined) ? "Preston Visitor Parking" : params.row.zone?.zone_name
        )
      },
      { 
        field: 'city',
        headerName: 'City',
        width: 150,
        headerClassName: 'header',
        renderCell: (params) => (
          (params.row.city == undefined) ? "Ottawa" : params.row.city?.city_name
        )
      },
      { field: 'fname', headerName: 'User Name', valueGetter: (params) => params.row?.user?.fname, width: 150, headerClassName: 'header' },
      { field: 'email', headerName: 'User Email', valueGetter: (params) => params.row?.user?.email, width: 200, headerClassName: 'header' },
      { field: 'plate', headerName: 'Plate', width: 150, headerClassName: 'header'},
      { field: 'amount', headerName: 'Amount', valueGetter: (params) => '$ '+(params.row?.amount/100).toFixed(2), width: 150, headerClassName: 'header'},
      { field: 'from', headerName: 'Start Date/Time', valueGetter: (params) => moment(params.row.from).format('ll hh:mm a'), width: 200, headerClassName: 'header'},
      { field: 'to', headerName: 'End Date/Time', valueGetter: (params) => moment(params.row.to).format('ll hh:mm a'), width: 200, headerClassName: 'header'},
    ]

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    
    return (
      <Grid container spacing={3} sx={{placeContent: "center"}}>
        <Grid item xs={12}>
          {/* <Typography variant="subtitle1" className="font-bold font-gray">PARKINGS</Typography> */}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography variant="subtitle1" color="primary" className="font-bold font-gray">PARKINGS</Typography>
          {/* <SearchBar>
            <SearchIconWrapper>
                <Search />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={prop.searched}
                onChange={(e) => prop.requestSearch(e.target.value)}
            />
          </SearchBar> */}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} align="end">
          <Button
              type="submit"
              color="primary"
              variant="outlined"
              onClick={()=>prop.handleParkings(1)}
              size="small"
              sx={{mr: 2}}>
              <img src={ParkIn} width={'30px'}/>Employee
          </Button>
          <Button 
              type="submit"
              color="primary"
              variant="outlined"
              onClick={()=>prop.handleParkings()}
              size="small">
              <img src={ParkIn} width={'30px'}/>Costumer
          </Button>
        </Grid>
        <Grid item xs={12}>
        <Box
            sx={{
              height: '75vh',
              width: '100%',
              '& .header': {
                backgroundColor: '#2c3680',
                color: '#fff'
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row._id}
              rows={prop.parking }
              columns={columns}
              disableSelectionOnClick={true}
              components={{ Toolbar: GridToolbar }} 
              density={'compact'}
            />
          </Box>
          {/* <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ height: '65vh' }}>
                  <Table aria-label="collapsible table" size="small">
                      <TableHead>
                          <TableRow>
                              <StyledTableCell>Parking ID</StyledTableCell>
                              <StyledTableCell>Zone</StyledTableCell>
                              <StyledTableCell>City</StyledTableCell>
                              <StyledTableCell>User name</StyledTableCell>
                              <StyledTableCell>User email</StyledTableCell>
                              <StyledTableCell>Plate</StyledTableCell>
                              <StyledTableCell>Amount</StyledTableCell>
                              <StyledTableCell>Start Date/Time</StyledTableCell>
                              <StyledTableCell>End Date/Time</StyledTableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {prop.parking
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => {
                            
                              return (
                                  <>
                                      <TableRow key={row.zone_name}>
                                          <TableCell>{row.parking_id}</TableCell>
                                          <TableCell>{(row.zone == undefined) ? "Preston Visitor Parking" : row.zone?.zone_name}</TableCell>
                                          <TableCell>{(row.city == undefined) ? "Ottawa" :row.city?.city_name}</TableCell>
                                          <TableCell>{row.user?.fname}</TableCell>
                                          <TableCell>{row.user?.email}</TableCell>
                                          <TableCell>{row.plate}</TableCell>
                                          <TableCell>${(row.amount/100).toFixed(2)}</TableCell>
                                          <TableCell>{moment(row.from).format('ll hh:mm a')}</TableCell>
                                          <TableCell>{moment(row.to).format('ll hh:mm a')}</TableCell>
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
                  count={prop.parking.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  SelectProps={{
                      MenuProps: { classes: "selectDropdown" }
                  }}
              />
          </Paper>  */}
        </Grid>
      </Grid>
    );
}
