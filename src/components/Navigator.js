import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../store/AuthContextProvider";
import { AppBar, Typography, Tabs, Tab } from "@mui/material";

// const routes = [
//   { path: "/", index: 0 },
//   { path: "/post-joke", index: 1 },
//   { path: "/profile", index: 2 },
//   { path: "/login", index: 1 },
//   { path: "/signup", index: 2 },
// ];

const Navigator = ({ tabValue, setTabValue }) => {
  const authCtx = useContext(authContext);
  const navigate = useNavigate();

  const onChangeHandler = (event, newValue) => {
    setTabValue(newValue);

    const newRoute = newValue;
    navigate(newRoute);
  };

  return (
    <AppBar color="transparent" position="relative" sx={{ padding: "15px" }}>
      {/* Title */}
      <Typography variant="h3">כל מילה בדיחה</Typography>

      {/* Navbar */}

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

        {authCtx.isLoggedIn && authCtx.token ? (
          [
            <Tab value="/post-joke" label="בדיחה חדשה" key="newJoke"/>,
            <Tab value="/profile" label="פרופיל" key="profile"/>
          ]
        ) : [
            <Tab value="/login" label="כנס לחשבון" key="login"/>,
            <Tab value="/signup" label="הירשם" key="signup"/>
          ]}

          {(authCtx.isLoggedIn && authCtx.token && authCtx.isAdmin) && <Tab value="/admin" label="אדמין" key="admin"/>}
      </Tabs>
    </AppBar>
  );
};

export default Navigator;
