import React,{useState} from 'react'
import { Link } from "react-router-dom";
import {Menu} from 'antd';
import { DashboardOutlined, KeyOutlined  , ShoppingCartOutlined} from '@ant-design/icons';
const { Item } = Menu;

function UserNav(props) {
    const [current, setCurrent] = useState(props.name);
    const handleClick = e => {
        setCurrent(e.key);
      };
    return (
        <Menu
        // theme="dark"
        onClick={handleClick}
        style={{ width: 256 }}
        selectedKeys={[current]}
        mode="inline"
      >
        <Item key="history" icon={<DashboardOutlined />}>
            <Link to="/user/history">Dashboard</Link>
        </Item>
        <Item key="password" icon={<KeyOutlined />}>
            <Link to="/user/password">Change Password</Link>
        </Item>
        <Item key="wishlist" icon={<ShoppingCartOutlined />}>
            <Link to="/user/wishlist">Your Wishlist</Link>
        </Item>
      </Menu>
    )
}

export default UserNav;
