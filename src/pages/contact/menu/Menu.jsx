import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faEnvelope, faLifeRing } from '@fortawesome/free-regular-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Menu() {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const items_top = [
    { tippyText: 'Danh sách bạn bè', icon: faAddressCard },
    { tippyText: 'Danh sách nhóm', icon: faUserGroup },
    { tippyText: 'Lời mời kết bạn', icon: faEnvelope },
  ];

  const handleNavigate = (value) => {
    if (selectedItem === value.tippyText) {
      // Đã click vào mục đang được chọn, không còn hover nữa
      return;
    }

    setSelectedItem(value.tippyText);

    switch (value.tippyText) {
      case 'Danh sách bạn bè':
        navigate('/content1');
        break;
      case 'Danh sách nhóm':
        navigate('/content2');
        break;
      case 'Lời mời kết bạn':
        navigate('/content3');
        break;
      default:
        break;
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('items')}>
        {items_top.map((value, index) => (
          <button
            key={index}
            className={cx('item', {
              'item-selected': selectedItem === value.tippyText,
            })}
            onClick={() => handleNavigate(value)}
          >
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={value.icon} />
            </div>
            <div className={cx('text')}>{value.tippyText}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menu;
