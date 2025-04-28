import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "./FirebaseConfig"

export const addsignupUser = createAsyncThunk("signup/addsignupUser", async (data) => {
    const result = await addDoc(collection(db, "adminSignup"), data);
    return { ...data, id: result.id }
})
export const getsignupUSer = createAsyncThunk("signup/getsignupUSer", async () => {
  const result = await getDocs(collection(db, "adminSignup"));
    return result.docs.map((val) => ({ ...val.data(), id: val.id }));
})


const initialState = {
    signup: []
}

const signupSlice = createSlice({
    name: "signup",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addsignupUser.fulfilled, (state, action) => {
            state.signup.push(action.payload)
        })
        builder.addCase(getsignupUSer.fulfilled, (state, action) => {
            state.signup = action.payload
        })
    }
})
export default signupSlice.reducer