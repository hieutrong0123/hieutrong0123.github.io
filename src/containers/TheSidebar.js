import React, {useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
// import navigationAdmin from './_navAdmin'
// import navigationEmployee from './_navEmployee'

const TheSidebar = () => {
  const [nav, setNav ] = useState([])
  //const state = {nav: []}
  //setNav = this.setState({nav: navigation()})
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  const getType = async () =>{
    let a = await navigation()
    //doi wait lam xong thi moi lam tiep
    setNav(a)
    // console.log(a)
  }
  useEffect(()=>{
    getType()
  },[])
  //componentDidMount
  return (
    <CSidebar
      show={show}
      onShowChange={val => dispatch({ type: "set", sidebarShow: val })}
    >
      {/* <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand> */}
      <CSidebarBrand className="d-md-down-none" to="/">
        <CImg src="/logo/logo.png" width="190px" />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={nav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
}

export default React.memo(TheSidebar)
