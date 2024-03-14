import React, { useEffect, useState } from 'react';
import '../../../assets/scss/pages/Admin/userManagement.scss'
import { Modal, Table, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import UserReducer, { deleteUserAsyncThunkAction, getAllUserAsyncThunkAction, getSearchUserAsyncThunkAPi, getViewUserAPI, postUserAsyncThunkAction, putEditUserAPI } from '../../../redux/reducers/UserReducer';
import { useFormik } from 'formik';

export default function UserManagement() {

  const dispatch = useDispatch();
  const arrUser = useSelector((state) => state.userReducer.arrUser);
  // console.log(arrUser);
  const [searchValue, setSearchValue] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [hasSearched, setHasSearched] = useState(false);
  const searchUser = useSelector((state) => state.userReducer.searchUser);
  // console.log(arrAdmin);

  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  };

  const userByID = useSelector((state) => state.userReducer.userByID);
  // console.log(userByID);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const handleCancelUpdate = () => {
    setVisibleUpdate(false);
  };

  const handleEditUser = (id) => {
    setSelectedUserId(id);
    dispatch(getViewUserAPI(id));
    // console.log(id);
    setVisibleUpdate(true);
  };

  const formUpdate = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userByID.name || '',
      birthday: userByID.birthday || '',
      email: userByID.email || '',
      phone: userByID.phone || '',
      gender: userByID.gender ? 'true' : 'false',
      role: userByID.role || '',
      certification: userByID.certification || '',
      skill: userByID.skill || '',
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
      if (Object.keys(formUpdate.errors).length === 0) {

        dispatch(
          putEditUserAPI({
            ...values,
            gender: values.gender === 'true',
            certification: Array.isArray(values.certification)
              ? values.certification
              : [values.certification],
            skill: Array.isArray(values.skill) ? values.skill : [values.skill],
          }, selectedUserId)
        )
          .then(() => {
            dispatch(getAllUserAsyncThunkAction());
          })
          .catch((error) => {
            console.error('Error deleting job:', error);
          });
      }
    }
  });
  // console.log(formUpdate);

  const handleUpdateUser = () => {
    formUpdate.handleSubmit();
  };

  const { birthday, certification, email, name, phone, skill, role, gender } = formUpdate.values;

  // ADD NEW ADMIN
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
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

      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(values.password)) {
        errors.password = 'Password contains at least 6 characters, including letters, numbers and special characters';
      }

      return errors;
    },
    onSubmit: (values) => {
      if (Object.keys(form.errors).length === 0) {
        const actionAsync = postUserAsyncThunkAction(values);
        dispatch(actionAsync)
          .then(() => {
            dispatch(getAllUserAsyncThunkAction());
          })
          .catch((error) => {
            console.error('Error deleting job:', error);
          });
      }
    },
  });
  // console.log(form);

  useEffect(() => {
    if (searchValue.trim() !== "") {
      dispatch(getSearchUserAsyncThunkAPi(searchValue));
    }
  }, [searchValue, dispatch]);

  useEffect(() => {
    dispatch(getAllUserAsyncThunkAction());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      dispatch(deleteUserAsyncThunkAction(id))
        .then(() => {
          dispatch(getAllUserAsyncThunkAction());
          notification.success({
            message: 'Delete Successfull!!',
            duration: 5,
          });
        })
        .catch((error) => {
          console.error('Error deleting job:', error);
        });
    }
  };

  const columns = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id', // Bỏ tạm
      key: 'id',
      // fixed: 'left',
    },
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      render: (text, record) => (
        <span className="custom-green-text">{text}</span>
      ),
    },
    {
      title: 'ROLE',
      dataIndex: 'role',
      key: '1',
      width: 100,
    },
    {
      title: 'Certification',
      dataIndex: 'certification',
      key: '2',
      width: 120,
    },
    {
      title: 'Skill',
      dataIndex: 'skill',
      key: '3',
      width: 120,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 140,
      render: (record) => (
        <div className='buttonEvent'>
          <button
            className='btn btn-primary button-edit border-0 shadow'
            onClick={() => handleEditUser(record.id)} // Pass the user's ID to handleEditUser function
          >EDIT</button>
          <button className='btn btn-danger border-0 shadow mx-2'
            // onClick={() => {
            //     console.log("bbbb");
            //     const action = deleteCart(record.id)
            //     dispatch(action)
            // }}
            onClick={() => handleDeleteUser(record.id)}
          >DELETE</button>
        </div>
      ),
    },
  ];
  const data = [];
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edward ${i}`,
  //     age: 32,
  //     address: `London Park no. ${i}`,
  //   });
  // }

  return (
    <div className='container'>
      <h2 className='title'>
        QUẢN LÝ NGƯỜI DÙNG
      </h2>
      <br />
      <div role="tabpanel" className="tab-pane in active">
        <div className="row">
          <div
            className="col-4 d-flex justify-content-end "
            style={{ height: 40, marginBottom: "16px" }}
          >
            <button
              id="btnAddUser"
              className="btn btn-success mr-auto"
              // data-toggle="modal"
              // data-target="#myModal"
              onClick={() => setVisible(true)}
            >
              <i className="fa fa-plus mr-1" /> ADD NEW ADMIN
            </button>
          </div>
          <div className="col-8 form-group has-search">
            <div className="form-group w-75">
              <div className="shadow">
                <input
                  type="text"
                  placeholder="Nhập tên người dùng để tìm kiếm........"
                  className="form-control"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="clear-fix" />
        <div>
          {/* BEGIN TABLE SẢN PHẨM */}
          <div className="loader" id="loader" />
          <Table
            columns={columns}
            dataSource={searchValue.trim() !== "" ? searchUser : arrUser}
            scroll={{
              x: 500,
              y: 300,
            }}
          />
          {/**hiển thị next previous trong ul này */}

        </div>
        <br />
      </div>
      <Modal
        open={visible}
        title="Add New Admin"
        onCancel={handleCancel}
        footer={null}
      >
        <form className='container form-add'
          onSubmit={form.handleSubmit}
        >
          <div className="row container">
            <div className="input-left col-6">
              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <div className="form-input">
                  <input type="text" onBlur={form.handleBlur}
                    className={`form-control ${form.errors.email && form.touched.email ? 'is-invalid' : ''}`}
                    id="email" name='email' placeholder="name@example.com" value={form.values.email}
                    onChange={form.handleChange} />
                  {form.errors.email && form.touched.email && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {form.errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="phone">Phone</label>
                <div className="form-input">
                  <input type="text" onBlur={form.handleBlur}
                    className={`form-control ${form.errors.phone && form.touched.phone ? 'is-invalid' : ''}`}
                    id="phone" name='phone' placeholder="Phone" value={form.values.phone}
                    onChange={form.handleChange} />
                  {form.errors.phone && form.touched.phone && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {form.errors.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="input-right col-6">
              <div className="form-group mt-3">
                <label htmlFor="name">Name</label>
                <div className="form-input">
                  <input type="text" onBlur={form.handleBlur}
                    className={`form-control ${form.errors.name && form.touched.name ? 'is-invalid' : ''}`}
                    id="name" name='name' placeholder="Full name" value={form.values.name}
                    onChange={form.handleChange} />
                  {form.errors.name && form.touched.name && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {form.errors.name}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="password">Password</label>
                <div className="form-input">
                  <input type="password" onBlur={form.handleBlur}
                    className={`form-control ${form.errors.password && form.touched.password ? 'is-invalid' : ''}`}
                    id="password" name='password' placeholder="Password" value={form.values.password}
                    onChange={form.handleChange} />
                  {form.errors.password && form.touched.password && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {form.errors.password}
                    </div>
                  )}
                </div>
              </div>

              <button className='btn-update text-white mt-5 border-0 shadow' type='submit'>
                Add ADMIN
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <Modal
        open={visibleUpdate}
        title="View & Edit User"
        onCancel={handleCancelUpdate}
        footer={null}
      >
        <form className='container form-update' onSubmit={formUpdate.handleSubmit}>
          <div className="row container">
            <div className="input-left col-6">
              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <input type="text" className='form-control bg-light' placeholder='email' name='email'
                  value={email} onBlur={formUpdate.handleBlur} onChange={formUpdate.handleChange} disabled
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="phone">Phone</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.phone && formUpdate.touched.phone ? 'is-invalid' : ''}`}
                    id="phone" name='phone' placeholder="Phone" value={phone}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.phone && formUpdate.touched.phone && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.phone}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="birthday">Birth day</label>
                <div className="form-input">
                  <input type="date" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.birthday && formUpdate.touched.birthday ? 'is-invalid' : ''}`}
                    id="birthday" name='birthday' placeholder="Birth Day" value={birthday}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.birthday && formUpdate.touched.birthday && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.birthday}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group mt-4">
                <label htmlFor="certification">Certification</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.certification && formUpdate.touched.certification ? 'is-invalid' : ''}`}
                    id="certification" name='certification' placeholder="Certification" value={certification}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.certification && formUpdate.touched.certification && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.certification}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="input-right col-6">
              <div className="form-group mt-3">
                <label htmlFor="name">Name</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.name && formUpdate.touched.name ? 'is-invalid' : ''}`}
                    id="name" name='name' placeholder="Full name" value={name}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.name && formUpdate.touched.name && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="updateGender form-group mt-4">
                <label htmlFor="gender">Gender</label>
                <section name='gender'>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="true"
                    checked={gender === 'true'}
                    onChange={() => formUpdate.setFieldValue('gender', 'true')}
                  />
                  <p htmlFor="Male">Male</p>
                </section>
                <section>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="false"
                    checked={gender === 'false'}
                    onChange={() => formUpdate.setFieldValue('gender', 'false')}
                  />
                  <p htmlFor="Female">Female</p>
                </section>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="role">Role</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.role && formUpdate.touched.role ? 'is-invalid' : ''}`}
                    id="role" name='role' placeholder="Role" value={role}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.role && formUpdate.touched.role && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.role}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group mt-4">
                <label htmlFor="skill">Skill</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.skill && formUpdate.touched.skill ? 'is-invalid' : ''}`}
                    id="skill" name='skill' placeholder="Skill" value={skill}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.skill && formUpdate.touched.skill && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.skill}
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
  )
}
