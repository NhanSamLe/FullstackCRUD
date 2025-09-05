import React  from "react";
import { Form, Input, Button, notification, Row, Divider } from "antd";
import { Link , useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons"; 
import { register } from "../api/auth.api";
const RegisterPage = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await register(values);
            notification.success({
                message: "Success",
                description: "Registration successful"
            });
            navigate("/login");
        }catch (error) {
            notification.error({
                message: "Error",
                description: error.message
            });
        }
    };
    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <div style={{ width: 300, padding: 20, border: '1px solid #ccc', borderRadius: 5 }}>
                <Form onFinish={onFinish}>
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <Link to="/login"><ArrowLeftOutlined /> Back to Login</Link>
                <Divider />
                <div style={{ textAlign: 'center' }}>Have account? <Link to="/login">Login</Link></div>
            </div>
        </Row>
    );
};
export default RegisterPage;