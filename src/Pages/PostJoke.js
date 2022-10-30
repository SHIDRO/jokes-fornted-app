import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import useValidate from "../hooks/useValidate";
import { authContext } from "../store/AuthContextProvider";
import { useSelector } from "react-redux";

const PostJoke = () => {
  const [chosenHashtag, setChosenHashtag] = useState("");
  const [chosenHashtagColor, setChosenHashtagColor] = useState("");
  const [hasError, setHasError] = useState({});
  const authCtx = useContext(authContext);
  const { hashtags } = useSelector((state) => state.jokesData);

  const {
    onChange: onChangeTitle,
    onBlur: onBlurTitle,
    inputRef: titleInputRef,
    isInputValid: isTitleInputValid,
    hasError: titleHasError,
  } = useValidate((value) => {
    if (value.length >= 5) {
      return true;
    }
    return false;
  });

  const {
    onChange: onChangeHashtagValidator,
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
    onChange: onChangeContent,
    onBlur: onBlurContent,
    inputRef: contentInputRef,
    isInputValid: isContentInputValid,
    hasError: contentHasError,
  } = useValidate((value) => {
    if (value.length >= 10) {
      return true;
    }
    return false;
  });

  const onSubmitJoke = () => {
    if (!isFormValid) return;

    const title = titleInputRef.current.value;
    const content = contentInputRef.current.value;

    const hashtagId = hashtags.find(h => h.hashtag === chosenHashtag)._id;

    let responseStatus;
    fetch("http://localhost:8080/joker/new-joke", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
        hashtagId: hashtagId
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: authCtx.token,
      },
    })
      .then((res) => {
        responseStatus = res.status;

        return res.json();
      })
      .then((resData) => {
        console.log(responseStatus);
        if (responseStatus !== 201 && responseStatus !== 200) {
          throw new Error(resData.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setHasError(err);
      });
  };

  const onChangeHashtagHandler = (e) => {
    setChosenHashtag(e.target.value);
    onChangeHashtagValidator(e.target.value);
    const color = hashtags.find((h) => h.hashtag === e.target.value).color;
    setChosenHashtagColor(color);
  };

  const isFormValid = isTitleInputValid && isContentInputValid && isHashtagInputValid;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Post a Joke</h1>

      {titleHasError && (
        <Typography sx={{ color: "red" }} variant="subtitle2">
          Title is too short.
        </Typography>
      )}
      <TextField
        inputRef={titleInputRef}
        onChange={onChangeTitle}
        onBlur={onBlurTitle}
        sx={{ width: "70%", margin: "5px auto 40px" }}
        id="outlined-basic"
        label="כותרת"
        variant="outlined"
      />

        {hashtagHasError && <Typography sx={{ color: "red" }} variant="subtitle2">
          Please choose a hashtag.
        </Typography>}
      <Box sx={{ maxWidth: 180, float: "right" }}>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">#</InputLabel>
          <Select
            sx={{ color: chosenHashtagColor, fontWeight: "bold" }}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={chosenHashtag}
            onChange={onChangeHashtagHandler}
            onBlur={onBlurHashtag}
          >
            {hashtags.map((h, index) => {
              return (
                <MenuItem key={h._id} value={h.hashtag}>
                  {h.hashtag}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      {contentHasError && (
        <Typography sx={{ color: "red" }} variant="subtitle2">
          Content is too short.
        </Typography>
      )}
      <TextField
        inputRef={contentInputRef}
        onChange={onChangeContent}
        onBlur={onBlurContent}
        sx={{ width: "70%", margin: "auto" }}
        id="outlined-multiline-static"
        label="תוכן"
        multiline
        rows={6}
      />

      {hasError.message && (
        <Typography sx={{ color: "red" }} variant="subtitle2">
          {hasError.message}
        </Typography>
      )}
      <Button
        onClick={onSubmitJoke}
        disabled={!isFormValid}
        sx={{ marginTop: "25px" }}
        variant="contained"
      >
        שלח
      </Button>
    </div>
  );
};

export default PostJoke;
