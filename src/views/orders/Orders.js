import React, { Component } from "react";

import {
  CCard,
  CCardHeader,
  CCardBody,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane
} from "@coreui/react";


import orderservice_json from "src/service/orderservice_json";
import OrdersTabStatus from "src/views/orders/OrdersTabStatus";

class Orders extends Component {
  state = {
    list: null
  };


  componentDidMount() {
    this.loadData();
  }
  loadData() {
    orderservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ list: res.data.resultObj });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err =>alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }
  render() {
    return this.state.list === null ? null : (
      <CCard>
        <CCardHeader>Orders</CCardHeader>
        <CCardBody>
          <CTabs activeTab="statusId0">
            <CNav variant="tabs">
              <CNavItem className="align-center">
                <CNavLink data-tab="statusId0">Tất cả đơn hàng</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="statusId1">Đặt hàng thành công</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="statusId2">Đã tiếp nhận</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="statusId3">Đang lấy hàng</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="statusId4">Đóng gói xong</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="statusId5">Bàn giao vận chuyển</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="statusId6">Đang vận chuyển</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="statusId7">Giao hàng thành công</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="statusId8">Đơn hàng bị huỷ</CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="statusId0">
                <OrdersTabStatus list={this.state.list}/>
              </CTabPane>
              <CTabPane data-tab="statusId1">
                <OrdersTabStatus list={this.state.list.filter(item => item.statusId === 1)}/>
              </CTabPane>
              <CTabPane data-tab="statusId2">
                <OrdersTabStatus list={this.state.list.filter(item => item.statusId === 2)}/>
              </CTabPane>
              <CTabPane data-tab="statusId3">
                <OrdersTabStatus list={this.state.list.filter(item => item.statusId === 3)}/>
              </CTabPane>
              <CTabPane data-tab="statusId4">
                <OrdersTabStatus list={this.state.list.filter(item => item.statusId === 4)}/>
              </CTabPane>
              <CTabPane data-tab="statusId5">
                <OrdersTabStatus list={this.state.list.filter(item => item.statusId === 5)}/>
              </CTabPane>
              <CTabPane data-tab="statusId6">
                <OrdersTabStatus list={this.state.list.filter(item => item.statusId === 6)}/>
              </CTabPane>
              <CTabPane data-tab="statusId7">
                <OrdersTabStatus list={this.state.list.filter(item => item.statusId === 7)}/>
              </CTabPane>
              <CTabPane data-tab="statusId8">
                <OrdersTabStatus list={this.state.list.filter(item => item.statusId === 8)}/>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCardBody>

      </CCard>
    );
  }
}

export default Orders;
