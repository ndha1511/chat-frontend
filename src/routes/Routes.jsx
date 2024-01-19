import Content1 from "../pages/contact/content/Content1";
import Content2 from "../pages/contact/content/Content2";
import Content3 from "../pages/contact/content/Content3";
import Menu from "../pages/contact/menu/Menu";
import Chat from "../components/chat/Chat";
import Chats from "../components/chat/Chats";
export const routes = [
    { path: '/', component: Chat, menu:<Chats/> },
    { path: '/content1', component: Content1,menu:<Menu></Menu> },
    { path: '/content2', component: Content2, menu:<Menu></Menu> },
    { path: '/content3', component: Content3, menu:<Menu></Menu> },
];