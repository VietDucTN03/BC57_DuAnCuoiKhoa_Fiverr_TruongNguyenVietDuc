import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, TOKEN_CYBERSOFT, http } from '../../util/config';
import { history } from '../..';

const token = localStorage.getItem('userId');

const initialState = {
  arrJob: [],
  arrJobByName: [],
  jobCount: 0,
  jobDetail: [],
  hireJob: [],
  jobTitle: [],
  Categories: [],
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
  }
});

export const { setArrayJobAction, setJobByNameAction, setJobDetailAction, hireJobAction } = JobReducer.actions

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