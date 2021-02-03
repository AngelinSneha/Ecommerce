import React,{useState} from 'react'
import { Link } from "react-router-dom";
import {Menu} from 'antd';
import { DashboardOutlined, DatabaseOutlined,ContainerOutlined, KeyOutlined, UnorderedListOutlined, AppstoreAddOutlined , ShoppingCartOutlined} from '@ant-design/icons';
const { Item } = Menu;

function AdminNav(props) {
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
        <Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/admin/dashboard">Dashboard</Link>
        </Item>
        <Item key="createproduct" icon={<AppstoreAddOutlined />}>
            <Link to="/admin/product">Create Products</Link>
        </Item>
        <Item key="productsList" icon={<ShoppingCartOutlined />}>
            <Link to="/admin/products">products List</Link>
        </Item>
        <Item key="category" icon={<UnorderedListOutlined />}>
            <Link to="/admin/category">Category</Link>
        </Item>
        <Item key="sub" icon={<DatabaseOutlined />}>
            <Link to="/admin/sub">SubCategory</Link>
        </Item>
        <Item key="coupon" icon={<ContainerOutlined />}>
            <Link to="/admin/coupon">Coupon</Link>
        </Item>
        <Item key="password" icon={<KeyOutlined />}>
            <Link to="/user/password">Change Password</Link>
        </Item>
      </Menu>
    )
}

export default AdminNav;
