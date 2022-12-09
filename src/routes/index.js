import Home from '~/pages/Home/home';
import Category from '~/pages/Category/category';
import Login from '~/pages/Login/login';
import StoreInfor from "~/pages/StoreInfor/StoreInfor"
import DetailProduct from '~/pages/DetailProduct/detailProduct';
import Error404 from '~/pages/Error404/Error404';
import Search from '~/pages/Search/search';
import MyStore from '~/pages/MyStore/myStore'
import Profile from '~/pages/Profile/profile';
import  {UpdateInfo}  from '~/pages/Profile/updateInfo';
import  {ChangePassword}  from '~/pages/Profile/changePassword';
import  {FavouriteProduct}  from '~/pages/Profile/favourite_product';
import { Checkout } from '~/pages/Checkout/checkout';

const pageRoutes = [
    {path:'/',component: Home},
    {path:'/login', component: Login},
    {path:'/category/:categoryID',component: Category},
    {path:'/product/:productID',component: DetailProduct},
    {path: "/storeInfor",component: StoreInfor},
    {path: "/search",component: Search},
    {path: "/myStore",component: MyStore},
    {path: "*",component: Error404},
]

const pagePrivate = [
    {path: '/checkout', component: Checkout},
    {path: "/profile",component: Profile},
    {path: "/profile/update-info",component: UpdateInfo},
    {path: "/profile/change-pass",component: ChangePassword},
    {path: "/profile/wishlist",component: FavouriteProduct},
]


export {pageRoutes, pagePrivate}