import styles from './Content1.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowDownUpLock, faArrowsUpDown, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
                        <div className={cx('locName')}>
                        <FontAwesomeIcon className={cx('iconLocName')} icon={faArrowsUpDown}/>
                        <select className={cx('optionName')} name="" id="">
                            <option value="">Tên (A-Z)</option>
                            <option value="">Tên (Z-A)</option>
                        </select>
                        </div>
                       <div className={cx('locName')} >
                       <FontAwesomeIcon className={cx('iconLocName')} icon={faFilter}/>
                       <select className={cx('optionName')} name="" id="">
                            <option value="">Tất cả</option>
                            <option value="">Phân loại</option>
                        </select>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content1
