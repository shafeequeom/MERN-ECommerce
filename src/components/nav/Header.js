import { useState } from "react";
import { Menu } from "antd";
import {
  SettingOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    setCurrent(e.key);
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
      <SubMenu key="setting" icon={<SettingOutlined />} title="Setting">
        <Menu.ItemGroup title="Item 1">
          <Item key="setting:1" icon={<UserAddOutlined />}>
            Register
          </Item>
          <Item key="setting:2" icon={<UserOutlined />}>
            Login
          </Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default Header;
