import { useState } from "react";
import { Menu } from "antd";
import {
  SettingOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const navigate = useNavigate();

  let dispatch = useDispatch();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logOut = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/"> Home </Link>
      </Item>
      <Item
        className="float-end"
        style={{ marginLeft: "auto" }}
        key="register"
        icon={<UserAddOutlined />}
      >
        <Link to="/register"> Register </Link>
      </Item>
      <Item className="float-end" key="login" icon={<UserOutlined />}>
        <Link to="/login"> Login </Link>
      </Item>
      <SubMenu key="setting" icon={<SettingOutlined />} title="Username">
        <Menu.ItemGroup title="Item 1">
          <Item key="setting:1" icon={<UserAddOutlined />}>
            Register
          </Item>
          <Item key="setting:2" icon={<UserOutlined />}>
            Login
          </Item>
          <Item key="setting:3" icon={<LogoutOutlined />} onClick={logOut}>
            Logout
          </Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default Header;
