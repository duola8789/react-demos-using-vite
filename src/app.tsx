import React, { useState, useEffect } from 'react';
import { Router, navigate, useLocation } from '@reach/router';
import { Layout, Menu, Button, Breadcrumb } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ROUTES_CONFIG, MENU_CONFIG, FULL_ROUTE_CONFIG } from '@/config';
import classnames from 'classnames';
import styles from './app.module.scss';

const rootSubmenuKeys = MENU_CONFIG.map(menu => menu.key);

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [menuName, setMenuName] = useState('');
  const [submenuName, setSubmenuName] = useState('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const location = useLocation();

  const onMenuClick = ({ key }: { key: string }) => {
    navigate(key).catch();
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
    const [menuKey = '/', submenuKey] = pathname.match(/(\/[^/]+)/g) || [];

    if (menuKey) {
      setOpenKeys([menuKey]);
      setSelectedKeys([pathname]);

      const target = FULL_ROUTE_CONFIG.find(v => v.key === menuKey);
      if (target) {
        setMenuName(target.label);
        if (submenuKey && Array.isArray(target.children)) {
          const subTarget = target.children.find(v => v.key === submenuKey);
          if (subTarget) {
            setSubmenuName(subTarget.label);
          }
        } else {
          setSubmenuName('');
        }
      } else {
        setMenuName('');
      }
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
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>{menuName}</Breadcrumb.Item>
            {submenuName ? <Breadcrumb.Item>{submenuName}</Breadcrumb.Item> : <></>}
          </Breadcrumb>
        </Layout.Header>
        <Layout.Content className={styles.layoutContent}>
          <Router style={{ height: '100%' }}>
            {ROUTES_CONFIG.map(v => (
              <v.component key={v.path} path={v.path} />
            ))}
          </Router>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
