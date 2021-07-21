import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputRadio,
  CLabel,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Number } from "core-js";
import userservice_json from "src/service/userservice_json";

class UserEdit extends Component {
  state = {
    id: "",
    userName: "",
    email: "",
    birthday: "",
    firstMiddleName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    address: "",
    status: "",
    userInRole: "",
    loading: true
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    userservice_json
      .getbyId(this.props.match.params.id)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            if (res.data.resultObj.birthday === "0001-01-01T00:00:00") {
              this.setState({
                birthday: ""
              });
            } else {
              this.setState({
                birthday: res.data.resultObj.birthday.substring(0, 10)
              });
            }
            this.setState({
              id: res.data.resultObj.id,
              userName: res.data.resultObj.userName,
              email: res.data.resultObj.email,
              firstMiddleName: res.data.resultObj.firstMiddleName,
              lastName: res.data.resultObj.lastName,
              phoneNumber: res.data.resultObj.phoneNumber,
              gender: res.data.resultObj.gender,
              address: res.data.resultObj.address,
              status: res.data.resultObj.status,
              userInRole: res.data.resultObj.userInRole,
              loading: false
            });
          }
          console.log(res);
          console.log(this.state);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err =>alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  changeHandler = e => {
    if (e.target.name === "gender") {
      this.setState({ gender: Number(e.target.value) });
      console.log(this.state.gender);
      console.log(typeof this.state.gender);
    } else if (e.target.name === "status") {
      this.setState({ status: Number(e.target.value) });
      console.log(this.state.status);
      console.log(typeof this.state.status);
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  cancel() {
    this.props.history.push(`/users`);
  }

  submitHandler() {
    const data = {
      id: this.state.id,
      firstMiddleName: this.state.firstMiddleName,
      lastName: this.state.lastName,
      birthday: this.state.birthday,
      gender: this.state.gender,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      status: this.state.status,
      userInRole: this.state.userInRole
    };
    console.log(data);
    userservice_json
      .updatebyId(data)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err =>alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  render() {
    return this.state.loading === true ? (
      <h1>Đang tải dữ liệu vui vòng chờ trong giây lát</h1>
    ) : (
      <CRow>
        <CCol xs="12" md="10">
          <CCard>
            <CCardHeader>
              Cập nhật người dùng
              <small></small>
            </CCardHeader>
            <CCardBody>
              <CForm encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Mã người dùng</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="id"
                      placeholder="Mã người dùng"
                      value={this.state.id}
                      onChange={this.changeHandler}
                      disabled
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Tài khoản</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="userName"
                      placeholder="Tài khoản"
                      value={this.state.userName}
                      onChange={this.changeHandler}
                      disabled
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={this.state.email}
                      onChange={this.changeHandler}
                      disabled
                    />
                  </CCol>
                </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="date-input">Sinh nhật</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="date"
                        name="birthday"
                        placeholder="Sinh nhật"
                        value={this.state.birthday}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Họ và tên lót</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="firstMiddleName"
                      placeholder="Họ và tên lót"
                      value={this.state.firstMiddleName}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Tên</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="lastName"
                      placeholder="Tên"
                      value={this.state.lastName}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Số điện thoại</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="phoneNumber"
                      placeholder="Số điện thoại"
                      value={this.state.phoneNumber}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Giới tính</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Male"
                        name="gender"
                        onChange={this.changeHandler}
                        value={Number(0)}
                        checked={this.state.gender === 0}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Male">
                        Nam
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Female"
                        name="gender"
                        onChange={this.changeHandler}
                        value={Number(1)}
                        checked={this.state.gender === 1}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Female">
                        Nữ
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Địa chỉ</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="address"
                      placeholder="Địa chỉ"
                      value={this.state.address}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Trạng thái</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Active"
                        name="status"
                        onChange={this.changeHandler}
                        value={Number(0)}
                        checked={this.state.status === 0}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Active">
                        Kích hoạt
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Disable"
                        name="status"
                        onChange={this.changeHandler}
                        value={Number(1)}
                        checked={this.state.status === 1}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Disable">
                        Khoá
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Delete"
                        name="status"
                        onChange={this.changeHandler}
                        value={Number(2)}
                        checked={this.state.status === 2}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Delete">
                        Đã xoá
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Phân quyền</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Admin"
                        name="userInRole"
                        onChange={this.changeHandler}
                        value="Admin"
                        checked={this.state.userInRole === "Admin"}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Admin">
                        Quản trị viên
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Employee"
                        name="userInRole"
                        onChange={this.changeHandler}
                        value="Employee"
                        checked={this.state.userInRole === "Employee"}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Employee">
                        Nhân viên
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="User"
                        name="userInRole"
                        onChange={this.changeHandler}
                        value="User"
                        checked={this.state.userInRole === "User"}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="User">
                        Người dùng
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton
                size="sm"
                color="primary"
                onClick={() => this.submitHandler()}
              >
                <CIcon name="cil-scrubber" /> Cập nhật
              </CButton>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <CButton color="dark" onClick={() => this.cancel()}>
                <CIcon name="cil-home" />
                Huỷ và trở về danh sách
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}

export default UserEdit;
