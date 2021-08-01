import React, { Component } from "react";
import { CChartBar, CChartDoughnut } from "@coreui/react-chartjs";
import { CCard, CCardBody, CCardGroup, CCardHeader } from "@coreui/react";
import { DocsLink } from "src/reusable";
import orderservice_json from "src/service/orderservice_json";

import moment from "moment";

class ChartBarOrders extends Component {
  state = {
    list: null,
    arrTotalMoney: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    arrTotalMoneyLastYear: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    arrTotalMoneyThisYear: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    arrTotalMoneyLastYear_Online: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    arrTotalMoneyThisYear_Online: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    arrTotalMoneyLastYear_Offline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    arrTotalMoneyThisYear_Offline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    arrTotalStatus: [0, 0, 0, 0, 0, 0, 0, 0],
    thisYear: moment().format("YYYY")
  };
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    orderservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ list: res.data.resultObj }, () =>
            console.log(this.state.list)
          );

          for (let i = 0; i < res.data.resultObj.length; i++) {
            if (res.data.resultObj[i].statusId == 7) {
              if (res.data.resultObj[i].createdDate !== null) {
                {
                  if (
                    res.data.resultObj[i].createdDate.substring(0, 4) ==
                    this.state.thisYear
                  ) {
                    // console.log(res.data.resultObj[i].createdDate.substring(0,4));
                    // console.log(this.state.thisYear);
                    if (res.data.resultObj[i].statusId !== 0) {
                      // console.log(res.data.resultObj[i].statusId);

                      let date = new Date(
                        String(res.data.resultObj[i].createdDate)
                      );
                      this.state.arrTotalMoneyThisYear[
                        date.getMonth()
                      ] += res.data.resultObj[i].totalMoney;
                    }
                  } else if (
                    res.data.resultObj[i].createdDate.substring(0, 4) ==
                    this.state.thisYear - 1
                  ) {
                    // console.log(res.data.resultObj[i].createdDate.substring(0,4));
                    if (res.data.resultObj[i].statusId !== 0) {
                      // console.log(res.data.resultObj[i].statusId);

                      let date = new Date(
                        String(res.data.resultObj[i].createdDate)
                      );
                      this.state.arrTotalMoneyLastYear[
                        date.getMonth()
                      ] += res.data.resultObj[i].totalMoney;
                    }
                  }
                }                
                if (res.data.resultObj[i].paymentMethod !== "Tại cửa hàng") {
                  if (
                    res.data.resultObj[i].createdDate.substring(0, 4) ==
                    this.state.thisYear
                  ) {
                    if (res.data.resultObj[i].statusId !== 0) {
                      let date = new Date(
                        String(res.data.resultObj[i].createdDate)
                      );
                      this.state.arrTotalMoneyThisYear_Online[
                        date.getMonth()
                      ] += res.data.resultObj[i].totalMoney;
                    }
                  } else if (
                    res.data.resultObj[i].createdDate.substring(0, 4) ==
                    this.state.thisYear - 1
                  ) {
                    if (res.data.resultObj[i].statusId !== 0) {
                      let date = new Date(
                        String(res.data.resultObj[i].createdDate)
                      );
                      this.state.arrTotalMoneyLastYear_Online[
                        date.getMonth()
                      ] += res.data.resultObj[i].totalMoney;
                    }
                  }
                } else {
                  if (
                    res.data.resultObj[i].createdDate.substring(0, 4) ==
                    this.state.thisYear
                  ) {
                    if (res.data.resultObj[i].statusId !== 0) {
                      let date = new Date(
                        String(res.data.resultObj[i].createdDate)
                      );
                      this.state.arrTotalMoneyThisYear_Offline[
                        date.getMonth()
                      ] += res.data.resultObj[i].totalMoney;
                    }
                  } else if (
                    res.data.resultObj[i].createdDate.substring(0, 4) ==
                    this.state.thisYear - 1
                  ) {
                    if (res.data.resultObj[i].statusId !== 0) {
                      let date = new Date(
                        String(res.data.resultObj[i].createdDate)
                      );
                      this.state.arrTotalMoneyLastYear_Offline[
                        date.getMonth()
                      ] += res.data.resultObj[i].totalMoney;
                    }
                  }
                }                
              }
            }
          }

          // res.data.resultObj.map(item => {
          //   let date = new Date(String(item.createdDate));
          //   this.state.arrTotalMoney[date.getMonth()] += item.totalMoney;
          //   return null
          // });
          res.data.resultObj.map(item => {
            this.state.arrTotalStatus[item.statusId - 1] += 1;
            return null;
          });
        } else {
          alert(res.data.message);
        }
      })
      // .catch(err => console.log(err));
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }
  render() {
    return (
      <CCardGroup>
        <CCardGroup columns className="cols-2">
          <CCard>
            <CCardHeader>
              Thống kê doanh thu cả hai kênh bán hàng
              <DocsLink href="http://www.chartjs.org" />
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: "Doanh thu năm " + [this.state.thisYear - 1],
                    backgroundColor: "#321fdb",
                    data: this.state.arrTotalMoneyLastYear
                  },
                  {
                    label: "Doanh thu năm " + this.state.thisYear,
                    backgroundColor: "#FF0000",
                    data: this.state.arrTotalMoneyThisYear
                  }
                ]}
                labels="months"
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
              />
            </CCardBody>
          </CCard>

          <CCard>
            <CCardHeader>Trạng thái đơn hàng</CCardHeader>
            <CCardBody>
              <CChartDoughnut
                datasets={[
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#D53766",
                      "#1EBE53",
                      "#78D1c9",
                      "#321FDB",
                      "#DD1B16"
                    ],
                    data: this.state.arrTotalStatus
                  }
                ]}
                labels={[
                  "Đặt hàng thành công",
                  "Đã tiếp nhận",
                  "Đang lấy hàng",
                  "Đóng gói xong",
                  "Bàn giao vận chuyển",
                  "Đang vận chuyển",
                  "Giao hàng thành công",
                  "Đơn hàng bị huỷ"
                ]}
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
              />
            </CCardBody>
          </CCard>
          
          </CCardGroup>

          
          
        <CCardGroup columns className="cols-2">

          <CCard>
            <CCardHeader>
              Thống kê doanh thu trực tuyến so với tại cửa hàng {this.state.thisYear - 1}
              <DocsLink href="http://www.chartjs.org" />
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: "Doanh thu trực tuyến " + [this.state.thisYear - 1],
                    backgroundColor: "#321fdb",
                    data: this.state.arrTotalMoneyLastYear_Online
                  },
                  {
                    label: "Doanh thu tại cửa hàng " + [this.state.thisYear - 1],
                    backgroundColor: "#FF0000",
                    data: this.state.arrTotalMoneyLastYear_Offline
                  }
                ]}
                labels="months"
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
              />
            </CCardBody>
          </CCard>

          <CCard>
            <CCardHeader>
            Thống kê doanh thu trực tuyến so với tại cửa hàng {this.state.thisYear}
              <DocsLink href="http://www.chartjs.org" />
            </CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={[
                  {
                    label: "Doanh thu trực tuyến " + this.state.thisYear,
                    backgroundColor: "#321fdb",
                    data: this.state.arrTotalMoneyThisYear_Online
                  },
                  {
                    label: "Doanh thu tại cửa hàng " + this.state.thisYear,
                    backgroundColor: "#FF0000",
                    data: this.state.arrTotalMoneyThisYear_Offline
                  }
                ]}
                labels="months"
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
              />
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCardGroup>
    );
  }
}

export default ChartBarOrders;
