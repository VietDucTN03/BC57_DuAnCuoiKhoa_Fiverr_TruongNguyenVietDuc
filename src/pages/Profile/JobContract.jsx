import React, { useEffect, useState } from 'react';
import '../../assets/scss/pages/Profile/jobContract.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHiredJobAsyncThunkAction, getHiredJobAsyncThunkAction } from '../../redux/reducers/JobReducer';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';

export default function JobContract() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const arrHiredJob = useSelector((state) => state.jobReducer.hireJob);
    // console.log(arrHiredJob);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 3;

    useEffect(() => {
        dispatch(getHiredJobAsyncThunkAction());
    }, [dispatch]);

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    // const currentJobs = arrHiredJob.slice(indexOfFirstJob, indexOfLastJob);
    const currentJobs = [];
    for (let i = indexOfFirstJob; i < indexOfLastJob && i < arrHiredJob.length; i++) {
        currentJobs.push(arrHiredJob[i]);
    }

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
            // const { id, danhGia, giaTien, hinhAnh, tenCongViec, moTa, saoCongViec } =
            //     job.congViec;

            return (
                <div className="gigs__card" key={job.id}>
                    <div className="gigs__info">
                        <div className="gigs__info__img">
                            <img className="img-fluid" src={job.congViec.hinhAnh} alt="" />
                        </div>
                        <div className="gigs__info__content">
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
                    <div className="gigs__action-zone">
                        <p>
                            Job Hire Date: <span>{job.ngayThue}</span>
                        </p>
                        <div className="gigs__btn">
                            <button
                                className="btn btn-gigs btn-success mr-3"
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

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="gigs">
            <div className="gigs__top">
                <div className="gigs__card">
                    <span>It seems that you don't have any active Gigs.</span>
                    <button className="btn">Create a new Gig</button>
                </div>
            </div>
            <div className="gigs__bottom">{renderJobList()}</div>
            <Pagination 
                defaultCurrent={1} 
                total={arrHiredJob.length} 
                pageSize={jobsPerPage}
                onChange={handleChangePage}
            />
        </div>
    )
}
