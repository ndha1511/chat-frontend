import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.scss'
import classNames from 'classnames/bind';
import Navigation from '../../../components/navigation/Navigation';



const cx = classNames.bind(styles);

function Menu() {

    const items_top = [
        { tippyText: 'Danh sách bạn bè', },
        { tippyText: 'Danh sách nhóm', },
        { tippyText: 'Lời mời kết bạn', },
    ]
    
    const navigate = useNavigate();
    const handleNavigate = (value)=>{
        switch(value.tippyText){
            case 'Danh sách bạn bè':
                navigate('/content1');
                break;
            case 'Danh sách nhóm':
                navigate('');
                break;
            case 'Lời mời kết bạn':
                navigate('')
                break;
        }
    }


    return (
        <div className={cx('wrapper')}>
         <div className={cx('items')}>
         {items_top.map((value,index)=>(
                <button key={index} className={cx('item')} onClick={()=>{handleNavigate(value)}}>
                    {value.tippyText}
                </button>
            ))}
         </div>
       
        </div>
    );
}

export default Menu;