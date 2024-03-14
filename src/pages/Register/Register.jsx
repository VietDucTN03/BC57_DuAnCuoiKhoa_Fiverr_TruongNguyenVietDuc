import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAPI } from '../../redux/reducers/UserReducer';
import { useFormik } from 'formik';
import '../../assets/scss/pages/Register/register.scss';
import { history } from '../..';
import bgRegister from '../../assets/image/signup.jpg'


export default function Register() {

  const dispatch = useDispatch();
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      gender: true
    },
    validate: (values) => {
      const errors = {};

      Object.keys(values).forEach((fieldName) => {
        if (!values[fieldName]) {
          errors[fieldName] = `${fieldName} is required`;
        }
      });

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = 'Phone number must be 10 numbers';
      }

      if (values.password !== passwordConfirm) {
        errors.confirmPassword = 'Passwords do not match';
      }

      return errors;
    },
    onSubmit: (values) => {
      if (Object.keys(form.errors).length === 0) {
        const actionAsync = registerAPI(values);
        dispatch(actionAsync);
      }
    },
  })

  return (
    <div className="page-register">
      <form className='register container mt-4' onSubmit={form.handleSubmit}>
        <div className="row container">
          <div className="input-left col-6">
            <h1 className='title-signup text-center'>Sign Up</h1>
            <div className="form-group mt-3">
              <i class="fa fa-envelope"></i>
              <div className="form-input">
                <input type="email" onBlur={form.handleBlur}
                  className={`form-control ${form.errors.email && form.touched.email ? 'is-invalid' : ''}`}
                  id="email" name='email' placeholder="name@example.com"
                  onChange={form.handleChange} />
                {form.errors.email && form.touched.email && (
                  <div className="invalid-feedback" style={{ color: 'red' }}>
                    {form.errors.email}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group mt-3">
              <i class="fa fa-lock"></i>
              <div className="form-input">
                <input type="password" onBlur={form.handleBlur}
                  className={`form-control ${form.errors.password && form.touched.password ? 'is-invalid' : ''}`}
                  id="password" name='password' placeholder="Password"
                  onChange={form.handleChange} />
                {form.errors.password && form.touched.password && (
                  <div className="invalid-feedback" style={{ color: 'red' }}>
                    {form.errors.password}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group mt-3">
              <i class="fa fa-lock"></i>
              <div className="form-input">
                <input type="password" onBlur={form.handleBlur}
                  className={`form-control ${form.errors.confirmPassword && form.touched.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword" name='confirmPassword' placeholder="Password confirm"
                  onChange={(e) => {
                    form.handleChange(e);
                    setPasswordConfirm(e.target.value);
                  }} />
                {form.errors.confirmPassword && form.touched.confirmPassword && (
                  <div className="invalid-feedback" style={{ color: 'red' }}>
                    {form.errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group mt-3">
              <i class="fa fa-user"></i>
              <div className="form-input">
                <input type="text" onBlur={form.handleBlur}
                  className={`form-control ${form.errors.name && form.touched.name ? 'is-invalid' : ''}`}
                  id="name" name='name' placeholder="Full name"
                  onChange={form.handleChange} />
                {form.errors.name && form.touched.name && (
                  <div className="invalid-feedback" style={{ color: 'red' }}>
                    {form.errors.name}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group mt-3">
              <i class="fa fa-phone"></i>
              <div className="form-input">
                <input type="text" onBlur={form.handleBlur}
                  className={`form-control ${form.errors.phone && form.touched.phone ? 'is-invalid' : ''}`}
                  id="phone" name='phone' placeholder="Phone"
                  onChange={form.handleChange} />
                {form.errors.phone && form.touched.phone && (
                  <div className="invalid-feedback" style={{ color: 'red' }}>
                    {form.errors.phone}
                  </div>
                )}
              </div>
            </div>
            <div className="gender form-group mt-3">
              <i class="fa fa-transgender"></i>
              <section>
                <input onChange={form.handleChange}
                  type="radio"
                  id="Male"
                  name="Gender"
                  value="true" />
                <p htmlFor="Male">Male</p>
              </section>
              <section>
                <input onChange={form.handleChange}
                  type="radio"
                  id="Female"
                  name="Gender"
                  value="false" />
                <p htmlFor="Female">Female</p>
              </section>
            </div>
            <button className='btn-register text-white mt-3 border-0 shadow' type='submit'>
              REGISTER
            </button>
          </div>
          <div className="input-right col-6">
            <div className="title-background">
              <div className="img-register">
                <img src={bgRegister} alt="bg-register" className='w-100' />
              </div>
              <p className='p-login text-center'>Already have your own account? <span className='mt-3 loginNow' onClick={() => {
                history.push('/user/login');
              }}>Login now</span></p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
