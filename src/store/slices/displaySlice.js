// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { api } from '../../../modules/controleonline/ui-common/src/api'; 

// export const fetchDisplayType = createAsyncThunk(
//     'display/fetchDisplayType',
//     async (displayId) => {
//         const response = await api.fetch(`/displays/${displayId}`);
//         return response.displayType;
//     }
// );

// const displaySlice = createSlice({
//     name: 'display',
//     initialState: {
//         displayType: '',
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchDisplayType.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchDisplayType.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.displayType = action.payload;
//             })
//             .addCase(fetchDisplayType.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// export default displaySlice.reducer;
