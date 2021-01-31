import React, {useState} from 'react'
import {Menu} from 'antd';
import {Link, useHistory} from "react-router-dom"
import { HomeOutlined, UserOutlined , UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import "./header.css";

const { SubMenu, Item } = Menu;

function Header() {
    const [current, setCurrent] = useState('home');
    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({...state}))
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
        <Menu className="headerColor" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
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
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
            <Item icon={<LogoutOutlined />} onClick={logout}>Log out</Item>
        </SubMenu>
        )}
      </Menu>
    )
}

export default Header
