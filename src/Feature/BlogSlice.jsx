import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "./FirebaseConfig"


export const getBlog = createAsyncThunk('blog/getBlog', async () => {
    const result = await getDocs(collection(db, "Add-Blog"))
    return result.docs.map((val) => {
        return ({ ...val.data(), id: val.id })
    })
})

export const addBlog = createAsyncThunk('blog/addBlog', async (data) => {
    const result = await addDoc(collection(db, "Add-Blog"), data)
    return { ...data, id: result.id }
})

export const editBlog = createAsyncThunk('blog/editBlog', async (data) => {
    console.log(data);
    const docRef = doc(db, "Add-Blog", data.id);
    await updateDoc(docRef, data.data)
})

export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id) => {
    await deleteDoc(doc(db, "Add-Blog", id))
})



const initialState = {
    blog: []
}

const allBlog = createSlice({
    name: "blog",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getBlog.fulfilled, (state, action) => {
            state.blog = action.payload; // action.payload is the full array
        })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.blog.push(action.payload); // Add the new blog to the array
            })
            .addCase(editBlog.fulfilled, (state, action) => {
                const updatedBlog = action.payload;
                const index = state.blog.findIndex(b => b.id === updatedBlog.id);
                if (index !== -1) {
                    state.blog[index] = updatedBlog;
                }
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.blog = state.blog.filter(b => b.id !== deletedId);
            });
    }
})
export default allBlog.reducer