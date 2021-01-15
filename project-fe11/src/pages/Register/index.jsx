import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col, } from 'antd';
import { MailOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import history from '../../util/history';
import { connect } from 'react-redux';
import {
    createRegister,
} from '../../redux/actions/index.action'
import './styles.css'

function Register({
    createRegister,
}) {
    useEffect(() => {
    }, []);

    const styleInput = {
        width: "100%",
    }

    // Submit Register
    const [registerForm] = Form.useForm();
    const onFinish = values => {
        handleSubmitForm(values);
    };

    const handleSubmitForm = (values) => {
        createRegister({
            email: values.email,
            password: values.password,
            confirm: values.confirm,
            phone: values.phone,
        });
    }

    return (
        <Row className="RegisterPage">
            <Col span={24} className="name-resgister">
                <p>Đăng Ký Tài Khoản</p>
            </Col>
            <Col span={8} className="register-group">
                <Form
                    form={registerForm}
                    onFinish={onFinish}
                    name="register"
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
                                message: 'Xin vui lòng nhập địa chỉ Email!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Xin vui lòng nhập mật khẩu!',
                            },
                            {
                                min: 8,
                                message: 'Mật khẩu bắt buộc phải trên 8 kí tự',
                            }
                        ]}

                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Mật Khẩu"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Xin vui lòng xác nhận mật khẩu!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Mật khẩu không trùng khớp!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Xác Nhận Mật Khẩu"
                        />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Xin vui lòng nhập số điện thoại!'
                            },
                            {
                                pattern: (/(03|05|07|08|09)+([0-9]{8})\b/),
                                message: 'Xin vui lòng nhập đúng định dạng!'
                            }
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            placeholder="Số Điện Thoại"
                        />
                    </Form.Item>

                    <Form.Item>
                        Bằng việc đăng ký, bạn đã đồng ý về <a href="#">Điều khoản dịch vụ </a>&amp;&nbsp;&nbsp;<a href="#">Chính sách bảo mật</a>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit"
                            style={styleInput}>
                            ĐĂNG KÝ
                        </Button>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" danger
                            onClick={() => history.push('/')}
                            style={styleInput}>
                            THOÁT
                        </Button>
                    </Form.Item>

                </Form>
            </Col>
        </Row>
    );
}
// store ( state tổng )
const mapStateToProps = (state) => {
    const { userData } = state.registerReducer;
    return {
        userData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        createRegister: (params) => dispatch(createRegister(params)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);