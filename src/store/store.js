import {createSlice, configureStore} from '@reduxjs/toolkit';

const jokesSlice = createSlice({
    name: 'jokes_slice',
    initialState: {userJokes: [], globalJokes: []},
    reducers: {
        setUserJokes(state, action){
            state.userJokes = action.payload;
        },
        setGlobalJokes(state, action){
            state.globalJokes = action.payload;
        }
    }
});

const store = configureStore({reducer: {jokesData: jokesSlice.reducer}});

export const jokesActions = jokesSlice.actions;
export default store;