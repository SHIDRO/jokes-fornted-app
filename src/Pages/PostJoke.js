import React, { useContext, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

import useValidate from "../hooks/useValidate";
import { authContext } from "../store/AuthContextProvider";

const PostJoke = () => {
    const [hasError, setHasError] = useState({});
    const authCtx = useContext(authContext);

    const {
        onChange: onChangeTitle,
        onBlur: onBlurTitle,
        inputRef: titleInputRef,
        isInputValid: isTitleInputValid,
        hasError: titleHasError,
      } = useValidate((value) => {
        if(value.length >= 5){
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
        if(value.length >= 10){
            return true;
        }
        return false;
      });

      const onSubmitJoke= () => {
        if(!isFormValid) return;

        const title = titleInputRef.current.value;
        const content = contentInputRef.current.value;

        let responseStatus;
        fetch('http://localhost:8080/joker/new-joke', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content
            })
            ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authCtx.token
            }
        }).then(res => {
            responseStatus = res.status;

            return res.json();
        }).then((resData) => {
            console.log(responseStatus);
            if(responseStatus !== 201 && responseStatus !== 200){
                throw new Error(resData.message);
            }
        })
        .catch(err => {
            console.log(err);
            setHasError(err);
        })
      }

      const isFormValid = isTitleInputValid && isContentInputValid;

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

      {titleHasError && <Typography sx={{color: 'red'}} variant="subtitle2">Title is too short.</Typography>}
      <TextField
        inputRef={titleInputRef}
        onChange={onChangeTitle}
        onBlur={onBlurTitle}
        sx={{ width: "70%", margin: "5px auto 40px" }}
        id="outlined-basic"
        label="כותרת"
        variant="outlined"
      />

      
    {contentHasError && <Typography sx={{color: 'red'}} variant="subtitle2">Content is too short.</Typography>}
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

       

        {hasError.message && <Typography sx={{color: 'red'}} variant="subtitle2">{hasError.message}</Typography>}
      <Button onClick={onSubmitJoke} disabled={!isFormValid} sx={{marginTop: '25px'}} variant="contained">שלח</Button>
    </div>
  );
};

export default PostJoke;
