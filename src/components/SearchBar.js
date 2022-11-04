import React, {useEffect, useState} from 'react';
import { Autocomplete , TextField} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useDispatch } from 'react-redux';
import { jokesActions } from '../store/store';

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
        width: '110ch',
      },
    },
  }))


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

const SearchBar = ({ setSearchInput, setLoading, searchInput, setPageNumber}) => {

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    setLoading(true);
}

    return (
    
    <Search sx={{marginBottom: '20px'}}>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
        onChange={onChangeHandler}
        value={searchInput}
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
    />
  </Search>
  )
}

export default SearchBar
