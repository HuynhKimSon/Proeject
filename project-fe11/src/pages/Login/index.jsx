import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import history from '../../util/history';
import { connect } from 'react-redux';
import {
    LoginUser
} from '../../redux/actions/index.action'
import './styles.css'

function Login({ LoginUser }) {

    useEffect(() => {
    }, []);

    // Submit Login
    const onFinish = values => {
        handleSubmitForm(values);
    };

    const handleSubmitForm = (values) => {
        LoginUser({
            email: values.email,
            password: values.password,
        })
    }

    return (
        <Row className="LoginPage">
            <Col span={24} className="name-login">
                <p>Đăng Nhập Tài Khoản</p>
            </Col>
            <Col span={8} className="login-group">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        hasFeedback
                        rules={[
                            {
                                type: 'email',
                                message: 'Email không đúng định dạng!',
                            },
                            {
                                required: true,
                                message: 'Xin vui lòng nhập địa chỉ Email!'
                            }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Tên Đăng Nhập" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Xin vui lòng nhập mật khẩu!'
                            },
                            {
                                min: 8,
                                message: 'Mật khẩu bắt buộc phải trên 8 kí tự',
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật Khẩu"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Ghi nhớ </Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="quenmatkhau">
                            Quên mật khẩu
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                            style={{ width: "100%", marginTop: 10, marginBottom: 10 }}>
                            ĐĂNG NHẬP
                            </Button>
                            Chưa là thành viên? <a onClick={() => history.push('/register')}>Đăng ký</a> tại đây
                    </Form.Item>
                </Form>
            </Col>
        </Row >
    );
};
// store ( state tổng )
const mapStateToProps = (state) => {
    const { userData } = state.authReducer;
    return {
        userData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        LoginUser: (params) => dispatch(LoginUser(params)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
