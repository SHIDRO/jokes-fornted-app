import { useContext, useEffect, useState } from "react";
import { Container } from "@mui/system";
import "./App.css";
import Navigator from "./components/Navigator";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { authContext } from "./store/AuthContextProvider";
import PostJoke from "./Pages/PostJoke";
import { useDispatch, useSelector } from "react-redux";
import {jokesActions} from './store/store';
import Home from './Pages/Home';
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import HomeByHashtag from "./Pages/HomeByHashtage";

const routes = [
  { path: "/", index: 0 },
  { path: "/post-joke", index: 1 },
  { path: "/profile", index: 2 },
  { path: "/login", index: 1 },
  { path: "/signup", index: 2 },
  {path: '/admin', index: 3}
];


function App() {
  const [tabValue, setTabValue] = useState("/");
  const location = useLocation();
  const authCtx = useContext(authContext);

  const dispatch = useDispatch();

  useEffect(() => {
    const updatedIndicator = routes.find(
      (r) => r.path === location.pathname
    );

    if(!updatedIndicator){
      return setTabValue('/');
    }
    return setTabValue(updatedIndicator.path);
  }, [location.pathname]);

  useEffect(() => {
    if(!authCtx.token) return;

    fetch('http://localhost:8080/auth/get-user-data', {
      method: 'GET',
      headers: {
        'Authorization': authCtx.token
      }
    })
    .then(res => {
      if(res.status !== 200){
        throw new Error('Failed to fetch userData');
      }
      return res.json();
    })
    .then(resData => {
      
      authCtx.login(authCtx.token, true, resData.userData);
    })
    .catch(console.log)
  }, [authCtx.token]);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const expirationDate = localStorage.getItem("expiration-date");

    if (currentTime < expirationDate) {
      const token = localStorage.getItem("JWT-key");
      authCtx.login(token, true, {isAdmin: false});
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/joker/hashtags")
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to hashtags");
        }
        return res.json();
      })
      .then((resData) => {
        dispatch(jokesActions.setHashtags(resData.hashtags))
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <div>
      <Navigator tabValue={tabValue} setTabValue={setTabValue} />

      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:hashtagName" element={<HomeByHashtag/>} />

          {authCtx.isLoggedIn && (
            <Route path="/post-joke" element={<PostJoke />} />
          )}

          {authCtx.isLoggedIn && (
            <Route path="/profile" element={<Profile/>} />
          )}

          {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}

          {!authCtx.isLoggedIn && <Route path="/signup" element={<Signup />} />}

          {(authCtx.isLoggedIn && authCtx.isLoggedIn && authCtx.isAdmin) && <Route path="/admin" element={<Admin/>}/>}

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
