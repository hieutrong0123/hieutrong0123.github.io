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
  CLabel,
  CSelect,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import categoryservice_json from "src/service/categoryservice_json";
import producttypeservice_json from "src/service/producttypeservice_json";

class CategoryCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      alias: "",
      rootId: "",
      productTypeId: 1,
      categoryList: null,
      producttypeList: null
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  changeHandler = e => {
    if (e.target.name === "productTypeId") {
      this.setState({ productTypeId: Number(e.target.value) });
      console.log(this.state.productTypeId);
      console.log(typeof this.state.productTypeId);
    } else if (e.target.name === "name") {
      this.setState({ name: e.target.value });
      this.setState({ alias: this.to_slug(e.target.value) });
      console.log(this.state.alias);
    } else {
      this.setState({ [e.target.name]: e.target.value });
      console.log(e.target.value);
    }
  };

  to_slug(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();
    // xoá dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");
    // Xoá ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, "");
    // Xoá khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, "-");
    // xoá phần dự - ở đầu
    str = str.replace(/^-+/g, "");
    // xoá phần dư - ở cuối
    str = str.replace(/-+$/g, "");
    // return
    return str;
  }

  cancel() {
    this.props.history.push("/categories");
  }

  submitHandler() {
    const data = {
      name: this.state.name,
      alias: this.state.alias,
      rootId: this.state.rootId,
      productTypeId: this.state.productTypeId
    };
    console.log(data);
    categoryservice_json
      .create(data)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  loadData() {
    categoryservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ categoryList: res.data.resultObj });
          console.log(this.state.categoryList);
        } else {
          alert(res.dat.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
    producttypeservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ producttypeList: res.data.resultObj });
          console.log(this.state.producttypeList);
        } else {
          alert(res.dat.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }
  render() {
    return (
      <>
        <CRow>
          <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Thêm danh mục
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Tên danh mục *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="name"
                        placeholder="Tên danh mục"
                        value={this.state.name}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Bí danh *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="alias"
                        placeholder="Bí danh"
                        value={this.state.alias}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Danh mục gốc *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.categoryList === null ? (
                        <h3>Đang tải</h3>
                      ) : (
                        <CSelect name="rootId" onChange={this.changeHandler}>
                          <option
                            key={Number(0)}
                            value=""
                            selected={this.state.rootId === null}
                          >
                            Lựa chọn
                          </option>
                          {this.state.categoryList.map(item => {
                            return (
                              <option
                                value={item.id}
                                selected={this.state.rootId === item.id}
                                key={item.id}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </CSelect>
                      )}
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Loại sản phẩm *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.producttypeList === null ? (
                        <h3>Đang tải</h3>
                      ) : (
                        <CSelect
                          name="productTypeId"
                          onChange={this.changeHandler}
                        >
                          <option
                            key={Number(0)}
                            value=""
                            selected={this.state.productTypeId === null}
                          >
                            Lựa chọn
                          </option>
                          {this.state.producttypeList.map(item => {
                            return (
                              <option
                                value={item.id}
                                selected={this.state.productTypeId === item.id}
                                key={item.id}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </CSelect>
                      )}
                    </CCol>
                  </CFormGroup>

                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Loại sản phẩm</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="1"
                          name="productTypeId"
                          onChange={this.changeHandler}
                          value={Number(1)}
                          checked={this.state.productTypeId === 1}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="1">
                        Laptop - Thiết bị IT
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="2"
                          name="productTypeId"
                          onChange={this.changeHandler}
                          value={Number(2)}
                          checked={this.state.productTypeId === 2}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="2">
                        Điện Thoại - Máy tính bảng
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup> */}
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
                <CButton
                  size="sm"
                  color="secondary"
                  onClick={() => this.cancel()}
                >
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

export default CategoryCreate;
