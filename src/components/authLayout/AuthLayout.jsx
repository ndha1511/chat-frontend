import Login from "../../pages/login/Login";
import styles from "./AuthLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AuthLayout({children}) {
    return (
        <div className={cx("wrapper")}>
            {children}
        </div>
    );
}

export default AuthLayout;