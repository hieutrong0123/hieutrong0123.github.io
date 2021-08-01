import React, { Component } from "react";
import Cookies from "js-cookie";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import loginservice_json from "src/service/loginservice_json";
import jwt_decode from "jwt-decode";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      rememberme: true,
      history: ""
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
    } else {
      const data = {
        email: this.state.email,
        password: this.state.password,
        rememberme: this.state.rememberme
      };
      loginservice_json
        .login(data)
        .then(res => {
          if (res.data.isSuccessed) {
            Cookies.set("Token", res.data.resultObj);
            let tokenDecode = jwt_decode(res.data.resultObj);
            let Role = "";
            Object.keys(tokenDecode).forEach(function(key) {
              let res = key.split("/");
              if (res.length > 1) {
                if (res[res.length - 1] === "role") {
                  Role = tokenDecode[key];
                }
              }
            });

            if (Role === "Admin" || Role === "Emp") {
              window.location.href = "/";
            } else {
              alert("Email hoặc mật khẩu không đúng");
            }
          } else {
            alert(res.data.message);
          }
        })
        .catch(err =>alert("Máy chủ đang bận, vui lòng thử lại sau"));
        // .catch(err => console.log(err));
    }
  }

  componentDidMount() {
    if (this.checkRole()) this.props.history.push("/");
  }
  tokenDecode = () => {
    let Role = null;
    const token = Cookies.get("Token");
    if (token !== null && token !== undefined) {
      let tokenDecode = jwt_decode(token);
      Object.keys(tokenDecode).forEach(function(key) {
        let res = key.split("/");
        if (res.length > 1) {
          if (res[res.length - 1] === "role") {
            Role = tokenDecode[key];
          }
        }
      });
    }
    return Role;
  };

  checkRole = () => {
    const CheckRole = this.tokenDecode();
    if (Cookies.get("Token") === null) return false;
    if (Cookies.get(".AspNetCore.Session") === null) return false;
    return "Admin" === CheckRole || "Emp" === CheckRole;
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="4">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Đăng nhập</h1>
                      <p className="text-muted">
                        Đăng nhập vào tài khoản của bạn
                      </p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Email"
                          autoComplete="Email"
                          name="email"
                          value={email}
                          onChange={this.changeHandler}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          value={password}
                          onChange={this.changeHandler}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="7">
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={() => this.submitHandler()}
                          >
                            Đăng nhập
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;
