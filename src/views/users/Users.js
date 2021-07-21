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

import userservice_json from "src/service/userservice_json";

class Users extends Component {
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
    userservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ list: res.data.resultObj });
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

  details = id => {
    this.props.history.push(`/users/${id}`);
  };

  edit = id => {
    this.props.history.push(`/users/edit/${id}`);
  };

  enable() {
    this.setState({ toggleEnable: false });
    userservice_json
      .enablebyId(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  disable() {
    this.setState({ toggleDisable: false });
    userservice_json
      .disablebyId(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  delete() {
    this.setState({ toggleDelete: false });
    userservice_json
      .deletebyId(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

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
      { key: "userName", label: "Tài khoản" },
      { key: "firstMiddleName", label: "Họ và tên lót" },
      { key: "lastName", label: "Tên" },
      { key: "email", label: "Email" },
      // { key: "phoneNumber", label: "Số điện thoại" },
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
                  {item.status === 1 ? (
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
          <CModalBody>Người dùng #{this.state.id} sẽ được kích hoạt</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.enable()}>
              OK
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                this.setState({ toggleEnable: false });
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal show={this.state.toggleDisable}>
          <CModalHeader>Cảnh báo!</CModalHeader>
          <CModalBody>Người dùng #{this.state.id} sẽ bị khoá</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.disable()}>
              OK
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
          <CModalBody>Người dùng #{this.state.id} sẽ bị xoá</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.delete()}>
              OK
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

export default Users;
