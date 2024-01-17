import styles from '../defaultLayout/DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import Navigation from '../navigation/Navigation';
import Menu from '../../pages/contact/menu/Menu';

const cx = classNames.bind(styles);
function ContactLayout({children}) {
    return ( 
        <div className={cx("wrapper")}>
            <Navigation/>
            <Menu/>
            {children}
        </div>
     );
}

export default ContactLayout;