import React, { useContext, useState } from "react";
import { TextField, Container, Typography, Button, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl } from "@mui/material";
import useValidate from "../hooks/useValidate";
import { authContext } from "../store/AuthContextProvider";
import {useNavigate} from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [resError, setResError] = useState({});
    const navigate = useNavigate();
    const {login} = useContext(authContext);


  const {
    onChange: onChangeEmail,
    onBlur: onBlurEmail,
    inputRef: emailInputRef,
    isInputValid: isEmailInputValid,
    hasError: emailHasError,
  } = useValidate((value) => { 
    if(value.includes('@') && value.includes('.')){
        return true;
    }
    return false
  });

  const {
    onChange: onChangePassword,
    onBlur: onBlurPassword,
    inputRef: passwordInputRef,
    isInputValid: isPasswordInputValid,
    hasError: passwordHasError,
  } = useValidate((value) => {
    if(value.length >= 8){
        return true;
    }
    return false;
  });

  const submitLogin = () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if(!isFormValid) return;

    let responseStatus;
    fetch('https://mysterious-sands-95529.herokuapp.com/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
      responseStatus = res.status;
        return res.json();
    }).then(resData => {
      
      if(responseStatus !== 200){
        throw new Error(resData.message);
      }
        // let isAdmin = resData.userData.isAdmin;
        login(resData.token, false, resData.userData);
        navigate('/');
    })
    .catch(err => {
        console.log(err);
        setResError(err);
    })
  }

  const toggleShowPassword = () => {
    setShowPassword(preValue => !preValue)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isFormValid = isPasswordInputValid && isEmailInputValid;

  return (
    <Container maxWidth="lg">
      <Typography variant="h3">היכנס</Typography>

      <Container maxWidth="md">
        <div dir="ltr" sx={{}}>
          <TextField
            onChange={onChangeEmail}
            onBlur={onBlurEmail}
            inputRef={emailInputRef}
            sx={{ margin: "30px auto" }}
            fullWidth
            id="outlined-email"
            label="Email"
            variant="outlined"
          />

        {emailHasError && <Typography variant="subtitle2" sx={{color: 'red'}}> Please enter a valid email address</Typography>}

        <FormControl sx={{display: 'block'}}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
          inputRef={passwordInputRef}
          onChange={onChangePassword}
          onBlur={onBlurPassword}
          fullWidth
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

          {/* <TextField
            onChange={onChangePassword}
            onBlur={onBlurPassword}
            inputRef={passwordInputRef}
            sx={{ margin: "20px auto" }}
            fullWidth
            id="outlined-password"
            label="Password"
            variant="outlined"
          /> */}

            {passwordHasError && <Typography gutterBottom variant="subtitle2" sx={{color: 'red', marginBottom: '20px'}}> Please enter password that's atleast 8 characters long</Typography>}
            {resError.message && <Typography variant="subtitle2" sx={{color: 'red'}}>{resError.message}</Typography>}
          <Button onClick={submitLogin} disabled={!isFormValid} sx={{ marginTop: "20px" }} variant="contained">
            היכנס
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default Login;
