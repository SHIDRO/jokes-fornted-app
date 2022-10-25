import { Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system'
import React from 'react'

import { useSelector } from 'react-redux'
import Jokes from '../components/Jokes';
import useValidate from '../hooks/useValidate';

const Admin = () => {
    const {adminJokes} = useSelector(state => state.jokesData);
    const {
      onChange: onChangeHashtag,
      onBlur: onBlurHashtag,
      inputRef: hashtagInputRef,
      isInputValid: isHashtagInputValid,
      hasError: hashtagHasError,
    } = useValidate((value) => {
      if (value.includes("@") && value.includes(".")) {
        return true;
      }
      return false;
    });

    const isFormValid = isHashtagInputValid;

    const onSubmitHashtag = () => {
      if(!isFormValid) return;

    }
  return (
    <Container maxWidth="lg">
        <Typography sx={{margin: '20px 0'}} gutterBottom align="center" variant='h3'>Admin Page</Typography>
        <Typography variant="h3" align="right">צור האשאג#</Typography>

      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {hashtagHasError &&<Typography sx={{margin: '20px 0', color: 'red'}} gutterBottom align="center" variant='subtitle1'>Hashtag is not valid</Typography>}

        <TextField onChange={onChangeHashtag} onBlur={onBlurHashtag} inputRef={hashtagInputRef} fullWidth sx={{display: 'block', marginBottom: '40px'}} id="filled-basic" label="האשטג" variant="filled" />
        <TextField fullWidth sx={{display: 'block', marginBottom: '40px'}} id="filled-basic" label="צבע" variant="filled" />

        <Button variant="outlined">צור</Button>
        </div>
        <hr />
        <Jokes jokes={adminJokes} profilePage={false} adminPage={true}/>
    </Container>
  )
}

export default Admin