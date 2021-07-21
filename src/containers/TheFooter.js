import React from 'react'
import { CFooter, CCardHeader,  } from '@coreui/react'
import CIcon from "@coreui/icons-react";
import moment from "moment";

const TheFooter = () => {
  var thisYear = moment().format("YYYY")
  return (
    <CFooter fixed={false}>
      <div>
        <span className="mr-1">Địa chỉ: Số 1, Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.HCM</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="mr-1">Số điện thoại: 038 4341 437</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="mr-1">Email: Electronicshop0123@gmail.com</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="ml-1">&copy; {thisYear} Electronicshop</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)