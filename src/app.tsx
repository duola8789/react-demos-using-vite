import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { MENU_CONFIG } from '@/config';
import classnames from 'classnames';
import styles from './app.module.scss';

const rootSubmenuKeys = MENU_CONFIG.map(menu => menu.key);

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const onMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setSelectedKeys([key]);
  };

  // 点击菜单，收起其他展开的所有菜单
  const openChange = (openedKeys: string[]) => {
    const lastOpenKey = openedKeys.find(key => !openKeys.includes(key));
    if (!lastOpenKey || !rootSubmenuKeys.includes(lastOpenKey)) {
      setOpenKeys([...openedKeys]);
    } else {
      setOpenKeys(lastOpenKey ? [lastOpenKey] : []);
    }
  };

  // 根据 url 设定 导航栏状态
  useEffect(() => {
    const { pathname } = location;
    const [menuKey = '/'] = pathname.match(/(\/[^/]+)/g) || [];

    if (menuKey) {
      setOpenKeys([menuKey]);
      setSelectedKeys([pathname]);
    }
  }, [location.pathname]);

  return (
    <Layout className={styles.container}>
      <Layout.Sider collapsible collapsed={isCollapsed} onCollapse={setIsCollapsed} collapsedWidth={0} trigger={null}>
        <div className={classnames(styles.logo, isCollapsed ? styles.logoCollapsed : '')} onClick={() => navigate('/')} />
        <Menu
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          mode="inline"
          theme="dark"
          items={MENU_CONFIG}
          onOpenChange={openChange}
          onClick={onMenuClick}
        />
      </Layout.Sider>
      <Layout className={styles.main}>
        <Layout.Header className={styles.header}>
          <Button type="text" icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setIsCollapsed(!isCollapsed)} />
        </Layout.Header>
        <Layout.Content className={styles.layoutContent}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
