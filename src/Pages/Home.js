import React, { useCallback, useState, useEffect } from "react";
import { Box, Card, Button, CardContent, Typography } from "@mui/material";
import Jokes from "../components/Jokes";
import PaginationSection from "../components/PaginationSection";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../components/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { jokesActions } from "../store/store";
import usePagination from "../hooks/usePagination";

const Home = React.memo(() => {
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [chosenHashtag, setChosenHashtag] = useState("");
  const [chosenHashtagColor, setChosenHashtagColor] = useState("");
  const { globalJokes, hashtags } = useSelector((state) => state.jokesData);
  const [searchInput, setSearchInput] = useState("");
  const { currentPage, totalPages, setTotalPages } = usePagination();
  let homeJokes;
  let foundHashtags = [];

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  // fetch all jokes
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8080/joker/jokes?p=${currentPage}&con=${searchInput}`
    )
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to fetch jokes");
        }
        return res.json();
      })
      .then((resData) => {
        setTotalPages(resData.totalPages);
        dispatch(jokesActions.setGlobalJokes(resData.jokes));
        setLoading(false);
        setPageNumber(resData.currentPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, currentPage, searchInput, setTotalPages]);

  if (!searchInput) {
    homeJokes = globalJokes;
  } else {
    foundHashtags = hashtags.filter((h) => h.hashtag.includes(searchInput));
    if (foundHashtags.length === 0) {
      const filter = searchInput.substring(0, searchInput.length - 2);
      foundHashtags = hashtags.filter((h) => h.hashtag.includes(filter));
    }

    homeJokes = globalJokes.filter((j) => {
      if (j.content.includes(searchInput)) {
        return true;
      }

      if (j.title.includes(searchInput)) return true;
      return false;
    });
  }
  if (chosenHashtag !== "") {
    homeJokes = globalJokes.filter((j) => {
      return j.hashtag.hashtag === chosenHashtag;
    });
  }

  const onChangeHashtagHandler = (e) => {
    setChosenHashtag(e.target.value);

    const color = hashtags.find((h) => h.hashtag === e.target.value).color;
    setChosenHashtagColor(color);
  };

  const navigateHashtag = ({ hashtag }) => {
    navigate(`/${hashtag}`);
  };

  // if (loading) {
  //   return (
  //     <Typography align="center" variant="h3">
  //       Loading...
  //     </Typography>
  //   );
  // }

  return (
    <div>
      <h1>Home</h1>
      <SearchBar
        setPageNumber={setPageNumber}
        setTotalPages={console.log}
        setLoading={setLoading}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        {foundHashtags.map((hashtag) => {
          return (
            <div style={{ marginBottom: "10px" }}>
              <button
                onClick={navigateHashtag.bind(this, hashtag)}
                style={{
                  color: hashtag.color,
                  padding: "0px",
                  width: " 100%",
                  margin: "auto",
                  fontSize: "20px",
                  border: 'none',
                  cursor: "pointer"
                }}
              >
                #{hashtag.hashtag}
              </button>
              <hr style={{border: '1px solid grey'}}/>
              {/* <Card sx={{ padding: "0px", width:" 50%", margin: 'auto', borderBottom: '1px grey solid' }} key={hashtag._id} elevation={20}>
                  <CardContent sx={{ padding: "0px" }}>
                    <Button
                      onClick={navigateHashtag.bind(this, hashtag)}
                      variant="text"
                      sx={{
                        margin: 'auto',
                        color: hashtag.color,
                        cursor: "pointer",
                        padding: "0",
                      }}
                    >
                      #{hashtag.hashtag}
                    </Button>
                  </CardContent>
                </Card> */}
            </div>
          );
        })}
      </div>
      {loading ? (
        <Typography align="center" variant="h3">
          Loading...
        </Typography>
      ) : (
        <div>
          <Jokes jokes={homeJokes} homePage={true} hashtagPage={false}/>
          <PaginationSection
            pageNumber={+pageNumber}
            setPageNumber={setPageNumber}
            numOfPages={totalPages}
          />
        </div>
      )}
    </div>
  );
});

export default Home;
