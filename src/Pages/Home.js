import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Card, Button, CardContent, Typography } from "@mui/material";
import Jokes from "../components/Jokes";
import PaginationSection from "../components/PaginationSection";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [chosenHashtag, setChosenHashtag] = useState("");
  const [chosenHashtagColor, setChosenHashtagColor] = useState("");
  const { globalJokes, hashtags } = useSelector((state) => state.jokesData);
  const [searchInput, setSearchInput] = useState(null);
  let homeJokes;
  let foundHashtags = [];

  const navigate = useNavigate()

  if (!searchInput) {
    homeJokes = globalJokes
  } else {
    foundHashtags = hashtags.filter(h => h.hashtag.includes(searchInput));
    if (foundHashtags.length === 0) {
      const filter = searchInput.substring(0, searchInput.length - 2);
      console.log("filter", filter)
      foundHashtags = hashtags.filter(h => h.hashtag.includes(filter));
    }

    homeJokes = globalJokes.filter(j => {
      if (j.content.includes(searchInput)) {
        return true
      }

      if (j.title.includes(searchInput)) return true;
    })
  }

  console.log('Home Jokes', homeJokes)
  console.log('Hashtags', foundHashtags)


  if (chosenHashtag !== "") {
    homeJokes = globalJokes.filter(j => {
      return j.hashtag.hashtag === chosenHashtag
    })
  }

  const onChangeHashtagHandler = (e) => {
    setChosenHashtag(e.target.value);

    const color = hashtags.find((h) => h.hashtag === e.target.value).color;
    setChosenHashtagColor(color);
  };
  console.log(chosenHashtagColor);

  const navigateHashtag = ({hashtag}) => {
    navigate(`/${hashtag}`)
  }
  return (
    <div>
      <h1>Home</h1>
      <SearchBar setSearchInput={setSearchInput} />
      <Box sx={{ maxWidth: 180, float: "right" }}>
        {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">#</InputLabel>
          <Select
            sx={{ color: chosenHashtagColor, fontWeight: "bold" }}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={chosenHashtag}
            onChange={onChangeHashtagHandler}
          >
            {hashtags.map((h, index) => {
              return <MenuItem key={h._id} value={h.hashtag}>{h.hashtag}</MenuItem>;
            })}
          </Select>
        </FormControl> */}
        <div style={{ border: '1px solid black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 'auto' }}>
          {foundHashtags.map(hashtag => {
            return (
              <div>
                <Card sx={{ padding: '0px' }} key={hashtag._id} elevation={6}>
                  <CardContent sx={{ padding: '0px' }}>
                    <Button onClick={navigateHashtag.bind(this, hashtag)} variant="text" sx={{ color: hashtag.color, cursor: 'pointer', padding: '0' }}>#{hashtag.hashtag}</Button>
                  </CardContent>
                </Card>
                <hr />
              </div>
            )
          })}
        </div>
      </Box>
      <Jokes jokes={homeJokes} />
      <PaginationSection numOfPages={100} />
    </div>
  );
};

export default Home;
