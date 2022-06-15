import { Breadcrumb, Layout, Menu } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import PrivateRoute from '../routes/PrivateRoute'
import Logo from '../asset/Logo-main.png'
import { MdLogout } from 'react-icons/md'
import { AiOutlineHome } from 'react-icons/ai'
import { RiAdvertisementFill } from 'react-icons/ri'
import { useState } from 'react'
import '../style/PrivateLayout.css'

const PrivateLayout = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout
  const { SubMenu } = Menu
  const [slidebar, setSlidebar] = useState(false)
  const onCollapsed = () => {
    setSlidebar(!slidebar)
  }
  return (
    <PrivateRoute>
      <div className="layout">
        <Layout style={{ minHeight: '100vh', textAlign: 'center' }}>
          <Sider collapsible onCollapse={slidebar}>
            <div className="logo">
              <img style={{ width: '100%' }} className="img" src={Logo} />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<AiOutlineHome />}>
                Trang chủ
              </Menu.Item>
              <Menu.Item key="2" icon={<RiAdvertisementFill />}>
                Quảng cáo
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 10 }}>
              <div style={{ float: 'right', fontSize: 24, cursor: 'pointer' }}>
                <MdLogout style={{ padding: 0 }} />
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
    </PrivateRoute>
  )
}

export default PrivateLayout
