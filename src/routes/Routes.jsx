import Login from "../auth/login/Login";
import FullLayout from "../layouts/full-layout/FullLayout";
export const routes = [
    { path: '/chat', component: FullLayout},
    { path: "/auth/login", component: Login}

];