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
  CTextarea,
  CInput,
  CInputRadio,
  CLabel,
  CSelect,
  CRow,
  CImg,
  CDataTable,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from "@coreui/react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import productservice_json from "src/service/productservice_json";
import categoryservice_json from "src/service/categoryservice_json";

import { CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import productphotoservice_json from "src/service/productphotoservice_json";

class ProductDetails extends Component {
  state = {
    id: "",
    name: "",
    price: "",
    specifications: "",
    description: "",
    goodsReceipt: "",
    inventory: "",
    status: "",
    categoryId: "",
    alias: "",
    createdDate: "",
    modifiedDate: null,
    createdBy: "",
    modifiedBy: null,
    productPhotos: [],
    categoryList: null,
    list: null,
    loading: true,
    toggleDelete: false,
    idPhoto: null
  };

  escFunction = this.escFunction.bind(this);

  componentDidMount() {
    this.loadData();
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  changeHandler = e => {
    //Do Nothing
  };

  cancel() {
    this.props.history.push("/products");
  }

  edit() {
    this.props.history.push(`/products/edit/${this.state.id}`);
  }

  deletePhoto() {
    console.log(this.state.idPhoto);
    this.setState({ toggleDelete: false });
    productphotoservice_json
      .deletebyId(this.state.idPhoto)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
          // window.location.reload();
          this.refresh();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err =>alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  refresh()
  {
    var url = window.location.pathname;
    this.props.history.push(`/`);
    this.props.history.push(url);
  }

  toggleDelete = idPhoto => {
    this.setState({ toggleDelete: true, idPhoto: idPhoto });
  };

  escFunction(event) {
    if (event.keyCode === 27) {
      this.setState({ toggleDelete: false });
    }
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
      .catch(err =>alert("Máy chủ đang bận, vui lòng thử lại sau"));

    productservice_json
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
              price: res.data.resultObj.price,
              specifications: res.data.resultObj.specifications,
              description: res.data.resultObj.description,
              goodsReceipt: res.data.resultObj.goodsReceipt,
              inventory: res.data.resultObj.inventory,
              status: res.data.resultObj.status,
              categoryId: res.data.resultObj.categoryId,
              alias: res.data.resultObj.alias,
              createdDate: res.data.resultObj.createdDate.substring(0, 10),
              createdBy: res.data.resultObj.createdBy,
              modifiedBy: res.data.resultObj.modifiedBy,
              productPhotos: res.data.resultObj.productPhotos,
              list: res.data.resultObj.productPhotos,
              loading: false
            });
          }
          console.log(this.state.list);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err =>alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  render() {
    const fields = [
      { key: "id", label: "Mã hình ảnh" },
      { key: "url", label: "Hình ảnh" },
      { key: "link", label: "Tuỳ chọn" }
    ];
    return this.state.loading === true ? (
      <h1>Đang tải dữ liệu vui vòng chờ trong giây lát</h1>
    ) : (
      <>
        <CRow>
          <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Chi tiết sản phẩm
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Mã sản phẩm</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="id"
                        placeholder="Mã sản phẩm"
                        value={this.state.id}
                        onChange={this.changeHandler}
                        disabled
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Tên sản phẩm</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="name"
                        placeholder="Tên sản phẩm"
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
                      <CLabel htmlFor="select">Danh mục</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.categoryList === null ? (
                        <h3>Đang tải</h3>
                      ) : (
                        <CSelect
                          name="categoryId"
                          onChange={this.changeHandler}
                          disabled
                        >
                          <option
                            key={Number(0)}
                            value=""
                            selected={this.state.categoryId === ""}
                          >
                            Lựa chọn
                          </option>
                          {this.state.categoryList.map(item => {
                            return (
                              <option
                                value={item.id}
                                selected={this.state.categoryId === item.id}
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
                      <CLabel htmlFor="text-input">Giá bán</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="price"
                        placeholder="Giá bán"
                        value={this.state.price}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">
                        Thông số kỹ thuật
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CKEditor
                      disabled
                      editor = {ClassicEditor}
                      data = {this.state.specifications}
                      onChange = {(e, editor) => {
                        this.setState({specifications: editor.getData()})
                      }}
                      />
                      {/* &nbsp;
                      <CTextarea
                        name="specifications"
                        rows="3"
                        placeholder="Thông số kỹ thuật"
                        value={this.state.specifications}
                        onChange={this.changeHandler}
                      /> */}
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Mô tả</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        name="description"
                        rows="3"
                        placeholder="Mô tả"
                        value={this.state.description}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Số lượng nhập</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="goodsReceipt"
                        placeholder="Số lượng nhập"
                        value={this.state.goodsReceipt}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Số lượng tồn</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="inventory"
                        placeholder="Số lượng tồn"
                        value={this.state.inventory}
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
                          id="0"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(0)}
                          checked={this.state.status === 0}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="0">
                          Mặc định
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="1"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(1)}
                          checked={this.state.status === 1}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="1">
                          Hàng mới về
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="2"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(2)}
                          checked={this.state.status === 2}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="2">
                          Đã khoá
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="3"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(3)}
                          checked={this.state.status === 3}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="3">
                          Đã xoá
                        </CLabel>
                      </CFormGroup>
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
                        disabled
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
                          placeholder="ModifiedDate"
                          disabled
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
                      <CLabel htmlFor="text-input">Hình ảnh</CLabel>
                    </CCol>
                    <CCol xs="12" md="9" align="center">
                      <CDataTable
                        items={this.state.list}
                        fields={fields}
                        // tableFilter
                        // itemsPerPageSelect
                        // itemsPerPage={5}
                        hover
                        // pagination
                        scopedSlots={{
                          url: item => {
                            return (
                              <td>
                                <CImg src={item.url} width="250px" />
                              </td>
                            );
                          },
                          link: item => {
                            return (
                              <td>
                                <CButton
                                  size="sm"
                                  color="danger"
                                  onClick={() => this.toggleDelete(item.id)}
                                >
                                  <CIcon name="cil-ban" /> Xoá
                                </CButton>
                                &nbsp;&nbsp;&nbsp;
                              </td>
                            );
                          }
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton size="sm" color="primary" onClick={() => this.edit()}>
                  <CIcon name="cil-settings" /> Cập nhật
                </CButton>
                &nbsp;&nbsp;&nbsp;                
                <Link
                  to={{
                    pathname: `/productphotos/create`,
                    productId: this.state.id
                  }}
                >
                  <CButton color="success" size="sm">
                    <CIcon name="cil-scrubber" />
                    Thêm hình ảnh
                  </CButton>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link
                  to={{
                    pathname: `/products/inventory`,
                    productId: this.state.id
                  }}
                >
                  <CButton color="info" size="sm">
                    <CIcon name="cil-star" />
                    Nhập sản phẩm
                  </CButton>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <CButton color="dark" size="sm" onClick={() => this.cancel()}>
                  <CIcon name="cil-home" />
                  Trở về danh sách
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>

        <CModal show={this.state.toggleDelete}>
          <CModalHeader>Dừng lại!</CModalHeader>
          <CModalBody>Hình ảnh #{this.state.idPhoto} sẽ bị xoá</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.deletePhoto()}>
              Đồng ý
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                this.setState({ toggleDelete: false });
              }}
            >
              Huỷ
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  }
}

export default ProductDetails;
