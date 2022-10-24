import React from "react";
// import { Card, CardActions, CardContent, Container } from "@mui/material";
import Jokes from "./Jokes";

const jokes = [
  {
    title: "Test1",
    content: "jytawdu iuwagda wdaiudg hgd dhdwaiu hdhd aidb hwdao",
    likes: 200
  },
  {
    title: "Test2",
    content: "jytawdu iuwagdaaiudg hgd dhdwaiu hdhd aidb hwdao",
    likes: 122
  },
  {
    title: "Test3",
    content: "jytawdu  wdaiudg hgd dhdwaiu hdhd aidb hwdao",
    likes: 8
  },
  {
    title: "Test4",
    content: "jyta wdaiudg hgd dhdwaiu hdhd aidb hwdao",
    likes: 12
  }
];

const Home = () => {
  return (
    // <Container>
    <>
      <h1>Home</h1>
      <Jokes jokes={jokes} />
    </>
    // </Container>
  );
};

export default Home;
