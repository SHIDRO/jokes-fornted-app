import { createSlice, configureStore } from "@reduxjs/toolkit";

const jokesSlice = createSlice({
  name: "jokes_slice",
  initialState: {
    userJokes: [],
    globalJokes: [],
    adminJokes: [],
    hashtags: [],
    jokesByHashtag: []
  },
  reducers: {
    setUserJokes(state, action) {
      state.userJokes = action.payload;
    },
    setGlobalJokes(state, action) {
      state.globalJokes = action.payload;
    },
    setAdminJokes(state, action) {
      state.adminJokes = action.payload;
    },
    setJokesByHashtag(state, action) {
      state.jokesByHashtag = action.payload;
    },
    addToGlobalJokes(state, action) {
      const newJoke = action.payload;
      state.globalJokes = [...state.globalJokes, newJoke];
    },
    removeFromAdminJokes(state, action) {
      const removeJokeId = action.payload;
      const foundJokeIndex = state.adminJokes.findIndex(
        (j) => j._id === removeJokeId
      );

      if (foundJokeIndex >= 0) {
        state.adminJokes = state.adminJokes.filter(
          (j, index) => index !== foundJokeIndex
        );
      } else {
      }
    },
    toggleLikeJoke(state, action) {
      let { jokeId, likes } = action.payload;

      const foundJokeIndex = state.globalJokes.findIndex((j) => {
        return j._id === jokeId;
      });

      let updatedGlobalJokes = [...state.globalJokes];

      if (likes) {
        updatedGlobalJokes[foundJokeIndex].likes += 1;
      } else {
        updatedGlobalJokes[foundJokeIndex].likes -= 1;
      }
    },
    setHashtags(state, action) {
      state.hashtags = [...action.payload];
    },
    addToUserlJokes(state, action) {
      const newJoke = action.payload;
      state.globalJokes = [...state.userJokes, newJoke];
    },
    toggleLikeUserJoke(state, action) {
      let { jokeId, likes } = action.payload;

      const foundJokeIndex = state.userJokes.findIndex((j) => {
        return j._id === jokeId;
      });

      let updatedUserJokes = [...state.userJokes];

      if (likes) {
        updatedUserJokes[foundJokeIndex].likes += 1;
      } else {
        updatedUserJokes[foundJokeIndex].likes -= 1;
      }
    },
    toggleLikeHashtagJokes(state, action) {
      let { jokeId, likes } = action.payload;

      const foundJokeIndex = state.jokesByHashtag.findIndex((j) => {
        return j._id === jokeId;
      });

      let updatedJokesByHashtag = [...state.jokesByHashtag];

      if (likes) {
        updatedJokesByHashtag[foundJokeIndex].likes += 1;
      } else {
        updatedJokesByHashtag[foundJokeIndex].likes -= 1;
      }
    }
  },
});

const store = configureStore({ reducer: { jokesData: jokesSlice.reducer } });

export const jokesActions = jokesSlice.actions;
export default store;
