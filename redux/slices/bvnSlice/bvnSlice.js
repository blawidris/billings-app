import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { verifyBvnApi } from "../../../services/api";
import { signUp } from "../authentication/authSlice";

// Initial State
const initialState = {
    bvn: '',
    username: '',
    isBVNVerified: false,
    bvnVerificationStatus: '',
    bvnVerificationError: null,
    isSignUpComplete: false,
    authenticated: false,
};

// Async Thunk for BVN Verification
export const verifyBVN = createAsyncThunk(
    'bvn/verifyBVN',
    async ({ bvn, username }, { getState, rejectWithValue }) => {
        try {
            const token = getState().signUp.token; 

            if (!token) {
                throw new Error('Token not found in state');
            }

            const response = await verifyBvnApi({ bvn, username }, token);
            console.log('BVN Verification Response:', response);
            return response;
        } catch (error) {
            console.error('Error during BVN verification:', error);
            return rejectWithValue(error.response ? error.response.data : 'Something went wrong');
        }
    }
);


// BVN Slice
const bvnSlice = createSlice({
    name: 'bvn',
    initialState,
    reducers: {
        setBvnInfo: (state, action) => {
            state.bvn = action.payload.bvn;
            state.username = action.payload.username;
        },
        resetBvnInfo: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyBVN.pending, (state) => {
                state.bvnVerificationStatus = 'loading';
            })
            .addCase(verifyBVN.fulfilled, (state, action) => {
                state.bvnVerificationStatus = 'succeeded';
                state.isBVNVerified = true; 
                // state.username = action.payload.data.username;
                state.isSignUpComplete = true;

            })
            .addCase(verifyBVN.rejected, (state, action) => {
                state.bvnVerificationStatus = 'failed';
                state.bvnVerificationError = action.payload;
                
            });
    },
});

export const { setBvnInfo, resetBvnInfo } = bvnSlice.actions;
export default bvnSlice.reducer;
