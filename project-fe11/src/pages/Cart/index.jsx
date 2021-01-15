import React, { useEffect } from 'react';
import { Form, Input, Button, Radio, Row, Col, Image, notification } from 'antd';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { DeleteOutlined, InfoCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import {
    getCart,
    deleteProductCart,
    completePayment,
} from '../../redux/actions/index.action'
import './styles.css'

function Cart({
    cartData,
    getCart,
    deleteProductCart,
    completePayment,
}) {
    useEffect(() => {
        getCart({ idUser: info?.id });
    }, []);

    // Layout Form
    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 },
    };

    // Get localStorage
    const info = JSON.parse(localStorage.getItem("user"));

    // Complete Payment 
    const [commentForm] = Form.useForm();

    const onFinishFeedback = values => {
        commentForm.resetFields();
        handleCompletePayment(values);
    };

    const handleCompletePayment = () => {
        for (let i = 0; i < cartData.length; i++) {
            completePayment({
                id: cartData[i].id,
                isPay: true,
            });
        }
        if (cartData.length > 0) {
            notification.open({
                message: `Thanh Toán Thành Công!.`,
                className: 'custom-class',
                duration: 1.5,
                icon: <CheckCircleTwoTone style={{ marginTop: 6 }} twoToneColor="#52c41a" />,
                style: {
                    width: 350,
                    backgroundColor: "#ffffff",
                    fontSize: 18,
                    fontWeight: 600,
                },
            });
        }
    }

    // Delete Product Cart
    const handleDeleteProductCart = (deletedId) => {
        deleteProductCart({
            id: deletedId,
        });
    };

    // Total Money
    let totalMoneyCart = 0;
    cartData.map((cartItem) => {
        totalMoneyCart = (cartItem.priceProduct * cartItem.quantityProduct) + totalMoneyCart;
    });

    const renderCart = () => {
        return cartData.map((cartItem, cartItemIndex) => {
            const totalMoney = cartItem.quantityProduct * cartItem.priceProduct;
            return (
                <Row
                    gutter={16, 0}
                    className="show-cart"
                    key={`giohang-${cartItem.id}-${cartItemIndex}`}
                >
                    <Col span={5}>
                        <Image src={cartItem.imageProduct} height="140px" width="auto" />
                    </Col>
                    <Col
                        span={17}
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
                    <Col span={2}>
                        <DeleteOutlined
                            style={{ fontSize: 17 }}
                            onClick={() => { handleDeleteProductCart(cartItem.id) }} />
                    </Col>
                </Row>
            )
        })
    }
    return (
        <>
            <Row className="CartPage">
                <Col span={24} className="name-cart">
                    <p>Giỏ Hàng</p>
                </Col>
                <Col span={24} className="info-cart">
                    {renderCart()}
                </Col>
                <Col span={24} className="info-cart">
                    <Row className="total-money">
                        <p>Tổng Tiền :</p>
                        <NumberFormat style={{ marginLeft: 10, fontSize: 17, color: "#fc0328", fontWeight: "700" }} value={totalMoneyCart} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                    </Row>
                </Col>
            </Row >
            <Row className="ShipmentDetailPage">
                <Col span={24} className="name-cart">
                    <p>Thông Tin Khách Hàng</p>
                </Col>
                <Col span={22} className="info-ship">
                    <Form
                        {...layout}
                        form={commentForm}
                        onFinish={onFinishFeedback}
                        name="submitCart"
                        initialValues={{
                            payment: "tiền mặt"
                        }}
                    >
                        <Form.Item
                            name="name"
                            label="Họ Và Tên"
                            autoFocus
                            rules={[
                                {
                                    required: true,
                                    message: 'Xin vui lòng nhập họ và tên!'
                                },
                                {
                                    max: 30,
                                    message: 'Họ và tên không quá 30 kí tự!'
                                },
                                {
                                    pattern: (/[a-zA-Z]+$/),
                                    message: 'Họ và tên không có số và kí tự đặc biệt!'
                                },
                            ]} >
                            <Input autoFocus />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Số Điện Thoại"
                            rules={[
                                {
                                    required: true,
                                    message: 'Xin vui lòng nhập số điện thoại!'
                                },
                                {
                                    pattern: (/(03|05|07|08|09)+([0-9]{8})\b/),
                                    message: 'Xin vui lòng nhập đúng định dạng!'
                                }
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="Địa Chỉ Giao Hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Xin vui lòng nhập địa chỉ nhận hàng!'
                                },
                                {
                                    min: 30,
                                    message: 'Địa chỉ giao hàng phải trên 30 kí tự!'
                                },
                                {
                                    max: 60,
                                    message: 'Địa chỉ giao hàng không quá 60 kí tự!'
                                }
                            ]} >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="payment"
                            label="Hình Thức Thanh Toán"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn hình thức thanh toán!'
                                }
                            ]}>
                            <Radio.Group>
                                <Radio style={{ marginTop: 5, marginBottom: 8 }} value="tiền mặt">Trả tiền mặt khi nhận hàng</Radio>
                                <Radio disabled value="thẻ tín dụng">Thanh toán bằng thẻ tín dụng</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="comment"
                            label="Ghi Chú"
                            rules={[
                                {
                                    max: 50,
                                    message: 'Ghi chú không quá 50 kí tự!'
                                },
                                {
                                    pattern: (/[a-zA-Z0-9]+$/),
                                    message: 'Ghi chú không kí tự đặc biệt!'
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Nếu có..."
                                autoSize={{ minRows: 4, maxRows: 10 }}
                            />
                        </Form.Item>

                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }} >
                            <Button
                                className="btn-thanhtoan"
                                type="primary"
                                htmlType="submit"
                                onClick={() => {
                                    if (cartData.length <= 0) {
                                        notification.open({
                                            message: `Chọn mua sản phẩm trước khi thanh toán!`,
                                            className: 'custom-class',
                                            duration: 1.5,
                                            icon: <InfoCircleOutlined style={{ color: "#fc0303" }} />,
                                            style: {
                                                width: 350,
                                                backgroundColor: "#ffffff",
                                                fontSize: 18,
                                                fontWeight: 600,
                                            },
                                        });
                                    }
                                }}
                            >
                                XÁC NHẬN THANH TOÁN
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
            </Row >
        </>
    );
};

// store ( state tổng )
const mapStateToProps = (state) => {
    const { cartData } = state.cartReducer;
    return {
        cartData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getCart: (params) => dispatch(getCart(params)),
        deleteProductCart: (params) => dispatch(deleteProductCart(params)),
        completePayment: (params) => dispatch(completePayment(params)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
