import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAPI } from '../../redux/reducers/UserReducer';
import { useFormik } from 'formik';
import '../../assets/scss/pages/Register/register.scss';
import { history } from '../..';
import bgRegister from '../../assets/image/bgRegister1.jpg'


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
            <h1>Sign Up</h1>
            <div className="form-group mt-3">
              <i class="fa fa-envelope"></i>
              <div className="form-input w-75">
                <input onChange={form.handleChange} onBlur={form.handleBlur}
                  value={form.values.email}
                  type="text"
                  className="form-control bg-light"
                  placeholder="Email"
                  name="email" />
                {form.touched.email && form.errors.email ? (
                  <div className="error-message text-danger">{form.errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group mt-3">
              <i class="fa fa-lock"></i>
              <div className="form-input w-75">
                <input onChange={form.handleChange} onBlur={form.handleBlur}
                  value={form.values.password}
                  type="password"
                  className="form-control bg-light"
                  placeholder="Password"
                  name="password" />
                {form.touched.password && form.errors.password ? (
                  <div className="error-message text-danger">{form.errors.password}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group mt-3">
              <i class="fa fa-lock"></i>
              <div className="form-input w-75">
                <input onChange={(e) => {
                  form.handleChange(e);
                  setPasswordConfirm(e.target.value);
                }}
                  type="password"
                  className="form-control bg-light"
                  placeholder='Password confirm'
                  name='confirmPassword' />
                {form.touched.confirmPassword && form.errors.confirmPassword ? (
                  <div className="error-message text-danger">{form.errors.confirmPassword}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group mt-3">
              <i class="fa fa-user"></i>
              <div className="form-input w-75">
                <input onChange={form.handleChange} onBlur={form.handleBlur}
                  value={form.values.name}
                  className="form-control bg-light"
                  placeholder='Full Name'
                  name='name' />
                {form.touched.name && form.errors.name ? (
                  <div className="error-message text-danger">{form.errors.name}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group mt-3">
              <i class="fa fa-phone"></i>
              <div className="form-input w-75">
                <input onChange={form.handleChange} onBlur={form.handleBlur}
                  value={form.values.phone}
                  type="text"
                  className="form-control bg-light"
                  placeholder='Phone'
                  name='phone' />
                {form.touched.phone && form.errors.phone ? (
                  <div className="error-message text-danger">{form.errors.phone}</div>
                ) : null}
              </div>
            </div>
            <div className="gender form-group mt-3">
              <i class="fa fa-transgender"></i>
              <section name='gender'>
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
              SUBMIT
            </button>
          </div>
          <div className="input-right col-6">
            <div className="title">
              <div className="img-register">
                <img src={bgRegister} alt="bg-register" className='w-100' />
              </div>
              <h1>Welcome !!</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, a? Nisi delectus vero eaque voluptatibus illo, numquam sequi tempore perspiciatis aperiam consequatur rem. Assumenda, explicabo.</p>
              <p>Already have an account? <span className='mt-3 loginNow text-primary' onClick={() => {
                history.push('/login');
              }}>Click here</span></p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
