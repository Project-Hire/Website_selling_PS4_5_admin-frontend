import { Breadcrumb, Layout, Menu } from 'antd'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from '../routes/PrivateRoute'
import Logo from '../asset/Logo-main.png'
import { useState } from 'react'
import '../style/PrivateLayout.css'
import { ADVERTISEMENT, CDGAME, GAMECONSOLE, GIFTCARD, HOME, TRADEMARK } from '../config/path'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { FaGamepad } from 'react-icons/fa'
import { BsCreditCard2BackFill } from 'react-icons/bs'
import { FaTrademark } from 'react-icons/fa'
import { RiAdvertisementLine } from 'react-icons/ri'
import { GiCompactDisc } from 'react-icons/gi'

const { SubMenu } = Menu

const PrivateLayout = ({ children }) => {
  const { pathname } = useLocation()
  const { Header, Content, Footer, Sider } = Layout
  const [slidebar, setSlidebar] = useState(false)

  const MENU = [
    {
      key: HOME,
      icon: <AiOutlineHome />,
      content: 'Home',
      path: HOME,
    },
    {
      key: ADVERTISEMENT,
      icon: <RiAdvertisementLine />,
      content: 'Advertisements',
      path: ADVERTISEMENT,
    },
    {
      key: CDGAME,
      icon: <GiCompactDisc />,
      content: 'CD Games',
      path: CDGAME,
    },
    {
      key: GAMECONSOLE,
      icon: <FaGamepad />,
      content: 'Game Console',
      path: GAMECONSOLE,
    },
    {
      key: TRADEMARK,
      icon: <FaTrademark />,
      content: 'Trade Mark',
      path: TRADEMARK,
    },
    {
      key: GIFTCARD,
      icon: <BsCreditCard2BackFill />,
      content: 'Gift Card',
      path: GIFTCARD,
    },
  ]

  return (
    <PrivateRoute>
      <div className="layout">
        <Layout style={{ minHeight: '100vh', textAlign: 'center' }}>
          <Sider
            collapsible
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {}}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type)
            }}
          >
            <div className="logo">
              <img style={{ width: '100%' }} className="img" src={Logo} alt="logo" />
            </div>
            <Menu theme="dark" mode="inline">
              {MENU.map((items) => {
                return (
                  <Menu.Item
                    key={items.key}
                    icon={items.icon}
                    className={`${items.path === pathname ? 'layout-menu-select' : ''}`}
                  >
                    <Link to={items.path}>{items.content}</Link>
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 10 }}>
              <div style={{ float: 'right', fontSize: 24, cursor: 'pointer' }}>
                {/* <MdLogout style={{ padding: 0 }} /> */}
              </div>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item></Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Yeah</Footer>
          </Layout>
        </Layout>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </PrivateRoute>
  )
}

export default PrivateLayout
