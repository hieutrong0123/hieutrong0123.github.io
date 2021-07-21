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
  CFormText,
  CInput,
  CInputRadio,
  CLabel,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import userservice_json from "src/service/userservice_json";

class UserCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      firstMiddleName: "",
      lastName: "",
      birthday: "2000-01-01",
      gender: 0,
      address: "",
      phoneNumber: "",
      userInRole: "User"
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  changeHandler = e => {
    if (e.target.name === "gender") {
      this.setState({ gender: Number(e.target.value) });
    } else if (e.target.name === "status") {
      this.setState({ status: Number(e.target.value) });
    } else if (e.target.name === "email") {
      this.setState({ email: e.target.value });
      this.setState({ userName: e.target.value });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  cancel() {
    this.props.history.push("/users");
  }

  validateEmail(email) {
    if (
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
        email
      )
    ) {
      return true;
    }
    return false;
  }

  validatePasword(password) {
    if (
      /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,30}$/.test(password)
    ) {
      return true;
    }
    return false;
  }

  submitHandler() {
    if (!this.validateEmail(this.state.email)) {
      alert("Email không đúng định dạng");
    } else if (!this.validatePasword(this.state.password)) {
      alert(
        "Mật khẩu không đúng định dạng. Vui lòng nhập mật khẩu có 8-30 ký tự với các ký tự, số, 1 chữ hoa và các ký tự đặc biệt"
      );
    } else if (this.state.password !== this.state.confirmPassword) {
      alert("Mật khẩu không khớp, vui lòng thử lại");
    } else if (!this.state.birthday) {
      alert("Sinh nhật không đúng định dạng");
    } 
    else if (!this.state.phoneNumber) {
      alert("Số điện thoại không đúng định dạng");
    } 
    else if (!this.state.userInRole) {
      alert("Chưa phân quyền người dùng");
    } else {
      const data = {
        userName: this.state.userName,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        firstMiddleName: this.state.firstMiddleName,
        email: this.state.email,
        lastName: this.state.lastName,
        birthday: this.state.birthday,
        gender: this.state.gender,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        userInRole: this.state.userInRole
      };
      console.log(data);
      userservice_json
        .create(data)
        .then(res => {
          if (res.data.isSuccessed) {
            alert(res.data.resultObj);
          } else {
            alert(res.data.message);
          }
        })
        .catch(err =>alert("Máy chủ đang bận, vui lòng thử lại sau"));
    }
  }
  render() {
    return (
      <>
        <CRow>
          <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Thêm người dùng
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Email *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Tài khoản *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="userName"
                        placeholder="Tài khoản"
                        value={this.state.userName}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="password-input">Mật khẩu *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        autoComplete="new-password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                      />
                      <CFormText className="help-block">
                        Vui lòng nhập mật khẩu có 8-30 ký tự với số, chữ hoa,
                        chữ thường và ký tự đặc biệt
                      </CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="password-input">
                        Xác nhận mật khẩu *
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        autoComplete="new-password"
                        value={this.state.confirmPassword}
                        onChange={this.changeHandler}
                      />
                      <CFormText className="help-block">
                        Vui lòng nhập lại mật khẩu
                      </CFormText>
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
                      <CLabel htmlFor="date-input">Sinh nhật *</CLabel>
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
                      <CLabel>Giới tính *</CLabel>
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
                      <CLabel htmlFor="text-input">Số điện thoại *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                       type="number"
                        name="phoneNumber"
                        placeholder="Số điện thoại"
                        value={this.state.phoneNumber}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Phân quyền *</CLabel>
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
                  <CIcon name="cil-scrubber" /> Thêm
                </CButton>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <CButton size="sm" color="secondary" onClick={() => this.cancel()}>
                <CIcon name="cil-home" />
                  Huỷ bỏ và trở về danh sách
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default UserCreate;
