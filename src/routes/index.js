import Home from '~/page/Home/home';
import Category from '~/page/Category/category';
import Login from '~/page/Login/login';
import StoreInfor from "~/page/StoreInfor/StoreInfor"
import DetailProduct from '~/page/DetailProduct/detailProduct';
import Error404 from '~/page/Error404/Error404';
import Search from '~/page/Search/serch';
import MyStore from '~/page/MyStore/myStore'
import Profile from '~/page/Profile/profile';
import  {UpdateInfo}  from '~/page/Profile/updateInfo';
import  {ChangePassword}  from '~/page/Profile/changePassword';
import  {FavouriteProduct}  from '~/page/Profile/favourite_product';


const pageRoutes = [
    {path:'/',component: Home,layout:true},
    {path:'/category/:categoryID',component: Category},
    {path:'/login',component: Login},
    {path:'/product/:productID',component: DetailProduct},
    {path: "/storeInfor",component: StoreInfor},
    {path: "/search",component: Search},
    {path: "/myStore",component: MyStore},
]

const pagePrivate = [
    {path: "/profile",component: Profile},
    {path: "/profile/update-info",component: UpdateInfo},
    {path: "/profile/change-pass",component: ChangePassword},
    {path: "/profile/wishlist",component: FavouriteProduct},
    {path: "*",component: Error404},
]


export {pageRoutes, pagePrivate}