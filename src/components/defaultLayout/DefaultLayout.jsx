
import Navigation from '../navigation/Navigation';
import Search from '../search/Search';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


function DefaultLayout(props) {
    return (
        <div className={cx("wrapper")}>
            <div>
                <Navigation />
            </div>
            <div className={cx("search")}>
                <Search/>
                {props.menu}
            </div>
            {props.children}
        </div>
    );
}

export default DefaultLayout;