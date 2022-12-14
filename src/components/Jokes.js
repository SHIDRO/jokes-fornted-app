import { Grid, Typography, Container } from "@mui/material";
import JokesItem from "./JokesItem";

const Jokes = ({ jokes, profilePage, adminPage, homePage, hashtagPage }) => {
  return (
    <Container maxWidth="lg">
      <Grid
        sx={{
          padding: "auto",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          textAlign: "center",
        }}
        container
        spacing={2}
      >
        {jokes.map((j, index) => {
          return (
            <Grid
              key={j._id}
              sx={{ margin: "auto" }}
              item
              lg={6}
              md={6}
              sm={6}
              xs={12}
            >
              <JokesItem
                homePage={homePage}
                hashtagPage={hashtagPage}
                id={j._id}
                adminPage={adminPage}
                title={j.title}
                content={j.content}
                likes={j.likes}
                approved={j.approved}
                profilePage={profilePage}
                userData={j.userId}
                hashtags={j.hashtags}
                usersLiked={j.usersLiked}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
export default Jokes;
