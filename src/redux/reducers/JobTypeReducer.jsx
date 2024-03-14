import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, http } from '../../util/config';
import { notification } from 'antd';

const initialState = {
    arrJobType: [],
    jobTypeByID: [],
}

const JobTypeReducer = createSlice({
    name: 'jobTypeReducer',
    initialState,
    reducers: {
        editJobTypeACtion: (state, action) => {
            state.jobTypeByID = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getJobTypeAsyncThunkAction.fulfilled, (state, action) => {
            state.arrJobType = action.payload;
        })
        builder.addCase(getViewJobTypeAPI.fulfilled, (state, action) => {
            state.jobTypeByID = action.payload;
        })
    }
});

export const { editJobTypeACtion } = JobTypeReducer.actions

export default JobTypeReducer.reducer

//Job Type Management
export const getJobTypeAsyncThunkAction = createAsyncThunk('jobTypeReducer/getJobTypeAsyncThunkAction', async () => {
    const res = await http.get('/loai-cong-viec');
    return res.data.content;
});

export const postJobTypeAsyncThunkAction = createAsyncThunk(
    'jobTypeReducer/postJobTypeAsyncThunkAction', async (values) => {
        try {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);

            const jobType = {
                tenLoaiCongViec: values.tenLoaiCongViec,
            };

            const res = await http.post('/loai-cong-viec', jobType, {
                headers: {
                    token: accessToken,
                }
            });
            console.log(res.data.content);

            return res.data.content;
        } catch (err) {
            console.log(err);
        }
    })

export const deleteJobTypeAsyncThunkAction = createAsyncThunk('jobTypeReducer/deleteJobTypeAsyncThunkAction', async (id) => {
    try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const res = await http.delete(`/loai-cong-viec/${id}`, {
            headers: {
                'token': accessToken,
                // 'tokenCybersoft': TOKEN_CYBERSOFT
            }
        });
        return res.data.content;
    } catch (err) {
        console.log(err);
    }
});

export const getViewJobTypeAPI = createAsyncThunk('jobTypeReducer/getViewJobTypeAPI', async (id) => {
    const res = await http.get(`/loai-cong-viec/${id}`);
    return res.data.content;
});

export const putEditJobTypeAPI = (editJob, id) => {
    return async dispatch => {
        try {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);

            const config = {
                headers: {
                    token: accessToken
                }
            };

            const response = await http.put(`/loai-cong-viec/${id}`, editJob, config);

            dispatch(editJobTypeACtion(response.data.content));
            notification.success({
                message: 'Cập nhật Job Type thành công!!',
                duration: 5,
            });
            console.log(response.data.content);
            return response.data.content;
        } catch (err) {
            console.log(err);
        }
    }
}