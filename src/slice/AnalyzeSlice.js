import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ENDPOINTS, SEARCH_URI, SEARCH_REPORT_URI } from '../constants/Constants'

const initialState = {
    analyzing   : false,
    reportUri   : '',
    corpDetails : {
        status  : '',
        data    : {}
    }
}

export const reportUriThunk = createAsyncThunk(
    'api/search/reportUri',
    async (emptyValue = null, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${ENDPOINTS}${SEARCH_REPORT_URI}`);
            return response;
        } catch(err) {
            return rejectWithValue(err);
        }
    }
);

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
        [reportUriThunk.pending]: (state, action) => {

        },
        [reportUriThunk.fulfilled]: (state, action) => {
            state.reportUri = action.payload.data;
        },
        [reportUriThunk.rejected]: (state, action) => {

        },
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