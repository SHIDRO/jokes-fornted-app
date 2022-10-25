import PaginationSection from "../components/PaginationSection";
import Jokes from "../components/Jokes";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

//pass to jokes only the user's jokes

const Profile = () => {
  const {userJokes} = useSelector(state => state.jokesData);

  return (
    <div>
      <h1>Profile</h1>
     

      {userJokes.length > 0 ? <>
        <h3>Your Jokes:</h3>
        <Jokes jokes={userJokes} profilePage={true}/>
      <PaginationSection numOfPages={1} />
      </>
      : 
      <Typography sx={{color: '#808080'}} variant="h4" align="center">We didn't find any of your jokes.</Typography>
      }
      
    </div>
  );
};

export default Profile;
