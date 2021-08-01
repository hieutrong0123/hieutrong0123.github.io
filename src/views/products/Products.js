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

import productservice_json from "src/service/productservice_json";

class Products extends Component {
  state = {
    list: null,
    toggleEnable: false,
    toggleDisable: false,
    toggleDelete: false,
    id: null
  };

  escFunction = this.escFunction.bind(this);

  componentDidMount() {
    this.loadData();
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  loadData() {
    productservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ list: res.data.resultObj });
          console.log(res);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  details = id => {
    this.props.history.push(`/products/${id}`);
  };

  edit = id => {
    this.props.history.push(`/products/edit/${id}`);
  };

  enable() {
    this.setState({ toggleEnable: false });
    productservice_json
      .enablebyId(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
          // window.location.reload();
          this.refresh();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  refresh()
  {
    var url = window.location.pathname;
    this.props.history.push(`/`);
    this.props.history.push(url);
  }

  disable() {
    this.setState({ toggleDisable: false });
    productservice_json
      .disablebyId(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
          // window.location.reload();
          this.refresh();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  delete() {
    this.setState({ toggleDelete: false });
    productservice_json
      .deletebyId(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
          // window.location.reload();
          this.refresh();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  toggleEnable = id => {
    this.setState({ toggleEnable: true, id: id });
  };

  toggleDisable = id => {
    this.setState({ toggleDisable: true, id: id });
  };

  toggleDelete = id => {
    this.setState({ toggleDelete: true, id: id });
  };

  escFunction(event) {
    if (event.keyCode === 27) {
      this.setState({ toggleEnable: false });
      this.setState({ toggleDisable: false });
      this.setState({ toggleDelete: false });
    }
  }

  render() {
    const fields = [
      { key: "id", label: "Mã" },
      { key: "name", label: "Tên sản phẩm", _style: { width: "25%" } },
      { key: "price", label: "Giá bán" },
      { key: "goodsReceipt", label: "Số lượng nhập", _style: { width: "5%" } },
      { key: "inventory", label: "Số lượng tồn", _style: { width: "5%" } },
      { key: "status", label: "Trạng thái" },
      { key: "link", label: "Tuỳ chọn", _style: { width: "40%" } }
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
            status: item => {
              if (item.status === 0) {
                return <td>Mặc định</td>;
              } else if (item.status === 1) {
                return <td>Sản phẩm mới</td>;
              } else if (item.status === 2) {
                return <td>Đã khoá</td>;
              } else {
                return <td></td>;
              }
            },
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
                  &nbsp;&nbsp;&nbsp;
                  {item.status === 2 ? (
                    <CButton
                      size="sm"
                      color="info"
                      onClick={() => this.toggleEnable(item.id)}
                    >
                      <CIcon name="cil-check" /> Kích hoạt
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      color="warning"
                      onClick={() => this.toggleDisable(item.id)}
                    >
                      <CIcon name="cil-x" />
                      &nbsp;&nbsp;&nbsp;Khoá&nbsp;&nbsp;&nbsp;&nbsp;
                    </CButton>
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <CButton
                    size="sm"
                    color="danger"
                    onClick={() => this.toggleDelete(item.id)}
                  >
                    <CIcon name="cil-ban" /> Xoá
                  </CButton>
                </td>
              );
            }
          }}
        />

        <CModal show={this.state.toggleEnable}>
          <CModalHeader>Cảnh báo!</CModalHeader>
          <CModalBody>Sản phẩm #{this.state.id} sẽ được kích hoạt</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.enable()}>
              Đồng ý
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                this.setState({ toggleEnable: false });
              }}
            >
              Huỷ
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal show={this.state.toggleDisable}>
          <CModalHeader>Cảnh báo!</CModalHeader>
          <CModalBody>Sản phẩm #{this.state.id} sẽ bị khoá</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.disable()}>
              Đồng ý
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                this.setState({ toggleDisable: false });
              }}
            >
              Huỷ
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal show={this.state.toggleDelete}>
          <CModalHeader>Dừng lại!</CModalHeader>
          <CModalBody>Sản phẩm #{this.state.id} sẽ bị xoá</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.delete()}>
              Đồng ý
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                this.setState({ toggleDelete: false });
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

export default Products;
