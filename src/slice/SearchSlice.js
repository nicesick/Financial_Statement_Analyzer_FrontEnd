import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CONTENTS_URI, ENDPOINTS, SEARCH_URI } from '../constants/Constants';

const initialState = {
    searching           : false,
    searchEvaluates     : [],
    searchParams        : {
        corpName        : '',
        corpCls         : 'Y',
        sortByService   : ''
    },
    corpInfos           : {
        status  : '',
        data    : []
    }
};

export const searchEvaluatesThunk = createAsyncThunk(
    'api/search/contents',
    async (emptyValue = null, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(ENDPOINTS + CONTENTS_URI);
            return response.data;
        } catch(err) {
            return rejectWithValue(err.reponse.data);
        }
    }
);

export const searchCorpInfosThunk = createAsyncThunk(
    'api/search/corpInfos',
    async (params, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${ENDPOINTS}${SEARCH_URI}`, { params });
            return response;
        } catch(err) {
            return rejectWithValue(err.reponse.data);
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeSearchParams: (state, action) => {
            state.searchParams = {
                ...state.searchParams,
                ...action.payload
            }
        }
    },
    extraReducers: {
        [searchEvaluatesThunk.pending]: (state, action) => {
        },
        [searchEvaluatesThunk.fulfilled]: (state, action) => {
            if (action.payload.length > 0) {
                state.searchEvaluates               = action.payload;
                state.searchParams.sortByService    = action.payload[0].value;
            }
        },
        [searchEvaluatesThunk.rejected]: (state, action) => {
        },
        [searchCorpInfosThunk.pending]: (state, action) => {
            state.searching = true;
        },
        [searchCorpInfosThunk.fulfilled]: (state, action) => {
            state.searching         = false;
            state.corpInfos.status  = action.payload.status;
            state.corpInfos.data    = action.payload.data;
        },
        [searchCorpInfosThunk.rejected]: (state, action) => {
            state.searching = false;
        }
    }
});

export const { changeSearchParams } = searchSlice.actions
export default searchSlice.reducer