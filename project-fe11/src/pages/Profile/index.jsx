import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Avatar, Image, Modal } from 'antd';
import { MailOutlined, LockOutlined, PhoneOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import Apple from '../../image/apple.png'
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import {
    getProfile,
    getHistory,
    editProfile,
} from '../../redux/actions/index.action'
import './styles.css'

function Profile({
    userData,
    historyData,
    getHistory,
    getProfile,
    editProfile,
}) {
    useEffect(() => {
        getProfile({
            idUser: info.id
        });
        getHistory({
            idUser: info.id
        })
    }, []);

    // Get localStorage
    const info = JSON.parse(localStorage.getItem("user"));

    // Show Modal
    const [isShowModifyModal, setIsShowModifyModal] = useState(false);

    // Edit Profile
    const onOk = (values) => {
        editProfile({
            idUser: info.id,
            email: values.email,
            password: values.password,
            phone: values.phone
        });
        setIsShowModifyModal(false);
    };

    // Submit Edit Profile
    const CollectionEditProfile = ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                visible={visible}
                title="Chỉnh Sửa Thông Tin"
                okText="Ok"
                cancelText="Cancel"
                onCancel={onCancel}
                width={500}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch(() => { });
                }}
            >
                <Form
                    name="editProfile"
                    form={form}
                    initialValues={{
                        email: `${userData.email}`,
                        password: `${userData.password}`,
                        phone: `${userData.phone}`,
                    }}
                >
                    <Form.Item
                        name="email"
                        hasFeedback
                        rules={[
                            {
                                type: 'email',
                                message: 'Email không đúng địng dạng!',
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
                            },
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            placeholder="Số Điện Thoại"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    // History Purchase
    const renderHistoryPurchase = () => {
        return historyData.map((cartItem, cartItemIndex) => {
            const totalMoney = cartItem.quantityProduct * cartItem.priceProduct;
            return (
                <Row
                    gutter={16, 0}
                    className="show-history"
                    key={`lichsumuahang-${cartItem.id}-${cartItemIndex}`}
                >
                    <Col span={5}>
                        <Image src={cartItem.imageProduct} height="140px" width="auto" />
                    </Col>
                    <Col
                        span={19}
                        style={{ paddingLeft: 30 }}
                    >
                        <div className="item-cart">
                            <p style={{ fontSize: 18, paddingRight: 20 }}>{cartItem.nameProduct}</p>
                        </div>
                        <div className="item-cart">
                            <p style={{ fontSize: 15, marginRight: 10, fontWeight: 600 }}>Tùy Chọn:</p>
                            <p>{cartItem.colorProduct}</p>
                        </div>
                        <div className="item-cart">
                            <p style={{ fontSize: 15, marginRight: 10, fontWeight: 600 }}>Số Lượng:</p>
                            <p>{cartItem.quantityProduct}</p>
                        </div>
                        <div className="item-cart">
                            <p style={{ fontSize: 15, marginRight: 10, fontWeight: 600 }}>Giá:</p>
                            <NumberFormat style={{ fontSize: 15, color: "#fc0328", fontWeight: "700" }} value={cartItem.priceProduct} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </div>
                        <div className="item-cart">
                            <p style={{ fontSize: 15, marginRight: 10, fontWeight: 600 }}>Tổng:</p>
                            <NumberFormat style={{ fontSize: 15, color: "#fc0328", fontWeight: "700" }} value={totalMoney} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </div>
                    </Col>
                    <Col span={24}>
                        <p className="date">{cartItem.time}</p>
                    </Col>
                </Row>
            )
        })
    }

    return (
        <>
            <Row className="ProfilePage">
                <Row className="Profile">
                    <Col className="name-user" span={24}>
                        <p style={{ display: "flex", justifyContent: "space-between" }} >
                            <span>Thông Tin Cá Nhân</span>
                            <EditOutlined
                                onClick={() => {
                                    setIsShowModifyModal(true);
                                }}
                            />
                        </p>
                        <CollectionEditProfile
                            visible={isShowModifyModal}
                            onCreate={onOk}
                            onCancel={() => {
                                setIsShowModifyModal(false);
                            }}
                        />
                    </Col>
                    <Col className="ava-profile" span={24}>
                        <Avatar style={{ backgroundColor: "#f56a00" }} size={120} icon={<UserOutlined />} />
                    </Col>
                    <Col className="info-profile" span={24} >
                        <p style={{ fontWeight: 600, marginRight: 20 }}>Email:</p>
                        <p>{userData.email}</p>
                    </Col>
                    <Col className="info-profile" span={24} >
                        <p style={{ fontWeight: 600, marginRight: 20 }}>Mật Khẩu:</p>
                        <p>{userData.password}</p>
                    </Col>
                    <Col className="info-profile" span={24} >
                        <p style={{ fontWeight: 600, marginRight: 20 }}>Số Điện Thoại:</p>
                        <p>{userData.phone}</p>
                    </Col>
                </Row>
                <Row className="ImageProfile">
                    <Col className="img-apple" span={24}>
                        <Image src={Apple} height="350px" width="auto"></Image>
                    </Col>
                </Row>
            </Row>
            <Row className="HistoryPage">
                <Col span={24} className="name-history">
                    <p>Lịch Sử Mua Hàng</p>
                </Col>
                <Col span={24} className="history-cart">
                    <Row className="history-product">
                        {renderHistoryPurchase()}
                    </Row>
                </Col>
            </Row >
        </>
    );
};
// store ( state tổng )
const mapStateToProps = (state) => {
    const { userData } = state.authReducer;
    const { historyData } = state.historyReducer;
    return {
        userData,
        historyData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        editProfile: (params) => dispatch(editProfile(params)),
        getProfile: (params) => dispatch(getProfile(params)),
        getHistory: (params) => dispatch(getHistory(params)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
