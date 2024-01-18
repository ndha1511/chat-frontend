import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { faSearch, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx("header")}>
            <div className={cx("search")}>
                <button><FontAwesomeIcon icon={faSearch} /></button>
                <input placeholder='Tìm kiếm' />
            </div>
            <button><FontAwesomeIcon icon={faUserPlus} /></button>
            <button><FontAwesomeIcon icon={faUserGroup} /></button>
        </div>
    );
}

export default Search;