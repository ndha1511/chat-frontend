import Navigation from '../navigation/Navigation';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <div>
                <Navigation />
            </div>
            {children}
        </div>
    );
}

export default DefaultLayout;