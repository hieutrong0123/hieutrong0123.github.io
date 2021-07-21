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
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import orderservice_json from "src/service/orderservice_json";
import userservice_json from "src/service/userservice_json";

class OrderById extends Component {
  state = {
    id: "",
    createdDate: "",
    deliveryDate: "",
    paid: "",
    paymentMethod: "",
    receiver: "",
    receiversAddress: "",
    phoneNumber: "",
    totalMoney: "",
    statusId: "",
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
    ],
    loading: true
  };

  componentDidMount() {
    this.loadOrderById();
  }

  changeHandler = e => {
    //Do Nothing
  };
  viewOrderDetails() {
    this.props.history.push(`/orderdetails/${this.state.id}`);
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
              phoneNumber: res.data.resultObj.phoneNumber,
              totalMoney: res.data.resultObj.totalMoney,
              statusId: res.data.resultObj.statusId,
              userId: res.data.resultObj.userId,
              loading: false
            });
          }
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
                Xem thêm đơn hàng
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Mã đơn hàng</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="id"
                        placeholder="Mã đơn hàng"
                        value={this.state.id}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Tên khách hàng</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="user"
                        placeholder="Tên khách hàng"
                        value={this.state.receiver}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup> */}

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

                  

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="date-input">Ngày giao hàng</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="date"
                        name="deliveryDate"
                        placeholder="Ngày giao hàng"
                        value={this.state.deliveryDate}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Thanh toán</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="true"
                          name="paid"
                          onChange={this.changeHandler}
                          value="true"
                          checked={this.state.paid === true}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="true">
                          Đã thanh toán
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="false"
                          name="status"
                          onChange={this.changeHandler}
                          value="false"
                          checked={this.state.paid === false}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="false">
                          Chưa thanh toán
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Phương thức thanh toán</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="paymentMethod"
                        placeholder="Tại cửa hàng"
                        value={this.state.paymentMethod}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Người nhận hàng</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="receiver"
                        placeholder="Người nhận hàng"
                        value={this.state.receiver}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">
                        Địa chỉ nhận hàng
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        name="receiversAddress"
                        rows="3"
                        placeholder="Địa chỉ nhận hàng"
                        value={this.state.receiversAddress}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Số điện thoại</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="phoneNumber"
                        placeholder="Số điện thoại"
                        value={this.state.phoneNumber}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Tổng số tiền</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="totalMoney"
                        placeholder="Tổng số tiền"
                        value={this.state.totalMoney}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Trạng thái</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="totalMoney"
                        placeholder="Tổng số tiền"
                        value={this.state.OrderStatus[this.state.statusId]}
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
                  onClick={() => this.viewOrderDetails()}
                >
                  <CIcon name="cil-settings" /> Xem và in hoá đơn
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

export default OrderById;
