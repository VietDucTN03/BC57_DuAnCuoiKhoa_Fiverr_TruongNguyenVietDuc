import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { USER_REGISTER, ACCESS_TOKEN, getStore, http, TOKEN_CYBERSOFT, USER_LOGIN, USER_PROFILE, getStoreJson, saveStoreJson } from '../../util/config';
import { history } from '../../index';
import { notification } from 'antd';

let userLoginDefault = {
  email: '',
  token: ''
}

const DEFAULT_STATE = {
  userRegister: getStore(USER_REGISTER),
  userLogin: userLoginDefault,
  userInfo: null,
  userList: [],
  userProfile: getStoreJson(USER_PROFILE),
  avatar: null,
  arrUser: [],
  userDelete: [],
  addAdmin: [],
  searchUser: [],
  userByID: [],
};

// const stringify = localStorage.getItem('USER_INFO');
const stringify = localStorage.getItem(USER_LOGIN);

if (stringify) {
  DEFAULT_STATE.userInfo = JSON.parse(stringify);
}

const UserReducer = createSlice({
  name: 'userReducer',
  initialState: DEFAULT_STATE,
  reducers: {
    registerAction(state, action) {
      state.userRegister = action.payload;
    },
    loginAction(state, action) {
      state.userLogin = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    reloadUser(state, action) {
      state.userInfo.user = action.payload;
    },
    uploadAvatarAction(state, action) {
      state.avatar = action.payload;
    },
    updateProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
    editUserACtion: (state, action) => {
      state.userByID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserByIDAPI.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    })
    builder.addCase(getAllUserAsyncThunkAction.fulfilled, (state, action) => {
      state.arrUser = action.payload;
    })
    // builder.addCase(deleteUserAsyncThunkAction.fulfilled, (state, action) => {
    //   state.userDelete = action.payload;
    // })
    builder.addCase(postUserAsyncThunkAction.fulfilled, (state, action) => {
      state.addAdmin = action.payload;
    })
    builder.addCase(getSearchUserAsyncThunkAPi.fulfilled, (state, action) => {
      state.searchUser = action.payload;
    })
    builder.addCase(getViewUserAPI.fulfilled, (state, action) => {
      state.userByID = action.payload;
    })
  }
});

export const { registerAction, loginAction, setUserInfo, reloadUser, uploadAvatarAction, updateProfileAction, editUserACtion } = UserReducer.actions;

export const selectUserInfo = (state) => state.user.userInfo;

export default UserReducer.reducer;

export const registerAPI = (userRegister) => {
  return async (dispatch) => {
    try {
      const result = await http.post('/auth/signup', userRegister);
      const action = registerAction(result.data.content);
      console.log(action);
      dispatch(action);

      notification.success({
        message: 'Account registered successfully!!',
        duration: 5,
      });
      history.push('/user/login');
    } catch (err) {

    }
  }
}

export const loginAPI = (userLogin) => {
  return async (dispatch) => {
    try {
      const result = await http.post('/auth/signin', userLogin);

      localStorage.setItem('userId', result.data.content.user.id);
      localStorage.setItem('tokenCyberSoft', TOKEN_CYBERSOFT);
      localStorage.setItem(ACCESS_TOKEN, result.data.content.token);
      // localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content.user));
      const action = loginAction(result.data.content)
      console.log(action);
      dispatch(action);

      if (history.location.pathname != '/user/profile') {
        notification.success({
          message: 'Logged in successfully!!',
          duration: 5,
        });
        history.push('/');
      }

    } catch (err) {

    }
  }
}

export const getAllUserAsyncThunkAction = createAsyncThunk('userReducer/getAllUserAsyncThunkAction', async () => {
  const res = await http.get('/users');
  return res.data.content;
});

export const postUserAsyncThunkAction = createAsyncThunk(
  'userReducer/postUserAsyncThunkAction',
  async (values) => {
    try {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        role: "ADMIN",
      };

      const res = await http.post('/users', user);
      console.log(res.data.content);
      return res.data.content;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getSearchUserAsyncThunkAPi = createAsyncThunk('userReducer/getSearchUserAsyncThunkAPi', async (keyword) => {
  const res = await http.get(`/users/search/${keyword}`);
  return res.data.content;
});

export const getViewUserAPI = createAsyncThunk('userReducer/getViewUserAPI', async (id) => {
  const res = await http.get(`/users/${id}`);
  return res.data.content;
});

export const putEditUserAPI = (editUser, id) => {
  return async dispatch => {
    try {
      const response = await http.put(`/users/${id}`, editUser);

      dispatch(editUserACtion(response.data.content));
      notification.success({
        message: 'Cập nhật User thành công!!',
        duration: 5,
      });
      console.log(response.data.content);
      return response.data.content;
    } catch (err) {
      console.log(err);
    }
  }
}

export const deleteUserAsyncThunkAction = createAsyncThunk('userReducer/deleteUserAsyncThunkAction', async (id) => {
  try {
    const res = await http.delete(`/users/?id=${id}`);
    return res.data.content;
  } catch (err) {
    console.log(err);
  }
});

export const getUserByIDAPI = createAsyncThunk('userReducer/getUserByIDAPI', async (id) => {
  const res = await http.get(`/users/${id}`);
  saveStoreJson(USER_PROFILE, res.data.content);
  return res.data.content;
});

export const uploadAvatarAsyncThunkAction = createAsyncThunk(
  'userReducer/uploadAvatarAsyncThunkAction',
  async ({ file }, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);

      const formData = new FormData();
      formData.append('formFile', file);

      const config = {
        headers: {
          token: accessToken
        }
      };

      const response = await http.post('/users/upload-avatar', formData, config);

      thunkAPI.dispatch(uploadAvatarAction(response.data.content));
      saveStoreJson(USER_PROFILE, response.data.content);
      notification.success({
        message: 'Cập nhật ảnh đại diện thành công!!',
        duration: 5,
      });
      console.log(response.data.content);

      return response.data.content;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateProfileAPI = (updateProfile, id) => {
  return async dispatch => {
    try {
      const response = await http.put(`/users/${id}`, updateProfile);

      dispatch(updateProfileAction(response.data.content));
      saveStoreJson(USER_PROFILE, response.data.content);
      notification.success({
        message: 'Cập nhật thông tin thành công!!',
        duration: 5,
      });
      console.log(response.data.content);
      return response.data.content;
    } catch (err) {
      console.log(err);
    }
  }
}
