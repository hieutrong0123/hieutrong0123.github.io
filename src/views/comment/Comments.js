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

import moment from "moment";

import commentservice_json from "src/service/commentservice_json";

class Comments extends Component {
  state = {
    list: null,
    toggleEnable: false,
    toggleDisable: false,
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
    commentservice_json
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
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }


  toggleEnable = id => {
    this.setState({ toggleEnable: true, id: id });
  };

  toggleDisable = id => {
    this.setState({ toggleDisable: true, id: id });
  };

  enable() {
    this.setState({ toggleEnable: false });
    commentservice_json
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
    commentservice_json
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

  

  escFunction(event) {
    if (event.keyCode === 27) {
      this.setState({ toggleEnable: false });
      this.setState({ toggleDisable: false });
    }
  }

  render() {
    const fields = [
      { key: "id", label: "Mã bình luận" },
      { key: "userId", label: "Mã tài khoản" },
      { key: "productId", label: "Mã sản phẩm" },
      { key: "text", label: "Nội dung" },
      { key: "createdDate", label: "Ngày tạo" },
      { key: "modifiedDate", label: "Ngày cập nhật" },
      { key: "link", label: "Tuỳ chọn" }
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
                  {item.status === false ? (
                    <CButton
                      size="sm"
                      color="success"
                      onClick={() => this.toggleEnable(item.id)}
                    >
                      <CIcon name="cil-check" /> Kích hoạt
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      color="danger"
                      onClick={() => this.toggleDisable(item.id)}
                    >
                      <CIcon name="cil-x" /> &nbsp;&nbsp;Khoá&nbsp;&nbsp;&nbsp;&nbsp;
                    </CButton>
                  )}
                  &nbsp;&nbsp;&nbsp;
                </td>
              );
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
        <CModal show={this.state.toggleEnable}>
          <CModalHeader>Dừng lại!</CModalHeader>
          <CModalBody>Bình luận #{this.state.id} sẽ được kích hoạt</CModalBody>
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
              Huỷ
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal show={this.state.toggleDisable}>
          <CModalHeader>Cảnh báo!</CModalHeader>
          <CModalBody>Bình luận #{this.state.id} sẽ bị khoá</CModalBody>
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
      </CCard>
    );
  }
}

export default Comments;
