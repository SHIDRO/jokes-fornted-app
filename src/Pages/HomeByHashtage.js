import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Jokes from "../components/Jokes";
import PaginationSection from "../components/PaginationSection";
import usePagination from "../hooks/usePagination";
import { jokesActions } from "../store/store";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const HomeByHashtag = ({}) => {
  const navigate = useNavigate();
  const { jokesByHashtag } = useSelector((state) => state.jokesData);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const { hashtagName } = useParams();
  const { hashtags } = useSelector((state) => state.jokesData);
  const { currentPage, totalPages, setTotalPages } = usePagination();

  console.log(jokesByHashtag)

  const foundHashtag = hashtags.find(
    (h) => h.hashtag.toLowerCase() === hashtagName.toLowerCase()
  );

  useEffect(() => {
    if (!foundHashtag) return;

    fetch(
      `http://localhost:8080/joker/jokes/${foundHashtag._id}/?p=${currentPage}`
    )
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to fetch jokes");
        }
        return res.json();
      })
      .then((resData) => {
        setTotalPages(resData.totalPages);
        dispatch(jokesActions.setJokesByHashtag(resData.jokes));
        setPageNumber(resData.currentPage);
      })
      .catch(console.log);
  }, [foundHashtag, currentPage, dispatch, setTotalPages]);

  if (!foundHashtag) {
    return (
      <h1 style={{ textAlign: "center", paddingTop: "20px" }}>
        couldn't find your hashtag
      </h1>
    );
  }

  console.log(jokesByHashtag);

  return (
    <div>
      <Button
      startIcon={<ArrowBackIosIcon/>}
        style={{
          color: 'black',
          margin: "20px 20px 20px 0",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        back home
      </Button>
      <h1 style={{ marginTop: "10px" }}>#{hashtagName}</h1>
      <Jokes jokes={jokesByHashtag} homePage={false} hashtagPage={true}/>
      <PaginationSection
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        numOfPages={totalPages}
      />
    </div>
  );
};

export default HomeByHashtag;
