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
import productservice_json from "src/service/productservice_json";

class ProductInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      productList: null,
      costPrice: 0,
      goodsReceipt: 0     
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
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
    if (e.target.name === "costPrice") {
      this.setState({ costPrice: e.target.value });
    } else if (e.target.name === "goodsReceipt") {
      this.setState({ goodsReceipt: e.target.value });
    } else {
      this.setState({ [e.target.name]: e.target.value });
      console.log(e.target.value);
    }
  };

  cancel() {
    this.props.history.push("/products");
  }

  async submitHandler() {
    if (this.state.productId === "") {
      alert("Chưa chọn sản phấm");
    } else if (this.state.costPrice < 1) {
      alert("Giá bán không đúng định dạng");
    } else if (this.state.goodsReceipt<1) {
      alert("Số lượng nhập không đúng định dạng");
    } else {
    const data = {
      productId: this.state.productId,
      costPrice: this.state.costPrice,
      goodsReceipt: this.state.goodsReceipt
    };
    console.log(data);
    productservice_json
      .to_receive(data)
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
                Nhập sản phẩm
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Tên sản phẩm *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.productList === null ? (
                        <h3>Đang tải</h3>
                      ) : (
                        <CSelect
                          name="productId"
                          onChange={this.changeHandler}
                        >
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
                      <CLabel htmlFor="text-input">Giá nhập *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="number"
                        min="1"
                        name="costPrice"
                        placeholder="Giá nhập"
                        value={this.state.costPrice}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>                  
                  <CFormGroup row>
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

export default ProductInventory;
