import {configureStore} from '@reduxjs/toolkit'
import JobReducer from './reducers/JobReducer'
import UserReducer from './reducers/UserReducer'
import CommentReducer from './reducers/CommentReducer'

export const store = configureStore({
    reducer: {
        jobReducer:JobReducer,
        userReducer:UserReducer,
        commentReducer:CommentReducer,
    }
})