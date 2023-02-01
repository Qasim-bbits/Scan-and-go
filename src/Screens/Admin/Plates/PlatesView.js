import React from "react";
import { alpha, styled } from '@mui/material/styles';
import { 
    Button, Typography, Table, TableBody, TableContainer,
    TableHead, TableRow, Paper, TablePagination, Switch,
    Collapse, IconButton, InputBase, Grid
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Sidenav from "../Common/Sidenav/Sidenav";
import { DeleteForeverOutlined, EditOutlined, KeyboardArrowDown, KeyboardArrowUp, Search } from "@mui/icons-material";


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

export default function PlatesView(prop) {
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
        <div className="main-container my-3">
            <div className="row m-2">
                    <div className="row">
                        <div className="col-6 p-0">
                            <Typography variant="subtitle1" className="font-bold m-2 font-gray">PLATES</Typography>
                        </div>
                        <div className="col-6 p-0 align-self-center text-end">
                          <Button 
                            type="submit"
                            color="primary"
                            variant="contained"
                            onClick={prop.setOpenDrawer}>
                            Add Plate
                          </Button>
                        </div>
                    </div>
                    <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ height: '65vh' }}>
                            <Table aria-label="collapsible table" size="small">
                                <TableHead>
                                    <TableRow>
                                        {/* <TableCell></TableCell> */}
                                        <StyledTableCell>Zone</StyledTableCell>
                                        <StyledTableCell>Plate</StyledTableCell>
                                        <StyledTableCell>Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {prop.plate
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                      
                                        return (
                                            <>
                                                <TableRow key={row.zone_name}>
                                                    {/* <TableCell>
                                                        <IconButton
                                                            aria-label="expand row"
                                                            size="small"
                                                            onClick={() => {
                                                                if(open !== row._id){prop.getPlateDetail(row._id)};
                                                                setOpen((row._id === open ? "" : row._id))
                                                            }}
                                                        >
                                                            {open === row._id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                        </IconButton>
                                                    </TableCell> */}
                                                    <TableCell>
                                                      {(row.zone == undefined) ? "Preston Visitor Parking" : row.zone?.zone_name}
                                                    </TableCell>
                                                    <TableCell>
                                                      {row.plate}
                                                    </TableCell>
                                                    <TableCell >
                                                        <Button 
                                                            type="button" 
                                                            onClick={()=>prop.delItem(row._id)} 
                                                            sx={{color: '#bc0000', background: '#bc00002e', p: '2px', minWidth: 0, m: 1}}
                                                        >
                                                            <DeleteForeverOutlined />
                                                        </Button>
                                                        {/* <Button
                                                            type="button" 
                                                            onClick={()=>{prop.onEdit(row);setOpen("")}}
                                                            sx={{color: '#027c92', background: '#027c924d', p: '2px', minWidth: 0, m: 1}}
                                                        >
                                                            <EditOutlined/>
                                                        </Button> */}
                                                    </TableCell>
                                                </TableRow>
                                                {/* <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                                        <Collapse in={open === row._id} timeout="auto" unmountOnExit>
                                                            {prop.rateDetail.length>0 && <Paper elevation={1} sx={{ margin: 1 }}>
                                                              <Table>
                                                                <TableHead>
                                                                  <TableRow>
                                                                      <TableCell>Plate</TableCell>
                                                                      <TableCell>Plate Type</TableCell>
                                                                      <TableCell>Steps</TableCell>
                                                                  </TableRow>
                                                                </TableHead>
                                                                {prop.rateDetail.map(x=>{
                                                                  return(
                                                                    <TableBody>
                                                                      <TableRow>
                                                                          <TableCell>{x.rate_name}</TableCell>
                                                                          <TableCell>{x.rate_type}</TableCell>
                                                                          <TableCell>
                                                                            {x.rate_step.map(y=>{
                                                                              return(
                                                                                <>
                                                                                  <span>{y.time/60}h/${y.rate/100}</span><br/>
                                                                                </>
                                                                              )
                                                                            })}
                                                                          </TableCell>
                                                                      </TableRow>
                                                                  </TableBody>
                                                                  )
                                                                })}
                                                              </Table>
                                                            </Paper>}
                                                        </Collapse>
                                                    </TableCell>
                                                </TableRow> */}
                                            </>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
                            component="div"
                            count={prop.plate.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            SelectProps={{
                                MenuProps: { classes: "selectDropdown" }
                            }}
                        />
                    </Paper>
                
            </div>
        </div>
    );
}
