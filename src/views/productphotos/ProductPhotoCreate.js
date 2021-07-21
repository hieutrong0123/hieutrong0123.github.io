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
  CInputFile,
  CLabel,
  CSelect,
  CRow,
  CImg
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import productphotoservice_formdata from "src/service/productphotoservice_formdata";
import productservice_json from "src/service/productservice_json";

class ProductPhotoCreate extends Component {
  state = {
    productId: "",
    thumbnailImages: [],
    productList: null,
    categoryList: null,
    categoryId: "",
    listImage: []
  };
  submitHandler = this.submitHandler.bind(this);
  cancel = this.cancel.bind(this);

  componentDidMount() {
    // this.setState({ productId: this.props.location.productId});
    // if(this.props.location.productId)
    // {
    // this.setState({ productId: this.props.location.productId }, () =>
    //     console.log(this.state.productId)
    //   );
    // }
    this.loadData();
  }

  loadData() {
    productservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ productList: res.data.resultObj });
          console.log(this.state.productList);
        } else {
          alert(res.data.message);
        }
        if (this.props.location.productId) {
          this.setState({ productId: this.props.location.productId }, () =>
            console.log(this.state.productId)
          );
        } else {
          this.setState({ productId: this.state.productList[0].id }, () =>
            console.log(this.state.productId)
          );
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  changeHandler = e => {
    // if (e.target.name === "thumbnailImages") {
    //   let arr = e.target.files;
    //   console.log(arr);
    //   this.setState({ thumbnailImages: e.target.files }, () =>
    //     console.log(this.state.thumbnailImages)
    //   );
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
    } else {
      this.setState({ [e.target.name]: e.target.value });
      console.log(e.target.value);
    }
  };

  cancel() {
    this.props.history.push(`/products/${this.state.productId}`);
  }

  async submitHandler() {
    if (!this.state.productId) {
      alert("Mã sản phẩm không đúng");
    } else if (!this.state.thumbnailImages) {
      alert("Hình ảnh không đúng định dạng");
    } else {
      var FormData = require("form-data");
      var data = new FormData();
      data.append("ProductId", this.state.productId);
      this.state.thumbnailImages.forEach(item => {
        data.append("ThumbnailImages", item);
      });
      console.log(this.state.productId, this.state.thumbnailImages);

      productphotoservice_formdata
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
                Thêm hình ảnh cho sản phẩm
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Tên sản phẩm</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.productList === null ? (
                        <h3>Đang tải</h3>
                      ) : (
                        <CSelect name="productId" onChange={this.changeHandler}>
                          <option
                            key={Number(0)}
                            value=""
                            selected={this.state.productId === ""}
                          >
                            Lựa chọn
                          </option>
                          {this.state.productList.map(item => {
                            return (
                              <option
                                value={item.id}
                                selected={this.state.productId === item.id}
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
                      <CLabel>Hình ảnh</CLabel>
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
                        Chọn một hoặc nhiều
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
                  <CIcon name="cil-scrubber" /> Thêm hình ảnh
                </CButton>
                <CButton></CButton>
                <CButton size="sm" color="dark" onClick={() => this.cancel()}>
                  <CIcon name="cil-home" />
                  Huỷ bỏ và trở về
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default ProductPhotoCreate;
