import styles from './Content1.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowDownUpLock, faArrowsUpDown, faChevronDown, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Content1() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faAddressCard} />
                </div>
                <div className={cx('text')}>Danh sách bạn bè</div>
            </div>
            <div className={cx('center')}>
                <div className={cx('text1')} >Bạn bè(123)</div>
                <div className={cx('content')}>
                    <div className={cx('top1')}>
                        <div className={cx('search')}>
                        <FontAwesomeIcon className={cx('iconSearch')} icon={faMagnifyingGlass}/>
                        <input className={cx('input')} placeholder='tìm bạn' />
                        </div>
                        <button className={cx('locName')}>
                        <FontAwesomeIcon className={cx('iconLocName')} icon={faArrowsUpDown}/>
                        <div className={cx('optionName')}>Tên (A-Z)</div>
                        <FontAwesomeIcon className={cx('iconLocName')} icon={faChevronDown}/>
                        </button>
                       <button className={cx('locName')} >
                       <FontAwesomeIcon className={cx('iconLocName')} icon={faFilter}/>
                       <div className={cx('optionName')}>Tên (Z-A)</div>
                        <FontAwesomeIcon className={cx('iconLocName')} icon={faChevronDown}/>
                       </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content1
