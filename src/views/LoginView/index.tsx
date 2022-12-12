import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, notification } from 'antd';
import { useSearchParams } from 'react-router-dom';

import { login } from '@/api';
import { setToken } from '@/utils';

const LoginView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const mutation = useMutation((data: { username: string; password: string }) =>
    login(data)
  );

  const rules = [{ required: true }];

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const login = await mutation.mutateAsync(values);
      if(login.code === 200) {
        setToken(login.token);
        notification.success({
          message: '登录成功，稍后自动跳转',
          duration: 1,
        });

        setTimeout(() => {
          window.location.replace(searchParams.get('redirect') ?? '/');
        }, 1000);
      } else {
        notification.error({
          message: login.msg,
          duration: 1,
        });
      }
    } catch (e) {
      console.error(e);
    }

  };

  return (
    <div className="w-full h-screen bg-blue-400 flex justify-center items-center">
      <div className="p-4 bg-white rounded shadow w-96">
        <h1 className="text-center font-bold text-lg">登录</h1>

        <div className="mt-4">
          <Form onFinish={onFinish}>
            <Form.Item label="账户" name="username" rules={rules}>
              <Input prefix={<UserOutlined />} placeholder="请输入你的账户" />
            </Form.Item>

            <Form.Item label="密码" name="password" rules={rules}>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入你的密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" block htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
