import React, { useContext, useState } from "react";
import { TextField, Container, Typography, Button, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl } from "@mui/material";
import useValidate from "../hooks/useValidate";
import { authContext } from "../store/AuthContextProvider";
import {useNavigate} from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resError, setResError] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(authContext);

  const {
    onChange: onChangeUsername,
    onBlur: onBlurUsername,
    inputRef: usernameInputRef,
    isInputValid: isUsernameInputValid,
    hasError: usernameHasError,
  } = useValidate((value) => {
    if (value.length >= 3) {
      return true;
    }
    return false;
  });

  const {
    onChange: onChangeEmail,
    onBlur: onBlurEmail,
    inputRef: emailInputRef,
    isInputValid: isEmailInputValid,
    hasError: emailHasError,
  } = useValidate((value) => {
    if (value.includes("@") && value.includes(".")) {
      return true;
    }
    return false;
  });

  const {
    onChange: onChangePassword,
    onBlur: onBlurPassword,
    inputRef: passwordInputRef,
    isInputValid: isPasswordInputValid,
    hasError: passwordHasError,
  } = useValidate((value) => {
    if (value.length >= 8) {
      return true;
    }
    return false;
  });

  const {
    onChange: onChangeConfirmPassword,
    onBlur: onBlurConfirmPassword,
    inputRef: confirmPasswordInputRef,
    isInputValid: isConfirmPasswordInputValid,
    hasError: confirmPasswordHasError,
  } = useValidate((value) => {
    if (value.length >= 8 && value === passwordInputRef.current.value.trim()) {
      return true;
    }
    return false;
  });

  const submitSignup = () => {
    
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const username = usernameInputRef.current.value;

    if (!isFormValid) return;

    let responseStatus;

    fetch("https://mysterious-sands-95529.herokuapp.com/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        responseStatus = res.status;
        return res.json();
      })
      .then((resData) => {
        if (responseStatus !== 200) {
          throw new Error(resData.message);
        }

        login(resData.token);
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
        setResError(err);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(preValue => !preValue)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(preValue => !preValue);
  }

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const isFormValid =
    isPasswordInputValid && isEmailInputValid && isUsernameInputValid && isConfirmPasswordInputValid;

  return (
    <Container maxWidth="lg">
      <Typography variant="h3">הירשם</Typography>

      <Container maxWidth="md">
        <div dir="ltr" sx={{}}>
          <TextField
            onChange={onChangeUsername}
            onBlur={onBlurUsername}
            inputRef={usernameInputRef}
            sx={{ margin: "20px auto" }}
            fullWidth
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />

          {usernameHasError && (
            <Typography variant="subtitle2" sx={{ color: "red" }}>
              Please enter username that's atleast 3 characters long.
            </Typography>
          )}

          <TextField
            onChange={onChangeEmail}
            onBlur={onBlurEmail}
            inputRef={emailInputRef}
            sx={{ margin: "20px auto" }}
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />

          {emailHasError && (
            <Typography variant="subtitle2" sx={{ color: "red" }}>
              Please enter a valid email address
            </Typography>
          )}

          <FormControl sx={{display: 'block', marginBottom: '25px'}}>
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
              {passwordHasError && (
            <Typography variant="subtitle2" sx={{ color: "red", marginTop: '10px' }}>
              Please enter password that's atleast 8 characters long.
            </Typography>
          )}
        </FormControl>

      

          <FormControl sx={{display: 'block'}}>
        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
          inputRef={confirmPasswordInputRef}
          onChange={onChangeConfirmPassword}
          onBlur={onBlurConfirmPassword}
          fullWidth
            id="outlined-adornment-password"
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>

          {confirmPasswordHasError && (
            <Typography gutterBottom variant="subtitle2" sx={{ color: "red", marginBottom: '20px', marginTop: '10px' }}>
              Please confirm your password.
            </Typography>
          )}

          {resError.message && (
            <Typography variant="subtitle2" sx={{ color: "red", marginTop:'20px' }}>
             {resError.message}
            </Typography>
          )}

          <Button
            onClick={submitSignup}
            disabled={!isFormValid}
            sx={{ marginTop: "10px" }}
            variant="contained"
          >
            הירשם
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default Signup;
