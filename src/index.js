import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  BrowserRouter,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
} from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";

import { createBrowserHistory } from "history";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Result from "./pages/Result/Result";
import Detail from "./pages/Detail/Detail";
import JobTitle from "./pages/JobTitle/JobTitle";
import Categories from "./pages/Categories/Categories";
import UserTemplate from "./templates/UserTemplate"; 
import AdminTemplate from "./templates/AdminTemplate";
import UserManagement from "./pages/Admin/TableContent/UserManagement";
import JobManagement from "./pages/Admin/TableContent/JobManagement";
import JobTypeManagement from "./pages/Admin/TableContent/JobTypeManagement";
import ServiceManagement from "./pages/Admin/TableContent/ServiceManagement";
import Management from "./pages/Admin/Management";

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route path="/" index element={<Home />} />
          <Route path="/result/:keyword" element={<Result />} />
          <Route path="/job-title/:id" element={<JobTitle />} />
          <Route path="/categories/:id" element={<Categories />} />
          <Route path="/job-detail/:id" element={<Detail />} />
          <Route path="*" element={<Navigate to="" />}></Route>
        </Route>
        <Route path="user" element={<UserTemplate />}>
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="admin" element={<AdminTemplate/>}>
          <Route path="management" element={<Management/>}/> 
          <Route path="user-management" element={<UserManagement/>}/>
          <Route path="job-management" element={<JobManagement/>}/>
          <Route path="job-type-management" element={<JobTypeManagement/>}/>
          <Route path="service-management" element={<ServiceManagement/>}/>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
