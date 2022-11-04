import React, { useEffect, useState, useCallback } from "react";
import { Pagination } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

let isInitial = true;

const PaginationSection = React.memo(({ numOfPages, pageNumber, setPageNumber }) => {
  const location = useLocation();
  const navigate = useNavigate();


  if(!numOfPages){
    numOfPages = 1;
  }

  const onChange = (e, numOfPage) => {
    setPageNumber(numOfPage);
  };

  useEffect(() => {
    if(isInitial){
      isInitial = false
      return;
    }

    navigate(`${location.pathname}?p=${pageNumber}`)
  }, [pageNumber, location.pathname]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px auto"
      }}
    >
      {/* put dynamic number of pages */}
      <Pagination color="primary" onChange={onChange} count={numOfPages} page={pageNumber}/>
    </div>
  );
});

export default PaginationSection;
