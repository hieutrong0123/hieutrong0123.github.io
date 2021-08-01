// import React from "react";
// import CIcon from "@coreui/icons-react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

let defaultNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Trang chủ",
    to: "/",
    icon:'cil-home'
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Thanh điều hướng"]
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Thống kê',
    to: '/widgets',
    icon:'cil-chart-pie',
    badge: {
      color: 'info'
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Sản phẩm bán chạy",
        to: "/statistical/sellingProducts"
      },
      {
      _tag: "CSidebarNavItem",
      name: "Lượt đăng nhập",
      to: "/statistical/loginhistory"
      }
    ]
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Quản ký sản phẩm",
    icon:'cil-spreadsheet',
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Thêm",
        to: "/products/create"
      },
      {
        _tag: "CSidebarNavItem",
        name: "Xem danh sách",
        to: "/products"
      }
    ]
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Quản lý danh mục",
    icon:'cil-list',
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Thêm",
        to: "/categories/create"
      },
      {
        _tag: "CSidebarNavItem",
        name: "Xem danh sách",
        to: "/categories"
      }
    ]
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Quản lý đơn hàng",
    icon: 'cil-basket',
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Thêm đơn hàng",
        to: "/orders/create"
      },
      {
        _tag: "CSidebarNavItem",
        name: "Xem danh sách và duyệt đơn",
        to: "/orders"
      }
    ]
  },
  {
    _tag: "CSidebarNavItem",
    name: "Quản lý bình luận",
    to: "/comments",
    icon:'cil-comment-square'
  },
  {
    _tag: "CSidebarNavItem",
    name: "Quản lý đánh giá",
    to: "/reviews",
    icon:'cil-star'
  }
];

const adminAddOn = {
  _tag: "CSidebarNavDropdown",
  name: "Quản lý người dùng",
  icon: "cil-user",
  _children: [
    {
      _tag: "CSidebarNavItem",
      name: "Thêm",
      to: "/users/create"
    },
    {
      _tag: "CSidebarNavItem",
      name: "Xem danh sách",
      to: "/users"
    }
  ]
};

const returnByAuth = () => {
  let Role = null;
  const token = Cookies.get("Token");
  if (token !== null && token !== undefined) {
    let tokenDecode = jwt_decode(token);
    Object.keys(tokenDecode).forEach(function(key) {
      let res = key.split("/");
      if (res.length > 1) {
        if (res[res.length - 1] === "role") {
          Role = tokenDecode[key];
        }
      }
    });
  }
  console.log(Role);
  if (Role === "Admin") {
    defaultNav.push(adminAddOn)
    return defaultNav;
  } else if (Role === "Emp") {
    return defaultNav;
  }
};

export default returnByAuth;
