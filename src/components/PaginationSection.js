import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";

const PaginationSection = ({ numOfPages }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const onChange = (e, numOfPage) => {
    setPageNumber(numOfPage);
  };

  useEffect(() => {
    let responseStatus;

    console.log("Fetched page number:", pageNumber);
    // fetch(`http://localhost:8080/joker/jokes?page=${pageNumber}`)
    //   .then((res) => {
    //     responseStatus = res.status;
    //     return res.json();
    //   })
    //   .then((resData) => {
    //     if (responseStatus !== 201 && responseStatus !== 200) {
    //       throw new Error(resData.message);
    //     }
    //     //change jokes with redux
    //   })
    //   .catch(console.log);
  }, [pageNumber]);

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
      <Pagination color="primary" onChange={onChange} count={numOfPages} />
    </div>
  );
};

export default PaginationSection;
