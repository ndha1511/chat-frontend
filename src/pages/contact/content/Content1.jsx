import styles from './Content1.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowDownUpLock, faArrowsUpDown, faChevronDown, faEllipsisH, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Content1() {
    const data = [
        { kh: 'A' },
        { kh: 'A' },
        { kh: 'A' },
        { kh: 'A' },
        { kh: 'A' },
        { kh: 'A' },
        { kh: 'A' },
        { kh: 'A' },
        { kh: 'A' },
        { kh: 'A' },
        { kh: 'A' },
    ]

    const data1 = [
        { name: 'Tran Cong Minh' },
        { name: 'Tran Cong Minh' },
 

    ]
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
                            <FontAwesomeIcon className={cx('iconSearch')} icon={faMagnifyingGlass} />
                            <input className={cx('input')} placeholder='tìm bạn' />
                        </div>
                        <button className={cx('locName')}>
                            <FontAwesomeIcon className={cx('iconLocName')} icon={faArrowsUpDown} />
                            <div className={cx('optionName')}>Tên (A-Z)</div>
                            <FontAwesomeIcon className={cx('iconLocName')} icon={faChevronDown} />
                        </button>
                        <button className={cx('locName')} >
                            <FontAwesomeIcon className={cx('iconLocName')} icon={faFilter} />
                            <div className={cx('optionName')}>Tên (Z-A)</div>
                            <FontAwesomeIcon className={cx('iconLocName')} icon={faChevronDown} />
                        </button>
                    </div>
                    <div className={cx('center1')}>
                        {data.map((value, index) => (
                            <div key={index} className={cx('data')}>
                               <div className={cx('a')}> {value.kh}</div>
                                {data1.map((value,index)=>(
                                    <button className={cx('data1')}>
                                        <img className={cx('img')}  src='https://anhdephd.vn/wp-content/uploads/2022/05/hinh-anh-meo-cute-de-thuong.jpg' alt='avatar'/>
                                        <div className={cx('aa')}>
                                        {value.name}
                                        <button className={cx('button')} ><FontAwesomeIcon icon={faEllipsisH} /></button>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content1
