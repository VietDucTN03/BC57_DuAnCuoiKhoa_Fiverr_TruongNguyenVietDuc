import React, { useEffect, useState } from 'react';
import { Modal, Table, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJobTypeAsyncThunkAction, getJobTypeAsyncThunkAction, getViewJobTypeAPI, postJobTypeAsyncThunkAction, putEditJobTypeAPI } from '../../../redux/reducers/JobTypeReducer';
import { useFormik } from 'formik';

export default function JobTypeManagement() {

  const dispatch = useDispatch()
  const arrJobType = useSelector((state) => state.jobTypeReducer.arrJobType);
  // console.table(arrJobType);

  //GET ALL JOBTYPE
  useEffect(() => {
    dispatch(getJobTypeAsyncThunkAction());
  }, [dispatch])

  const [visibleAdd, setVisibleAdd] = useState(false);
  const handleCancelAdd = () => {
    setVisibleAdd(false);
  };

  //ADD NEW TYPE JOB
  const formAdd = useFormik({
    initialValues: {
      tenLoaiCongViec: '',
    },
    validate: (values) => {
      const errors = {};

      Object.keys(values).forEach((fieldName) => {
        if (!values[fieldName]) {
          errors[fieldName] = `${fieldName} is required`;
        }
      });

      return errors;
    },
    onSubmit: (values) => {
      if (Object.keys(formAdd.errors).length === 0) {

        const actionAsync = postJobTypeAsyncThunkAction(values);
        dispatch(actionAsync)
          .then(() => {
            dispatch(getJobTypeAsyncThunkAction());
            notification.success({
              message: 'Add JOB Type Successfull!!',
              duration: 5,
            });
          })
          .catch((error) => {
            console.error('Error adding job type:', error);
          });
      }
    },
  })

  //DELETE JOB TYPE
  const handleDeleteJobType = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this job type?');
    if (confirmed) {
      dispatch(deleteJobTypeAsyncThunkAction(id))
        .then(() => {
          dispatch(getJobTypeAsyncThunkAction());
          notification.success({
            message: 'Delete Successfull!!',
            duration: 5,
          });
        })
        .catch((error) => {
          console.error('Error deleting job:', error);
        });
    }
  }

  const [visibleUpdateJobType, setVisibleUpdateJobType] = useState(false);
  const [selectedJobTypeId, setSelectedJobTypeId] = useState(null);

  const handleEditJobType = (id) => {
    setSelectedJobTypeId(id);
    dispatch(getViewJobTypeAPI(id))
    console.log(id);
    setVisibleUpdateJobType(true)
  }

  const handleCancelUpdate = () => {
    setVisibleUpdateJobType(false);
  };

  //EDIT JOB TYPE
  const jobTypeByID = useSelector((state) => state.jobTypeReducer.jobTypeByID)
  // console.log(jobTypeByID);

  const formUpdate = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenLoaiCongViec: jobTypeByID.tenLoaiCongViec || '',
    },
    validate: (values) => {
      const errors = {};

      Object.keys(values).forEach((fieldName) => {
        if (!values[fieldName]) {
          errors[fieldName] = `${fieldName} is required`;
        }
      });

      return errors;
    },
    onSubmit: (values) => {
      if (Object.keys(formUpdate.errors).length === 0) {

        const actionAsync = putEditJobTypeAPI(values, selectedJobTypeId);
        dispatch(actionAsync)
          .then(() => {
            dispatch(getJobTypeAsyncThunkAction());
          })
          .catch((error) => {
            console.error('Error adding job:', error);
          });
      }
    },
  })

  const columns = [
    {
      title: 'ID',
      width: 70,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Job Type',
      dataIndex: 'tenLoaiCongViec',
      key: '1',
      width: 250,
      render: (text, record) => (
        <span className="custom-green-text">{text}</span>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 150,
      render: (record) => (
        <div className='buttonEvent'>
          <button className='btn btn-primary button-edit border-0 shadow'
            onClick={() => handleEditJobType(record.id)}
          >VIEW & EDIT</button>
          <button className='btn btn-danger border-0 shadow mx-2'
            onClick={() => handleDeleteJobType(record.id)}
          >DELETE</button>
        </div>
      ),
    },
  ];
  const data = [];

  return (
    <div className='container'>
      <h2 className='title'>QUẢN LÝ LOẠI CÔNG VIỆC</h2>
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
              onClick={() => setVisibleAdd(true)}
            >
              <i className="fa fa-plus" /> ADD NEW JOB
            </button>
          </div>
        </div>
        <div className="clear-fix" />
        <div>
          {/* BEGIN TABLE SẢN PHẨM */}
          <div className="loader" id="loader" />
          <Table
            columns={columns}
            dataSource={arrJobType}
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
        title="Add New job Type"
        onCancel={handleCancelAdd}
        footer={null}
      >
        <form className='container form-add'
          onSubmit={formAdd.handleSubmit}
        >
          <div className="row container align-content-center">
            <div className="input-left col-8">
              <div className="form-group mt-3 d-flex">
                <label className='lable-JobType' htmlFor="tenLoaiCongViec">Add JobType</label>
                <div className="form-input w-75 mx-2">
                  <input type="text" onBlur={formAdd.handleBlur}
                    className={`form-control ${formAdd.errors.tenLoaiCongViec && formAdd.touched.tenLoaiCongViec ? 'is-invalid' : ''}`}
                    id="tenLoaiCongViec" name='tenLoaiCongViec' placeholder="New Job Type" value={formAdd.values.tenLoaiCongViec}
                    onChange={formAdd.handleChange} />
                  {formAdd.errors.tenLoaiCongViec && formAdd.touched.tenLoaiCongViec && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formAdd.errors.tenLoaiCongViec}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="input-right col-4">
              <button className='btn-update text-white mt-3 border-0 shadow' type='submit'>
                ADD JOB TYPE
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <Modal
        open={visibleUpdateJobType}
        title="Edit Job Type"
        onCancel={handleCancelUpdate}
        footer={null}
      >
        <form className='container form-update'
          onSubmit={formUpdate.handleSubmit}
        >
          <div className="row container">
            <div className="input-left col-8">
              <div className="form-group mt-3 d-flex">
                <label className='lable-JobType' htmlFor="tenLoaiCongViec">Edit JobType</label>
                <div className="form-input w-75 mx-2">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.tenLoaiCongViec && formUpdate.touched.tenLoaiCongViec ? 'is-invalid' : ''}`}
                    id="tenLoaiCongViec" name='tenLoaiCongViec' placeholder="New Job Type" value={formUpdate.values.tenLoaiCongViec}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.tenLoaiCongViec && formUpdate.touched.tenLoaiCongViec && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.tenLoaiCongViec}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="input-right col-4">
              <button className='btn-update text-white mt-3 border-0 shadow' type='submit'>
                UPDATE JOB TYPE
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
