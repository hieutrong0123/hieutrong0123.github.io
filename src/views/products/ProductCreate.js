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
  CInputFile,
  CInputRadio,
  CLabel,
  CSelect,
  CRow,
  CImg
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import productservice_formdata from "src/service/productservice_formdata";
import categoryservice_json from "src/service/categoryservice_json";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "src/scss/ckeditor.scss";

class ProductCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      specifications: "<p><strong>Tên:</strong> Thông số</p>",
      description: "",
      goodsReceipt: 0,
      inventory: 0,
      status: 0,
      categoryId: "",
      alias: "",
      thumbnailImages: [],
      categoryList: null,
      listImage: []
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    categoryservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ categoryList: res.data.resultObj });
          console.log(this.state.categoryList);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  changeHandler = e => {
    if (e.target.name === "thumbnailImages") {
      let arr = [];
      
      this.setState({ thumbnailImages: e.target.files }, () =>
        console.log(this.state.thumbnailImages)
      );

      for (let i = 0; i < e.target.files.length; i++) {
        arr.push(URL.createObjectURL(e.target.files[i]));
      }

      this.setState({ listImage: arr }, () =>
        console.log(this.state.listImage)
      );

      console.log(this.state.thumbnailImages);
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

  async submitHandler() {
    if (!this.state.name) {
      alert("Tên sản phẩm không đúng định dạng");
    } else if (this.state.price < 1) {
      alert("Giá bán không đúng định dạng");
    } else if (!this.state.specifications) {
      alert("Thông số kỹ thuật không đúng định dạng");    
    } else if (!this.state.description) {
      alert("Mô tả không đúng định dạng");
    } else if (!this.state.categoryId) {
      alert("Danh mục không đúng định dạng");
    } else if (!this.state.alias) {
      alert("Bí danh không đúng định dạng");
    } else if (!this.state.thumbnailImages) {
      alert("Hình ảnh không đúng định dạng");
    } else {
      var FormData = require("form-data");
      var data = new FormData();
      data.append("Name", this.state.name);
      data.append("Price", this.state.price);
      data.append("Specifications", this.state.specifications);
      data.append("Description", this.state.description);
      data.append("GoodsReceipt", this.state.goodsReceipt);
      data.append("Inventory", this.state.inventory);
      data.append("Status", this.state.status);
      data.append("CategoryId", this.state.categoryId);
      data.append("Alias", this.state.alias);
      this.state.thumbnailImages.forEach(item => {
        data.append("ThumbnailImages", item);
      });
      console.log(data);

      productservice_formdata
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
  }
  render() {
    return (
      <>
        <CRow>
          <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Thêm sản phẩm
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Tên sản phẩm *</CLabel>
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
                      <CLabel htmlFor="select">Danh mục *</CLabel>
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
                      <CLabel htmlFor="text-input">Giá bán *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="number"
                        min="1"
                        name="price"
                        placeholder="Giá bán"
                        // number
                        value={this.state.price}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">
                        Thông số kỹ thuật *
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CKEditor
                        editor={ClassicEditor}
                        data={this.state.specifications}
                        onChange={(e, editor) => {
                          this.setState({ specifications: editor.getData() });
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Mô tả *</CLabel>
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
                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Số lượng nhập *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="number"
                        min="1"
                        name="goodsReceipt"
                        placeholder="Số lượng nhập"
                        value={this.state.goodsReceipt}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Số lượng tồn *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        disabled
                        type="number"
                        name="inventory"
                        placeholder="Số lượng tồn"
                        value={this.state.inventory}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup> */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Trạng thái *</CLabel>
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
                      <CLabel>Hình ảnh *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInputFile
                        type="file"
                        id="ThumbnailImages"
                        name="thumbnailImages"
                        multiple
                        custom
                        accept=".jpg, .jpeg, .png"
                        onChange={this.changeHandler}
                      />
                      <CLabel htmlFor="ThumbnailImages" variant="custom-file">
                        Chọn 4 hình ảnh
                      </CLabel>
                    </CCol>
                  </CFormGroup>

                  {this.state.listImage !== null ? (
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel>Danh sách hình ảnh đã chọn</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        {this.state.listImage.map(item => {
                          return (
                            <>
                              <CImg src={item} width="100px" key={item} />
                            </>
                          );
                        })}
                      </CCol>
                    </CFormGroup>
                  ) : null}
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
                &nbsp;&nbsp;&nbsp;
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

export default ProductCreate;
