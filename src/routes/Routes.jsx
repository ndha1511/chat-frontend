import Contact from "../pages/contact/menu/Menu";
import Content1 from "../pages/contact/content/Content1";


import Home from "../pages/home/Home";
import ContactLayout from "../components/contactLayout/ContactLayout";
import Content2 from "../pages/contact/content/Content2";
import Content3 from "../pages/contact/content/Content3";


export const routes = [
    {path: '/', component: Home},
    {path: '/content1', component: Content1,layout:ContactLayout},
    {path: '/content2', component: Content2,layout:ContactLayout},
    {path: '/content3', component: Content3,layout:ContactLayout},
];