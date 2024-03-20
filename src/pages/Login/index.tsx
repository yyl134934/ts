import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import './index.less';

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login__container'>
      <Form
        name='login'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        className='login__form'
      >
        <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入用密码' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
