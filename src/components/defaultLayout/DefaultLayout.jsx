import Home from '../../pages/home/Home';
import Navigation from '../navigation/Navigation';
import Search from '../search/Search';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DefaultLayout({ children, menu }) {
    return (
        <div className={cx("wrapper")}>
            <Navigation />
            <div className={cx("wrapper1")}>
                <Search />
                <div  className={cx("menu")}>
                {menu}
                </div>
            </div>
            {children}
        </div>
    );
}

export default DefaultLayout;