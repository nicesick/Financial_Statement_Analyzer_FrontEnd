import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ENDPOINTS, UPDATE_URI } from '../constants/Constants'

const initialState = {
    updating    : false,
    updateTime  : {
        status  : '',
        data    : {
            progress    : '',
            updateDate  : ''
        }
    }
};

export const updatePostThunk = createAsyncThunk(
    'api/update',
    async (emptyValue = null, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(`${ENDPOINTS}${UPDATE_URI}`);
            return response;
        } catch(err) {
            return rejectWithValue(err);
        }
    }
);

export const updateGetThunk = createAsyncThunk(
    'api/update/updateTime',
    async (emptyValue = null, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${ENDPOINTS}${UPDATE_URI}`);
            return response;
        } catch(err) {
            return rejectWithValue(err);
        }
    }
);

const updateSlice = createSlice({
    name: 'update',
    initialState,
    extraReducers: {
        [updateGetThunk.pending]: (state, action) => {
            state.updating = true;
        },
        [updateGetThunk.fulfilled]: (state, action) => {
            state.updating          = false;
            state.updateTime.status = action.payload.status;

            if (action.payload.status === 200) {
                state.updateTime.data.progress      = action.payload.data.progress;
                state.updateTime.data.updateDate    = action.payload.data.updateDate.substr(0, 10);
            }
        },
        [updateGetThunk.rejected]: (state, action) => {
            state.updating          = false;
            state.updateTime.status = action.payload.status;
        },
        
        [updatePostThunk.pending]: (state, action) => {
            state.updating = true;
        },
        [updatePostThunk.fulfilled]: (state, action) => {
            state.updating          = false;
            state.updateTime.status = action.payload.status;
            state.updateTime.data   = action.payload.data;
        },
        [updatePostThunk.rejected]: (state, action) => {
            state.updating          = false;
            state.updateTime.status = action.payload.status;
        }
    }
});

export default updateSlice.reducer