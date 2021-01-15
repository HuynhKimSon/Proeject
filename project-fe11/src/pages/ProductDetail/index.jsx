import React, { useEffect } from 'react';
import { Col, Row, Radio, Input, InputNumber, Rate, Button, Form, Avatar, notification, Image, Carousel } from 'antd';
import { ShoppingCartOutlined, InfoCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    getProductDetail,
    createFeedBack,
    getFeedBack,
    addCart,
} from '../../redux/actions/index.action';
import './styles.css'

function ProductsDetail({
    getProductDetail,
    productDataDetail,
    createFeedBack,
    getFeedBack,
    feedbackData,
    addCart,
    match,
}) {

    const [addToCartForm] = Form.useForm();

    useEffect(() => {
        getProductDetail({
            id: match.params.id
        });
        getFeedBack({
            id: match.params.id
        });
    }, [match.params.id]);

    useEffect(() => {
        addToCartForm.resetFields();
    }, [productDataDetail]);

    // LocalStorage
    const info = JSON.parse(localStorage.getItem("user"));

    // Submit feedback  
    const [commentForm] = Form.useForm();
    const onFinishFeedback = values => {
        commentForm.resetFields()
        handleSubmitFormFeedback(values);
    };
    const handleSubmitFormFeedback = (values) => {
        createFeedBack({
            idUser: info.id,
            idProduct: match.params.id,
            nameUser: info.email,
            rate: values.rate,
            comment: values.comment,
            time: moment().format('HH:mm DD-MM-YYYY'),
        });
    }

    // Add cart
    const onFinishCart = values => {
        handleSubmitFormCart(values);
    };

    // Submit Cart
    const handleSubmitFormCart = (values) => {
        if (info === null) {
            notification.open({
                message: `Bạn cần phải đăng nhập tài khoản!`,
                className: 'custom-class',
                duration: 1.5,
                icon: <InfoCircleOutlined style={{marginTop: 6,color:"#fc0303"}} />,
                style: {
                    width: 350,
                    backgroundColor: "#ffffff",
                    fontSize: 18,
                    fontWeight: 600,
                },
            });
        } else {
            addCart({
                idUser: info.id,
                nameUser: info.email,
                idProduct: match.params.id,
                nameProduct: productDataDetail.name,
                imageProduct: productDataDetail.url1,
                priceProduct: productDataDetail.price,
                quantityProduct: values.quantity,
                colorProduct: values.color,
                isPay: false,
                time: moment().format('DD-MM-YYYY'),
            });
        }
    }

    const renderFeedBack = () => {
        return feedbackData.map((feedbackItem, feedbackItemIndex) => {
            return (
                <Row
                    className="show-feedback"
                    key={`feedback-${feedbackItem.id}-${feedbackItemIndex}`}
                >
                    <Col span={24} style={{ display: "flex" }}>
                        <Avatar style={{ marginTop: 6, color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                        <div style={{ marginLeft: 15, fontSize: 16, fontWeight: 500 }}>
                            {feedbackItem.nameUser}
                            <p style={{ fontSize: 12, fontWeight: 400 }}>Đã đăng {feedbackItem.time}</p>
                        </div>
                        <Rate style={{ marginLeft: 10, fontSize: 17 }} value={feedbackItem.rate} />
                    </Col>
                    <Col span={24}>
                        <p style={{ fontSize: 15 }}>{feedbackItem.comment}</p>
                    </Col>
                </Row>
            )
        })
    }

    return (
        <>
            <Row className="PageDetail">
                <Row
                    className="row-name"
                >
                    <Col span={24}>
                        <p className="name-detail">{productDataDetail.name}</p>
                    </Col>
                </Row>

                <Row className="row-detail">
                    <Col
                        span={12}
                        style={{ width: "100%" }}>
                        <div className="image">
                            {(!productDataDetail.url2)
                                ? (
                                    <div className="carousel-imageChild">
                                        <Image src={productDataDetail.url1} width="420px" height="420px" />
                                    </div>
                                )
                                : (
                                    <Carousel autoplay autoplaySpeed={3000}>
                                        <div className="carousel-imageChild">
                                            <Image src={productDataDetail.url1} width="420px" height="420px" />
                                        </div>
                                        <div className="carousel-imageChild">
                                            <Image src={productDataDetail.url2} width="420px" height="420px" />
                                        </div>
                                        <div className="carousel-imageChild">
                                            <Image src={productDataDetail.url3} width="420px" height="420px" />
                                        </div>
                                    </Carousel>
                                )
                            }
                        </div>
                        <div className="description" style={{ marginRight: 40 }}>
                            <p style={{ marginBottom: 10, fontSize: 18, fontWeight: 700, color: "#fc0328" }}>Mô Tả Sản Phẩm</p>
                            <p style={{ fontSize: 16 }}>{productDataDetail.description}</p>
                        </div>
                    </Col>
                    <Col span={12} style={{ width: "100%" }}>
                        <div className="price">
                            <p className="convert-price">
                                <NumberFormat style={{ fontSize: 28, color: "#fc0328", fontWeight: "700" }} value={productDataDetail.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                            </p>
                        </div>
                        <Form
                            form={addToCartForm}
                            onFinish={onFinishCart}
                            name="addcart"
                            initialValues={{
                                quantity: 1,
                                color: `${productDataDetail.color1}`,
                            }}
                        >
                            <Form.Item
                                className="quantity"
                                name="quantity"
                                label="Số Lượng"
                            >
                                <InputNumber
                                    style={{ width: 50 }}
                                    min={1}
                                />
                            </Form.Item>

                            <Form.Item
                                className="color-group"
                                name="color"
                            >
                                {(!productDataDetail.color3)
                                    ? (
                                        <Radio.Group>
                                            <Radio className="color1" value={productDataDetail.color1}>{productDataDetail.color1}</Radio>
                                            <Radio className="color1" value={productDataDetail.color2}>{productDataDetail.color2}</Radio>
                                        </Radio.Group>
                                    )
                                    : (
                                        <Radio.Group>
                                            <Radio className="color2" value={productDataDetail.color1}>{productDataDetail.color1}</Radio>
                                            <Radio className="color2" value={productDataDetail.color2}>{productDataDetail.color2}</Radio>
                                            <Radio className="color2" value={productDataDetail.color3}>{productDataDetail.color3}</Radio>
                                        </Radio.Group>
                                    )
                                }
                            </Form.Item>

                            <Form.Item className="btn-detail">
                                <Button className="btn-dathang">
                                    ĐẶT HÀNG TRƯỚC
                                </Button>
                                <div className="btn-detail-child">
                                    <Button
                                        className="btn-muahang"
                                        htmlType="submit"
                                    >
                                        <ShoppingCartOutlined
                                            className="icon-cart"
                                        />
                                        <span
                                            style={{ fontSize: 16, fontWeight: 700 }}>
                                            MUA HÀNG <br />
                                            <span
                                                style={{ fontSize: 12, fontWeight: 500, width: "100%" }}>
                                                GIAO HÀNG TẬN NƠI
                                            </span>
                                        </span>
                                    </Button>
                                    <Button className="btn-tragop">
                                        <CreditCardOutlined
                                            className="icon-cart"
                                            style={{ fontSize: 24, paddingBottom: 17 }}
                                        />
                                        <span
                                            style={{ fontSize: 16, fontWeight: 700 }}>
                                            MUA TRẢ GÓP<br />
                                            <span
                                                style={{ fontSize: 12, fontWeight: 500, width: "100%" }}>
                                                THẺ TÍN DỤNG
                                            </span>
                                        </span>
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                        <div className="hotline-detail">
                            <span>
                                Gọi<strong style={{ color: "#db0000" }}> 1800.6018</strong> hoặc <strong style={{ color: "#db0000" }}>1900.2057</strong> để được tư vấn &#40;08:30 - 21:30&#41;
                            </span>
                        </div>

                        <div className="sale-detail">
                            <p style={{ marginBottom: 10, fontSize: 18, fontWeight: 600 }}>QUÀ TẶNG VÀ KHUYẾN MÃI</p>
                            <ul>
                                <li>Tặng kèm ốp lưng và dây đeo thời trang tùy chọn trị giá 100.000 đ</li>
                                <li>Tặng dán cường lực chống va đập hoặc trợ giá PPF Body tùy chọn trị giá 100.000 đ</li>
                                <li>Tặng Voucher giảm giá cho lần mua hàng tiếp theo giá trị 200.000 đ</li>
                                <li>Trợ giá khi mua Pin dự phòng Xiaomi 10.000mAh Gen 2 chỉ còn 349.000 vnđ</li>
                                <li>Giảm 20% - 50% mua phụ kiện &amp; sửa chữa dịch vụ</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row className="row-comment">
                    <Col span={24}>
                        <Form
                            form={commentForm}
                            onFinish={onFinishFeedback}
                            name="feedback"
                            style={{ margin: 0 }}
                            initialValues={{
                                rate: 4,
                            }}
                        >
                            <p
                                style={{ fontSize: 19, fontWeight: 600 }}>
                                Đánh Giá Và Nhận Xét {productDataDetail.name}
                            </p>
                            <Form.Item
                                name="rate"
                            >
                                <Rate />
                            </Form.Item>

                            <Form.Item
                                name="comment"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập nhận xét của bạn !',
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Hãy nhận xét sản phẩm theo ý kiến của bạn...."
                                    autoSize={{ minRows: 5, maxRows: 10 }}
                                />
                            </Form.Item>

                            <Form.Item >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="btn-danhgia"
                                    onClick={() => {
                                        if (info === null) {
                                            notification.open({
                                                message: `Bạn cần phải đăng nhập tài khoản!`,
                                                className: 'custom-class',
                                                duration: 1.5,
                                                icon: <InfoCircleOutlined style={{marginTop: 6,color:"#fc0303"}}/>,
                                                style: {
                                                    width: 350,
                                                    backgroundColor: "#ffffff",
                                                    fontSize: 18,
                                                    fontWeight: 600,
                                                },
                                            });
                                        }
                                    }}>
                                    Gửi Đánh Giá
                                </Button>
                            </Form.Item>
                        </Form>
                        {renderFeedBack()}
                    </Col>
                </Row>
            </Row>
        </>
    );
}

// store ( state tổng )
const mapStateToProps = (state) => {
    const { productDataDetail } = state.productdetailReducer;
    const { feedbackData } = state.feedbackReducer;
    return {
        productDataDetail,
        feedbackData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getProductDetail: (params) => dispatch(getProductDetail(params)),
        createFeedBack: (params) => dispatch(createFeedBack(params)),
        getFeedBack: (params) => dispatch(getFeedBack(params)),
        addCart: (params) => dispatch(addCart(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetail);
