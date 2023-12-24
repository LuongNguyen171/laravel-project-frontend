import OnlyLayout from '~/components/Layout/OnlyLayout';
import HideFooterLayout from '~/components/Layout/HideFooterLayout';

import Home from '~/components/pages/home';
import Contact from '~/components/pages/contact';
import Introduction from '~/components/pages/introduction';
import News from '~/components/pages/news';
import Product from '~/components/pages/product';
import Detail from '~/components/pages/private_pages/detail';
import Cart from '~/components/pages/private_pages/cart';
import Register from '~/components/pages/register';
import Login from '~/components/pages/login';
import ForgotPassword from '~/components/pages/forgotPassword';
import ResetPassword from '~/components/pages/resetPassword';
import Bill from '~/components/pages/bill';
import SportShoe from '~/components/pages/sportShoe';
import RunShoe from '~/components/pages/runShoe';
import BasketShoe from '~/components/pages/basketShoe';
import Personal from '~/components/pages/private_pages/account';
import UserList from '~/components/pages/admin/userListPage';
import ProductList from '~/components/pages/admin/productListPage';
import Blog from '~/components/pages/Blog';

const publicRouters = [
    { path: '/', component: Home },
    { path: '/contact', component: Contact },
    { path: '/introduction', component: Introduction },
    { path: '/news', component: News },
    { path: '/blog/:id', component: Blog },
    { path: '/product', component: Product },
    { path: '/sportShoe', component: SportShoe },
    { path: '/runShoe', component: RunShoe },
    { path: '/basketShoe', component: BasketShoe },
    { path: '/detail', component: Detail },
    { path: '/cart', component: Cart },
    { path: '/register', component: Register, layout: OnlyLayout },
    { path: '/login', component: Login, layout: OnlyLayout },
    { path: '/user/account', component: Personal },
    {
        path: '/user/forgot-password',
        component: ForgotPassword,
        layout: OnlyLayout,
    },
    {
        path: '/user/reset-password',
        component: ResetPassword,
        layout: OnlyLayout,
    },
    { path: '/bill/create-bill', component: Bill, layout: OnlyLayout },
    { path: '/admin/userList', component: UserList, layout: HideFooterLayout },
    {
        path: '/admin/productList',
        component: ProductList,
        layout: HideFooterLayout,
    },
];

export { publicRouters };
