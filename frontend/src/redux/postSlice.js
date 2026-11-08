import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5174/api/post';

const initialState = {
    post: [],
    postloading: false,
    postsuccess: false,
    posterror: false,
    postmessage: '',
};

// add post wala function 
export const addpost = createAsyncThunk('post/addpost', async(formData, thunkAPI) => {
    try {
        // ⚠️ FormData bhej rahe ho — Content-Type manually MAT set karo
        // Browser khud 'multipart/form-data; boundary=...' set karega
        const response = await axios.post(`${BASE_URL}/add-post`, formData);

        console.log('✅ Backend response:', response.data);
        return response.data.data || response.data;

    } catch (error) {
        const errData = error.response && error.response.data;
        const errMsg = errData && errData.message;

        console.log('❌ Error:', errData || error.message);
        return thunkAPI.rejectWithValue(
            errMsg || error.message || 'Post failed'
        );
    }
});

// get all post wala function
export const getallpost = createAsyncThunk('post/getallpost', async(_, thunkAPI) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-post`);
        return response.data.data || response.data;
    } catch (error) {
        const errData = error.response && error.response.data;
        const errMsg = errData && errData.message;
        return thunkAPI.rejectWithValue(errMsg || error.message || 'Failed to load');
    }
});


// Edit post wala function
export const updatepost = createAsyncThunk('post/updatepost', async({ id, formData }, thunkAPI) => {
    try {
        const response = await axios.put(`${BASE_URL}/update-post/${id}`, formData);
        return response.data.data || response.data;
    } catch (error) {
        const errData = error.response && error.response.data;
        const errMsg = errData && errData.message;
        return thunkAPI.rejectWithValue(errMsg || error.message || 'Failed to update post');
    }
});

// delete post wala function
// DELETE POST
export const deletepost = createAsyncThunk('post/deletepost', async(id, thunkAPI) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete-post/${id}`);
        return id; // deleted post ki id return karo
    } catch (error) {
        const errData = error.response && error.response.data;
        const errMsg = errData && errData.message;
        return thunkAPI.rejectWithValue(errMsg || error.message || 'Delete failed');
    }
});
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        postReset: (state) => {
            state.postloading = false;
            state.postsuccess = false;
            state.posterror = false;
            state.postmessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addpost.pending, (state) => {
                state.postloading = true;
                state.posterror = false;
                state.postsuccess = false;
            })
            .addCase(addpost.rejected, (state, action) => {
                state.postloading = false;
                state.posterror = true;
                state.postmessage = action.payload;
            })
            .addCase(addpost.fulfilled, (state, action) => {
                state.postloading = false;
                state.postsuccess = true;
                state.postmessage = 'Post created!';

                const newPost = action.payload;
                if (newPost && newPost._id) {
                    state.post.unshift(newPost);
                }
            })
            // Getallpost ke cases
            .addCase(getallpost.pending, (state) => { state.postloading = true; })
            .addCase(getallpost.rejected, (state, action) => {
                state.postloading = false;
                state.posterror = true;
                console.log("❌ Fetch Error:", action.payload);
            })
            .addCase(getallpost.fulfilled, (state, action) => {
                state.postloading = false;
                // Data array save karo
                state.post = Array.isArray(action.payload) ? action.payload : [];
            })
            // Editpost ke cases
            // UPDATE POST
            .addCase(updatepost.pending, (state) => { state.postloading = true; })
            .addCase(updatepost.rejected, (state, action) => {
                state.postloading = false;
                state.posterror = true;
                state.postmessage = action.payload;
            })
            .addCase(updatepost.fulfilled, (state, action) => {
                state.postloading = false;
                state.postsuccess = true;
                state.postmessage = 'Post updated!';

                // List mein updated post replace karo
                const updated = action.payload;
                if (updated && updated._id) {
                    const index = state.post.findIndex(function(p) { return p._id === updated._id; });
                    if (index !== -1) {
                        state.post[index] = updated;
                    }
                }
            })
            // delete post ke cases
            // DELETE POST
            .addCase(deletepost.pending, (state) => { state.postloading = true; })
            .addCase(deletepost.rejected, (state, action) => {
                state.postloading = false;
                state.posterror = true;
                state.postmessage = action.payload;
            })
            .addCase(deletepost.fulfilled, (state, action) => {
                state.postloading = false;
                state.postsuccess = true;
                state.postmessage = 'Post deleted!';

                // 🔴 Deleted post ko list se hatao
                state.post = state.post.filter(function(p) {
                    return p._id !== action.payload;
                });
            });
    },
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;