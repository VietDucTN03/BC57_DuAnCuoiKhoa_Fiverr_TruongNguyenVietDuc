import {configureStore} from '@reduxjs/toolkit'
import JobReducer from './reducers/JobReducer'
import UserReducer from './reducers/UserReducer'
import CommentReducer from './reducers/CommentReducer'
import JobTypeReducer from './reducers/JobTypeReducer'
import ServiceReducer from './reducers/ServiceReducer'

export const store = configureStore({
    reducer: {
        jobReducer:JobReducer,
        jobTypeReducer:JobTypeReducer,
        userReducer:UserReducer,
        serviceReducer:ServiceReducer,
        commentReducer:CommentReducer,
    }
})