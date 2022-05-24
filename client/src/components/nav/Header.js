import React, {useState} from 'react'
import {Menu, Badge} from 'antd';
import {Link, useHistory} from "react-router-dom"
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, ShoppingOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import Search from '../forms/Search';

const { SubMenu, Item } = Menu;

function Header() {
    const [current, setCurrent] = useState('home');
    const dispatch = useDispatch();
    const {user, cart} = useSelector((state) => ({...state}))
    const history = useHistory();
    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key);
    }
    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type:"LOGOUT",
            payload: null
        });
        history.push("/login");
    };
    
    
    return (
        <Menu style={{width:"100%"}} theme="dark" className="p-1" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
        </Item>
        <Item key="shop" icon={<ShoppingOutlined />}>
            <Link to="/shop">Services</Link>
        </Item>
        <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart"><Badge offset={[11,0]} count={cart.length}><span style={{'color':'rgba(255, 255, 255, 0.65)'}}>Shortlists</span></Badge></Link>
        </Item>
        {!user && (
            <Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/register">Register</Link>
            </Item>
        )}
        {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
        </Item>
        )}
        {user && (
        <SubMenu className="float-right" key="SubMenu" icon={<HomeOutlined />} title={user.email && user.email.split('@')[0]}>
            {user && user.role === 'subscriber' && <Item><Link to="/user/history">Dashboard</Link></Item>}
            {user && user.role === 'admin' && <Item><Link to="/admin/dashboard">Dashboard</Link></Item>}
            
            <Item icon={<LogoutOutlined />} onClick={logout}>Log out</Item>
        </SubMenu>
        )}
        <span className="float-right" >
            <Search />
        </span>
      </Menu>
    )
}

export default Header
