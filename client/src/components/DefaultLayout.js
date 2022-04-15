import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  DollarOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Spinner } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import '../resources/layout.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const { Header, Sider, Content } = Layout

const DefaultLayout = (props) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const { cartItems, loading } = useSelector((state) => state.rootReducer)
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])
  return (
    <Layout>
      {loading && (
        <div className="spinner">
          <Spinner animation="border" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h3>{collapsed ? 'FM POS' : 'FRESH MARKET POS'}</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">Cart</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<DollarOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UsergroupAddOutlined />}>
            <Link to="/customers">customers</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={()=>{
            localStorage.removeItem('pos-user')
            navigate('/login')
          }}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 10 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            },
          )}
          <div
            className="cart-count d-flex align-items-center"
            onClick={() => navigate('/cart')}
          >
            <p className="mt-3 mr-2">{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '10px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
