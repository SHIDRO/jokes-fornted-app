import { Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext } from "react";

import { useSelector } from "react-redux";
import Jokes from "../components/Jokes";
import useValidate from "../hooks/useValidate";
import { authContext } from "../store/AuthContextProvider";

const Admin = () => {
  const authCtx = useContext(authContext);
  const { adminJokes } = useSelector((state) => state.jokesData);
  const {
    onChange: onChangeHashtag,
    onBlur: onBlurHashtag,
    inputRef: hashtagInputRef,
    isInputValid: isHashtagInputValid,
    hasError: hashtagHasError,
  } = useValidate((value) => {
    if (value.length > 0) {
      return true;
    }
    return false;
  });

  const {
    onChange: onChangeColor,
    onBlur: onBlurColor,
    inputRef: colorInputRef,
    isInputValid: isColorInputValid,
    hasError: colorHasError,
  } = useValidate((value) => {
    if (value.length > 0) {
      return true;
    }
    return false;
  });

  const isFormValid = isHashtagInputValid && isColorInputValid;

  const onSubmitHashtag = () => {
    if (!isFormValid) return;

    fetch("http://localhost:8080/admin/new-hashtag", {
      method: "POST",
      body: JSON.stringify({
        givenHashtag: hashtagInputRef.current.value,
        color: colorInputRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: authCtx.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("could not create hashtag");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData.message);
        hashtagInputRef.current.value = ""
        colorInputRef.current.value = ""
      })
      .catch(console.log);
  };
  return (
    <Container maxWidth="lg">
      <Typography
        sx={{ margin: "20px 0" }}
        gutterBottom
        align="center"
        variant="h3"
      >
        Admin Page
      </Typography>
      <Typography variant="h3" align="right">
        צור האשאג#
      </Typography>

      <Container maxWidth="md">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {hashtagHasError && (
            <Typography
              sx={{ margin: "20px 0", color: "red" }}
              gutterBottom
              align="center"
              variant="subtitle1"
            >
              Hashtag is not valid
            </Typography>
          )}
          <TextField
            onChange={onChangeHashtag}
            onBlur={onBlurHashtag}
            inputRef={hashtagInputRef}
            fullWidth
            sx={{ display: "block", marginBottom: "40px" }}
            id="filled-basic"
            label="האשטג"
            variant="filled"
          />

          {colorHasError && (
            <Typography
              sx={{ margin: "20px 0", color: "red" }}
              gutterBottom
              align="center"
              variant="subtitle1"
            >
              Color is not valid
            </Typography>
          )}
          <TextField
            onChange={onChangeColor}
            onBlur={onBlurColor}
            inputRef={colorInputRef}
            fullWidth
            sx={{ display: "block", marginBottom: "40px" }}
            id="filled-basic"
            label="צבע"
            variant="filled"
          />

          <Button onClick={onSubmitHashtag} variant="contained">צור</Button>
        </div>
      </Container>

      <hr />
      <div dir="rtl">
        <Typography variant="h4">מחכים לאישור: </Typography>
      </div>
      <Jokes jokes={adminJokes} profilePage={false} adminPage={true} />
    </Container>
  );
};

export default Admin;
