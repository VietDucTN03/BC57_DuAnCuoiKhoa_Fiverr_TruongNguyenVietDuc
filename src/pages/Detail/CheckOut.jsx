import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getJobDetailByIAsyncThunkDAPI, hireJobAPI, hireJobAsyncThunkAction } from '../../redux/reducers/JobReducer';
import { Tabs } from 'antd';

import '../../assets/scss/pages/Detail/checkOut.scss'
import { getUserByIDAPI } from '../../redux/reducers/UserReducer';
import { history } from '../../index';
import dayjs from 'dayjs';

const CheckOut = () => {

  const userId = localStorage.getItem('userId');
  const params = useParams();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userReducer.userProfile);
  const jobDetail = useSelector((state) => state.jobReducer.jobDetail);
  console.log(jobDetail);

  useEffect(() => {
    dispatch(getJobDetailByIAsyncThunkDAPI(params.id))
  }, [dispatch, params.id]);

  const handleHireJob = async () => {
    if (userId) {
      const body = {
        maCongViec: params.id,
        maNguoiThue: userId,
        ngayThue: dayjs().format('DD/MM/YYYY'),
        hoanThanh: false,
      }
      dispatch(hireJobAsyncThunkAction(body))
        .then((res) => {
          console.log(res);
          alert("Hire job successful!!");
          history.push('/profile');
        })
        .catch((error) => {
          console.log(error);
          // Xử lý lỗi khi hire job không thành công
        });
    } else {
      alert('Login to visit this page!');
      history.push('/login');
    }
  }

  const tabItems = [
    {
      key: '1',
      label: 'Basic',
      children: (
        <div className="">
          {jobDetail.map((job) => {
            return <div className="box-body">
              <div className="box-content">
                <div className="price d-flex align-items-center justify-content-between">
                  <span>Basic</span>
                  <span>${job.congViec.giaTien}</span>
                </div>
                <p className="short-desc">{job.congViec.moTaNgan}</p>
                <div className="additional-info d-flex justify-content-around mb-3">
                  <div className="delivery">
                    <i className="fa-regular fa-clock" />
                    <span>14 Days Delivery</span>
                  </div>
                  <div className="revision">
                    <i className="fa-solid fa-rotate" />
                    <span>Unlimited Revisions</span>
                  </div>
                </div>
                <ul className="feature mb-3">
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Design Customization</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Content Upload</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Responsive Design</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Include Source Code</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>1 Page</span>
                  </li>
                </ul>
                <div className="action">
                  <button className="checkout-btn" onClick={handleHireJob}>
                    Continue (${job.congViec.giaTien})
                  </button>
                  <p>Compare Packages</p>
                </div>
              </div>
            </div>
          })}
        </div>
      )
    },
    {
      key: '2',
      label: 'Standard',
      children: (
        <div className="">
          {jobDetail.map((job) => {
            return <div className="box-body">
              <div className="box-content">
                <div className="price d-flex align-items-center justify-content-between">
                  <span>Standard</span>
                  <span>$1000</span>
                </div>
                <p className="short-desc">{job.congViec.moTaNgan}</p>
                <div className="additional-info d-flex justify-content-around mb-3">
                  <div className="delivery">
                    <i className="fa-regular fa-clock" />
                    <span>14 Days Delivery</span>
                  </div>
                  <div className="revision">
                    <i className="fa-solid fa-rotate" />
                    <span>Unlimited Revisions</span>
                  </div>
                </div>
                <ul className="feature mb-3">
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Design Customization</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Content Upload</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Responsive Design</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Include Source Code</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>1 Page</span>
                  </li>
                </ul>
                <div className="action">
                  <button className="checkout-btn">
                    Continue ($1000)
                  </button>
                  <p>Compare Packages</p>
                </div>
              </div>
            </div>
          })}
        </div>
      ),
    },
    {
      key: '3',
      label: 'Premium',
      children: (
        <div className="">
          {jobDetail.map((job) => {
            return <div className="box-body">
              <div className="box-content">
                <div className="price d-flex align-items-center justify-content-between">
                  <span>Premium</span>
                  <span>$2500</span>
                </div>
                <p className="short-desc">{job.congViec.moTaNgan}</p>
                <div className="additional-info d-flex justify-content-around mb-3">
                  <div className="delivery">
                    <i className="fa-regular fa-clock" />
                    <span>14 Days Delivery</span>
                  </div>
                  <div className="revision">
                    <i className="fa-solid fa-rotate" />
                    <span>Unlimited Revisions</span>
                  </div>
                </div>
                <ul className="feature mb-3">
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Design Customization</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Content Upload</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Responsive Design</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>Include Source Code</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <span>1 Page</span>
                  </li>
                </ul>
                <div className="action">
                  <button className="checkout-btn">
                    Continue ($2500)
                  </button>
                  <p>Compare Packages</p>
                </div>
              </div>
            </div>
          })}
        </div>
      ),
    }
  ]

  return (
    <div>
      <div className="check-out-box">
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>
    </div>
  )
}

export default CheckOut
