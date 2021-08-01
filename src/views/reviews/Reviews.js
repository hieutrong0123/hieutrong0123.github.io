import React, { Component } from "react";
import {
  CCard,
  CDataTable
} from "@coreui/react";


import moment from "moment";

import reviewservice_json from "src/service/reviewservice_json";

class Reviews extends Component {
  state = {
    list: null
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    reviewservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ list: res.data.resultObj });
        //   console.log(res);
        //   console.log(this.state.list);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  render() {
    const fields = [
      { key: "id", label: "Mã" },
      { key: "product", label: "Tên sản phẩm" },
      { key: "user", label: "Email người dùng" },
      { key: "rateStar", label: "Số sao" },
      { key: "text", label: "Nội dung" },
      { key: "createdDate", label: "Ngày tạo" },
      { key: "modifiedDate", label: "Ngày cập nhật" }
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
            product: item => {
              return <td>{item.product.name}</td>;
            },
            user: item => {
              return <td>{item.user.email}</td>;
            },
            createdDate: item => {
              return (
                <td>
                  {moment(item.createdDate).format("YYYY/MM/DD HH:mm:ss")}
                </td>
              );
            },
            modifiedDate: item => {
              if (item.modifiedDate == undefined) {
                return <td></td>;
              } else {
                return (
                  <td>
                    {moment(item.modifiedDate).format("YYYY/MM/DD HH:mm:ss")}
                  </td>
                );
              }
            }
          }}
        />        
      </CCard>
    );
  }
}

export default Reviews;
