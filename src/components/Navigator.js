import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../store/AuthContextProvider";
import { AppBar, Typography, Tabs, Tab, useMediaQuery, Box } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneMenu from "./UI/PhoneMenu";

// const routes = [
//   { path: "/", index: 0 },
//   { path: "/post-joke", index: 1 },
//   { path: "/profile", index: 2 },
//   { path: "/login", index: 1 },
//   { path: "/signup", index: 2 },
// ];

const Navigator = ({ tabValue, setTabValue }) => {
  const matches = useMediaQuery("(max-width:714px)");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const authCtx = useContext(authContext);
  const navigate = useNavigate();

  const onChangeHandler = (event, newValue) => {
    setTabValue(newValue);

    const newRoute = newValue;
    navigate(newRoute);
  };

  return (
    <div dir="rtl">
      <AppBar color="transparent" position="relative" sx={{ padding: "15px" }}>

        {/* Title */}
        <Typography sx={{display: 'inline-block'}} variant="h3">כל מילה בדיחה</Typography>

        {/* Navbar */}
        {matches && <IconButton
        onClick={() => {setToggleDrawer(true)}}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{width: '10%', display: 'inline', float: 'left', position: 'absolute', left: 20}}
          >
            <MenuIcon />
          </IconButton>}

          {toggleDrawer && <PhoneMenu setOpen={setToggleDrawer} open={toggleDrawer}>

          </PhoneMenu>}

        {!matches && (
          <Tabs
            sx={{
              display: "inline",
              position: "absolute",
              left: 0,
              margin: "5px 0 0 20px",
            }}
            textColor="inherit"
            indicatorColor="primary"
            value={tabValue}
            onChange={onChangeHandler}
          >
            <Tab value="/" label="בית" />

            {authCtx.isLoggedIn && authCtx.token
              ? [
                  <Tab value="/post-joke" label="בדיחה חדשה" key="newJoke" />,
                  <Tab value="/profile" label="פרופיל" key="profile" />,
                ]
              : [
                  <Tab value="/login" label="כנס לחשבון" key="login" />,
                  <Tab value="/signup" label="הירשם" key="signup" />,
                ]}

            {authCtx.isLoggedIn && authCtx.token && authCtx.isAdmin && (
              <Tab value="/admin" label="אדמין" key="admin" />
            )}
          </Tabs>
        )}

        
      </AppBar>
    </div>
    
  );
};

export default Navigator;
