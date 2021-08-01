import React, { Component } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody
} from "@coreui/react";

import moment from "moment";

import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

import userservice_json from "src/service/userservice_json";
import productservice_json from "src/service/productservice_json";
import categoryservice_json from "src/service/categoryservice_json";
import orderservice_json from "src/service/orderservice_json";

class Count extends Component {
  state = {
    Role: null,
    listUsers: null,
    newUser: null,
    loadingUser: true,
    newProduct: null,
    listProducts: null,
    loadingProduct: true,
    listCatelogies: null,
    newCategory: null,
    loadingCategory: true,
    listOrders: null,
    newOrder: null,
    loadingOrder: true,
    thisMonth: moment().format("MM"),
    thisYear: moment().format("YYYY"),
  };

  async componentDidMount() {
    await this.checkRole();
    this.loadData();
  }

  checkRole() {
    let Role = null;
    const token = Cookies.get("Token");
    if (token !== null && token !== undefined) {
      let tokenDecode = jwt_decode(token);
      Object.keys(tokenDecode).forEach(function(key) {
        let res = key.split("/");
        if (res.length > 1) {
          if (res[res.length - 1] === "role") {
            Role = tokenDecode[key];
          }
        }
      });
    }
    console.log(Role);
    this.setState({ Role: Role });
  }

  loadData() {
    if (this.state.Role === "Admin") {
      userservice_json
        .getAll()
        .then(res => {
          if (res.data.isSuccessed) {
            let arr = [];
            for (let i = 0; i < res.data.resultObj.length; i++) {
              if (res.data.resultObj[i].createdDate !== null) {
                if (
                  moment(res.data.resultObj[i].createdDate).format("MM") === this.state.thisMonth
                ) {
                  arr.push(res.data.resultObj[i]);
                }
              }
            }
            this.setState({
              listUsers: res.data.resultObj,
              newUser: arr,
              loadingUser: false
            });
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
    }

    productservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          let arr = [];
          for (let i = 0; i < res.data.resultObj.length; i++) {
            if (res.data.resultObj[i].createdDate !== null) {
              if (
                moment(res.data.resultObj[i].createdDate).format("MM") === this.state.thisMonth
                ) {
                arr.push(res.data.resultObj[i]);
              }
            }
          }
          this.setState({
            listProducts: res.data.resultObj,
            newProduct: arr,
            loadingProduct: false
          });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));

    categoryservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          let arr = [];
          for (let i = 0; i < res.data.resultObj.length; i++) {
            if (res.data.resultObj[i].createdDate !== null) {
              if (
                moment(res.data.resultObj[i].createdDate).format("MM") === this.state.thisMonth
                ) {
                arr.push(res.data.resultObj[i]);
              }
            }
          }
          this.setState({
            listCatelogies: res.data.resultObj,
            newCategory: arr,
            loadingCategory: false
          });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));

    orderservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          let arr = [];
          for (let i = 0; i < res.data.resultObj.length; i++) {
            if (res.data.resultObj[i].createdDate !== null) {
              if (
                moment(res.data.resultObj[i].createdDate).format("MM") === this.state.thisMonth
                ) {
                arr.push(res.data.resultObj[i]);
              }
            }
          }
          this.setState({
            listOrders: res.data.resultObj,
            newOrder: arr,
            loadingOrder: false
          });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }
  render() {
    return (
      <>
        <CCard>
          <CCardHeader>
            Trong tháng {this.state.thisMonth}/{this.state.thisYear} này
            <small></small>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {this.state.loadingUser === false ? (
                <CCol sm="6" lg="3">
                  <CWidgetDropdown
                    color="gradient-primary"
                    header={
                      this.state.newUser.length === 0
                        ? "Có 0"
                        : `Có ` + this.state.newUser.length
                    }
                    text="Thành viên mới"
                  ></CWidgetDropdown>
                </CCol>
              ) : null}

              {this.state.loadingProduct === false ? (
                <CCol sm="6" lg="3">
                  <CWidgetDropdown
                    color="gradient-warning"
                    header={
                      this.state.newProduct.length === 0
                        ? "Có 0"
                        : `Có ` + this.state.newProduct.length
                    }
                    text="Sản phẩm mới"
                  ></CWidgetDropdown>
                </CCol>
              ) : null}

              {this.state.loadingCategory === false ? (
                <CCol sm="6" lg="3">
                  <CWidgetDropdown
                    color="gradient-info"
                    header={
                      this.state.newCategory.length === 0
                        ? "Có 0"
                        : `Có ` + this.state.newCategory.length
                    }
                    text="Danh mục mới"
                  ></CWidgetDropdown>
                </CCol>
              ) : null}

              {this.state.loadingOrder === false ? (
                <CCol sm="6" lg="3">
                  <CWidgetDropdown
                    color="gradient-success"
                    header={
                      this.state.newOrder.length === 0
                        ? "Có 0"
                        : `Có ` + this.state.newOrder.length
                    }
                    text="Đơn hàng mới"
                  ></CWidgetDropdown>
                </CCol>
              ) : null}
            </CRow>
            <CRow>
              {this.state.loadingUser === false ? (
                <CCol sm="6" lg="3">
                  <CWidgetDropdown
                    color="gradient-primary"
                    header={`Trong tổng số ` + this.state.listUsers.length}
                    text="Thành viên"
                  ></CWidgetDropdown>
                </CCol>
              ) : null}

              {this.state.loadingProduct === false ? (
                <CCol sm="6" lg="3">
                  <CWidgetDropdown
                    color="gradient-warning"
                    header={`Trong tổng số ` + this.state.listProducts.length}
                    text="Sản phẩm"
                  ></CWidgetDropdown>
                </CCol>
              ) : null}

              {this.state.loadingCategory === false ? (
                <CCol sm="6" lg="3">
                  <CWidgetDropdown
                    color="gradient-info"
                    header={`Trong tổng số ` + this.state.listCatelogies.length}
                    text="Danh mục"
                  ></CWidgetDropdown>
                </CCol>
              ) : null}

              {this.state.loadingOrder === false ? (
                <CCol sm="6" lg="3">
                  <CWidgetDropdown
                    color="gradient-success"
                    header={`Trong tổng số ` + this.state.listOrders.length}
                    text="Đơn hàng"
                  ></CWidgetDropdown>
                </CCol>
              ) : null}
            </CRow>
          </CCardBody>
        </CCard>
      </>
    );
  }
}

export default Count;
