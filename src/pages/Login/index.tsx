import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.less';
import { saveLoginInfo } from 'Src/api/local-storage';

interface User {
  username: string;
  password: string;
}
interface LoginRespone {
  ret_code: number;
  ret_msg: string;
  token: string;
}

const fakeQuery = async (userInfo: User): Promise<LoginRespone> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ret_code: 200, ret_msg: 'Login succeeded!', token: 'mock data' });
    }, 1000);
  });
};

interface LoginInfo extends User {
  remember: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: LoginInfo) => {
    console.log('Success:', values);
    const { remember, ...user } = values;
    const { ret_code: retCode, ret_msg: retMsg, token } = await fakeQuery(user);

    if (retCode !== 200) {
      message.error(`登录失败[${retCode}]：${retMsg}`);
      return;
    }

    if (remember) {
      saveLoginInfo(token);
    }

    message.success(`登录成功！`);
    navigate('home');
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login__container'>
      <Form
        name='login'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
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
