import React, { useEffect, useState } from 'react';
import '../../assets/scss/pages/Profile/infoUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByIDAPI, updateProfileAPI, uploadAvatarAsyncThunkAction } from '../../redux/reducers/UserReducer';
import { history } from '../../index';
import { NavLink } from 'react-router-dom';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import unknownAvatar from '../../assets/image/Avatar.jpg';

export default function InfoUser() {

  const dispatch = useDispatch();
  const [useUserProfile, setUseUserProfile] = useState(false);
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const userProfile = useSelector((state) => state.userReducer.userProfile);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userProfile && userId) {
      dispatch(getUserByIDAPI(userId));
    } else if (!userId) {
      alert('Vui lòng đăng nhập để truy cập trang này!');
      history.push('/user/login');
    }
  }, [dispatch, userProfile]);

  useEffect(() => {
    if (userProfile && Object.keys(userProfile).length !== 0) {
      setUseUserProfile(true);
    }
  }, [userProfile]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatarAsyncThunkAction({ file }));
  };

  const form = useFormik({
    initialValues: {
      name: useUserProfile ? userProfile?.name || '' : userInfo?.name || '',
      birthday: useUserProfile ? userProfile?.birthday || '' : userInfo?.birthday || '',
      email: userProfile ? userProfile.email : '',
      phone: useUserProfile ? userProfile?.phone || '' : userInfo?.phone || '',
      gender: useUserProfile ? userProfile?.gender || true : userInfo?.gender || true,
      certification: useUserProfile ? userProfile?.certification || [] : userInfo?.certification || [],
      skill: useUserProfile ? userProfile?.skill || [] : userInfo?.skill || [],
    },
    onSubmit: (values) => {
      const userId = localStorage.getItem('userId');
      dispatch(updateProfileAPI({
        ...values,
        certification: Array.isArray(values.certification) ? values.certification : [values.certification],
        skill: Array.isArray(values.skill) ? values.skill : [values.skill],
      }, userId));
    }
  });

  const { birthday, certification, email, name, phone, skill } = form.values;

  const handleCancel = () => {
    setVisible(false);
  };

  const [visible, setVisible] = useState(false);

  return (
    <>
      {userProfile ? (

        <div className='info'>
          <div className="info-top">
            <div className="job-detail-content">
              <div className="row">
                <div className="info__card">
                  <div className="info__profile">
                    <div className="user__img">
                      <label className="img__label">
                        <div className="label__camera">
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
                    <div className="user__label">
                      <p>{userProfile.email}</p>
                    </div>
                  </div>
                  <div className="desc">
                    <div className="desc__item">
                      <div className="left">
                        <i className="fa-solid fa-location-dot" />
                        <span>From</span>
                      </div>
                      <div className="right">
                        <span>Vietnam</span>
                      </div>
                    </div>
                    <div className="desc__item">
                      <div className="left">
                        <i className="fa-solid fa-user" />
                        <span>Member since</span>
                      </div>
                      <div className="right">
                        <span>Oct 2023</span>
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
                <div className="item__title description">
                  <h3>Description</h3>
                  <button
                    className="btn edit-btn"
                    onClick={() => setVisible(true)}
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
                <div className="item__title">
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
                <div className="item__title">
                  <h3>Skills</h3>
                </div>
                <div className="badge-list d-flex flex-wrap">
                  {userProfile.skill}
                </div>
              </div>
              <div className="item">
                <div className="item__title">
                  <h3>Education</h3>
                </div>
                <p>CYBERSOFT</p>
              </div>
              <div className="item">
                <div className="item__title">
                  <h3>Certification</h3>
                </div>
                <div className="badge-list d-flex flex-wrap">
                  {userProfile.certification}
                </div>
              </div>
              <div className="item" style={{ border: 'none' }}>
                <div className="item__title">
                  <h3>Linked Accounts</h3>
                </div>
                <ul className="mt-2">
                  <li>
                    <i className="fa-brands fa-facebook" />
                    <NavLink target="_blank" to={'https://www.facebook.com/'}>
                      Facebook
                    </NavLink>
                  </li>
                  <li>
                    <i className="fa-brands fa-google" />
                    <NavLink target="_blank" to={'https://www.google.com.vn/'}>
                      Google
                    </NavLink>
                  </li>
                  <li>
                    <i className="fa-brands fa-github" />
                    <NavLink target="_blank" to={'https://github.com/'}>
                      Github
                    </NavLink>
                  </li>
                  <li>
                    <i className="fa-brands fa-twitter" />
                    <NavLink to={'https://twitter.com/?lang=vi'} target="_blank">
                      Twitter
                    </NavLink>
                  </li>
                  <li>
                    <i className="fa-brands fa-dribbble" />
                    <NavLink target="_blank" to={'https://dribbble.com/'}>
                      Dribble
                    </NavLink>
                  </li>
                  <li>
                    <i className="fa-brands fa-stack-overflow" />
                    <NavLink target="_blank" to={'https://stackoverflow.com/'}>
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
            <form className='container' onSubmit={form.handleSubmit}>
              <hr />
              <div className="row container">
                <div className=" col-xl-3 col-xs-12 text-center">
                </div>
                <div className="input-left col-4">
                  <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" className='form-control bg-light' placeholder='email' name='email' value={userProfile.email} onChange={form.handleChange} />
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className='form-control bg-light' placeholder='phone' name='phone' value={phone} onChange={form.handleChange} />
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="phone">Birth day</label>
                    <input type="date" className='form-control bg-light' placeholder='birthday' name='birthday' value={birthday} onChange={form.handleChange} />
                  </div>

                  <div className="form-group mt-4">
                    <label htmlFor="certification">Certification</label>
                    <input type="text" className='form-control bg-light' placeholder='certification' name='certification' value={certification} onChange={form.handleChange} />
                  </div>
                </div>
                <div className="input-right col-4">
                  <div className="form-group mt-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control bg-light' placeholder='name' name='name' value={name} onChange={form.handleChange} />
                  </div>

                  <div className="updateGender form-group mt-4">
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

                  <div className="form-group mt-4">
                    <label htmlFor="skill">Skill</label>
                    <input type="text" className='form-control bg-light' placeholder='skill' name='skill' value={skill} onChange={form.handleChange} />
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
