import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearLoginInfo, saveLoginInfo } from '@/api/local-storage';
import { login, ILoginParams, IUser } from './api';
import './index.less';

interface LoginInfo extends ILoginParams {
  remember: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    clearLoginInfo();
  }, []);

  const onFinish = async (values: LoginInfo) => {
    const { remember, ...user } = values;
    const { data, retmsg, retno } = await login(user);
    console.log('🚀🐍 ~ onFinish ~ retno:', retno);

    if (retno !== `200`) {
      message.error(`登录失败[${retno}]：${retmsg}`);
      return;
    }

    if (remember) {
      saveLoginInfo(data?.token);
    }

    message.success(`登录成功！`);
    navigate('/home');
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login__container'>
      <Form
        name='login'
        labelCol={{ offset: 4, span: 8 }}
        wrapperCol={{ offset: 4, span: 16 }}
        initialValues={{ username: 'admin', password: 'admin', remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
