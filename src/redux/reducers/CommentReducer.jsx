import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, TOKEN_CYBERSOFT, http } from '../../util/config';
import { notification } from 'antd';
import { history } from '../../index';

const initialState = {
  arrComment: [],
  comment: [],
}

const CommentReducer = createSlice({
  name: 'commentReducer',
  initialState,
  reducers: {
    setCommentAction: (state, action) => {
      state.arrComment = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentByJob.fulfilled, (state, action) => {
      state.arrComment = action.payload;
    })
    builder.addCase(postCommentAsyncThunkAction.fulfilled, (state, action) => {
      state.comment = action.payload;
    })
  }
});

export const { setCommentAction, commentAction } = CommentReducer.actions

export default CommentReducer.reducer

export const getCommentByJob = createAsyncThunk('commentReducer/getCommentByJob', async (id) => {
  const res = await http.get(`/binh-luan/lay-binh-luan-theo-cong-viec/${id}`);
  return res.data.content;
})

export const postCommentAsyncThunkAction = createAsyncThunk(
  'commentReducer/postCommentAsyncThunkAction',
  async (body) => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      // console.log(accessToken);
      const res = await http.post('/binh-luan', body, {
        headers: {
          'token': accessToken,
          'tokenCybersoft': TOKEN_CYBERSOFT
        }
      });
      notification.success({
        message: res.data.message,
        duration: 5,
      });
      return res.data.content;
    } catch (err) {
      // console.log(err);
      notification.error({
        message: 'Hãy đăng nhập để comment!!',
        duration: 5,
      }); 
      history.push('/user/login');
    }
  }
);