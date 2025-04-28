import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";

// Get all blogs
export const getBlog = createAsyncThunk('blog/getBlog', async () => {
    const result = await getDocs(collection(db, "Add-Blog"));
    return result.docs.map((val) => ({ ...val.data(), id: val.id }));
});

// Add a new blog
export const addBlog = createAsyncThunk('blog/addBlog', async (data) => {
    const result = await addDoc(collection(db, "Add-Blog"), data);
    return { ...data, id: result.id };
});

// Edit an existing blog
export const editBlog = createAsyncThunk('blog/editBlog', async ({ finaldata, id }) => {
    const docRef = doc(db, "Add-Blog", id);
    await updateDoc(docRef, finaldata);
    return { ...finaldata, id }; // Return the updated data
});

// Delete a blog
export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id) => {
    await deleteDoc(doc(db, "Add-Blog", id));
    return id; // Return ID for reducer to remove it
});

// Initial state
const initialState = {
    blog: []
};

//  Create slice
const allBlog = createSlice({
    name: "blog",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getBlog.fulfilled, (state, action) => {
                state.blog = action.payload;
            })
            .addCase(addBlog.fulfilled, (state, action) => {

                state.blog.push(action.payload);


            })
            .addCase(editBlog.fulfilled, (state, action) => {
                const updatedBlog = action.payload;
                const index = state.blog.findIndex(b => b.id === updatedBlog.id);
                if (index !== -1) {
                    state.blog[index] = updatedBlog; //  Update the blog in the state
                }
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.blog = state.blog.filter(b => b.id !== deletedId);
            });
    }
});

export default allBlog.reducer;
