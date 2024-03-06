import Content1 from "../pages/contact/content/Content1";
import Content2 from "../pages/contact/content/Content2";
import Content3 from "../pages/contact/content/Content3";
import Menu from "../pages/contact/menu/Menu";
import Chat from "../components/chat/Chat";
import Chats from "../components/chat/Chats";
import Login from "../pages/login/Login";
import AuthLayout from "../components/authLayout/AuthLayout";
export const routes = [
    { path: '/', component: Chat, menu:<Chats/> },
    { path: '/login', component: Login, layout: AuthLayout},
    { path: '/content1', component: Content1,menu:<Menu></Menu> },
    { path: '/content2', component: Content2, menu:<Menu></Menu> },
    { path: '/content3', component: Content3, menu:<Menu></Menu> },
];