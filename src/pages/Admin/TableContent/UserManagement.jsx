import React, { useEffect, useState } from 'react';
import '../../../assets/scss/pages/Admin/userManagement.scss'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAsyncThunkAction, getAllUserAsyncThunkAction } from '../../../redux/reducers/UserReducer';

export default function UserManagement() {

  const dispatch = useDispatch();
  const arrUser = useSelector((state) => state.userReducer.arrUser);
  // console.log(arrUser);
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = async () => {
    // setHasSearched(true);
    // if (!searchValue.trim()) {
    //   setSearchResults([]);
    //   return;
    // }
    // try {
    //   const result = await userService.searchUserApi(searchValue);
    //   if (result.data.statusCode === 200) {
    //     setSearchResults(result.data.content);
    //   } else {
    //     console.error("Có lỗi khi lấy kết quả search:", result.data);
    //   }
    // } catch (error) {
    //   console.error("Có lỗi khi call api search", error);
    // }
  };

  useEffect(() => {
    dispatch(getAllUserAsyncThunkAction());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this job?');
    if (confirmed) {
      dispatch(deleteUserAsyncThunkAction(id))
        .then(() => {
          // Refresh the list of hired jobs after deletion
          dispatch(getAllUserAsyncThunkAction());
          alert('Delete Successfull!!')
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
      width: 150,
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
          <button className='btn button-edit border-0 shadow'>EDIT</button>
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
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  return (
    <div className='container'>
      <h2 className='title'>
        QUẢN LÝ NGƯỜI DÙNG
      </h2>
      {/* Phan tab menu */}
      {/* <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <span
            className="nav-link active"
            role="tab"
            data-toggle="tab"
            style={{ fontWeight: 800 }}
          >
            Danh Sách Người Dùng
          </span>
        </li>
      </ul> */}
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
              data-toggle="modal"
              data-target="#myModal"
            // onClick={resetModalState}
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
                  // onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <div className="col-1">
                  <button className="btn btn-danger" onClick={handleSearch}>
                    Tìm
                  </button>
                </div>
                <div className="col-2">
                  {/* {hasSearched && (
                    <button
                      className="btn btn-primary"
                      onClick={handleShowAll}
                    >
                      Xem tất cả
                    </button>
                  )} */}
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
            dataSource={arrUser}
            scroll={{
              x: 1500,
              y: 300,
            }}
          />
          {/**hiển thị next previous trong ul này */}

        </div>
        <br />
      </div>
    </div>
  )
}
