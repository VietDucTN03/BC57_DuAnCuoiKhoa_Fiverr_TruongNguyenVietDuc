import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter, Navigate } from 'react-router-dom';
import HomeTemplate from './templates/HomeTemplate';

import {createBrowserHistory} from 'history'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Result from  './pages/Result/Result';
import Detail from './pages/Detail/Detail';
import JobTitle from './pages/JobTitle/JobTitle';
import Categories from './pages/Categories/Categories';

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeTemplate/>}>
          <Route path='/' index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/result/:keyword' element={<Result/>}/>
          <Route path='/job-title/:id' element={<JobTitle/>}/>
          <Route path='/categories/:id' element={<Categories/>}/>
          <Route path='/job-detail/:id' element={<Detail/>}/>
          <Route path="*" element={<Navigate to="" />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);