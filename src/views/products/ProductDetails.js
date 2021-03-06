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
  CSelect,
  CRow,
  CImg,
  CDataTable,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from "@coreui/react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import productservice_json from "src/service/productservice_json";
import categoryservice_json from "src/service/categoryservice_json";

import { CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import productphotoservice_json from "src/service/productphotoservice_json";

class ProductDetails extends Component {
  state = {
    id: "",
    name: "",
    price: "",
    specifications: "",
    description: "",
    goodsReceipt: "",
    inventory: "",
    status: "",
    categoryId: "",
    alias: "",
    createdDate: "",
    modifiedDate: null,
    createdBy: "",
    modifiedBy: null,
    productPhotos: [],
    categoryList: null,
    list: null,
    loading: true,
    toggleDelete: false,
    idPhoto: null
  };

  escFunction = this.escFunction.bind(this);

  componentDidMount() {
    this.loadData();
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  changeHandler = e => {
    //Do Nothing
  };

  cancel() {
    this.props.history.push("/products");
  }

  edit() {
    this.props.history.push(`/products/edit/${this.state.id}`);
  }

  deletePhoto() {
    console.log(this.state.idPhoto);
    this.setState({ toggleDelete: false });
    productphotoservice_json
      .deletebyId(this.state.idPhoto)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
          // window.location.reload();
          this.refresh();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err =>alert("M??y ch??? ??ang b???n, vui l??ng th??? l???i sau"));
  }

  refresh()
  {
    var url = window.location.pathname;
    this.props.history.push(`/`);
    this.props.history.push(url);
  }

  toggleDelete = idPhoto => {
    this.setState({ toggleDelete: true, idPhoto: idPhoto });
  };

  escFunction(event) {
    if (event.keyCode === 27) {
      this.setState({ toggleDelete: false });
    }
  }

  loadData() {
    categoryservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ categoryList: res.data.resultObj });
          console.log(this.state.categoryList);
        } else {
          alert(res.dat.message);
        }
      })
      .catch(err =>alert("M??y ch??? ??ang b???n, vui l??ng th??? l???i sau"));

    productservice_json
      .getbyId(this.props.match.params.id)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            if (res.data.resultObj.modifiedDate !== null) {
              this.setState({
                modifiedDate: res.data.resultObj.modifiedDate.substring(0, 10)
              });
            } else {
              this.setState({
                modifiedDate: res.data.resultObj.modifiedDate
              });
            }
            this.setState({
              id: res.data.resultObj.id,
              name: res.data.resultObj.name,
              price: res.data.resultObj.price,
              specifications: res.data.resultObj.specifications,
              description: res.data.resultObj.description,
              goodsReceipt: res.data.resultObj.goodsReceipt,
              inventory: res.data.resultObj.inventory,
              status: res.data.resultObj.status,
              categoryId: res.data.resultObj.categoryId,
              alias: res.data.resultObj.alias,
              createdDate: res.data.resultObj.createdDate.substring(0, 10),
              createdBy: res.data.resultObj.createdBy,
              modifiedBy: res.data.resultObj.modifiedBy,
              productPhotos: res.data.resultObj.productPhotos,
              list: res.data.resultObj.productPhotos,
              loading: false
            });
          }
          console.log(this.state.list);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err =>alert("M??y ch??? ??ang b???n, vui l??ng th??? l???i sau"));
  }

  render() {
    const fields = [
      { key: "id", label: "M?? h??nh ???nh" },
      { key: "url", label: "H??nh ???nh" },
      { key: "link", label: "Tu??? ch???n" }
    ];
    return this.state.loading === true ? (
      <h1>??ang t???i d??? li???u vui v??ng ch??? trong gi??y l??t</h1>
    ) : (
      <>
        <CRow>
          <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Chi ti???t s???n ph???m
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">M?? s???n ph???m</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="id"
                        placeholder="M?? s???n ph???m"
                        value={this.state.id}
                        onChange={this.changeHandler}
                        disabled
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">T??n s???n ph???m</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="name"
                        placeholder="T??n s???n ph???m"
                        value={this.state.name}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">B?? danh</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="alias"
                        placeholder="B?? danh"
                        value={this.state.alias}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Danh m???c</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.categoryList === null ? (
                        <h3>??ang t???i</h3>
                      ) : (
                        <CSelect
                          name="categoryId"
                          onChange={this.changeHandler}
                          disabled
                        >
                          <option
                            key={Number(0)}
                            value=""
                            selected={this.state.categoryId === ""}
                          >
                            L???a ch???n
                          </option>
                          {this.state.categoryList.map(item => {
                            return (
                              <option
                                value={item.id}
                                selected={this.state.categoryId === item.id}
                                key={item.id}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </CSelect>
                      )}
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Gi?? b??n</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="price"
                        placeholder="Gi?? b??n"
                        value={this.state.price}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">
                        Th??ng s??? k??? thu???t
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CKEditor
                      disabled
                      editor = {ClassicEditor}
                      data = {this.state.specifications}
                      onChange = {(e, editor) => {
                        this.setState({specifications: editor.getData()})
                      }}
                      />
                      {/* &nbsp;
                      <CTextarea
                        name="specifications"
                        rows="3"
                        placeholder="Th??ng s??? k??? thu???t"
                        value={this.state.specifications}
                        onChange={this.changeHandler}
                      /> */}
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">M?? t???</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        name="description"
                        rows="3"
                        placeholder="M?? t???"
                        value={this.state.description}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">S??? l?????ng nh???p</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="goodsReceipt"
                        placeholder="S??? l?????ng nh???p"
                        value={this.state.goodsReceipt}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">S??? l?????ng t???n</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="inventory"
                        placeholder="S??? l?????ng t???n"
                        value={this.state.inventory}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Tr???ng th??i</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="0"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(0)}
                          checked={this.state.status === 0}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="0">
                          M???c ?????nh
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="1"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(1)}
                          checked={this.state.status === 1}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="1">
                          H??ng m???i v???
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="2"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(2)}
                          checked={this.state.status === 2}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="2">
                          ???? kho??
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="3"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(3)}
                          checked={this.state.status === 3}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="3">
                          ???? xo??
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="date-input">Ng??y t???o</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="date"
                        name="createdDate"
                        placeholder="Ng??y t???o"
                        disabled
                        value={this.state.createdDate}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  {this.state.modifiedDate !== null ? (
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="date-input">Ng??y c???p nh???t</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          type="date"
                          name="modifiedDate"
                          placeholder="ModifiedDate"
                          disabled
                          value={this.state.modifiedDate}
                          onChange={this.changeHandler}
                        />
                      </CCol>
                    </CFormGroup>
                  ) : null}

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Ng?????i t???o</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="createdBy"
                        placeholder="Ng?????i t???o"
                        value={this.state.createdBy}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  {this.state.modifiedBy !== null ? (
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Ng?????i c???p nh???t</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          name="modifiedBy"
                          placeholder="Ng?????i c???p nh???t"
                          value={this.state.modifiedBy}
                          onChange={this.changeHandler}
                        />
                      </CCol>
                    </CFormGroup>
                  ) : null}
                                    <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">H??nh ???nh</CLabel>
                    </CCol>
                    <CCol xs="12" md="9" align="center">
                      <CDataTable
                        items={this.state.list}
                        fields={fields}
                        // tableFilter
                        // itemsPerPageSelect
                        // itemsPerPage={5}
                        hover
                        // pagination
                        scopedSlots={{
                          url: item => {
                            return (
                              <td>
                                <CImg src={item.url} width="250px" />
                              </td>
                            );
                          },
                          link: item => {
                            return (
                              <td>
                                <CButton
                                  size="sm"
                                  color="danger"
                                  onClick={() => this.toggleDelete(item.id)}
                                >
                                  <CIcon name="cil-ban" /> Xo??
                                </CButton>
                                &nbsp;&nbsp;&nbsp;
                              </td>
                            );
                          }
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton size="sm" color="primary" onClick={() => this.edit()}>
                  <CIcon name="cil-settings" /> C???p nh???t
                </CButton>
                &nbsp;&nbsp;&nbsp;                
                <Link
                  to={{
                    pathname: `/productphotos/create`,
                    productId: this.state.id
                  }}
                >
                  <CButton color="success" size="sm">
                    <CIcon name="cil-scrubber" />
                    Th??m h??nh ???nh
                  </CButton>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link
                  to={{
                    pathname: `/products/inventory`,
                    productId: this.state.id
                  }}
                >
                  <CButton color="info" size="sm">
                    <CIcon name="cil-star" />
                    Nh???p s???n ph???m
                  </CButton>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <CButton color="dark" size="sm" onClick={() => this.cancel()}>
                  <CIcon name="cil-home" />
                  Tr??? v??? danh s??ch
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>

        <CModal show={this.state.toggleDelete}>
          <CModalHeader>D???ng l???i!</CModalHeader>
          <CModalBody>H??nh ???nh #{this.state.idPhoto} s??? b??? xo??</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.deletePhoto()}>
              ?????ng ??
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                this.setState({ toggleDelete: false });
              }}
            >
              Hu???
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  }
}

export default ProductDetails;
