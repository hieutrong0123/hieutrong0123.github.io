import React, { Component } from "react";
import { CCard, CDataTable, CButton } from "@coreui/react";

import CIcon from "@coreui/icons-react";

import categoryservice_json from "src/service/categoryservice_json";

class Categories extends Component {
  state = { list: null };

  componentDidMount() {
    this.loadData();
  }
  loadData() {
    categoryservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ list: res.data.resultObj });
          console.log(res);
          console.log(this.state.list);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err =>alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  details = id => {
    this.props.history.push(`/categories/${id}`);
  };

  edit = id => {
    this.props.history.push(`/categories/edit/${id}`);
  };

  render() {
    const fields = [
      { key: "id", label: "Mã danh mục" },
      { key: "name", label: "Tên danh mục" },
      { key: "alias", label: "Bí danh" },      
      // { key: "productType", label: "Loại sản phẩm" },
      { key: "createdDate", label: "Ngày tạo" },
      { key: "link", label: "Tùy chọn" },
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
            link: item => {
              return (
                <td>
                  <CButton
                    size="sm"
                    color="primary"
                    onClick={() => this.details(item.id)}
                  >
                    <CIcon name="cil-scrubber" /> Chi tiết
                  </CButton>
                  &nbsp;&nbsp;&nbsp;
                  <CButton
                    size="sm"
                    color="success"
                    onClick={() => this.edit(item.id)}
                  >
                    <CIcon name="cil-settings" /> Cập nhật
                  </CButton>
                </td>
              );
            },
            createdDate: item =>{
              return(
                <td>
                  {item.createdDate.substring(0, 10)}
                  </td>

              );
            },
          }
        }
        />
      </CCard>
    );
  }
}

export default Categories;
