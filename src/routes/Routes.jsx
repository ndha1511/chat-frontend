import ForgotPassword from "../auth/forgot-password/ForgotPassword";
import Login from "../auth/login/Login";
import FullLayout from "../layouts/full-layout/FullLayout";
export const routes = [
    { path: '/chat', component: FullLayout},
    { path: "/auth/login", component: Login},
    { path: "/auth/forgot-password", component: ForgotPassword}

];