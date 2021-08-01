import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CDataTable
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import orderservice_json from "src/service/orderservice_json";
// import userservice_json from "src/service/userservice_json";
import orderdetailservice_json from "src/service/orderdetailservice_json";
import productservice_json from "src/service/productservice_json";

import moment from "moment";

class OrderDetails extends Component {
  state = {
    id: "",
    createdDate: "",
    deliveryDate: "",
    paid: "",
    paymentMethod: "",
    receiver: "",
    receiversAddress: "",
    receiversEmail: "",
    receiversPhoneNumber: "",
    totalMoney: "",
    statusId: "",
    loadingOrderById: true,
    loadingUserById: true,
    loadingOrderDetails: true,
    loadingProduct: true,
    listOrderDetails: null,
    listProduct: null,
    OrderStatus: [
      "",
      "Đặt hàng thành công",
      "Đã tiếp nhận",
      "Đang lấy hàng",
      "Đóng gói xong",
      "Bàn giao vận chuyển",
      "Đang vận chuyển",
      "Giao hàng thành công",
      "Đơn hàng bị huỷ"
    ]
  };

  componentDidMount() {
    this.loadOrderById();
  }

  changeHandler = e => {
    //Do Nothing
  };

  print() {
    var printContents = document.getElementById("print").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }

  cancel() {
    this.props.history.push("/orders");
  }

  loadOrderById() {
    orderservice_json
      .getbyId(this.props.match.params.id)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            this.setState({
              id: res.data.resultObj.id,
              createdDate: res.data.resultObj.createdDate.substring(0, 10),
              deliveryDate: res.data.resultObj.deliveryDate.substring(0, 10),
              paid: res.data.resultObj.paid,
              paymentMethod: res.data.resultObj.paymentMethod,
              receiver: res.data.resultObj.receiver,
              receiversAddress: res.data.resultObj.receiversAddress,
              receiversEmail: res.data.resultObj.email,
              receiversPhoneNumber: res.data.resultObj.phoneNumber,
              totalMoney: res.data.resultObj.totalMoney,
              statusId: res.data.resultObj.statusId,
              loadingOrderById: false
            });
          }
          this.loadOrderDetails();
          console.log("loadingOrderById", this.state.loadingOrderById);
        } else {
          alert(res.data.message);
        }
      })
      // .catch(err => console.log(err));
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  loadOrderDetails() {
    orderdetailservice_json
      .getbyId(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            this.setState({
              listOrderDetails: res.data.resultObj,
              loadingOrderDetails: false
            });
            console.log(res.data.resultObj);
          }
          this.loadProduct();
          console.log("loadingOrderDetails", this.state.loadingOrderDetails);
        } else {
          alert(res.data.message);
        }
      })
      // .catch(err => console.log(err));
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  loadProduct() {
    productservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            this.setState({
              listProduct: res.data.resultObj,
              loadingProduct: false
            });
          }
          console.log("loadingProduct", this.state.loadingProduct);
        } else {
          alert(res.data.message);
        }
      })
      // .catch(err => console.log(err));
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  render() {
    const fields = [
      { key: "nameproduct", label: "Tên sản phẩm" },
      { key: "quantity", label: "Số lượng" },
      { key: "price", label: "Giá" },
      { key: "total", label: "Tổng cộng" }
    ];
    return this.state.loadingProduct === true ? (
      <h1>Đang tải dữ liệu vui vòng chờ trong giây lát</h1>
    ) : (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Xem chi tiết hoá đơn
                <small></small>
              </CCardHeader>
              <CCardBody id="print">
                <CCardHeader>
                  <div>
                    <h2 className="title">Electronic Shop</h2>
                    <span>Số 1, Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP HCM</span>
                    <br />
                    <span>electronicshop0123@gmail.com</span>
                  </div>
                </CCardHeader>
                <CRow>
                  <CCol xs="8" md="8">
                    <p>
                      <span>Người nhận hàng: </span>
                      {this.state.receiver}
                    </p>
                    <p>
                      <span>Email: </span>
                      {this.state.receiversEmail}
                    </p>
                    <p>
                      <span>Số điện thoại: </span>
                      {this.state.receiversPhoneNumber}
                    </p>
                  </CCol>
                  <CCol xs="4" md="4">
                    <p>
                      <span>Số hoá đơn</span> {this.state.id}
                    </p>
                    <p>
                      <span>Ngày tạo: </span>
                      {moment(this.state.createdDate).format("DD-MM-YYYY")}
                    </p>
                    <p>
                      <span> Ngày giao hàng: </span>
                      {moment(this.state.deliveryDate).format("DD-MM-YYYY")}
                    </p>
                  </CCol>
                </CRow>
                <CDataTable
                  items={this.state.listOrderDetails}
                  fields={fields}
                  hover
                  scopedSlots={{
                    nameproduct: item => {
                      return <td>{item.product.name}</td>;
                    },
                    total: item => {
                      return <td>{item.quantity * item.price}</td>;
                    }
                  }}
                />
                <hr />
                <CRow>
                  <CCol xs="9" md="9"></CCol>
                  <CCol xs="3" md="3">
                    <h5>Thành tiền: {this.state.totalMoney}</h5>
                  </CCol>
                </CRow>
                <hr />
                {this.state.paid === false ? (
                  <CRow>
                    <CCol xs="1" md="1"></CCol>
                    <h5>Thanh toán:&nbsp;</h5>
                    <h5 style={{ color: "red" }}>Chưa thanh toán</h5>
                  </CRow>
                ) : (
                  <CRow>
                    <CCol xs="1" md="1"></CCol>
                    <h5>Thanh toán:&nbsp;</h5>
                    <h5 style={{ color: "red" }}>Đã thanh toán</h5>
                    <CCol xs="2" md="2"></CCol>
                    <h5>Phương thức thanh toán:&nbsp;</h5>
                    <h5 style={{ color: "blue" }}>{this.state.paymentMethod}</h5>
                  </CRow>
                )}
                <CCardFooter>
                  <p>Cảm ơn quý khách đã mua hàng của chúng tôi</p>
                  <p>
                    Sản phẩm được đổi trả miễn phí trong vòng 7 ngày (nếu lỗi do
                    nhà sản xuất)
                  </p>
                  <p>Ký bởi Electronic Shop {this.state.createdDate}</p>
                </CCardFooter>
              </CCardBody>
              <CCardFooter>
                <CButton size="sm" color="primary" onClick={() => this.print()}>
                  <CIcon name="cil-settings" /> In hoá đơn
                </CButton>
                &nbsp;&nbsp;&nbsp;
                <CButton color="dark" size="" onClick={() => this.cancel()}>
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

export default OrderDetails;
