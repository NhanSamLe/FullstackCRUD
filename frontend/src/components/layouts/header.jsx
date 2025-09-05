import React , {useContext, useState} from "react";
import { UsergroupAddOutlined,HomeOutlined, SettingOutlined } from "@ant-design/icons";

import { Menu  } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../context/auth.context";
import { defaultIconPrefixCls } from "antd/es/config-provider";

const Header = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: "home",
            icon: <HomeOutlined />
        },
        ...(auth.isAuthenticated ? [{
            label: <Link to="/profile">Profile</Link>,
            key: "profile",
            icon: <UsergroupAddOutlined />
        }] : []),
        {
            label: 'Welcome ' + (auth.isAuthenticated ? auth.user.name : 'Guest'),
            key: 'SubeMenu',
            icon: <SettingOutlined />,
            children: [
                ...(auth.isAuthenticated ? [
                    {
                        label: <span onClick={() => {
                            localStorage.clear("accessToken");
                            setCurrent("home");
                            setAuth({
                                isAuthenticated: false,
                                user: { email: "", name: "" }
                            });
                            navigate("/");
                        }}>Logout</span>,
                        key: "logout",
                        
                    }
                ] : [
                    {
                        label: <Link to="/login">Login</Link>,
                        key: "login",
                    }
                ])
            ]
        }
    ];
    const [current, setCurrent] = useState("mail");
    const onClick = (e) => {
        setCurrent(e.key);
    }
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" theme="dark" items={items} />
    );
}

export default Header ;