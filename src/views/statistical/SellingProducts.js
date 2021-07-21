import React, { Component } from "react";
import {
  CCard,
  CDataTable,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CLabel,
  CSelect,
  CRow,
  CInputGroup
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import orderservices_json from "src/service/orderservice_json";

import moment from "moment";

class sellingProducts extends Component {
  state = {
    list: null,
    toggleDelete: false,
    id: null,
    month: Number(moment().format("MM")),
    year: Number(moment().format("YYYY")),
    monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    yearList: [2020, 2021, 2022, 2023, 2024, 2025]
  };
  submitHandler = this.submitHandler.bind(this);

  async submitHandler() {
    const data = {
      month: this.state.month,
      year: this.state.year
    };
    console.log(data);
    orderservices_json
      .sellingProducts(this.state.month, this.state.year)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj.length === 0) {
            alert(`Không tìm thấy sản phẩm bán chạy của ${this.state.month}/${this.state.year} vừa chọn`);
          }
          this.setState({ list: res.data.resultObj });
          console.log(res);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {}

  loadData() {
    orderservices_json
      .sellingProducts(this.state.month, this.state.year)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj.length === 0) {
            alert(`Không tìm thấy sản phẩm bán chạy của ${this.state.month}/${this.state.year} hiện tại`);
          }
          this.setState({ list: res.data.resultObj });
          console.log(res);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  changeHandler = e => {
    if (e.target.name === "month") {
      this.setState({ month: e.target.value });
    } else if (e.target.name === "year") {
      this.setState({ year: e.target.value });
    }
  };

  details = id => {
    this.props.history.push(`/products/${id}`);
  };
  render() {
    const fields = [
      { key: "id", label: "Mã sản phẩm" },
      { key: "name", label: "Tên sản phẩm" },
      { key: "price", label: "Giá bán" },
      { key: "quantity", label: "Số lượng đã bán" },
      { key: "link", label: "Tuỳ chọn" }
    ];
    return this.state.list === null ? null : (
      <CCard>
        <CCardHeader>Sản phẩm bán chạy</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="ccmonth">Tháng</CLabel>
                <CSelect
                  name="month"
                  onChange={this.changeHandler}
                  value={this.state.month}
                >
                  {this.state.monthList.map(item => {
                    return (
                      <option
                        value={item}
                        selected={item === this.state.month}
                        key={item}
                      >
                        {item}
                      </option>
                    );
                  })}
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="ccyear">Năm</CLabel>
                <CSelect name="year" onChange={this.changeHandler}>
                  {this.state.yearList.map(item => {
                    return (
                      <option
                        value={item}
                        selected={item === this.state.year}
                        key={item}
                      >
                        {item}
                      </option>
                    );
                  })}
                </CSelect>
              </CFormGroup>
            </CCol>

            <CCol xs="4">
              <CFormGroup row>
                <CLabel htmlFor="ccyear">Tùy chọn</CLabel>
                <CInputGroup>
                  <CButton
                    size="sm"
                    color="primary"
                    onClick={() => this.submitHandler()}
                  >
                    <CIcon name="cil-scrubber" /> Gửi
                  </CButton>
                </CInputGroup>
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
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
            link: item => {
              return (
                <td>
                  <CButton
                    size="sm"
                    color="success"
                    onClick={() => this.details(item.id)}
                  >
                    <CIcon name="cil-scrubber" /> Chi tiết
                  </CButton>
                </td>
              );
            }
          }}
        />
      </CCard>
    );
  }
}

export default sellingProducts;
