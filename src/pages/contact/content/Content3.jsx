import styles from './Content3.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Content3() {
    const [isMenu1Visible, setMenu1Visible] = useState(false);

 

    const handleItemHover = () => {
        setMenu1Visible(!isMenu1Visible);
      };


    const data = [
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
        { names: 'Công Minh', groups: 'nhóm 1' },
    ]
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className={cx('text')}>Lời mời kết bạn</div>
            </div>
            <div className={cx('center')}>
                <div className={cx('content1')} ></div>
                <div className={cx('content2')}>
                    <div className={cx('text1')} >Gợi ý kết bạn (45)
                        <button className={cx('hover')}
                         onClick={handleItemHover}>
                                <FontAwesomeIcon icon={faTerminal} />

                        </button>
                    </div>
                    {isMenu1Visible && (
                        <div className={cx('items')}>
                            {data.map((value, index) => (
                                <div
                                    key={index}
                                    className={cx('item')}
                        
                                >
                                    <div className={cx('item1')}>
                                        <img
                                            className={cx('img')}
                                            src='https://anhdephd.vn/wp-content/uploads/2022/05/hinh-anh-meo-cute-de-thuong.jpg'
                                            alt='avatar'
                                        />
                                        <div className={cx('text2')}>
                                            <h4>{value.names}</h4>
                                            <h5>{value.groups}</h5>
                                        </div>
                                    </div>
                                    <div className={cx('btn')}>
                                        <button>Bỏ qua</button>
                                        <button>Kết bạn</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Content3
