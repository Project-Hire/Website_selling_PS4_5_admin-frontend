import { Breadcrumb, Layout, Menu } from 'antd'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from '../routes/PrivateRoute'
import Logo from '../asset/Logo-main.png'
import { useState } from 'react'
import '../style/PrivateLayout.css'
import {
  ACCESSORY,
  ADMIN_LOGIN,
  ADVERTISEMENT,
  CDGAME,
  GAMECONSOLE,
  GIFTCARD,
  HOME,
  PAYMENT_CD_GAME,
  TRADEMARK,
} from '../config/path'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { FaGamepad } from 'react-icons/fa'
import { BsCreditCard2BackFill } from 'react-icons/bs'
import { FaTrademark } from 'react-icons/fa'
import { RiAdvertisementLine } from 'react-icons/ri'
import { GiCompactDisc } from 'react-icons/gi'
import { AiFillCustomerService } from 'react-icons/ai'
import { API_LOGOUT } from '../config/endpointAPi'
import { AUTH_TOKEN, USER_INFO } from '../config/const'
import { postAxios } from '../Http'
import { MdLogout } from 'react-icons/md'
import { Button } from 'antd/lib/radio'

const { SubMenu } = Menu

const PrivateLayout = ({ children }) => {
  const { pathname } = useLocation()
  const { Header, Content, Footer, Sider } = Layout
  const [slidebar, setSlidebar] = useState(false)
  const history = useHistory()

  const onLogout = () => {
    postAxios(API_LOGOUT)
      .then((res) => {
        localStorage.removeItem(AUTH_TOKEN)
        localStorage.removeItem(USER_INFO)
        history.push(ADMIN_LOGIN)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
    {
      key: ACCESSORY,
      icon: <AiFillCustomerService />,
      content: 'Accessory',
      path: ACCESSORY,
    },
    {
      key: PAYMENT_CD_GAME,
      icon: <AiFillCustomerService />,
      content: 'Payment Cd Game',
      path: PAYMENT_CD_GAME,
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
                <div onClick={onLogout} className="logout">
                  <span>Log Out</span>
                  <MdLogout style={{ padding: 0 }} />
                </div>
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
