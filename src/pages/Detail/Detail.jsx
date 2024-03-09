import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import InfoJob from './InfoJob'
import CheckOut from './CheckOut'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Progress, Rate } from 'antd';

import '../../assets/scss/pages/Detail/detail.scss';
import { getJobDetailByIAsyncThunkDAPI } from '../../redux/reducers/JobReducer';
import { getCommentByJob, postComment, postCommentAsyncThunkAction } from '../../redux/reducers/CommentReducer';
import dayjs from 'dayjs';

const collapseText = `
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
`;

const Detail = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const [rate, setRate] = useState(0);
    const userId = localStorage.getItem('userId');

    const jobDetail = useSelector((state) => state.jobReducer.jobDetail);

    // const {
    //     avatar,
    //     tenChiTietLoai,
    //     tenLoaiCongViec,
    //     tenNguoiTao,
    //     tenNhomChiTietLoai,
    //     congViec,
    // } = jobDetail;

    // console.log(jobDetail);

    useEffect(() => {
        dispatch(getJobDetailByIAsyncThunkDAPI(params.id))
    }, [dispatch, params.id]);

    const commentByJob = useSelector((state) => state.commentReducer.arrComment);
    console.log(commentByJob);

    useEffect(() => {
        dispatch(getCommentByJob(params.id))
    }, [dispatch, params.id]);

    const handleRate = (value) => {
        const integerRate = Math.round(value);
        form.setFieldValue('saoBinhLuan', integerRate);
        setRate(integerRate);
        console.log(integerRate);
    };

    const form = useFormik({
        initialValues: {
            noiDung: '',
            maCongViec: params?.id,
            maNguoiBinhLuan: userId,
            ngayBinhLuan: dayjs().format('DD/MM/YYYY'),
            saoBinhLuan: rate,
        },

        validate: (values) => {
            const errors = {};

            if (!values.noiDung) {
                errors.noiDung = 'Information cannot be left blank!!';
            }

            return errors;
        },

        onSubmit: (values) => {
            dispatch(postCommentAsyncThunkAction(values));
            console.log(values);
        }
    })

    const renderComment = () => {
        return commentByJob.map((element) => {
            const { avatar, id, noiDung, saoBinhLuan, tenNguoiBinhLuan } = element;

            return (
                <li className="row py-4" key={id}>
                    <div className="reviewer-avatar col-2">
                        <img
                            src={
                                avatar
                                    ? avatar
                                    : 'https://static.thenounproject.com/png/363639-200.png'
                            }
                            alt=""
                            className="rounded-circle"
                        />
                    </div>
                    <div className="comment-box col-10">
                        <div className="reviewer-name">{tenNguoiBinhLuan}</div>
                        <div className="reviewer-rating">
                            <Rate allowHalf disabled defaultValue={saoBinhLuan} />
                        </div>
                        <div className="country">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                                alt=""
                                className="country-flag"
                            />
                            <span>Vietnam</span>
                        </div>
                        <div className="comment-text">
                            <p>{noiDung}</p>
                        </div>
                        <div className="reviewer-action">
                            <span>Helpful?</span>
                            <div className="helpful-btn">
                                <div className="yes thumb-btn">
                                    <i className="fa-regular fa-thumbs-up" />
                                    <span>Yes</span>
                                </div>
                                <div className="no thumb-btn">
                                    <i className="fa-regular fa-thumbs-down" />
                                    <span>No</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            );
        });
    };

    return (
        <div className="job-detail-wrapper">
            <div className="container d-flex justify-content-between">
                <div className="col-7">
                    {/* {arrJobByName.congViec && <InfoJob Detail={arrJobByName} />} */}

                    {jobDetail.map((job) => (
                        <div className="job-detail-info">
                            <div className="detailed-job-information">
                                <p>{job.tenLoaiCongViec} <span> &gt; </span> {job.tenNhomChiTietLoai} <span> &gt; </span> {job.tenChiTietLoai}</p>
                            </div>
                            <h1 className="job-title">{job.congViec.tenCongViec}</h1>
                            <div
                                className="seller-overview d-flex flex-wrap align-items-center"
                                style={{ gap: '1rem' }}
                            >
                                <div className="seller-avatar">
                                    <img
                                        className="rounded-circle"
                                        width={70}
                                        src={job.avatar}
                                        alt="avatar"
                                    />
                                </div>
                                <div className="overview-content">
                                    <div className="top d-flex">
                                        <div className="seller-name">{job.tenNguoiTao}</div>
                                        <div className="seller-level">
                                            Level {job.congViec.saoCongViec} seller
                                        </div>
                                    </div>
                                    <div className="bottom d-flex">
                                        <div className="seller-rating d-flex align-items-center">
                                            <div className="star">
                                                <Rate
                                                    allowHalf
                                                    disabled
                                                    defaultValue={job.congViec.saoCongViec}
                                                />
                                            </div>
                                            <div className="star-score">{job.congViec.saoCongViec}</div>
                                            <div className="rating">({job.congViec.danhGia})</div>
                                        </div>
                                        <div className="seller-ordered">
                                            {job.congViec.saoCongViec} Order in Queue
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="job-img mt-3">
                                <img className="img-fluid w-100" src={job.congViec.hinhAnh} alt="" />
                            </div>
                            <div className="job-desc mt-5">
                                <h2 className="title-h2">About this gig</h2>
                                <p>{job.congViec.moTa}</p>
                            </div>
                            <div className="seller-info mt-5">
                                <h2 className="title-h2">About The Seller</h2>
                                <div className="seller-profile d-flex" style={{ gap: '1rem' }}>
                                    <div className="profile-img">
                                        <img className="w-100 rounded-circle" src={job.avatar} alt="" />
                                    </div>
                                    <div className="profile-content">
                                        <h3>{job.tenNguoiTao}</h3>
                                        <p>{job.tenChiTietLoai}</p>
                                        <div className="seller-rating d-flex align-items-center">
                                            <div className="star">
                                                <Rate
                                                    allowHalf
                                                    disabled
                                                    defaultValue={job.congViec.saoCongViec}
                                                />
                                            </div>
                                            <div className="star-score">{job.congViec.saoCongViec}</div>
                                            <div className="rating">({job.congViec.danhGia})</div>
                                        </div>
                                        <button>Contact me</button>
                                    </div>
                                </div>
                            </div>
                            <div className="FAQ mt-5">
                                <h2 className="title-h2">FAQ</h2>
                                <Collapse
                                    expandIconPosition="end"
                                    ghost
                                    items={[
                                        {
                                            key: '1',
                                            label: <h3>Do you provide regular updates on order?</h3>,
                                            children: <p>{collapseText}</p>,
                                        },
                                        {
                                            key: '2',
                                            label: (
                                                <h3>How do you guarantee product quality and reliability</h3>
                                            ),
                                            children: <p>{collapseText}</p>,
                                        },
                                        {
                                            key: '3',
                                            label: <h3>Do you give post-development support?</h3>,
                                            children: <p>{collapseText}</p>,
                                        },
                                        {
                                            key: '4',
                                            label: <h3>Do you convert PSD to HTML?</h3>,
                                            children: <p>{collapseText}</p>,
                                        },
                                    ]}
                                />
                            </div>
                            <div className="review-section mt-4">
                                <h2 className="title-h2">Reviews</h2>
                                <div className="review-overview d-flex justify-content-between align-items-center">
                                    <h3>{job.congViec.danhGia} reviews for this Gig</h3>
                                    <div className="star d-flex">
                                        <Rate allowHalf disabled defaultValue={job.congViec.saoCongViec} />
                                        <p className="star-score">{job.congViec.saoCongViec}</p>
                                    </div>
                                </div>
                                <div className="review-rating mt-3 row">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="rating-detail">
                                            <table>
                                                <tbody className="">
                                                    <tr>
                                                        <td>
                                                            <Rate allowHalf disabled defaultValue={5} />
                                                        </td>
                                                        <td className="rating-progress-bar text-center">
                                                            <Progress
                                                                style={{ width: 130 }}
                                                                percent={95}
                                                                showInfo={false}
                                                                size={'small'}
                                                            />
                                                        </td>
                                                        <td className="star-number">({job.congViec.danhGia - 1})</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <Rate allowHalf disabled defaultValue={4} />
                                                        </td>
                                                        <td className="rating-progress-bar text-center">
                                                            <Progress
                                                                style={{ width: 130 }}
                                                                percent={0}
                                                                showInfo={false}
                                                                size={'small'}
                                                            />
                                                        </td>
                                                        <td className="star-number">(0)</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <Rate allowHalf disabled defaultValue={3} />
                                                        </td>
                                                        <td className="rating-progress-bar text-center">
                                                            <Progress
                                                                style={{ width: 130 }}
                                                                percent={5}
                                                                showInfo={false}
                                                                size={'small'}
                                                            />
                                                        </td>
                                                        <td className="star-number">(1)</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <Rate allowHalf disabled defaultValue={2} />
                                                        </td>
                                                        <td className="rating-progress-bar text-center">
                                                            <Progress
                                                                style={{ width: 130 }}
                                                                percent={0}
                                                                showInfo={false}
                                                                size={'small'}
                                                            />
                                                        </td>
                                                        <td className="star-number">(0)</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <Rate allowHalf disabled defaultValue={1} />
                                                        </td>
                                                        <td className="rating-progress-bar text-center">
                                                            <Progress
                                                                style={{ width: 130 }}
                                                                percent={0}
                                                                showInfo={false}
                                                                size={'small'}
                                                            />
                                                        </td>
                                                        <td className="star-number">(0)</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="rating-breakdown">
                                            <h5>Rating Breakdown</h5>
                                            <ul>
                                                <li className="d-flex justify-content-between pb-2">
                                                    <p>Seller communication level</p>
                                                    <div className="d-flex">
                                                        <span className="star">
                                                            <i className="fa-solid fa-star" />
                                                        </span>
                                                        <span className="star-score">3</span>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between pb-2">
                                                    <p>Recommend to a friend</p>
                                                    <div className="d-flex">
                                                        <span className="star">
                                                            <i className="fa-solid fa-star" />
                                                        </span>
                                                        <span className="star-score">3</span>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between pb-2">
                                                    <p>Service as described</p>
                                                    <div className="d-flex">
                                                        <span className="star">
                                                            <i className="fa-solid fa-star" />
                                                        </span>
                                                        <span className="star-score">3</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-zone mt-5">
                                    <h2 className="title-h2">Filters</h2>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="sort-by d-flex align-items-center">
                                            <span>Sort By</span>
                                            <select name="" id="">
                                                <option value="recent">Most Recent</option>
                                                <option value="relevant">Most Relevant</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="review-comment">
                                    <ul className="review-comment-list">{renderComment()}</ul>
                                </div>
                                <div className="add-comment py-4">
                                    <form className="bottom" onSubmit={form.handleSubmit}>
                                        <div className="top mb-4 d-flex align-items-center justify-content-between">
                                            <h2 className="title-h2">Leave comments</h2>
                                            <div className="rating-comment d-flex align-items-center">
                                                <Rate allowHalf={false} defaultValue={form.values.saoBinhLuan} onChange={handleRate} />
                                                <h2 className="title-h2">Rating</h2>
                                            </div>
                                        </div>
                                        <input type="text" onBlur={form.handleBlur} className={`form-control ${form.errors.noiDung && form.touched.noiDung ? 'is-invalid' : ''}`} id='comment' name='noiDung' placeholder='comment...' onChange={form.handleChange} />
                                        {form.errors.noiDung && form.touched.noiDung && (
                                            <div className="invalid-feedback" style={{ color: 'red' }}>
                                                {form.errors.noiDung}
                                            </div>
                                        )}
                                        <button type="submit" className="comment-btn">
                                            Comment
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-5">
                    <CheckOut />
                </div>
            </div>
        </div>
    )
}

export default Detail