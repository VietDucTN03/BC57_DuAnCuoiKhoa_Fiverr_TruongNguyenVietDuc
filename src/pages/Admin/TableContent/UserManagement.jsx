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
    console.log(id);
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
            notification.success({
              message: 'Add ADMIN Successfull!!',
              duration: 5,
            });
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
      width: 30,
      dataIndex: 'id', // Bỏ tạm
      key: 'id',
      // fixed: 'left',
    },
    {
      title: 'Full Name',
      width: 70,
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
      width: 150,
    },
    {
      title: 'Certification',
      dataIndex: 'certification',
      key: '2',
      width: 150,
    },
    {
      title: 'Skill',
      dataIndex: 'skill',
      key: '3',
      width: 150,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 120,
      render: (record) => (
        <div className='buttonEvent'>
          <button
            className='btn button-edit border-0 shadow'
            onClick={() => handleEditUser(record.id)} // Pass the user's ID to handleEditUser function
          >EDIT</button>
          <button className='btn btn-danger border-0 shadow'
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
            className="col-8 d-flex justify-content-end "
            style={{ height: 40, marginBottom: "16px" }}
          >
            {/* BEGIN BUTTOM THÊM MỚI */}
            <button
              id="btnAddUser"
              className="btn btn-success mr-auto"
              // data-toggle="modal"
              // data-target="#myModal"
              onClick={() => setVisible(true)}
            >
              <i className="fa fa-plus mr-1" /> ADD NEW ADMIN
            </button>
            {/* END BUTTON THÊM MỚI */}
          </div>
          {/* INPUT SEARCH */}
          <div className="col-12 form-group has-search mt-16">
            <div className="form-group mb-0">
              <div className="row">
                <div className="col-9">
                  <input
                    type="text"
                    placeholder="Nhập tên người dùng để tìm kiếm........"
                    className="form-control"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <div className="col-1">
                  {/* <button className="btn btn-danger" onClick={handleSearch}>
                    Tìm
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
        <div className="clear-fix" />
        <div>
          {/* BEGIN TABLE SẢN PHẨM */}
          <div className="loader" id="loader" />
          <Table
            columns={columns}
            dataSource={searchValue.trim() !== "" ? searchUser : arrUser}
            scroll={{
              x: 1500,
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
        <form className='container'
          onSubmit={form.handleSubmit}
        >
          <hr />
          <div className="row container">
            <div className=" col-xl-3 col-xs-12 text-center">
            </div>
            <div className="input-left col-4">
              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <input type="text" className='form-control bg-light' placeholder='email' name='email'
                  value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur}
                />
                {form.touched.email && form.errors.email ? (
                  <div className="error-message text-danger">{form.errors.email}</div>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="phone">Phone</label>
                <input type="text" className='form-control bg-light' placeholder='phone' name='phone'
                  value={form.values.phone} onChange={form.handleChange} onBlur={form.handleBlur}
                />
                {form.touched.phone && form.errors.phone ? (
                  <div className="error-message text-danger">{form.errors.phone}</div>
                ) : null}
              </div>
            </div>
            <div className="input-right col-4">
              <div className="form-group mt-3">
                <label htmlFor="name">Name</label>
                <input type="text" className='form-control bg-light' placeholder='name' name='name'
                  value={form.values.name} onChange={form.handleChange} onBlur={form.handleBlur}
                />
                {form.touched.name && form.errors.name ? (
                  <div className="error-message text-danger">{form.errors.name}</div>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="password">Password</label>
                <input type="text" className='form-control bg-light' placeholder='password' name='password'
                  value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur}
                />
                {form.touched.password && form.errors.password ? (
                  <div className="error-message text-danger">{form.errors.password}</div>
                ) : null}
              </div>

              <button className='btn-update text-white mt-3 border-0 shadow' type='submit'>
                Update
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
        <form className='container' onSubmit={formUpdate.handleSubmit}>
          <hr />
          <div className="row container">
            <div className=" col-xl-3 col-xs-12 text-center">
            </div>
            <div className="input-left col-4">
              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <input type="text" className='form-control bg-light' placeholder='email' name='email'
                  value={email} onBlur={formUpdate.handleBlur} onChange={formUpdate.handleChange} disabled
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="phone">Phone</label>
                <input type="text" className='form-control bg-light' placeholder='phone' name='phone'
                  value={phone} onBlur={formUpdate.handleBlur} onChange={formUpdate.handleChange}
                />
                {formUpdate.touched.phone && formUpdate.errors.phone ? (
                  <div className="error-message text-danger">{formUpdate.errors.phone}</div>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="phone">Birth day</label>
                <input type="date" className='form-control bg-light' placeholder='birthday' name='birthday'
                  value={birthday} onBlur={formUpdate.handleBlur} onChange={formUpdate.handleChange}
                />
                {formUpdate.touched.birthday && formUpdate.errors.birthday ? (
                  <div className="error-message text-danger">{formUpdate.errors.birthday}</div>
                ) : null}
              </div>

              <div className="form-group mt-4">
                <label htmlFor="certification">Certification</label>
                <input type="text" className='form-control bg-light' placeholder='certification' name='certification'
                  value={certification} onBlur={formUpdate.handleBlur} onChange={formUpdate.handleChange}
                />
                {formUpdate.touched.certification && formUpdate.errors.certification ? (
                  <div className="error-message text-danger">{formUpdate.errors.certification}</div>
                ) : null}
              </div>
            </div>
            <div className="input-right col-4">
              <div className="form-group mt-3">
                <label htmlFor="name">Name</label>
                <input type="text" className='form-control bg-light' placeholder='name' name='name'
                  value={name} onBlur={formUpdate.handleBlur} onChange={formUpdate.handleChange}
                />
                {formUpdate.touched.name && formUpdate.errors.name ? (
                  <div className="error-message text-danger">{formUpdate.errors.name}</div>
                ) : null}
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
                <input type="text" className='form-control bg-light' placeholder='role' name='role'
                  value={role} onBlur={formUpdate.handleBlur} onChange={formUpdate.handleChange}
                />
                {formUpdate.touched.role && formUpdate.errors.role ? (
                  <div className="error-message text-danger">{formUpdate.errors.role}</div>
                ) : null}
              </div>

              <div className="form-group mt-4">
                <label htmlFor="skill">Skill</label>
                <input type="text" className='form-control bg-light' placeholder='skill' name='skill'
                  value={skill} onBlur={formUpdate.handleBlur} onChange={formUpdate.handleChange}
                />
                {formUpdate.touched.skill && formUpdate.errors.skill ? (
                  <div className="error-message text-danger">{formUpdate.errors.skill}</div>
                ) : null}
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
