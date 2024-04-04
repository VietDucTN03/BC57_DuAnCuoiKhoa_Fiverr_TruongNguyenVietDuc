import React, { useEffect, useState } from 'react';
import '../../assets/scss/pages/Profile/jobContract.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHiredJobAsyncThunkAction, deleteJobAsyncThunkAction, getHiredJobAsyncThunkAction, getJobAsyncThunkAction, getViewJobAPI, postJobAsyncThunkAction, uploadImgJobAsyncThunkAction } from '../../redux/reducers/JobReducer';
import { useNavigate } from 'react-router-dom';
import { Modal, Pagination, notification } from 'antd';
import { useFormik } from 'formik';

export default function JobContract() {

    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const arrHiredJob = useSelector((state) => state.jobReducer.hireJob);
    // console.log(arrHiredJob);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 3;

    const [selectedFile, setSelectedFile] = useState(null);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [showJobList, setShowJobList] = useState(true);

    const handCancelCreate = () => {
        setVisibleCreate(false);
    }

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

    const formCreate = useFormik({
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
            if (Object.keys(formCreate.errors).length === 0) {

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

    useEffect(() => {
        dispatch(getHiredJobAsyncThunkAction());
    }, [dispatch]);

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = [];
    for (let i = indexOfFirstJob; i < indexOfLastJob && i < arrHiredJob.length; i++) {
        currentJobs.push(arrHiredJob[i]);
    }

    // DELETE HIRED JOB
    const handleDeleteHireJob = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this job?');
        if (confirmed) {
            dispatch(deleteHiredJobAsyncThunkAction(id))
                .then(() => {
                    // Refresh the list of hired jobs after deletion
                    dispatch(getHiredJobAsyncThunkAction());
                })
                .catch((error) => {
                    console.error('Error deleting job:', error);
                });
        }
    };

    const renderJobList = () => {
        return currentJobs.map((job) => {
            return (
                <div className="gigs-card" key={job.id}>
                    <div className="gigs-info">
                        <div className="gigs-info-img">
                            <img className="img-fluid" src={job.congViec.hinhAnh} alt="" />
                        </div>
                        <div className="gigs-info-content">
                            <h1>{job.congViec.tenCongViec}</h1>
                            <p>{job.congViec.moTa}</p>
                            <div className="rating">
                                <div className="left">
                                    <i className="fa-solid fa-star mr-1" />
                                    <span className="star mr-2">{job.congViec.saoCongViec}</span>
                                    <span className="rating-amount">({job.congViec.danhGia})</span>
                                </div>
                                <div className="right">
                                    <p>${job.congViec.giaTien}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gigs-action-zone">
                        <p>
                            Job Hire Date: <span>{job.ngayThue}</span>
                        </p>
                        <div className="gigs-btn">
                            <button
                                className="btn btn-gigs btn-success mx-2"
                                onClick={() => navigate(`/job-detail/${job.congViec.id}`)}
                            >
                                View Detail
                            </button>
                            <button
                                className="btn btn-gigs btn-danger"
                                onClick={() => handleDeleteHireJob(job.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
    }

    //Create Job
    const arrJobManage = useSelector((state) => state.jobReducer.arrJobManage);

    useEffect(() => {
        dispatch(getJobAsyncThunkAction());
    }, [dispatch])

    const renderJobCreateList = () => {
        return arrJobManage.map((job) => {

            if (job.nguoiTao == userId) {
                return (
                    <div className="gigs-card" key={job.id}>
                        <div className="gigs-info">
                            <div className="gigs-info-img">
                                <img className="img-fluid" src={job.hinhAnh} alt="" />
                            </div>
                            <div className="gigs-info-content">
                                <h1>{job.tenCongViec}</h1>
                                <p>{job.moTa}</p>
                                <div className="rating">
                                    <div className="left">
                                        <i className="fa-solid fa-star mr-1" />
                                        <span className="star mr-2">{job.saoCongViec}</span>
                                        <span className="rating-amount">({job.danhGia})</span>
                                    </div>
                                    <div className="right">
                                        <p>${job.giaTien}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gigs-action-zone">
                            <div className="gigs-btn">
                                <button className='btn btn-success border-0 shadow'
                                    onClick={() => handleImgJob(job.id)}
                                >IMAGE JOB</button>
                                <button
                                    className="btn btn-gigs btn-success mx-2"
                                    onClick={() => navigate(`/job-detail/${job.id}`)}
                                >
                                    View Detail
                                </button>
                                <button
                                    className="btn btn-gigs btn-danger"
                                    onClick={() => handleDeleteJob(job.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        });
    }

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

    // DELETE JOB
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

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="gigs">
            <div className="gigs-top">
                <div className="gigs-card">
                    <span>It seems that you don't have any active Gigs.</span>
                    <button className="btn" onClick={() => setVisibleCreate(true)}>Create a new Gig</button>
                    <button className='btn mx-2' onClick={() => setShowJobList(true)}>Show Job List</button>
                    <button className='btn' onClick={() => setShowJobList(false)}>Show Created Job List</button>
                </div>
            </div>
            <Modal
                open={visibleCreate}
                title="Add New job"
                onCancel={handCancelCreate}
                footer={null}
            >
                <form className='container form-add'
                    onSubmit={formCreate.handleSubmit}
                >
                    <div className="row container">
                        <div className="input-left col-6">
                            <div className="form-group mt-3">
                                <label htmlFor="tenCongViec">New Job</label>
                                <div className="form-input">
                                    <input type="text" onBlur={formCreate.handleBlur}
                                        className={`form-control ${formCreate.errors.tenCongViec && formCreate.touched.tenCongViec ? 'is-invalid' : ''}`}
                                        id="tenCongViec" name='tenCongViec' placeholder="Name Job" value={formCreate.values.tenCongViec}
                                        onChange={formCreate.handleChange} />
                                    {formCreate.errors.tenCongViec && formCreate.touched.tenCongViec && (
                                        <div className="invalid-feedback" style={{ color: 'red' }}>
                                            {formCreate.errors.tenCongViec}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="moTa">Discription</label>
                                <div className="form-input">
                                    <input type="text" onBlur={formCreate.handleBlur}
                                        className={`form-control ${formCreate.errors.moTa && formCreate.touched.moTa ? 'is-invalid' : ''}`}
                                        id="moTa" name='moTa' placeholder="Discription" value={formCreate.values.moTa}
                                        onChange={formCreate.handleChange} />
                                    {formCreate.errors.moTa && formCreate.touched.moTa && (
                                        <div className="invalid-feedback" style={{ color: 'red' }}>
                                            {formCreate.errors.moTa}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="moTaNgan">Short Discription</label>
                                <div className="form-input">
                                    <input type="text" onBlur={formCreate.handleBlur}
                                        className={`form-control ${formCreate.errors.moTaNgan && formCreate.touched.moTaNgan ? 'is-invalid' : ''}`}
                                        id="moTaNgan" name='moTaNgan' placeholder="Short Discription" value={formCreate.values.moTaNgan}
                                        onChange={formCreate.handleChange} />
                                    {formCreate.errors.moTaNgan && formCreate.touched.moTaNgan && (
                                        <div className="invalid-feedback" style={{ color: 'red' }}>
                                            {formCreate.errors.moTaNgan}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="giaTien">Price</label>
                                <div className="form-input">
                                    <input type="text" onBlur={formCreate.handleBlur}
                                        className={`form-control ${formCreate.errors.giaTien && formCreate.touched.giaTien ? 'is-invalid' : ''}`}
                                        id="giaTien" name='giaTien' placeholder="Price" value={formCreate.values.giaTien}
                                        onChange={formCreate.handleChange} />
                                    {formCreate.errors.giaTien && formCreate.touched.giaTien && (
                                        <div className="invalid-feedback" style={{ color: 'red' }}>
                                            {formCreate.errors.giaTien}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="input-right col-6">
                            <div className="form-group mt-3">
                                <label htmlFor="danhGia">Rate</label>
                                <div className="form-input">
                                    <input type="text" onBlur={formCreate.handleBlur}
                                        className={`form-control ${formCreate.errors.danhGia && formCreate.touched.danhGia ? 'is-invalid' : ''}`}
                                        id="danhGia" name='danhGia' placeholder="Rate" value={formCreate.values.danhGia}
                                        onChange={formCreate.handleChange} />
                                    {formCreate.errors.danhGia && formCreate.touched.danhGia && (
                                        <div className="invalid-feedback" style={{ color: 'red' }}>
                                            {formCreate.errors.danhGia}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="maChiTietLoaiCongViec">Job detail code</label>
                                <div className="form-input">
                                    <input type="text" onBlur={formCreate.handleBlur}
                                        className={`form-control ${formCreate.errors.maChiTietLoaiCongViec && formCreate.touched.maChiTietLoaiCongViec ? 'is-invalid' : ''}`}
                                        id="maChiTietLoaiCongViec" name='maChiTietLoaiCongViec' placeholder="Job detail code" value={formCreate.values.maChiTietLoaiCongViec}
                                        onChange={formCreate.handleChange} />
                                    {formCreate.errors.maChiTietLoaiCongViec && formCreate.touched.maChiTietLoaiCongViec && (
                                        <div className="invalid-feedback" style={{ color: 'red' }}>
                                            {formCreate.errors.maChiTietLoaiCongViec}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="saoCongViec">Star Ratiing</label>
                                <div className="form-input">
                                    <input type="text" onBlur={formCreate.handleBlur}
                                        className={`form-control ${formCreate.errors.saoCongViec && formCreate.touched.saoCongViec ? 'is-invalid' : ''}`}
                                        id="saoCongViec" name='saoCongViec' placeholder="Star Ratiing" value={formCreate.values.saoCongViec}
                                        onChange={formCreate.handleChange} />
                                    {formCreate.errors.saoCongViec && formCreate.touched.saoCongViec && (
                                        <div className="invalid-feedback" style={{ color: 'red' }}>
                                            {formCreate.errors.saoCongViec}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button className='btn-update text-white mt-3 border-0 shadow' type='submit'>
                                CREATE JOB
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
            <Modal
                open={visibleUploadImg}
                title="Upload Image job"
                onCancel={handleCancelUploadImg}
                footer={null}
            >
                <form className='container form-uploadImg'
                    onSubmit={formCreate.handleSubmit}
                >
                    <div className="row container">
                        <div className="form-group mt-3">
                            <input className='btn' type="file" accept="image/*" onChange={(e) => handleFileImgJobChange(e, selectedJobId)} />
                        </div>
                    </div>
                </form>
            </Modal>
            {showJobList ? (
                <div className="gigs-bottom">{renderJobList()}</div>
            ) : (
                <div className="gigs-bottom">{renderJobCreateList()}</div>
            )}
            <Pagination
                defaultCurrent={1}
                total={showJobList ? arrHiredJob.length : null}
                pageSize={jobsPerPage}
                onChange={handleChangePage}
            />
        </div>
    )
}
