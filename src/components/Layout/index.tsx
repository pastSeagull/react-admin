import type { MenuProps } from 'antd';

import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { Avatar, Dropdown } from 'antd';

import { Layout, Menu } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { logout } from '@/api';
import { useGetInfo } from '@/api/query';
import { userStore } from '@/store/user';
import { clearToken } from '@/utils';
import { APP_TITLE } from '@/utils/constant';

const { Header, Content, Sider } = Layout;

const StyleBox = styled.div`
  .header {
    background-color: #fff;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
  }
`;

const menu: MenuProps['items'] = [
  {
    icon: <HomeOutlined />,
    label: '首页',
    key: '/',
  },
  {
    icon: <UserOutlined />,
    key: 'user',
    label: '用户管理',
    children: [
      {
        key: '/users',
        label: '用户列表',
      },
    ],
  },
];

const openKeys = menu.map((item) => String(item?.key));

export const LayoutContainer: React.FC = () => {
  const navigate = useNavigate();

  const { data: info, error: infoError } = useGetInfo();

  const mutation = useMutation(() => logout());

  const redirectToLogin = useCallback(() => {
    notification.success({
      message: '退出成功，稍后自动跳转',
      duration: 1,
    });
    setTimeout(() => {
      navigate(
        `/login?redirect=${window.location.pathname + window.location.search}`,
        {
          replace: true,
        }
      );
    }, 1000);
  }, [navigate]);

  const onLogout = async () => {
    try {
      const out = await mutation.mutateAsync();
      if(out.code === 200) {
        clearToken();
        redirectToLogin();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: <span onClick={onLogout}>退出登录</span>,
      icon: <LogoutOutlined />,
    },
    {
      key: 'user-setting',
      label: <span>个人设置</span>,
      icon: <SettingOutlined />,
    },
  ];

  useEffect(() => {
    if (infoError) {
      // FIXME: 根据接口需求修改
      if (infoError?.status === 401) {
        notification.open({
          message: infoError?.msg ?? '出现错误',
          type: 'error',
        });
        clearToken();
        redirectToLogin();
      }
    }
  }, [infoError, redirectToLogin]);

  useEffect(() => {
    if (info) {
      userStore.user = info?.user?.nickName;
    }
  }, [info]);

  return (
    <StyleBox>
      <Layout className="h-screen">
        <Header className="header">
          <Link to="/" className="font-bold text-gray-700 text-lg mr-6">
            {APP_TITLE}
          </Link>

          <div className="flex-1 flex justify-end h-full">
            <Dropdown menu={{ items }} trigger={['click']}>
              <div className="h-full flex items-center cursor-pointer hover:bg-gray-100 px-4">
                <Avatar
                  src={info?.user?.avatar}
                  alt={info?.user?.nickName}
                  size={30}
                  icon={<UserOutlined />}
                />
                <span className="ml-2 text-sm">{info?.user?.nickName}</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Layout className="flex-1 overflow-hidden">
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={[window.location.pathname]}
              style={{ height: '100%', borderRight: 0 }}
              items={menu}
              defaultOpenKeys={openKeys}
              onSelect={(val) => {
                navigate(val.key);
              }}
            />
          </Sider>

          <Layout className="p-4 flex-1 overflow-auto">
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </StyleBox>
  );
};
