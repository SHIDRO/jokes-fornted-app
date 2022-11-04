import React, {useEffect, useState} from 'react';
import PaginationSection from "../components/PaginationSection";
import Jokes from "../components/Jokes";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { authContext } from "../store/AuthContextProvider";
import { jokesActions } from '../store/store';
import { useLocation } from 'react-router-dom';
import usePagination from '../hooks/usePagination';

//pass to jokes only the user's jokes

const Profile = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const {userJokes} = useSelector(state => state.jokesData);
  const authCtx = useContext(authContext); 
  const {currentPage, totalPages, setTotalPages} = usePagination()

  useEffect(() => {
    if(!authCtx.token || !authCtx.isLoggedIn)return;

    fetch(`http://localhost:8080/joker/user-jokes?p=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authCtx.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to fetch jokes");
        }
        return res.json();
      })
      .then((resData) => {
        setTotalPages(resData.totalPages);
        dispatch(jokesActions.setUserJokes(resData.jokes));
        setPageNumber(resData.currentPage)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authCtx.token, authCtx.isLoggedIn, dispatch, currentPage, setTotalPages]);

  return (
    <div>
      <h1>Profile</h1>
     

      {userJokes.length > 0 ? <>
        <h3>Your Jokes:</h3>
        <Jokes jokes={userJokes} profilePage={true}/>
      <PaginationSection numOfPages={totalPages} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </>
      : 
      <Typography sx={{color: '#808080'}} variant="h4" align="center">We didn't find any of your jokes.</Typography>
      }
      
    </div>
  );
};

export default Profile;
