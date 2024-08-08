import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearLoginInfo, saveLoginInfo } from '@/api/local-storage';
import { login, ILoginParams, IUser } from './api';
import './index.less';
import { useQuery } from '@tanstack/react-query';
import { FcResponse } from '@/api';
const Login: React.FC = () => {
  const [param, setParam] = useState<ILoginParams>({ username: '', password: '' });
  const [shouldFetch, setShouldFetch] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['login', param],
    queryFn: () => login(param),
    enabled: shouldFetch,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (isSuccess) {
      saveLoginInfo(data?.token);

      message.success(`登录成功！`);
      navigate('/home');
    }
  }, [isSuccess, data]);

  const handleLogin = (values: ILoginParams & { remember: boolean }) => {
    const { remember, ...user } = values;
    setParam(user);
    setShouldFetch(true);
  };

  return (
    <div className='login__container'>
      <Form
        name='login'
        labelCol={{ offset: 4, span: 8 }}
        wrapperCol={{ offset: 4, span: 16 }}
        initialValues={{ username: 'admin', password: 'admin', remember: true }}
        onFinish={handleLogin}
        autoComplete='off'
        className='login__form'
        colon={false}
        layout='vertical'
      >
        <div className='form-topic'>登录</div>
        <Form.Item
          required={false}
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item required={false} label='密码' name='password' rules={[{ required: true, message: '请输入用密码' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked' className='form-pwd'>
          <Checkbox>记住密码</Checkbox>
          <NavLink to={'/resetPassword'}>忘记密码</NavLink>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='form-submit'>
            {shouldFetch && isLoading ? '登录中...' : '登录'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
