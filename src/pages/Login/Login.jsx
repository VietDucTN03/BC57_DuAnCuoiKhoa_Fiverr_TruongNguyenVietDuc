import { useFormik } from 'formik';
import React from 'react';
import '../../assets/scss/pages/Login/login.scss';
import { useDispatch } from 'react-redux';
import { loginAPI } from '../../redux/reducers/UserReducer';
import { history } from '../..';
import imgSignin from '../../assets/image/signin.jpg'

export default function Login() {

  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validate: (values) => {
      const errors = {};

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Invalid email format';
      }

      if (!values.email) {
        errors.email = 'Information cannot be left blank!!';
      }
      if (!values.password) {
        errors.password = 'Information cannot be left blank!!';
      }

      return errors;
    },

    onSubmit: (values) => {
      const actionAsync = loginAPI(values);
      dispatch(actionAsync);
    }
  })

  return (
    <div className="page-login">
      <div className='login d-flex align-items-center'>
        <div className="login-left">
          <div>
            <img
              className="img-fluid"
              src={imgSignin}
              alt="login"
            />
          </div>
        </div>
        <div className='login-right'>
          <form action="" className='container mt-4' onSubmit={form.handleSubmit}>
            <div className='login-title mx-auto w-50'>
              <div className="form-group mb-3">
                {/* <p htmlFor="email" className='m-1 text-secondary'>Email</p> */}
                <i className="fa-solid fa-user" />
                <div className="input-field">
                  <input type="email" onBlur={form.handleBlur} className={`form-control ${form.errors.email && form.touched.email ? 'is-invalid' : ''}`} id="email" name='email' placeholder="name@example.com" onChange={form.handleChange} />
                  {form.errors.email && form.touched.email && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {form.errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                {/* <p htmlFor="password" className='m-1 text-secondary'>Password</p> */}
                <i className="fa-solid fa-lock" />
                <div className="input-field">
                  <input type="password" onBlur={form.handleBlur} className={`form-control ${form.errors.password && form.touched.password ? 'is-invalid' : ''}`} id="password" name='password' placeholder="Password" onChange={form.handleChange} />
                  {form.errors.password && form.touched.password && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {form.errors.password}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group typesubmitLogin mb-2">
                <div className="row">
                  <div className="col-4 submitLogin">
                    <button type='submit' className='btn mt-2'>Login</button>
                  </div>
                  <div className="col-8">
                    <h6 className='mt-3 registerNow text-success' onClick={() => {
                      history.push('/user/register');
                    }}>Register now?</h6>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
