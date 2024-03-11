import React, { useEffect, useState } from 'react';
import { Modal, Table, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJobAsyncThunkAction, getJobAsyncThunkAction, getViewJobAPI, postJobAsyncThunkAction, putEditJobAPI, uploadImgJobAsyncThunkAction } from '../../../redux/reducers/JobReducer';
import { useFormik } from 'formik';

export default function JobManagement() {

  const dispatch = useDispatch();
  const arrJobManage = useSelector((state) => state.jobReducer.arrJobManage);
  console.log(arrJobManage);

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
            notification.success({
              message: 'Add JOB Successfull!!',
              duration: 5,
            });
            setSelectedFile(null); // Reset selected file after successful upload
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
  console.log(jobByID);

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

  const columns = [
    {
      title: 'ID',
      width: 35,
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
      width: 50,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 90,
      render: (record) => (
        <div className='buttonEvent'>
          <button className='btn btn-danger border-0 shadow'
            onClick={() => handleImgJob(record.id)}
          >IMAGE JOB</button>
          <button className='btn button-edit border-0 shadow'
            onClick={() => handleEditJob(record.id)}
          >VIEW & EDIT</button>
          <button className='btn btn-danger border-0 shadow'
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
      <h2>QUẢN LÝ CÔNG VIỆC</h2>
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
              onClick={() => setVisibleAdd(true)}
            >
              <i className="fa fa-plus mr-1" /> ADD NEW JOB
            </button>
            {/* END BUTTON THÊM MỚI */}
          </div>
          {/* <div className="col-12 form-group has-search mt-16">
            <div className="form-group mb-0">
              <div className="row">
                <div className="col-9">
                </div>
              </div>
            </div>
          </div> */}
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
        <form className='container'
          onSubmit={formAdd.handleSubmit}
        >
          <hr />
          <div className="row container">
            <div className=" col-xl-3 col-xs-12 text-center">
            </div>
            <div className="input-left col-4">
              <div className="form-group mt-3">
                <label htmlFor="tenCongViec">New Job</label>
                <input type="text" className='form-control bg-light' placeholder='New Job' name='tenCongViec'
                  value={formAdd.values.tenCongViec} onChange={formAdd.handleChange} onBlur={formAdd.handleBlur}
                />
                {formAdd.touched.tenCongViec && formAdd.errors.tenCongViec ? (
                  <div className="error-message text-danger">{formAdd.errors.tenCongViec}</div>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="moTa">Discription</label>
                <input type="text" className='form-control bg-light' placeholder='Discription' name='moTa'
                  value={formAdd.values.moTa} onChange={formAdd.handleChange} onBlur={formAdd.handleBlur}
                />
                {formAdd.touched.moTa && formAdd.errors.moTa ? (
                  <div className="error-message text-danger">{formAdd.errors.moTa}</div>
                ) : null}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="moTaNgan">Short Discription</label>
                <input type="text" className='form-control bg-light' placeholder='Short Discription' name='moTaNgan'
                  value={formAdd.values.moTaNgan} onChange={formAdd.handleChange} onBlur={formAdd.handleBlur}
                />
                {formAdd.touched.moTaNgan && formAdd.errors.moTaNgan ? (
                  <div className="error-message text-danger">{formAdd.errors.moTaNgan}</div>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="giaTien">Price</label>
                <input type="text" className='form-control bg-light' placeholder='Price' name='giaTien'
                  value={formAdd.values.giaTien} onChange={formAdd.handleChange} onBlur={formAdd.handleBlur}
                />
                {formAdd.touched.giaTien && formAdd.errors.giaTien ? (
                  <div className="error-message text-danger">{formAdd.errors.giaTien}</div>
                ) : null}
              </div>
            </div>
            <div className="input-right col-4">
              <div className="form-group mt-4">
                <label htmlFor="danhGia">Rate</label>
                <input type="text" className='form-control bg-light' placeholder='Rate' name='danhGia'
                  value={formAdd.values.danhGia} onChange={formAdd.handleChange} onBlur={formAdd.handleBlur}
                />
                {formAdd.touched.danhGia && formAdd.errors.danhGia ? (
                  <div className="error-message text-danger">{formAdd.errors.danhGia}</div>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="maChiTietLoaiCongViec">Job detail code</label>
                <input type="text" className='form-control bg-light' placeholder='Job detail code' name='maChiTietLoaiCongViec'
                  value={formAdd.values.maChiTietLoaiCongViec} onChange={formAdd.handleChange} onBlur={formAdd.handleBlur}
                />
                {formAdd.touched.maChiTietLoaiCongViec && formAdd.errors.maChiTietLoaiCongViec ? (
                  <div className="error-message text-danger">{formAdd.errors.maChiTietLoaiCongViec}</div>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="saoCongViec">Star Ratiing</label>
                <input type="text" className='form-control bg-light' placeholder='Star Ratiing' name='saoCongViec'
                  value={formAdd.values.saoCongViec} onChange={formAdd.handleChange} onBlur={formAdd.handleBlur}
                />
                {formAdd.touched.saoCongViec && formAdd.errors.saoCongViec ? (
                  <div className="error-message text-danger">{formAdd.errors.saoCongViec}</div>
                ) : null}
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
        <form className='container'
          onSubmit={formAdd.handleSubmit}
        >
          <hr />
          <div className="row container">
            <div className="form-group mt-3">
              <input type="file" accept="image/*" onChange={(e) => handleFileImgJobChange(e, selectedJobId)} />
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
        <form className='container'
          onSubmit={formUpdate.handleSubmit}
        >
          <hr />
          <div className="row container">
            <div className=" col-xl-3 col-xs-12 text-center">
            </div>
            <div className="input-left col-4">
              <div className="form-group mt-3">
                <label htmlFor="tenCongViec">New Job</label>
                <input type="text" className='form-control bg-light' placeholder='New Job' name='tenCongViec'
                  value={formUpdate.values.tenCongViec} onChange={formUpdate.handleChange} onBlur={formUpdate.handleBlur}
                />
                {formUpdate.touched.tenCongViec && formUpdate.errors.tenCongViec ? (
                  <div className="error-message text-danger">{formUpdate.errors.tenCongViec}</div>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="moTa">Discription</label>
                <input type="text" className='form-control bg-light' placeholder='Discription' name='moTa'
                  value={formUpdate.values.moTa} onChange={formUpdate.handleChange} onBlur={formUpdate.handleBlur}
                />
                {formUpdate.touched.moTa && formUpdate.errors.moTa ? (
                  <div className="error-message text-danger">{formUpdate.errors.moTa}</div>
                ) : null}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="moTaNgan">Short Discription</label>
                <input type="text" className='form-control bg-light' placeholder='Short Discription' name='moTaNgan'
                  value={formUpdate.values.moTaNgan} onChange={formUpdate.handleChange} onBlur={formUpdate.handleBlur}
                />
                {formUpdate.touched.moTaNgan && formUpdate.errors.moTaNgan ? (
                  <div className="error-message text-danger">{formUpdate.errors.moTaNgan}</div>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="giaTien">Price</label>
                <input type="text" className='form-control bg-light' placeholder='Price' name='giaTien'
                  value={formUpdate.values.giaTien} onChange={formUpdate.handleChange} onBlur={formUpdate.handleBlur}
                />
                {formUpdate.touched.giaTien && formUpdate.errors.giaTien ? (
                  <div className="error-message text-danger">{formUpdate.errors.giaTien}</div>
                ) : null}
              </div>
            </div>
            <div className="input-right col-4">
              <div className="form-group mt-4">
                <label htmlFor="danhGia">Rate</label>
                <input type="text" className='form-control bg-light' placeholder='Rate' name='danhGia'
                  value={formUpdate.values.danhGia} onChange={formUpdate.handleChange} onBlur={formUpdate.handleBlur}
                />
                {formUpdate.touched.danhGia && formUpdate.errors.danhGia ? (
                  <div className="error-message text-danger">{formUpdate.errors.danhGia}</div>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="maChiTietLoaiCongViec">Job detail code</label>
                <input type="text" className='form-control bg-light' placeholder='Job detail code' name='maChiTietLoaiCongViec'
                  value={formUpdate.values.maChiTietLoaiCongViec} onChange={formUpdate.handleChange} onBlur={formUpdate.handleBlur}
                />
                {formUpdate.touched.maChiTietLoaiCongViec && formUpdate.errors.maChiTietLoaiCongViec ? (
                  <div className="error-message text-danger">{formUpdate.errors.maChiTietLoaiCongViec}</div>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="saoCongViec">Star Ratiing</label>
                <input type="text" className='form-control bg-light' placeholder='Star Ratiing' name='saoCongViec'
                  value={formUpdate.values.saoCongViec} onChange={formUpdate.handleChange} onBlur={formUpdate.handleBlur}
                />
                {formUpdate.touched.saoCongViec && formUpdate.errors.saoCongViec ? (
                  <div className="error-message text-danger">{formUpdate.errors.saoCongViec}</div>
                ) : null}
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
