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
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import productservice_json from "src/service/productservice_json";
import categoryservice_json from "src/service/categoryservice_json";

import { CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class ProductEdit extends Component {
  //state = { list: null }
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
    loading: true
  };

  componentDidMount() {
    this.loadData();
  }

  changeHandler = e => {
    if (e.target.name === "thumbnailImages") {
      let arr = e.target.files;
      console.log(arr);
      this.setState({ thumbnailImages: e.target.files[0] }, () =>
        console.log(this.state.thumbnailImages)
      );
    } else if (e.target.name === "status") {
      this.setState({ status: Number(e.target.value) });
      console.log(this.state.status);
      console.log(typeof this.state.status);
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
    this.props.history.push("/products");
  }

  submitHandler() {
    const data = {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      specifications: this.state.specifications,
      description: this.state.description,
      goodsReceipt: this.state.goodsReceipt,
      inventory: this.state.inventory,
      status: this.state.status,
      categoryId: this.state.categoryId,
      alias: this.state.alias
    };
    console.log(data);
    productservice_json
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

  render() {
    return this.state.loading === true ? (
      <h1>Đang tải dữ liệu vui vòng chờ trong giây lát</h1>
    ) : (
      <>
        <CRow>
          <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Cập nhật sản phẩm
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

                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">
                        Thông số kỹ thuật
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        name="specifications"
                        rows="3"
                        placeholder="Thông số kỹ thuật"
                        value={this.state.specifications}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup> */}
                  
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">
                        Thông số kỹ thuật
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CKEditor
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
                &nbsp;&nbsp;&nbsp;
                <CButton
                  size="sm"
                  name="cil-home"
                  color="dark"
                  onClick={() => this.cancel()}
                >
                  <CIcon name="cil-home" />
                  Huỷ và trở về danh sách
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default ProductEdit;
