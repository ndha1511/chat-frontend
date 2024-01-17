import Contact from "../pages/contact/menu/Menu";
import Content1 from "../pages/contact/content/Content1";


import Home from "../pages/home/Home";
import ContactLayout from "../components/contactLayout/ContactLayout";


export const routes = [
    {path: '/', component: Home},
    {path: '/content1', component: Content1,layout:ContactLayout},
];