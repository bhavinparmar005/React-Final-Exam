import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./src/Feature/BlogSlice"

export const store =configureStore({
    reducer:{

        blog :blogReducer

    }
})