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
import userservice_json from "src/service/userservice_json";

class UserDetails extends Component {
  //state = { list: null }
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
  };

  changeHandler = e => {
    //Do Nothing
  };

  cancel() {
    this.props.history.push("/users");
  };

  edit() {
    this.props.history.push(`/users/edit/${this.state.id}`);
  };

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
      .catch(err =>alert("M??y ch??? ??ang b???n, vui l??ng th??? l???i sau"));
  };

  render() {
    return this.state.loading === true ? (
      <h1>??ang t???i d??? li???u vui v??ng ch??? trong gi??y l??t</h1>
    ) : (
      <CRow>
        <CCol xs="12" md="10">
          <CCard>
            <CCardHeader>
              Chi ti???t ng?????i d??ng
              <small></small>
            </CCardHeader>
            <CCardBody>
              <CForm encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">M?? ng?????i d??ng</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="id"
                      placeholder="M?? ng?????i d??ng"
                      value={this.state.id}
                      onChange={this.changeHandler}
                      disabled
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">T??i kho???n</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="userName"
                      placeholder="T??i kho???n"
                      value={this.state.userName}
                      onChange={this.changeHandler}
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
                    />
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="date-input">Sinh nh???t</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="date"
                        name="birthday"
                        disabled
                        placeholder="Sinh nh???t"
                        value={this.state.birthday}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">H??? v?? t??n l??t</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="firstMiddleName"
                      placeholder="H??? v?? t??n l??t"
                      value={this.state.firstMiddleName}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">T??n</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="lastName"
                      placeholder="T??n"
                      value={this.state.lastName}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>                

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">S??? ??i???n tho???i</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="phoneNumber"
                      placeholder="S??? ??i???n tho???i"
                      value={this.state.phoneNumber}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Gi???i t??nh</CLabel>
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
                        N???
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">?????a ch???</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="address"
                      placeholder="?????a ch???"
                      value={this.state.address}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Tr???ng th??i</CLabel>
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
                        K??ch ho???t
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
                        Kho??
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
                        ???? xo??
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Ph??n quy???n</CLabel>
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
                        Qu???n tr??? vi??n
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
                        Nh??n vi??n
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
                        Ng?????i d??ng
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton size="sm" color="primary" onClick={() => this.edit()}>
                <CIcon name="cil-scrubber" /> C???p nh???t
              </CButton>
              &nbsp;&nbsp;&nbsp;
              <CButton
                size="sm"
                color="dark"
                onClick={() => this.cancel()}
              >
                <CIcon name="cil-home" />
                Tr??? v??? danh s??ch
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}

export default UserDetails;
