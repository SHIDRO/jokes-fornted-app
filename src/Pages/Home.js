import React from "react";
// import { Card, CardActions, CardContent, Container } from "@mui/material";
import Jokes from "../components/Jokes";
import PaginationSection from "../components/PaginationSection";
import { useSelector } from "react-redux";

const Home = () => {
  const {globalJokes} = useSelector(state => state.jokesData);

  return (
    <div>
      <h1>Home</h1>
      <Jokes jokes={globalJokes} />
      <PaginationSection numOfPages={100}/>
    </div>
  );
};

export default Home;
