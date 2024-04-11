import { configureStore } from "@reduxjs/toolkit";
import PlaceReducer from "./placesSlice.ts"
export const store=configureStore({
    reducer:{places:PlaceReducer}
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch