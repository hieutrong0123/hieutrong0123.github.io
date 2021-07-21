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

class CategoryDetails extends Component {
  state = {
    id: "",
    name: "",
    alias: "",
    rootId: "",
    createdDate: "",
    modifiedDate: "",
    createdBy: "",
    modifiedBy: "",
    productTypeId: "",
    productTypeName: "",
    categoryList: null,
    loading: true
  };

  componentDidMount() {
    this.loadData();
  }

  changeHandler = e => {
    //Do Nothing
  };

  cancel() {
    this.props.history.push("/categories");
  }

  edit() {
    this.props.history.push(`/categories/edit/${this.state.id}`);
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
    categoryservice_json
      .getbyId(this.props.match.params.id)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            if (res.data.resultObj.modifiedDate !== null) {
              this.setState({
                modifiedDate: res.data.resultObj.modifiedDate.substring(0, 10)
              });
            } else {
              this.setState({
                modifiedDate: res.data.resultObj.modifiedDate
              });
            }
            this.setState({
              id: res.data.resultObj.id,
              name: res.data.resultObj.name,
              alias: res.data.resultObj.alias,
              productTypeId: res.data.resultObj.productTypeId,
              rootId: res.data.resultObj.rootId,
              productTypeName: res.data.resultObj.productType,
              createdDate: res.data.resultObj.createdDate.substring(0, 10),
              createdBy: res.data.resultObj.createdBy,
              modifiedBy: res.data.resultObj.modifiedBy
            });
            this.loadProductType();
          }
          console.log(res);
          console.log(this.state);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }
  loadProductType() {
    producttypeservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({
            producttypeList: res.data.resultObj,
            loading: false
          });
          console.log(this.state.producttypeList);
        } else {
          alert(res.dat.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  render() {
    return this.state.loading === true ? (
      <h1>Đang tải dữ liệu vui vòng chờ trong giây lát</h1>
    ) : (
      <>
        <CRow>
          <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Chi tiết danh mục
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Mã danh mục</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="id"
                        placeholder="Mã danh mục"
                        value={this.state.id}
                        onChange={this.changeHandler}
                        disabled
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Tên danh mục</CLabel>
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
                      <CLabel htmlFor="text-input">Bí danh</CLabel>
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
                      <CLabel htmlFor="select">Danh mục gốc</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.categoryList === null ? (
                        <h3>Đang tải</h3>
                      ) : (
                        <CSelect
                          name="rootId"
                          onChange={this.changeHandler}
                          disabled
                        >
                          <option
                            key={Number(0)}
                            value=""
                            selected={this.state.rootId === ""}
                          >
                            Lựa chọn
                          </option>
                          {this.state.categoryList.map(item => {
                            if (item.rootId === null) {
                              return (
                                <option
                                  value={item.id}
                                  selected={this.state.rootId === item.id}
                                  key={item.id}
                                >
                                  {item.name}
                                </option>
                              );
                            } else {
                              return <></>;
                            }
                          })}
                        </CSelect>
                      )}
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="date-input">Ngày tạo</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="date"
                        name="createdDate"
                        placeholder="Ngày tạo"
                        value={this.state.createdDate}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  {this.state.modifiedDate !== null ? (
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="date-input">Ngày cập nhật</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          type="date"
                          name="modifiedDate"
                          placeholder="Ngày cập nhật"
                          value={this.state.modifiedDate}
                          onChange={this.changeHandler}
                        />
                      </CCol>
                    </CFormGroup>
                  ) : null}

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Người tạo</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="createdBy"
                        placeholder="Người tạo"
                        value={this.state.createdBy}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  {this.state.modifiedBy !== null ? (
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Người cập nhật</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          name="modifiedBy"
                          placeholder="Người cập nhật"
                          value={this.state.modifiedBy}
                          onChange={this.changeHandler}
                        />
                      </CCol>
                    </CFormGroup>
                  ) : null}

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Loại sản phẩm</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.producttypeList === null ? (
                        <h3>Đang tải</h3>
                      ) : (
                        <CSelect
                          name="productTypeId"
                          onChange={this.changeHandler}
                          disabled
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
                        value = {Number(1)}
                        checked={this.state.productTypeId === 1}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="1">
                      Laptop - Thiết bị IT
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Laptop"
                        name="productTypeId"
                        onChange={this.changeHandler}
                        value={Number(2)}
                        checked={this.state.productTypeId === 2}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Laptop">
                      Điện Thoại - Máy tính bảng
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>                   */}
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton size="sm" color="primary" onClick={() => this.edit()}>
                  <CIcon name="cil-scrubber" /> Cập nhật
                </CButton>
                &nbsp;&nbsp;&nbsp;
                <CButton size="sm" color="dark" onClick={() => this.cancel()}>
                  <CIcon name="cil-home" />
                  Trở về danh sách
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default CategoryDetails;
