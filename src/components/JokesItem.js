import {useEffect, useState} from 'react';
import { Card, Typography, Button } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Profile from "../Pages/Profile";
import { useContext } from "react";
import { authContext } from "../store/AuthContextProvider";
import { useDispatch } from "react-redux";
import { jokesActions } from "../store/store";

let isInitial = true;
const JokesItem = ({ title, content, likes, profilePage, approved, adminPage, id }) => {
  const [like, setLike] = useState(false);
  const authCtx = useContext(authContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isInitial){
      console.log('initail render')
      isInitial = false;
      return;
    }

    let body;
    let responseStatus;
    if(like){
      body = {
        jokeId: id.trim(),
        likes: true,
        dislikes: false
      }
    } else {
      body = {
        jokeId: id.trim(),
        likes: false,
        dislikes: true
      }
    }
    console.log('Whats upppppp');
    // console.log(body);
    // fetch('http://localhost:8080/joker/like-joke', {
    //   method: 'PATCH',
    //   body: JSON.stringify(body),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: authCtx.token,
    //   }
    // })
    // .then((res) => {
    //   responseStatus = res.status;
    //   return res.json();
    // })
    // .then((resData) => {
    //   if (responseStatus !== 200 && responseStatus !== 201) {
    //     throw new Error(resData.message);
    //   }
    //   dispatch(jokesActions.toggleLikeJoke({jokeId: id, likes: like}));
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  }, [id, like]);
  console.log("approved", approved, profilePage)
  const likeDislike = () => {

    setLike(preValue => !preValue);
  }

  const adminApprove = () => {
    if(!adminPage) return;

    let responseStatus;
    fetch('http://localhost:8080/joker/update-joke-status', {
      method: 'PATCH',
      body: JSON.stringify({
        jokeId: id
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authCtx.token
      }
    })
    .then(res => {
      responseStatus = res.status;
      return res.json();
    })
    .then(resData => {
      if(responseStatus !== 201 && responseStatus !== 200){
        throw new Error(resData.message);
      }
      dispatch(jokesActions.addToGlobalJokes(resData.joke));
      dispatch(jokesActions.removeFromAdminJokes(resData.joke._id));
    })
    .catch(console.log)
  }

  return (
    <Card elevation={16} sx={{ width: "90%" }}>
      <CardContent>
        <Typography
          sx={{ borderBottom: "1px solid  #d9d9d9" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {title}
        </Typography>
        <Typography gutterBottom variant="subtitle1" color="text.secondary">
          {content}
        </Typography>

        {profilePage && !approved && (
          <Typography
            sx={{ color: "#00b359", marginTop: "20px" }}
            align="left"
            variant="body2"
            color="text.secondary"
          >
            Joke still waiting for approval...
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {!adminPage && (
          <>
            <Button
              sx={{ padding: "auto" }}
              startIcon={
                <ThumbUpIcon
                  sx={{ margin: "auto", padding: "2px 0px 5px 6px" }}
                />
              }
              onClick={likeDislike}
              variant="outlined"
              size="small"
            >
              {likes}
            </Button>
            <Button size="small">Share</Button>
          </>
        )}
        {
          adminPage && <Button onClick={adminApprove} size="small" variant="contained">לאשר</Button>
        }
      </CardActions>
    </Card>
  );
};

export default JokesItem;
