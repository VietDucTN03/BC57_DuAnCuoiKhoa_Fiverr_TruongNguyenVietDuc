import React, { useEffect, useState } from 'react';
import { Modal, Table, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJobAsyncThunkAction, getJobAsyncThunkAction, getViewJobAPI, postJobAsyncThunkAction, putEditJobAPI, uploadImgJobAsyncThunkAction } from '../../../redux/reducers/JobReducer';
import { useFormik } from 'formik';
import '../../../assets/scss/pages/Admin/jobManagement.scss'

export default function JobManagement() {

  const dispatch = useDispatch();
  const arrJobManage = useSelector((state) => state.jobReducer.arrJobManage);
  // console.log(arrJobManage);

  //GET ALL JOB
  useEffect(() => {
    dispatch(getJobAsyncThunkAction());
  }, [dispatch])

  const [visibleAdd, setVisibleAdd] = useState(false);
  const handleCancelAdd = () => {
    setVisibleAdd(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  //ADD NEW JOB
  const formAdd = useFormik({
    initialValues: {
      tenCongViec: '',
      moTa: '',
      moTaNgan: '',
      giaTien: '',
      danhGia: '',
      maChiTietLoaiCongViec: '',
      saoCongViec: '',
    },
    validate: (values) => {
      const errors = {};

      Object.keys(values).forEach((fieldName) => {
        if (!values[fieldName]) {
          errors[fieldName] = `${fieldName} is required`;
        }
      });

      // Đánh giá
      if (!/^\d+$/.test(values.danhGia)) {
        errors.danhGia = 'Rating must be a number';
      } else {
        const rating = parseInt(values.danhGia, 10);
        if (rating < 1 || rating > 10) {
          errors.danhGia = 'Rating must be between 1 and 10';
        }
      }

      // Sao công việc
      if (!/^\d+$/.test(values.saoCongViec)) {
        errors.saoCongViec = 'Star Rating must be a number';
      } else {
        const starRating = parseInt(values.saoCongViec, 10);
        if (starRating < 1 || starRating > 5) {
          errors.saoCongViec = 'Star Rating must be between 1 and 5';
        }
      }

      // Mã chi tiết Job
      if (!/^\d+$/.test(values.maChiTietLoaiCongViec)) {
        errors.maChiTietLoaiCongViec = 'Job detail code must be a number';
      }

      // Giá tiền
      if (!/^\d+$/.test(values.giaTien)) {
        errors.giaTien = 'Price must be a number';
      }

      return errors;
    },
    onSubmit: (values) => {
      if (Object.keys(formAdd.errors).length === 0) {

        const actionAsync = postJobAsyncThunkAction(values);
        dispatch(actionAsync)
          .then(() => {
            dispatch(getJobAsyncThunkAction());
            setSelectedFile(null);
          })
          .catch((error) => {
            console.error('Error adding job:', error);
          });
      }
    },
  })

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [visibleUploadImg, setVisibleUploadImg] = useState(false);

  const handleCancelUploadImg = () => {
    setVisibleUploadImg(false);
  };

  const handleImgJob = (id) => {
    setSelectedJobId(id);
    console.log(id);
    setVisibleUploadImg(true);
  };

  // UPLOAD IMAGE JOB
  const handleFileImgJobChange = (e, id) => {
    const file = e.target.files[0];
    dispatch(uploadImgJobAsyncThunkAction({ file, id }))
      .then(() => {
        dispatch(getJobAsyncThunkAction());
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error('Error adding job:', error);
      });
  };

  const [visibleUpdateJob, setVisibleUpdateJob] = useState(false);

  const handleEditJob = (id) => {
    setSelectedJobId(id);
    dispatch(getViewJobAPI(id))
    console.log(id);
    setVisibleUpdateJob(true)
  }

  const handleCancelUpdate = () => {
    setVisibleUpdateJob(false);
  };

  //UPDATE JOB
  const jobByID = useSelector((state) => state.jobReducer.jobByID);
  // console.log(jobByID);

  const formUpdate = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenCongViec: jobByID.tenCongViec || '',
      moTa: jobByID.moTa || '',
      moTaNgan: jobByID.moTaNgan || '',
      giaTien: jobByID.giaTien || '',
      danhGia: jobByID.danhGia || '',
      maChiTietLoaiCongViec: jobByID.maChiTietLoaiCongViec || '',
      saoCongViec: jobByID.saoCongViec || '',
    },
    validate: (values) => {
      const errors = {};

      Object.keys(values).forEach((fieldName) => {
        if (!values[fieldName]) {
          errors[fieldName] = `${fieldName} is required`;
        }
      });

      // Đánh giá
      if (!/^\d+$/.test(values.danhGia)) {
        errors.danhGia = 'Rating must be a number';
      } else {
        const rating = parseInt(values.danhGia, 10);
        if (rating < 1 || rating > 10) {
          errors.danhGia = 'Rating must be between 1 and 10';
        }
      }

      // Sao công việc
      if (!/^\d+$/.test(values.saoCongViec)) {
        errors.saoCongViec = 'Star Rating must be a number';
      } else {
        const starRating = parseInt(values.saoCongViec, 10);
        if (starRating < 1 || starRating > 5) {
          errors.saoCongViec = 'Star Rating must be between 1 and 5';
        }
      }

      // Mã chi tiết Job
      if (!/^\d+$/.test(values.maChiTietLoaiCongViec)) {
        errors.maChiTietLoaiCongViec = 'Job detail code must be a number';
      }

      // Giá tiền
      if (!/^\d+$/.test(values.giaTien)) {
        errors.giaTien = 'Price must be a number';
      }

      return errors;
    },
    onSubmit: (values) => {
      if (Object.keys(formUpdate.errors).length === 0) {

        const actionAsync = putEditJobAPI(values, selectedJobId);
        dispatch(actionAsync)
          .then(() => {
            dispatch(getJobAsyncThunkAction());
            // setSelectedFile(null);
          })
          .catch((error) => {
            console.error('Error adding job:', error);
          });
      }
    },
  })

  //DELETE JOB
  const handleDeleteJob = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this job?');
    if (confirmed) {
      dispatch(deleteJobAsyncThunkAction(id))
        .then(() => {
          dispatch(getJobAsyncThunkAction());
        })
        .catch((error) => {
          console.error('Error deleting job:', error);
        });
    }
  }

  const columns = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name Job',
      width: 100,
      dataIndex: 'tenCongViec',
      key: 'name',
      fixed: 'left',
      render: (text, record) => (
        <span className="custom-green-text">{text}</span>
      ),
    },
    {
      title: 'Image',
      dataIndex: 'hinhAnh',
      key: '1',
      width: 100,
      render: (text, record, index) => (
        <div>
          <img src={text} alt="..." width={100} height={100} />
        </div>
      ),
    },
    {
      title: 'Discription',
      dataIndex: 'moTaNgan',
      key: '2',
      width: 300,
    },
    {
      title: '$Price',
      dataIndex: 'giaTien',
      key: '3',
      width: 50,
    },
    {
      title: 'Rate',
      dataIndex: 'danhGia',
      key: '4',
      width: 40,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 125,
      render: (record) => (
        <div className='buttonEvent'>
          <button className='btn btn-success border-0 shadow'
            onClick={() => handleImgJob(record.id)}
          >IMAGE JOB</button>
          <button className='btn btn-primary button-edit border-0 shadow mt-2'
            onClick={() => handleEditJob(record.id)}
          >VIEW & EDIT</button>
          <button className='btn btn-danger border-0 shadow mt-2'
            onClick={() => handleDeleteJob(record.id)}
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
      <h2 className='title'>QUẢN LÝ CÔNG VIỆC</h2>
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
            dataSource={arrJobManage}
            scroll={{
              x: 1200,
              y: 400,
            }}
          />
        </div>
        <br />
      </div>
      {/* Add Job */}
      <Modal
        open={visibleAdd}
        title="Add New job"
        onCancel={handleCancelAdd}
        footer={null}
      >
        <form className='container form-add'
          onSubmit={formAdd.handleSubmit}
        >
          <div className="row container">
            <div className="input-left col-6">
              <div className="form-group mt-3">
                <label htmlFor="tenCongViec">New Job</label>
                <div className="form-input">
                  <input type="text" onBlur={formAdd.handleBlur}
                    className={`form-control ${formAdd.errors.tenCongViec && formAdd.touched.tenCongViec ? 'is-invalid' : ''}`}
                    id="tenCongViec" name='tenCongViec' placeholder="Name Job" value={formAdd.values.tenCongViec}
                    onChange={formAdd.handleChange} />
                  {formAdd.errors.tenCongViec && formAdd.touched.tenCongViec && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formAdd.errors.tenCongViec}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="moTa">Discription</label>
                <div className="form-input">
                  <input type="text" onBlur={formAdd.handleBlur}
                    className={`form-control ${formAdd.errors.moTa && formAdd.touched.moTa ? 'is-invalid' : ''}`}
                    id="moTa" name='moTa' placeholder="Discription" value={formAdd.values.moTa}
                    onChange={formAdd.handleChange} />
                  {formAdd.errors.moTa && formAdd.touched.moTa && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formAdd.errors.moTa}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="moTaNgan">Short Discription</label>
                <div className="form-input">
                  <input type="text" onBlur={formAdd.handleBlur}
                    className={`form-control ${formAdd.errors.moTaNgan && formAdd.touched.moTaNgan ? 'is-invalid' : ''}`}
                    id="moTaNgan" name='moTaNgan' placeholder="Short Discription" value={formAdd.values.moTaNgan}
                    onChange={formAdd.handleChange} />
                  {formAdd.errors.moTaNgan && formAdd.touched.moTaNgan && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formAdd.errors.moTaNgan}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="giaTien">Price</label>
                <div className="form-input">
                  <input type="text" onBlur={formAdd.handleBlur}
                    className={`form-control ${formAdd.errors.giaTien && formAdd.touched.giaTien ? 'is-invalid' : ''}`}
                    id="giaTien" name='giaTien' placeholder="Price" value={formAdd.values.giaTien}
                    onChange={formAdd.handleChange} />
                  {formAdd.errors.giaTien && formAdd.touched.giaTien && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formAdd.errors.giaTien}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="input-right col-6">
              <div className="form-group mt-3">
                <label htmlFor="danhGia">Rate</label>
                <div className="form-input">
                  <input type="text" onBlur={formAdd.handleBlur}
                    className={`form-control ${formAdd.errors.danhGia && formAdd.touched.danhGia ? 'is-invalid' : ''}`}
                    id="danhGia" name='danhGia' placeholder="Rate" value={formAdd.values.danhGia}
                    onChange={formAdd.handleChange} />
                  {formAdd.errors.danhGia && formAdd.touched.danhGia && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formAdd.errors.danhGia}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="maChiTietLoaiCongViec">Job detail code</label>
                <div className="form-input">
                  <input type="text" onBlur={formAdd.handleBlur}
                    className={`form-control ${formAdd.errors.maChiTietLoaiCongViec && formAdd.touched.maChiTietLoaiCongViec ? 'is-invalid' : ''}`}
                    id="maChiTietLoaiCongViec" name='maChiTietLoaiCongViec' placeholder="Job detail code" value={formAdd.values.maChiTietLoaiCongViec}
                    onChange={formAdd.handleChange} />
                  {formAdd.errors.maChiTietLoaiCongViec && formAdd.touched.maChiTietLoaiCongViec && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formAdd.errors.maChiTietLoaiCongViec}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="saoCongViec">Star Ratiing</label>
                <div className="form-input">
                  <input type="text" onBlur={formAdd.handleBlur}
                    className={`form-control ${formAdd.errors.saoCongViec && formAdd.touched.saoCongViec ? 'is-invalid' : ''}`}
                    id="saoCongViec" name='saoCongViec' placeholder="Star Ratiing" value={formAdd.values.saoCongViec}
                    onChange={formAdd.handleChange} />
                  {formAdd.errors.saoCongViec && formAdd.touched.saoCongViec && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formAdd.errors.saoCongViec}
                    </div>
                  )}
                </div>
              </div>

              <button className='btn-update text-white mt-3 border-0 shadow' type='submit'>
                ADD JOB
              </button>
            </div>
          </div>
        </form>
      </Modal>
      {/* Upload Image */}
      <Modal
        open={visibleUploadImg}
        title="Upload Image job"
        onCancel={handleCancelUploadImg}
        footer={null}
      >
        <form className='container form-uploadImg'
          onSubmit={formAdd.handleSubmit}
        >
          <div className="row container">
            <div className="form-group mt-3">
              <input className='btn' type="file" accept="image/*" onChange={(e) => handleFileImgJobChange(e, selectedJobId)} />
              {/* <button className='btn-update text-white mt-3 border-0 shadow' type='submit'>
                Update
              </button> */}
            </div>
          </div>
        </form>
      </Modal>
      {/* Update Job */}
      <Modal
        open={visibleUpdateJob}
        title="Update Job"
        onCancel={handleCancelUpdate}
        footer={null}
      >
        <form className='container form-update'
          onSubmit={formUpdate.handleSubmit}
        >
          <div className="row container">
            <div className="input-left col-6">
              <div className="form-group mt-3">
                <label htmlFor="tenCongViec">New Job</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.tenCongViec && formUpdate.touched.tenCongViec ? 'is-invalid' : ''}`}
                    id="tenCongViec" name='tenCongViec' placeholder="Name Job" value={formUpdate.values.tenCongViec}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.tenCongViec && formUpdate.touched.tenCongViec && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.tenCongViec}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="moTa">Discription</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.moTa && formUpdate.touched.moTa ? 'is-invalid' : ''}`}
                    id="moTa" name='moTa' placeholder="Discription" value={formUpdate.values.moTa}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.moTa && formUpdate.touched.moTa && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.moTa}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="moTaNgan">Short Discription</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.moTaNgan && formUpdate.touched.moTaNgan ? 'is-invalid' : ''}`}
                    id="moTaNgan" name='moTaNgan' placeholder="Short Discription" value={formUpdate.values.moTaNgan}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.moTaNgan && formUpdate.touched.moTaNgan && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.moTaNgan}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="giaTien">Price</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.giaTien && formUpdate.touched.giaTien ? 'is-invalid' : ''}`}
                    id="giaTien" name='giaTien' placeholder="Price" value={formUpdate.values.giaTien}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.giaTien && formUpdate.touched.giaTien && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.giaTien}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="input-right col-6">
              <div className="form-group mt-3">
                <label htmlFor="danhGia">Rate</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.danhGia && formUpdate.touched.danhGia ? 'is-invalid' : ''}`}
                    id="danhGia" name='danhGia' placeholder="Rate" value={formUpdate.values.danhGia}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.danhGia && formUpdate.touched.danhGia && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.danhGia}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="maChiTietLoaiCongViec">Job detail code</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.maChiTietLoaiCongViec && formUpdate.touched.maChiTietLoaiCongViec ? 'is-invalid' : ''}`}
                    id="maChiTietLoaiCongViec" name='maChiTietLoaiCongViec' placeholder="Job detail code" value={formUpdate.values.maChiTietLoaiCongViec}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.maChiTietLoaiCongViec && formUpdate.touched.maChiTietLoaiCongViec && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.maChiTietLoaiCongViec}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="saoCongViec">Star Ratiing</label>
                <div className="form-input">
                  <input type="text" onBlur={formUpdate.handleBlur}
                    className={`form-control ${formUpdate.errors.saoCongViec && formUpdate.touched.saoCongViec ? 'is-invalid' : ''}`}
                    id="saoCongViec" name='saoCongViec' placeholder="Star Ratiing" value={formUpdate.values.saoCongViec}
                    onChange={formUpdate.handleChange} />
                  {formUpdate.errors.saoCongViec && formUpdate.touched.saoCongViec && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      {formUpdate.errors.saoCongViec}
                    </div>
                  )}
                </div>
              </div>

              <button className='btn-update text-white mt-3 border-0 shadow' type='submit'>
                UPDATE JOB
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
