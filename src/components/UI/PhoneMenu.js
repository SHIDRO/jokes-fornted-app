import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { authContext } from "../../store/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const ifAuth = ["בית", "בדיחה חדשה", "פרופיל"];

const routes = [
  { name: "בדיחה חדשה", path: "/post-joke", index: 1, auth: true },
  { name: "פרופיל", path: "/profile", index: 2, auth: true },
  { name: "כנס לחשבון", path: "/login", index: 1, auth: false },
  { name: "הרשם", path: "/signup", index: 2, auth: false },
];

const PhoneMenu = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const authCtx = useContext(authContext);
  console.log(authCtx)
  const onCloseDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <Drawer anchor="left" open={open} onClose={onCloseDrawer}>
      <div dir="rtl">


        <List sx={{ padding: "15px" }}>
        <ListItem>
          <ListItemButton onClick={(e) => {
            onCloseDrawer(e)
            navigate('/');
          }}>
            <ListItemText primary={"בית"} />
          </ListItemButton>
        </ListItem>
        
          {authCtx.token &&
            authCtx.isLoggedIn &&
            routes.map((tab, index) => {
              if (tab.auth) {
                return (
                  <ListItem key={index}>
                    <ListItemButton onClick={(e) => {
            onCloseDrawer(e)
            navigate(`${tab.path}`);
          }}>
                      <ListItemText primary={tab.name} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}

          {!authCtx.token &&
            !authCtx.isLoggedIn &&
            routes.map((tab, index) => {
              if (!tab.auth) {
                return (
                  <ListItem key={index}>
                    <ListItemButton onClick={(e) => {
            onCloseDrawer(e)
            navigate(`${tab.path}`);
          }}>
                      <ListItemText primary={tab.name} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
          {authCtx.isAdmin && (
            <ListItem>
              <ListItemButton onClick={(e) => {
            onCloseDrawer(e)
            navigate(`/admin`);
          }}>
                <ListItemText primary={"אדמין"} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default PhoneMenu;
