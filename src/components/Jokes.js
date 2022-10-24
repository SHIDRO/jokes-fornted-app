import { Grid, Typography, Container } from "@mui/material";
import JokesItem from "./JokesItem";

const Jokes = ({ jokes }) => {
  return (
    <Container maxWidth="lg">
      <Grid
        sx={{
          margin: "auto",
          display: "flex",
          flexDiraction: "column",
          alignItems: "center",
          justifyItems: "center",
          textAlign: "center"
        }}
        container
        spacing={2}
      >
        {jokes.map((j, index) => {
          return (
            <Grid
              key={index}
              sx={{ margin: "auto" }}
              item
              lg={4}
              md={6}
              sm={6}
              xs={12}
            >
              <JokesItem title={j.title} content={j.content} likes={j.likes} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
export default Jokes;
