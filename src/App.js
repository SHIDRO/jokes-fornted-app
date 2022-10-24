import { useContext, useEffect, useState } from "react";

import { Container } from "@mui/system";
import "./App.css";
import Navigator from "./components/Navigator";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { authContext } from "./store/AuthContextProvider";
import PostJoke from "./Pages/PostJoke";
import { useDispatch, useSelector } from "react-redux";
import {jokesActions} from './store/store';

const routes = [
  { path: "/", index: 0 },
  { path: "/post-joke", index: 1 },
  { path: "/profile", index: 2 },
  { path: "/login", index: 1 },
  { path: "/signup", index: 2 },
  {path: '/admin', index: 3}
];

//1. populate data in users profile and home page.
//2. post a joke form
//    .add to - waiting the admin to accept
//    .then add it to jokes collection (in the server)
//3.   make an admin user.
//4.   deploy!

function App() {
  const jokes = useSelector(state => state.jokesData)
  const [tabValue, setTabValue] = useState("/");
  const location = useLocation();
  const authCtx = useContext(authContext);

  const dispatch = useDispatch();

  console.log(authCtx);
  // console.log("Re-rendered");
  // console.log(authCtx);
  // console.log(tabValue);

  useEffect(() => {
    const updatedIndicator = routes.find(
      (r) => r.path === location.pathname
    ).path;

    setTabValue(updatedIndicator);
  }, []);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const expirationDate = localStorage.getItem("expiration-date");

    if (currentTime < expirationDate) {
      const token = localStorage.getItem("JWT-key");
      authCtx.login(token, true);
    }
  }, []);

  useEffect(() => {
    if(!authCtx.token || !authCtx.isLoggedIn)return;
    fetch("http://localhost:8080/joker/user-jokes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authCtx.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to fetch jokes");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        dispatch(jokesActions.setUserJokes(resData.jokes));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authCtx.token, authCtx.isLoggedIn, dispatch]);

  useEffect(() => {
    fetch("http://localhost:8080/joker/jokes")
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to fetch jokes");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        dispatch(jokesActions.setGlobalJokes(resData.jokes));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <div dir="rtl">
      <Navigator tabValue={tabValue} setTabValue={setTabValue} />

      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />

          {authCtx.isLoggedIn && (
            <Route path="/post-joke" element={<PostJoke />} />
          )}

          {authCtx.isLoggedIn && (
            <Route path="/profile" element={<h1>My Profile</h1>} />
          )}

          {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}

          {!authCtx.isLoggedIn && <Route path="/signup" element={<Signup />} />}

          {(authCtx.isLoggedIn && authCtx.isLoggedIn && authCtx.isAdmin) && <Route path="/admin" element={<h1>Welcome admin</h1>}/>}

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
