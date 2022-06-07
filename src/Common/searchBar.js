import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 29.8,
  border: '1px solid rgba(73,73,73,0.29)',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 10,
  [theme.breakpoints.down('sm')]: {
    width: '40%',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(73,73,73,0.29)',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '30vh',
  color: '#2E2E2E',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '20ch',
    },
  },
}));
