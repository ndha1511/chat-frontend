
import Content1 from "../pages/contact/content/Content1";


import Home from "../pages/home/Home";

import Content2 from "../pages/contact/content/Content2";
import Content3 from "../pages/contact/content/Content3";
import Menu from "../pages/contact/menu/Menu";
import Chat from "../components/chat/Chat";


export const routes = [
    { path: '/', component: Chat, menu:<Menu/> },
    { path: '/content1', component: Content1,menu:<Menu></Menu> },
    { path: '/content2', component: Content2, menu:<Menu></Menu> },
    { path: '/content3', component: Content3, menu:<Menu></Menu> },
];