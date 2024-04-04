import React, { useEffect, useState } from 'react';
import '../../assets/scss/pages/Profile/infoUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByIDAPI, updateProfileAPI, uploadAvatarAsyncThunkAction } from '../../redux/reducers/UserReducer';
import { history } from '../../index';
import { NavLink } from 'react-router-dom';
import { Modal, notification } from 'antd';
import { useFormik } from 'formik';
import unknownAvatar from '../../assets/image/Avatar.jpg';

export default function InfoUser() {

  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const [useUserProfile, setUseUserProfile] = useState(false);
  const userInfo = useSelector((state) => state.userReducer.userInfoFromLogin);
  // const userLogin = useSelector((state) => state.userReducer.userLogin);
  // console.log(userLogin); 
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  console.log(userProfile);

  useEffect(() => {
    if (!userProfile && userId) {
      dispatch(getUserByIDAPI(userId));
    } else if (!userId) {
      notification.error({
        message: 'Vui lòng đăng nhập để vào trang!!',
        duration: 5,
      });
      history.push('/user/login');
    }
  }, [dispatch, userProfile]);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEditProfile = (userID) => {
    setSelectedUserId(userID);
    dispatch(getUserByIDAPI(userID));
    console.log(userID);
    setVisible(true);
  };

  useEffect(() => {
    if (userProfile && Object.keys(userProfile).length !== 0) {
      setUseUserProfile(true);
    }
  }, [userProfile]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatarAsyncThunkAction({ file }))
      .then(() => {
        dispatch(getUserByIDAPI(userId));
        // setSelectedFile(null);
      })
      .catch((error) => {
        console.error('Error upload Avatar:', error);
      });
  };

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: useUserProfile ? userProfile?.name || '' : userInfo?.name || '',
      birthday: useUserProfile ? userProfile?.birthday || '' : userInfo?.birthday || '',
      email: userProfile ? userProfile.email : '',
      phone: useUserProfile ? userProfile?.phone || '' : userInfo?.phone || '',
      gender: useUserProfile ? userProfile?.gender ? 'true' : 'false' : userInfo?.gender || true,
      certification: useUserProfile ? userProfile?.certification || [] : userInfo?.certification || [],
      skill: useUserProfile ? userProfile?.skill || [] : userInfo?.skill || [],

      // name: userProfile?.name || '',
      // birthday: userProfile?.birthday || '',  
      // email: userProfile?.email || '',
      // phone: userProfile?.phone || '',
      // gender: userProfile?.gender ? 'true' : 'false',
      // certification: userProfile?.certification || '',
      // skill: userProfile?.skill || '',
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

      return errors;
    },
    onSubmit: (values) => {
      const userId = localStorage.getItem('userId');
      if (Object.keys(form.errors).length === 0) {
        dispatch(updateProfileAPI({
          ...values,
          certification: Array.isArray(values.certification) ? values.certification : [values.certification],
          skill: Array.isArray(values.skill) ? values.skill : [values.skill],
        }, userId));
      }
    }
  });

  const { birthday, certification, email, name, phone, skill } = form.values;

  return (
    <>
      {userProfile ? (

        <div className='info'>
          <div className="info-top">
            <div className="job-detail-content">
              <div className="info-user">
                <div className="info__card">
                  <div className="info-profile">
                    <div className="user-img">
                      <label className="img-label">
                        <div className="label-camera">
                          <i className="fa-solid fa-camera" />
                        </div>
                        <input type="file" accept="image/*" onChange={handleAvatarChange} />
                        <div className="d-flex">
                          {userProfile.avatar ? (
                            <img src={userProfile.avatar} alt="Avatar" className="avatar-image" />
                          ) : (
                            <img src={unknownAvatar} alt="Unknown Avatar" className="user-avatar" />
                          )}
                        </div>
                      </label>
                    </div>
                    <div className="user-label">
                      <p>{userProfile.email}</p>
                    </div>
                  </div>
                  <div className="desc">
                    <div className="desc-item">
                      <div className="left">
                        <i className="fa-solid fa-location-dot" />
                        <span>From</span>
                      </div>
                      <div className="right">
                        <span>Cybersoft</span>
                      </div>
                    </div>
                    <div className="desc-item">
                      <div className="left">
                        <i className="fa-solid fa-user" />
                        <span>Member since</span>
                      </div>
                      <div className="right">
                        <span>July 2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="info-bottom">
            <div className="info__card">
              <div className="item">
                <div className="item-title description">
                  <h3>Description</h3>
                  <button
                    className="btn edit-btn"
                    onClick={() => handleEditProfile(userId)}
                  >
                    <i className="fa-solid fa-pen-to-square" />
                  </button>
                </div>
                <div className="description-detail">
                  <h6>Name:</h6>
                  <p>{userProfile.name}</p>
                </div>
                <div className="description-detail">
                  <h6>Phone:</h6>
                  <p>{userProfile.phone}</p>
                </div>
                <div className="description-detail">
                  <h6>Birthday:</h6>
                  <p>{userProfile.birthday}</p>
                </div>
              </div>
              <div className="item">
                <div className="item-title">
                  <h3>Languages</h3>
                </div>
                <p>
                  English - <span>Basic</span>
                </p>
                <p>
                  Vietnamese (Tiếng Việt) - <span>Native/Bilingual</span>
                </p>
              </div>
              <div className="item">
                <div className="item-title">
                  <h3>Skills</h3>
                </div>
                <div className="badge-list d-flex flex-wrap">
                  {userProfile.skill}
                </div>
              </div>
              <div className="item">
                <div className="item-title">
                  <h3>Education</h3>
                </div>
                <p>CYBERSOFT</p>
              </div>
              <div className="item">
                <div className="item-title">
                  <h3>Certification</h3>
                </div>
                <div className="badge-list d-flex flex-wrap">
                  {userProfile.certification}
                </div>
              </div>
              <div className="item" style={{ border: 'none' }}>
                <div className="item-title">
                  <h3>Linked Accounts</h3>
                </div>
                <ul className="mt-2 link-path">
                  <li>
                    <i className="fa-brands fa-facebook" />
                    <NavLink target="_blank" className='name-path' to={'https://www.facebook.com/'}>
                      Facebook
                    </NavLink>
                  </li>
                  <li>
                    <i className="fa-brands fa-google" />
                    <NavLink target="_blank" className='name-path' to={'https://www.google.com.vn/'}>
                      Google
                    </NavLink>
                  </li>
                  <li>
                    <i className="fa-brands fa-github" />
                    <NavLink target="_blank" className='name-path' to={'https://github.com/'}>
                      Github
                    </NavLink>
                  </li>
                  <li>
                    <i className="fa-brands fa-twitter" />
                    <NavLink to={'https://twitter.com/?lang=vi'} target="_blank" className='name-path'>
                      Twitter
                    </NavLink>
                  </li>
                  <li>
                    <i className="fa-brands fa-dribbble" />
                    <NavLink target="_blank" className='name-path' to={'https://dribbble.com/'}>
                      Dribble
                    </NavLink>
                  </li>
                  <li>
                    <i className="fa-brands fa-stack-overflow" />
                    <NavLink target="_blank" className='name-path' to={'https://stackoverflow.com/'}>
                      Stack Overflow
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Modal
            open={visible}
            title="Update Information"
            onCancel={handleCancel}
            footer={null}
          >
            <form className='form-update container' onSubmit={form.handleSubmit} style={{ display: 'block' }}>
              <div className="row">
                {/* <div className=" col-xl-3 col-xs-12 text-center">
                </div> */}
                <div className="input-left col-6">
                  <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" className='form-control bg-light' placeholder='email' name='email' value={userProfile.email} onChange={form.handleChange} disabled />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="phone">Phone</label>
                    {/* <input type="text" className='form-control bg-light' placeholder='phone' name='phone' value={phone} onChange={form.handleChange} /> */}
                    <div className="form-input">
                      <input type="text" onBlur={form.handleBlur}
                        className={`form-control ${form.errors.phone && form.touched.phone ? 'is-invalid' : ''}`} value={phone}
                        id="phone" name='phone' placeholder="Phone"
                        onChange={form.handleChange} />
                      {form.errors.phone && form.touched.phone && (
                        <div className="invalid-feedback" style={{ color: 'red' }}>
                          {form.errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="birthday">Birth day</label>
                    {/* <input type="date" className='form-control bg-light' placeholder='birthday' name='birthday' value={birthday} onChange={form.handleChange} /> */}
                    <div className="form-input">
                      <input type="date" onBlur={form.handleBlur}
                        className={`form-control ${form.errors.birthday && form.touched.birthday ? 'is-invalid' : ''}`}
                        id="birthday" placeholder='Birthday' name='birthday' value={birthday} onChange={form.handleChange} />
                      {form.errors.birthday && form.touched.birthday && (
                        <div className="invalid-feedback" style={{ color: 'red' }}>
                          {form.errors.birthday}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="certification">Certification</label>
                    {/* <input type="text" className='form-control bg-light' placeholder='certification' name='certification' value={certification} onChange={form.handleChange} /> */}
                    <div className="form-input">
                      <input type="text" onBlur={form.handleBlur}
                        className={`form-control ${form.errors.certification && form.touched.certification ? 'is-invalid' : ''}`}
                        id="certification" name='certification' placeholder="Certification" value={certification}
                        onChange={form.handleChange} />
                      {form.errors.certification && form.touched.certification && (
                        <div className="invalid-feedback" style={{ color: 'red' }}>
                          {form.errors.certification}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="input-right col-6">
                  <div className="form-group mt-3">
                    <label htmlFor="name">Name</label>
                    {/* <input type="text" className='form-control bg-light' placeholder='name' name='name' value={name} onChange={form.handleChange} /> */}
                    <div className="form-input">
                      <input type="text" onBlur={form.handleBlur}
                        className={`form-control ${form.errors.name && form.touched.name ? 'is-invalid' : ''}`}
                        id="name" name='name' value={name} placeholder="Full name"
                        onChange={form.handleChange} />
                      {form.errors.name && form.touched.name && (
                        <div className="invalid-feedback" style={{ color: 'red' }}>
                          {form.errors.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="updateGender form-group mt-3">
                    <label htmlFor="gender">Gender</label>
                    <section name='gender'>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="true"
                        checked={form.values.gender === 'true'}
                        onChange={() => form.setFieldValue('gender', 'true')}
                      />
                      <p htmlFor="Male">Male</p>
                    </section>
                    <section>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="false"
                        checked={form.values.gender === 'false'}
                        onChange={() => form.setFieldValue('gender', 'false')}
                      />
                      <p htmlFor="Female">Female</p>
                    </section>
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="skill">Skill</label>
                    {/* <input type="text" className='form-control bg-light' placeholder='skill' name='skill' value={skill} onChange={form.handleChange} /> */}
                    <div className="form-input">
                      <input type="text" onBlur={form.handleBlur}
                        className={`form-control ${form.errors.skill && form.touched.skill ? 'is-invalid' : ''}`}
                        id="skill" name='skill' placeholder="Skill" value={skill}
                        onChange={form.handleChange} />
                      {form.errors.skill && form.touched.skill && (
                        <div className="invalid-feedback" style={{ color: 'red' }}>
                          {form.errors.skill}
                        </div>
                      )}
                    </div>
                  </div>
                  <button className='btn-update text-white mt-3 border-0 shadow' type='submit'>
                    Update
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        </div>

      ) : (
        <div>No jobs found</div>
      )}
    </>
  )
}
