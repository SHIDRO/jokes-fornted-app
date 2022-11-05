import { useEffect, useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../store/AuthContextProvider";
import { useDispatch } from "react-redux";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { jokesActions } from "../store/store";

const JokesItem = ({
  title,
  content,
  likes,
  profilePage,
  approved,
  adminPage,
  id,
  userData,
  hashtags,
  usersLiked,
  homePage,
  hashtagPage,
}) => {
  const authCtx = useContext(authContext);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authCtx.token || !authCtx.isLoggedIn) return;

    let userAlreadyLiked = usersLiked.find(
      (u) => u._id.toString() === authCtx.user._id
    );
    if (userAlreadyLiked) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [authCtx.token, authCtx.isLoggedIn, setLike, usersLiked, authCtx.user]);

  useEffect(() => {
    if (!authCtx.token || !authCtx.isLoggedIn) return;

    if (!clicked) return;
    let body;
    let responseStatus;
    if (like) {
      body = {
        jokeId: id.trim(),
        likes: true,
        dislikes: false,
        userId: authCtx.user._id,
      };
    } else {
      body = {
        jokeId: id.trim(),
        likes: false,
        dislikes: true,
        userId: authCtx.user._id,
      };
    }

    fetch("https://mysterious-sands-95529.herokuapp.com/joker/like-joke", {
      method: "PATCH",
      body: JSON.stringify(body),
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
        if (responseStatus !== 200 && responseStatus !== 201) {
          throw new Error(resData.message);
        }
        if (profilePage) {
          dispatch(
            jokesActions.toggleLikeUserJoke({ jokeId: id, likes: like })
          );
        }
        if (homePage) {
          dispatch(jokesActions.toggleLikeJoke({ jokeId: id, likes: like }));
        }
        if (hashtagPage) {
          dispatch(
            jokesActions.toggleLikeHashtagJokes({ jokeId: id, likes: like })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    id,
    like,
    clicked,
    authCtx.token,
    authCtx.isLoggedIn,
    dispatch,
    profilePage,
    authCtx.user,
    homePage,
    hashtagPage,
  ]);

  const likeDislike = () => {
    setClicked(true);
    setLike((preValue) => !preValue);
  };

  const adminApprove = () => {
    if (!adminPage) return;

    let responseStatus;
    fetch(
      "https://mysterious-sands-95529.herokuapp.com/joker/update-joke-status",
      {
        method: "PATCH",
        body: JSON.stringify({
          jokeId: id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: authCtx.token,
        },
      }
    )
      .then((res) => {
        responseStatus = res.status;
        return res.json();
      })
      .then((resData) => {
        if (responseStatus !== 201 && responseStatus !== 200) {
          throw new Error(resData.message);
        }
        dispatch(jokesActions.addToGlobalJokes(resData.joke));
        dispatch(jokesActions.removeFromAdminJokes(resData.joke._id));
      })
      .catch(console.log);
  };

  // if(clicked && (!authCtx.token || authCtx.isLoggedIn)){
  //   return <h1>Render modal</h1>
  // }

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

        {hashtags.map((h) => {
          return (
            <Typography
              key={h._id}
              onClick={() => navigate(`/${h.hashtag}?p=${1}`)}
              sx={{
                marginTop: "5px",
                fontWeight: "bold",
                color: h.color,
                cursor: "pointer",
              }}
              align="left"
              variant="body2"
            >
              #{h.hashtag}
            </Typography>
          );
        })}
        {/* <Typography
          
            sx={{ marginTop: "20px", fontWeight: 'bold', color: hashtag.color }}
            align="left"
            variant="body2"
          >#{hashtag.hashtag}</Typography> */}

        {userData.username && (
          <Typography
            sx={{ marginTop: "10px", fontWeight: "bold" }}
            align="left"
            variant="body2"
            color="text.secondary"
          >
            creator: {userData.username}
          </Typography>
        )}
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
                like ? (
                  <FavoriteIcon
                    sx={{ margin: "auto", padding: "2px 0px 5px 6px" }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{ margin: "auto", padding: "2px 0px 5px 6px" }}
                  />
                )
              }
              onClick={likeDislike}
              variant="outlined"
              size="small"
            >
              {likes}
            </Button>
          </>
        )}
        {adminPage && (
          <Button onClick={adminApprove} size="small" variant="contained">
            לאשר
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default JokesItem;
