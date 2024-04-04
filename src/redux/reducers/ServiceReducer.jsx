import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, http } from '../../util/config';
import { notification } from 'antd';

const initialState = {
    arrService: [],
    serviceByID: [],
    serviceDeleted: [],
}

const ServiceReducer = createSlice({
    name: 'serviceReducer',
    initialState,
    reducers: {
        editServiceACtion: (state, action) => {
            state.serviceByID = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getServiceAsyncThunkAction.fulfilled, (state, action) => {
            state.arrService = action.payload;
        })
        builder.addCase(getViewServiceAPI.fulfilled, (state, action) => {
            state.serviceByID = action.payload;
        })
        builder.addCase(deleteServiceAsyncThunkAction.fulfilled, (state, action) => {
            state.serviceDeleted = action.payload;
        })
    }
});

export const { editServiceACtion } = ServiceReducer.actions

export default ServiceReducer.reducer

//Service Management
export const getServiceAsyncThunkAction = createAsyncThunk('serviceReducer/getServiceAsyncThunkAction', async () => {
    const res = await http.get('/thue-cong-viec');
    return res.data.content;
});

export const postServiceAsyncThunkAction = createAsyncThunk(
    'serviceReducer/postServiceAsyncThunkAction', async (values) => {
        try {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);

            const service = {
                maCongViec: values.maCongViec,
                maNguoiThue: values.maNguoiThue,
                ngayThue: values.ngayThue,
                hoanThanh: values.hoanThanh,
            };

            const res = await http.post('/thue-cong-viec', service, {
                headers: {
                    token: accessToken,
                }
            });
            notification.success({
                message: res.data.message,
                duration: 5,
            });

            console.log(res.data.content);
            return res.data.content;
        } catch (err) {
            console.log(err);
        }
    }
);

export const getViewServiceAPI = createAsyncThunk('serviceReducer/getViewServiceAPI', async (id) => {
    const res = await http.get(`/thue-cong-viec/${id}`);
    return res.data.content;
});

export const putEditServiceAPI = (editJob, id) => {
    return async dispatch => {
        try {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);

            const config = {
                headers: {
                    token: accessToken
                }
            };

            const response = await http.put(`/thue-cong-viec/${id}`, editJob, config);

            dispatch(editServiceACtion(response.data.content));
            notification.success({
                message: response.data.message,
                duration: 5,
            });
            console.log(response.data.content);
            return response.data.content;
        } catch (err) {
            console.log(err);
        }
    }
}

export const deleteServiceAsyncThunkAction = createAsyncThunk('serviceReducer/deleteServiceAsyncThunkAction', async (id) => {
    try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const res = await http.delete(`/thue-cong-viec/${id}`, {
            headers: {
                'token': accessToken,
            }
        });
        notification.success({
          message: res.data.message,
          duration: 5,
        });
        return res.data.content;
    } catch (err) {
        console.log(err);
    }
});