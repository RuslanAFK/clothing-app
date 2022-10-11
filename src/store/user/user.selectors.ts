import { createSelector } from "reselect";
import { RootState } from "../root.reducer";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
    selectUserReducer,
    (user) => user.currentUser
)

export const selectUserIsLoading = createSelector(
    selectUserReducer,
    (user) => user.isLoading
)
