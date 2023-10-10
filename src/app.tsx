import { useState, useEffect } from 'react';
import { Router, navigate, useLocation } from '@reach/router';
import { Layout, Menu } from 'antd';
import { ROUTES_CONFIG, MENU_CONFIG } from '@/config';
import classnames from 'classnames';
import style from './app.module.scss';

const { Sider } = Layout;

const rootSubmenuKeys = MENU_CONFIG.map(menu => menu.path);

function App() {
  const [collapsed, setCollapsed] = useState(false);
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
    const submenuKey = pathname.replace(/^(\/.+)\/.*$/, '$1');

    if (submenuKey) {
      setOpenKeys([submenuKey]);
      setSelectedKeys([pathname]);
    }
  }, [location.pathname]);

  return (
    <Layout className={style.container}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} collapsedWidth={0}>
        <div className={classnames(style.logo, collapsed ? style.logoCollapsed : '')} onClick={() => navigate('/')} />
        <Menu
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          mode="inline"
          theme="dark"
          items={MENU_CONFIG}
          onOpenChange={openChange}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout className={style.content}>
        <Router>
          {ROUTES_CONFIG.map(v => (
            <v.component key={v.path} path={v.path} />
          ))}
        </Router>
      </Layout>
    </Layout>
  );
}

export default App;
