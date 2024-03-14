import React, { useEffect, useState } from 'react';
import { Modal, Table, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteServiceAsyncThunkAction, getServiceAsyncThunkAction, getViewServiceAPI, postServiceAsyncThunkAction, putEditServiceAPI } from '../../../redux/reducers/ServiceReducer';
import { useFormik } from 'formik';

export default function ServiceManagement() {

  const dispatch = useDispatch();
  const arrService = useSelector((state) => state.serviceReducer.arrService);
  // console.table(arrService)

  //GET ALL SERVICE
  useEffect(() => {
    dispatch(getServiceAsyncThunkAction());
  }, [dispatch])

  const [visibleAdd, setVisibleAdd] = useState(false);
  const handleCancelAdd = () => {
    setVisibleAdd(false);
  };

  //ADD SERVICE
  const formAdd = useFormik({
    initialValues: {
      maCongViec: '',
      maNguoiThue: '',
      ngayThue: '',
      hoanThanh: true,
    },
    validate: (values) => {
      const errors = {};

      Object.keys(values).forEach((fieldName) => {
        if (!values[fieldName]) {
          errors[fieldName] = `${fieldName} is required`;
        }
      });

      if (!/^\d+$/.test(values.maCongViec) && values.maCongViec !== '') {
        errors.maCongViec = 'Job ID must be a number';
      }

      if (!/^\d+$/.test(values.maNguoiThue) && values.maNguoiThue !== '') {
        errors.maNguoiThue = 'Hirer ID must be a number';
      }

      return errors;
    },
    onSubmit: (values) => {
      if (Object.keys(formAdd.errors).length === 0) {

        const actionAsync = postServiceAsyncThunkAction({
          ...values,
          hoanThanh: values.hoanThanh === 'true'
        });
        dispatch(actionAsync)
          .then(() => {
            dispatch(getServiceAsyncThunkAction());
          })
          .catch((error) => {
            console.error('Error adding job:', error);
          });
      }
    },
  })

  //EDIT SERVICE
  const serviceByID = useSelector((state) => state.serviceReducer.serviceByID);
  // console.log(serviceByID);

  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [visibleEditService, setVisibleEditService] = useState(false);

  const handleEditService = (id) => {
    setSelectedServiceId(id);
    dispatch(getViewServiceAPI(id))
    // console.log(id);
    setVisibleEditService(true)
  }

  const handleCancelUpdate = () => {
    setVisibleEditService(false);
  };

  const formUpdate = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: serviceByID.id || '',
      maCongViec: serviceByID.maCongViec || '',
      maNguoiThue: serviceByID.maNguoiThue || '',
      ngayThue: serviceByID.ngayThue || '',
      hoanThanh: serviceByID.hoanThanh ? 'true' : 'false',
    },
    validate: (values) => {
      const errors = {};

      Object.keys(values).forEach((fieldName) => {
        if (!values[fieldName]) {
          errors[fieldName] = `${fieldName} is required`;
        }
      });

      if (!/^\d+$/.test(values.maCongViec) && values.maCongViec !== '') {
        errors.maCongViec = 'Job ID must be a number';
      }

      if (!/^\d+$/.test(values.maNguoiThue) && values.maNguoiThue !== '') {
        errors.maNguoiThue = 'Hirer ID must be a number';
      }

      return errors;
    },
    onSubmit: (values) => {
      if (Object.keys(formUpdate.errors).length === 0) {

        const actionAsync = putEditServiceAPI(values, selectedServiceId);
        dispatch(actionAsync)
          .then(() => {
            dispatch(getServiceAsyncThunkAction());
          })
          .catch((error) => {
            console.error('Error adding job:', error);
          });
      }
    },
  })

  //DELETE SERVICE
  const handleDeleteService = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this service?');
    if (confirmed) {
      dispatch(deleteServiceAsyncThunkAction(id))
        .then(() => {
          dispatch(getServiceAsyncThunkAction());
        })
        .catch((error) => {
          console.error('Error deleting service:', error);
        });
    }
  }

  const columns = [
    {
      title: 'ID',
      width: 80,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Job ID',
      width: 70,
      dataIndex: 'maCongViec',
      key: 'maCongViec',
      fixed: 'left',
    },
    {
      title: 'Hirer ID',
      dataIndex: 'maNguoiThue',
      key: '1',
      width: 110,
    },
    {
      title: 'Hire Day',
      dataIndex: 'ngayThue',
      key: '2',
      width: 150,
    },
    {
      title: 'Condition',
      dataIndex: 'hoanThanh',
      key: '3',
      width: 150,
      render: (hoanThanh) => (
        <span>{hoanThanh ? 'Hoàn thành' : 'Chưa hoàn thành'}</span>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (record) => (
        <div className='buttonEvent'>
          <button className='btn btn-primary button-edit border-0 shadow'
            onClick={() => handleEditService(record.id)}
          >VIEW & EDIT</button>
          <button className='btn btn-danger border-0 shadow mx-2'
            onClick={() => handleDeleteService(record.id)}
          >DELETE</button>
        </div>
      ),
    },
  ];
  const data = [];

  return (
    <div className='container'>
      <h2>QUẢN LÝ CÔNG VIỆC</h2>
      <br />
      <div role="tabpanel" className="tab-pane in active">
        <div className="row">
          <div className="col-4 d-flex justify-content-end mx-3" style={{ height: 40, marginBottom: "16px" }}>
            <button
              id="btnAddService"
              className="btn btn-success"
              style={{ height: '45px', padding: '0 9px' }}
              onClick={() => setVisibleAdd(true)}
            >
              <i className="fa fa-plus mr-1" /> ADD NEW SERVICE
            </button>
          </div>
        </div>
        <div className="clear-fix" />
        <div>
          <div className="loader" id="loader" />
          <Table
            columns={columns}
            dataSource={arrService}
            scroll={{
              x: 500,
              y: 330,
            }}
          />
        </div>
        <br />
      </div>
      <Modal
        open={visibleAdd}
        title="Add New Service"
        onCancel={handleCancelAdd}
        footer={null}
      >
        <form className='container form-add'
          onSubmit={formAdd.handleSubmit}
        >
          <div className="row container">
            <div className="input-left col-6">
              <div className="form-group mt-3">
                <label htmlFor="maCongViec">Job ID</label>
                <div className="form-input">
                  <input type="text" onBlur={formAdd.handleBlur}
                    className={`form-control ${formAdd.errors.maCongViec && formAdd.touched.maCongViec ? 'is-invalid' : ''}`}
                    id="maCongViec" name='maCongViec' placeholder="Name Job" value={formAdd.values.maCongViec}
                    onChange={formAdd.handleChange} />
                  {formAdd.errors.maCongViec && formAdd.touched.maCongViec && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formAdd.errors.maCongViec}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="maNguoiThue">Hirer ID</label>
                <div className="form-input">
                  <input type="text" onBlur={formAdd.handleBlur}
                    className={`form-control ${formAdd.errors.maNguoiThue && formAdd.touched.maNguoiThue ? 'is-invalid' : ''}`}
                    id="maNguoiThue" name='maNguoiThue' placeholder="Name Job" value={formAdd.values.maNguoiThue}
                    onChange={formAdd.handleChange} />
                  {formAdd.errors.maNguoiThue && formAdd.touched.maNguoiThue && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formAdd.errors.maNguoiThue}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="input-right col-6">
              <div className="form-group mt-3">
                <label htmlFor="ngayThue">Hire Day</label>
                <div className="form-input">
                  <input type="date" onBlur={formAdd.handleBlur}
                    className={`form-control ${formAdd.errors.ngayThue && formAdd.touched.ngayThue ? 'is-invalid' : ''}`}
                    id="ngayThue" name='ngayThue' placeholder="Name Job" value={formAdd.values.ngayThue}
                    onChange={formAdd.handleChange} />
                  {formAdd.errors.ngayThue && formAdd.touched.ngayThue && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formAdd.errors.ngayThue}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group mt-3">
                <label htmlFor="condition">Condition</label>
                <section name='condition'>
                  <input onChange={formAdd.handleChange}
                    type="radio"
                    id="male"
                    name="condition"
                    value={true}
                  />
                  <p htmlFor="Male">Complete</p>
                </section>
                <section>
                  <input onChange={formAdd.handleChange}
                    type="radio"
                    id="female"
                    name="condition"
                    value={false}
                  />
                  <p htmlFor="Female">Incomplete</p>
                </section>
              </div>

              <button className='btn-update text-white mt-3 border-0 shadow' type='submit'>
                ADD SERVICE
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <Modal
        open={visibleEditService}
        title="Update Service"
        onCancel={handleCancelUpdate}
        footer={null}
      >
        <form className='container form-update'
          onSubmit={formUpdate.handleSubmit}
        >
          <div className="row container">
            <div className="input-left col-6">
              <div className="form-group mt-3">
                <label htmlFor="id">ID</label>
                <div className="form-input">
                  <input type="text" className='form-control bg-light' placeholder='Input ID' name='id' disabled
                    value={formUpdate.values.id} onChange={formUpdate.handleChange} onBlur={formUpdate.handleBlur}
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="maCongViec">Job ID</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.maCongViec && formUpdate.touched.maCongViec ? 'is-invalid' : ''}`}
                    id="maCongViec" name='maCongViec' placeholder="Input Job ID" value={formUpdate.values.maCongViec}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.maCongViec && formUpdate.touched.maCongViec && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.maCongViec}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="maNguoiThue">Hirer ID</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.maNguoiThue && formUpdate.touched.maNguoiThue ? 'is-invalid' : ''}`}
                    id="maNguoiThue" name='maNguoiThue' placeholder="Input Hirer ID" value={formUpdate.values.maNguoiThue}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.maNguoiThue && formUpdate.touched.maNguoiThue && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.maNguoiThue}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="input-right col-6">
              <div className="form-group mt-3">
                <label htmlFor="ngayThue">Hire Day</label>
                <div className="form-input">
                  <input type="date" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.ngayThue && formUpdate.touched.ngayThue ? 'is-invalid' : ''}`}
                    id="ngayThue" name='ngayThue' placeholder="Input Hire Day" value={formUpdate.values.ngayThue}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.ngayThue && formUpdate.touched.ngayThue && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.ngayThue}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group mt-3">
                <label htmlFor="condition">Condition</label>
                <section name='condition'>
                  <input
                    type="radio"
                    id="male"
                    name="condition"
                    checked={formUpdate.values.hoanThanh === 'true'}
                    onChange={() => formUpdate.setFieldValue('hoanThanh', 'true')}
                  />
                  <p htmlFor="Male">Complete</p>
                </section>
                <section>
                  <input
                    type="radio"
                    id="female"
                    name="condition"
                    checked={formUpdate.values.hoanThanh === 'false'}
                    onChange={() => formUpdate.setFieldValue('hoanThanh', 'false')}
                  />
                  <p htmlFor="Female">Incomplete</p>
                </section>
              </div>

              <button className='btn-update text-white mt-3 border-0 shadow' type='submit'>
                ADD JOB
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
