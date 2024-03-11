import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, TOKEN_CYBERSOFT, http } from '../../util/config';
import { history } from '../..';
import { notification } from 'antd';

const token = localStorage.getItem('userId');

const initialState = {
  arrJob: [],
  arrJobByName: [],
  jobCount: 0,
  jobDetail: [],
  hireJob: [],
  jobTitle: [],
  Categories: [],

  arrJobManage: [],
  jobDeleted: [],
  newJob: [],
  imgJob: null,
  jobByID: []
}

const JobReducer = createSlice({
  name: 'jobReducer',
  initialState,
  reducers: {
    setArrayJobAction: (state, action) => {
      state.arrJob = action.payload
    },
    setJobByNameAction: (state, action) => {
      state.arrJobByName = action.payload
    },
    setJobDetailAction: (state, action) => {
      state.jobDetail = action.payload
    },
    hireJobAction: (state, action) => {
      state.hireJob = action.payload
    },
    uploadImgJobAction: (state, action) => {
      state.imgJob = action.payload
    },
    editJobACtion: (state, action) => {
      state.jobByID = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobAsyncThunkAction.fulfilled, (state, action) => {
      state.arrJob = action.payload;
    })
    builder.addCase(getJobByNameAsyncThunkAPi.fulfilled, (state, action) => {
      state.arrJobByName = action.payload;
      state.jobCount = action.payload.length;
    })
    builder.addCase(getJobDetailByIAsyncThunkDAPI.fulfilled, (state, action) => {
      state.jobDetail = action.payload;
    })
    builder.addCase(getHiredJobAsyncThunkAction.fulfilled, (state, action) => {
      state.hireJob = action.payload;
    })
    builder.addCase(getJobTitleAsyncThunkAction.fulfilled, (state, action) => {
      state.jobTitle = action.payload;
    })
    builder.addCase(getCategoriesAsyncThunkAction.fulfilled, (state, action) => {
      state.Categories = action.payload;
    })
    builder.addCase(getJobAsyncThunkAction.fulfilled, (state, action) => {
      state.arrJobManage = action.payload;
    })
    builder.addCase(deleteJobAsyncThunkAction.fulfilled, (state, action) => {
      state.jobDeleted = action.payload;
    })
    builder.addCase(postJobAsyncThunkAction.fulfilled, (state, action) => {
      state.newJob = action.payload;
    })
    builder.addCase(getViewJobAPI.fulfilled, (state, action) => {
      state.jobByID = action.payload;
    })
  }
});

export const { setArrayJobAction, setJobByNameAction, setJobDetailAction, hireJobAction, uploadImgJobAction, editJobACtion } = JobReducer.actions

export default JobReducer.reducer

export const getAllJobAsyncThunkAction = createAsyncThunk('jobReducer/getAllJobAsyncThunkAction', async () => {
  const res = await http.get('/cong-viec/lay-menu-loai-cong-viec');
  return res.data.content;
});

export const getJobByNameAsyncThunkAPi = createAsyncThunk('jobReducer/getJobByNameAsyncThunkAPi', async (keyword) => {
  const res = await http.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${keyword}`);
  return res.data.content;
});

export const getJobDetailByIAsyncThunkDAPI = createAsyncThunk('jobReducer/getJobDetailByIAsyncThunkDAPI', async (id) => {
  const res = await http.get(`/cong-viec/lay-cong-viec-chi-tiet/${id}`);
  return res.data.content;
})

export const hireJobAsyncThunkAction = createAsyncThunk(
  'jobReducer/hireJobAsyncThunkAction',
  async (body, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      // console.log(accessToken);
      const res = await http.post('/thue-cong-viec', body, {
        headers: {
          'token': accessToken,
          'tokenCybersoft': TOKEN_CYBERSOFT
        }
      });
      return res.data.content;
    } catch (err) {
      // return thunkAPI.rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const getHiredJobAsyncThunkAction = createAsyncThunk('jobReducer/getHiredJobAsyncThunkAction', async () => {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    const res = await http.get('/thue-cong-viec/lay-danh-sach-da-thue', {
      headers: {
        'token': accessToken,
        'tokenCybersoft': TOKEN_CYBERSOFT
      }
    });
    // console.log(res.data.content);
    return res.data.content;
  } catch (err) {
    console.log(err);
  }
});

export const deleteHiredJobAsyncThunkAction = createAsyncThunk('jobReducer/deleteHiredJobAsyncThunkAction', async (id) => {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    const res = await http.delete(`/thue-cong-viec/${id}`, {
      headers: {
        'token': accessToken,
        'tokenCybersoft': TOKEN_CYBERSOFT
      }
    });
    return res.data.content;
  } catch (err) {
    console.log(err);
  }
});

export const getJobTitleAsyncThunkAction = createAsyncThunk('jobReducer/getJobTitleAsyncThunkAction', async (id) => {
  const res = await http.get(`/cong-viec/lay-chi-tiet-loai-cong-viec/${id}`);
  return res.data.content;
})

export const getCategoriesAsyncThunkAction = createAsyncThunk('jobReducer/getCategoriesAsyncThunkAction', async (id) => {
  const res = await http.get(`/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`);
  return res.data.content;
})

//Job Management
export const getJobAsyncThunkAction = createAsyncThunk('jobReducer/getJobAsyncThunkAction', async () => {
  const res = await http.get('/cong-viec');
  return res.data.content;
});

export const deleteJobAsyncThunkAction = createAsyncThunk('jobReducer/deleteJobAsyncThunkAction', async (id) => {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const res = await http.delete(`/cong-viec/${id}`, {
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

export const postJobAsyncThunkAction = createAsyncThunk(
  'jobReducer/postJobAsyncThunkAction', async (values) => {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const userId = localStorage.getItem('userId');

    const job = {
      tenCongViec: values.tenCongViec,
      moTa: values.moTa,
      moTaNgan: values.moTaNgan,
      giaTien: values.giaTien,
      nguoiTao: userId,
      danhGia: values.danhGia,
      maChiTietLoaiCongViec: values.maChiTietLoaiCongViec,
      saoCongViec: values.saoCongViec,
    };

    const res = await http.post('/cong-viec', job, {
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

export const uploadImgJobAsyncThunkAction = createAsyncThunk(
  'jobReducer/uploadImgJobAsyncThunkAction',
  async ({ file, id }, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);

      const formData = new FormData();
      formData.append('formFile', file);

      const config = {
        headers: {
          token: accessToken
        }
      };

      const response = await http.post(`/cong-viec/upload-hinh-cong-viec/${id}`, formData, config);

      thunkAPI.dispatch(uploadImgJobAction(response.data.content));
      notification.success({
        message: 'Cập nhật ảnh Công việc thành công!!',
        duration: 5,
      });
      console.log(response.data.content);

      return response.data.content;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getViewJobAPI = createAsyncThunk('jobReducer/getViewJobAPI', async (id) => {
  const res = await http.get(`/cong-viec/${id}`);
  return res.data.content;
});

export const putEditJobAPI = (editJob, id) => {
  return async dispatch => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);

      const config = {
        headers: {
          token: accessToken
        }
      };

      const response = await http.put(`/cong-viec/${id}`, editJob, config);

      dispatch(editJobACtion(response.data.content));
      notification.success({
        message: 'Cập nhật Job thành công!!',
        duration: 5,
      });
      console.log(response.data.content);
      return response.data.content;
    } catch (err) {
      console.log(err);
    }
  }
}