import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Jokes from "../components/Jokes";
import PaginationSection from "../components/PaginationSection";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [chosenHashtag, setChosenHashtag] = useState("");
  const [chosenHashtagColor, setChosenHashtagColor] = useState("");
  const { globalJokes, hashtags } = useSelector((state) => state.jokesData);
  const [searchInput, setSearchInput] = useState(null);
  let homeJokes;

  if(!searchInput){
    homeJokes = globalJokes
  }else {
    // show hashtag that much the searchInput
    const foundHashtags = hashtags.filter(h => {
      return h.hashtag.includes(searchInput);
    })

    homeJokes = globalJokes.filter(j => {
       if(j.content.includes(searchInput)){
        return true
       }

       if(j.title.includes(searchInput)) return true;
    })
  }

  if(chosenHashtag !== ""){
    homeJokes = globalJokes.filter(j => {
      return j.hashtag.hashtag === chosenHashtag
    });
  }

  const onChangeHashtagHandler = (e) => {
    setChosenHashtag(e.target.value);

    const color = hashtags.find((h) => h.hashtag === e.target.value).color;
    setChosenHashtagColor(color);
  };
  console.log(chosenHashtagColor);
  return (
    <div>
      <h1>Home</h1>
      <SearchBar setSearchInput={setSearchInput}/>
      <Box sx={{ maxWidth: 180, float: "right" }}>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
        </FormControl>
      </Box>
      <Jokes jokes={homeJokes} />
      <PaginationSection numOfPages={100} />
    </div>
  );
};

export default Home;
