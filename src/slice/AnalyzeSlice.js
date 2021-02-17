import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ENDPOINTS, SEARCH_URI } from '../constants/Constants'

const initialState = {
    analyzing   : false,
    corpDetails : {
        status  : '',
        data    : {}
    }
}

export const analyzeThunk = createAsyncThunk(
    'api/analyze',
    async (params, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${ENDPOINTS}${SEARCH_URI}/${params}`);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const analyzeSlice = createSlice({
    name: 'analyze',
    initialState,
    extraReducers: {
        [analyzeThunk.pending]: (state, action) => {
            state.analyzing = true;
        },
        [analyzeThunk.fulfilled]: (state, action) => {
            state.analyzing             = false;
            state.corpDetails.status    = action.payload.status;
            state.corpDetails.data      = action.payload.data;
        },
        [analyzeThunk.rejected]: (state, action) => {
            state.analyzing             = false;
            state.corpDetails.status    = action.payload.status;
        }
    }
});

export default analyzeSlice.reducer