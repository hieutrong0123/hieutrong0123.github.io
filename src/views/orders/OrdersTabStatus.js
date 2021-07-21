import React, { Component } from "react";
import {
  CCard,
  CDataTable,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import orderservice_json from "src/service/orderservice_json";

class OrdersTabStatus extends Component {
  state = {
    list: null,
    toggleChangeStatus: false,
    toggleCancelOrder: false,
    id: null,
    statusId: null,
    orderStatus: [
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

  escFunction = this.escFunction.bind(this);

  componentDidMount() {
    this.setState({ list: this.props.list });
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  trackOrder = id => {
    window.location.assign(`/orders/${id}`);
  };

  toggleChangeStatus = (id, statusId) => {
    this.setState({ toggleChangeStatus: true, id: id, statusId: statusId });
  };

  toggleCancelOrder = id => {
    this.setState({ toggleCancelOrder: true, id: id });
  };

  changeStatus() {
    this.setState({ toggleChangeStatus: false });
    orderservice_json
      .changeStatus(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.message);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
    // .catch(err => console.log(err));
  }

  cancelOrder() {
    this.setState({ toggleCancelOrder: false });
    orderservice_json
      .canclebyId(this.state.id)
      .then(res => {
          alert("Huỷ đơn hàng thành công");
          window.location.reload();        
        }
      )
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
    // .catch(err => console.log(err));
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.setState({ toggleChangeStatus: false });
      this.setState({ toggleCancelOrder: false });
      console.log(this.state.toggleCancelOrder, this.state.toggleChangeStatus);
    }
  }

  render() {
    const fields = [
      { key: "id", label: "Mã đơn hàng" },
      { key: "createdDate", label: "Ngày tạo" },
      { key: "deliveryDate", label: "Ngày giao hàng" },
      { key: "paid", label: "Đã thanh toán" },
      { key: "paymentMethod", label: "Phương thức thanh toán" },
      { key: "receiver", label: "Người nhận hàng" },
      { key: "totalMoney", label: "Tổng số tiền" },
      { key: "statusId", label: "Trạng thái" },
      { key: "link", label: "Tuỳ chọn", _style: { width: "35%" } }
    ];

    return this.state.list === null ? null : (
      <CCard>
        <CDataTable
          items={this.state.list}
          fields={fields}
          // columnFilter
          tableFilter
          //footer
          itemsPerPageSelect
          itemsPerPage={5}
          hover
          sorter
          pagination
          scopedSlots={{
            paid: item => {
              if (item.paid === false) {
                return <td>Chưa thanh toán</td>;
              } else {
                return <td>Đã thánh toán</td>;
              }
            },
            paymentMethod: item => {
              if (item.paymentMethod == null) {
                return <td></td>;
              } else {
                return <td>{item.paymentMethod}</td>;
              }
            },
            link: item => {
              return (
                <td>
                  <CButton
                    size="sm"
                    color="primary"
                    onClick={() => this.trackOrder(item.id)}
                  >
                    <CIcon name="cil-scrubber" />
                    Xem thêm
                  </CButton>
                  &nbsp;&nbsp;&nbsp;
                  {item.statusId === 7 || item.statusId === 8 ? (
                    <CButton
                      size="sm"
                      color="warning"
                      onClick={() =>
                        this.toggleChangeStatus(item.id, item.statusId)
                      }
                      disabled
                    >
                      <CIcon name="cil-settings" />
                      Chuyển trạng thái
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      color="warning"
                      onClick={() =>
                        this.toggleChangeStatus(item.id, item.statusId)
                      }
                    >
                      <CIcon name="cil-settings" />
                      Chuyển trạng thái
                    </CButton>
                  )}
                  &nbsp;&nbsp;&nbsp;
                  {item.statusId === 8 || item.statusId === 7 ? (
                    <CButton
                      size="sm"
                      color="danger"
                      onClick={() => this.toggleCancelOrder(item.id)}
                      disabled
                    >
                      <CIcon name="cil-ban" />
                      Huỷ
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      color="danger"
                      onClick={() => this.toggleCancelOrder(item.id)}
                    >
                      <CIcon name="cil-ban" />
                      Huỷ
                    </CButton>
                  )}
                </td>
              );
            },

            createdDate: item => {
              return <td>{item.createdDate.substring(0, 10)}</td>;
            },
            deliveryDate: item => {
              return <td>{item.deliveryDate.substring(0, 10)}</td>;
            },
            statusId: item => {
              return <td>{this.state.orderStatus[item.statusId]}</td>;
            }
          }}
        />
        <CModal show={this.state.toggleChangeStatus}>
          <CModalHeader>Cảnh báo!</CModalHeader>
          <CModalBody>
            Đơn hàng #{this.state.id} sẽ thay đổi trạng thái{" "}
            {this.state.orderStatus[this.state.statusId + 1]}
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.changeStatus()}>
              OK
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                this.setState({ toggleChangeStatus: false });
              }}
            >
              Huỷ
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal show={this.state.toggleCancelOrder}>
          <CModalHeader>Dừng lại!</CModalHeader>
          <CModalBody>Đơn hàng #{this.state.id} sẽ bị huỷ</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.cancelOrder()}>
              OK
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                this.setState({ toggleCancelOrder: false });
              }}
            >
              Huỷ
            </CButton>
          </CModalFooter>
        </CModal>
      </CCard>
    );
  }
}

export default OrdersTabStatus;
