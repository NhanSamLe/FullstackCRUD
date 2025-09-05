import React from 'react';
import { Form, Input, Button, notification, Row, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { login } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const onFinish = async (values) => {
        try {
            const response = await login(values);
            localStorage.setItem('accessToken', response.data.accessToken);
            setAuth({
                isAuthenticated: true,
                user: response.data.user
            });
            notification.success({
                message: 'Success',
                description: 'Login successful'
            });
            navigate('/profile');
        }
        catch (error) {
            notification.error({
                message: 'Error',
                description: error.message
            });
        }
    };
    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <div style={{ width: 300, padding: 20, border: '1px solid #ccc', borderRadius: 5 }}>
                <Form onFinish={onFinish}>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Link to="/register"><ArrowLeftOutlined /> Back to Register</Link>  
            </div>
        </Row>
    );
};
export default LoginPage;
