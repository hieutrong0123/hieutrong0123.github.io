// import Toaster from './views/notifications/toaster/Toaster';
// import Tables from './views/base/tables/Tables';

// import Breadcrumbs from './views/base/breadcrumbs/Breadcrumbs';
// import Cards from './views/base/cards/Cards';
// import Carousels from './views/base/carousels/Carousels';
// import Collapses from './views/base/collapses/Collapses';
// import BasicForms from './views/base/forms/BasicForms';

// import Jumbotrons from './views/base/jumbotrons/Jumbotrons';
// import ListGroups from './views/base/list-groups/ListGroups';
// import Navbars from './views/base/navbars/Navbars';
// import Navs from './views/base/navs/Navs';
// import Paginations from './views/base/paginations/Pagnations';
// import Popovers from './views/base/popovers/Popovers';
// import ProgressBar from './views/base/progress-bar/ProgressBar';
// import Switches from './views/base/switches/Switches';

// import Tabs from './views/base/tabs/Tabs';
// import Tooltips from './views/base/tooltips/Tooltips';
// import BrandButtons from './views/buttons/brand-buttons/BrandButtons';
// import ButtonDropdowns from './views/buttons/button-dropdowns/ButtonDropdowns';
// import ButtonGroups from './views/buttons/button-groups/ButtonGroups';
// import Buttons from './views/buttons/buttons/Buttons';
import Charts from './views/charts/Charts';
import Dashboard from './views/dashboard/Dashboard';
// import CoreUIIcons from './views/icons/coreui-icons/CoreUIIcons';
// import Flags from './views/icons/flags/Flags';
// import Brands from './views/icons/brands/Brands';
// import Alerts from './views/notifications/alerts/Alerts';
// import Badges from './views/notifications/badges/Badges';
// import Modals from './views/notifications/modals/Modals';
// import Colors from './views/theme/colors/Colors';
// import Typography from './views/theme/typography/Typography';
// import Widgets from './views/widgets/Widgets';

//Users
import Users from './views/users/Users';
// import User from './views/users/User';
import UserCreate from './views/users/UserCreate';
import UserDetails from './views/users/UserDetails';
import UserEdit from './views/users/UserEdit';


//Products
import Products from './views/products/Products';
import ProductCreate from './views/products/ProductCreate';
import ProductDetails from "./views/products/ProductDetails";
import ProductEdit from "./views/products/ProductEdit";

//Categories
import Categories from './views/categories/Categories';
import CategoryCreate from './views/categories/CategoryCreate';
import CategoryDetails from './views/categories/CategoryDetails';
import CategoryEdit from './views/categories/CategoryEdit';

//Orders
import Orders from './views/orders/Orders';
import OrderById from './views/orders/OrderById';
import OrderCreate from './views/orders/OrderCreate';

// ProductPhotos
import ProductPhotoCreate from './views/productphotos/ProductPhotoCreate';

//OrderDetails
import OrderDetails from './views/orderdetails/OrderDetails';


//Statistical
import SellingProducts from './views/statistical/SellingProducts';
import LoginHistory from './views/statistical/LoginHistory';

//Comment
import Comments from './views/comment/Comments';


const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/', exact : true, name: 'Trang chủ', component: Dashboard },
  // { path: '/dashboard', exact : true, name: 'Dashboard', component: Dashboard },
  // { path: '/theme', exact : true, name: 'Theme', component: Colors },
  // { path: '/theme/colors', exact : true, name: 'Colors', component: Colors },
  // { path: '/theme/typography', exact : true, name: 'Typography', component: Typography },
  // { path: '/base', exact : true, name: 'Base', component: Cards},
  // { path: '/base/breadcrumbs', exact : true, name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/cards', exact : true, name: 'Cards', component: Cards },
  // { path: '/base/carousels', exact : true, name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', exact : true, name: 'Collapse', component: Collapses },
  // { path: '/base/forms', exact : true, name: 'Forms', component: BasicForms },
  // { path: '/base/jumbotrons', exact : true, name: 'Jumbotrons', component: Jumbotrons },
  // { path: '/base/list-groups', exact : true, name: 'List Groups', component: ListGroups },
  // { path: '/base/navbars', exact : true, name: 'Navbars', component: Navbars },
  // { path: '/base/navs', exact : true, name: 'Navs', component: Navs },
  // { path: '/base/paginations', exact : true, name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', exact : true, name: 'Popovers', component: Popovers },
  // { path: '/base/progress-bar', exact : true, name: 'Progress Bar', component: ProgressBar },
  // { path: '/base/switches', exact : true, name: 'Switches', component: Switches },
  // { path: '/base/tables', exact : true, name: 'Tables', component: Tables },
  // { path: '/base/tabs', exact : true, name: 'Tabs', component: Tabs },
  // { path: '/base/tooltips', exact : true, name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', exact : true, name: 'Buttons', component: Buttons },
  // { path: '/buttons/buttons', exact : true, name: 'Buttons', component: Buttons },
  // { path: '/buttons/button-dropdowns', exact : true, name: 'Dropdowns', component: ButtonDropdowns },
  // { path: '/buttons/button-groups', exact : true, name: 'Button Groups', component: ButtonGroups },
  // { path: '/buttons/brand-buttons', exact : true, name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', exact : true, name: 'Charts', component: Charts },
  // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  // { path: '/icons/coreui-icons', exact : true, name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', exact : true, name: 'Flags', component: Flags },
  // { path: '/icons/brands', exact : true, name: 'Brands', component: Brands },
  // { path: '/notifications', exact : true, name: 'Notifications', component: Alerts },
  // { path: '/notifications/alerts', exact : true, name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', exact : true, name: 'Badges', component: Badges },
  // { path: '/notifications/modals', exact : true, name: 'Modals', component: Modals },
  // { path: '/notifications/toaster', exact : true, name: 'Toaster', component: Toaster },
  // { path: '/widgets', exact : true, name: 'Widgets', component: Widgets },

  //Users
  { path: '/users', exact: true,  name: 'Danh sách người dùng', component: Users },
  { path: '/users/create', exact: true, name: 'Thêm người dùng', component: UserCreate },
  { path: '/users/edit/:id', exact: true, name: 'Cập nhật người dùng', component: UserEdit },
  { path: '/users/:id', exact: true, name: 'Chi tiết người dùng', component: UserDetails },
  { path: '/statistical/loginhistory', exact: true,  name: 'Lịch sử đăng nhập', component: LoginHistory },

  //Product
  { path: '/products', exact: true,  name: 'Danh sách sản phẩm', component: Products },
  { path: '/products/create', exact: true, name: 'Thêm sản phẩm', component: ProductCreate },
  { path: '/products/edit/:id', exact: true, name: 'Cập nhật sản phẩm', component: ProductEdit },
  { path: '/products/:id', exact: true, name: 'Chi tiết sản phẩm', component: ProductDetails },

  //Categories
  { path: '/categories', exact: true,  name: 'Danh sách danh mục', component: Categories },
  { path: '/categories/create', exact: true, name: 'Thêm danh mục', component: CategoryCreate },
  { path: '/categories/:id', exact: true,  name: 'Chi tiết danh mục', component: CategoryDetails },
  { path: '/categories/edit/:id', exact: true, name: 'Cập nhật danh mục', component: CategoryEdit },
  
  //Orders
  { path: '/orders', exact: true,  name: 'Danh sách đơn hàng', component: Orders },
  {path: '/orders/create', exact: true, name: 'Thêm đơn hàng', component: OrderCreate},
  { path: '/orders/:id', exact: true,  name: 'Xem thêm đơn hàng', component: OrderById },
  
  //ProductPhoto
  { path: '/productphotos/create', exact: true,  name: 'Thêm hình ảnh sản phẩm', component: ProductPhotoCreate },

  //OrderDetails
  { path: '/orderdetails/:id', exact: true,  name: 'Chi tiết hoá đơn', component: OrderDetails },

  //Statistical
  { path: '/statistical/sellingProducts', exact: true,  name: 'Sản phẩm bán chạy', component: SellingProducts },

  //Comment
  { path: '/comments', exact: true,  name: 'Danh sách bình luận', component: Comments },
  
];

export default routes;