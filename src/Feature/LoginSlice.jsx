import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { db } from "./FirebaseConfig"


export const addloginUser = createAsyncThunk("login/addloginUser", async (data) => {
    const result = await addDoc(collection(db, "adminLogin"), data);
    return { ...data, id: result.id }
})

export const getloginUSer = createAsyncThunk("login/getloginUSer", async () => {
    const result = await getDocs(collection(db, "adminLogin"));
    return result.docs.map((val) => ({ ...val.data(), id: val.id }));
})

export const deleteLoginUser = createAsyncThunk("login/deleteLoginUser", async (id) => {
    await deleteDoc(doc(db, "adminLogin", id));
    return id;
})

const initialState = {
    login: []
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addloginUser.fulfilled, (state, action) => {
            state.login.push(action.payload)
        })
        builder.addCase(getloginUSer.fulfilled, (state, action) => {
            state.login = action.payload
        })
        builder.addCase(deleteLoginUser.fulfilled, (state, action) => {
            const deletedId = action.payload;
            state.login = state.login.filter((val) => {
                return val.id !== deletedId
            })
        })
    }
})

export default loginSlice.reducer