import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../util/history';
import NumberFormat from 'react-number-format';
import { Col, Row, Carousel, Image } from 'antd';

import {
    getPhoneHomeList,
    getIpadHomeList,
    getAppleWatchHomeList,
    getMacBookHomeList,
} from '../../redux/actions/index.action';

import './styles.css';

function Home({
    phoneHomeData,
    ipadHomeData,
    applewatchHomeData,
    macbookHomeData,
    getPhoneHomeList,
    getIpadHomeList,
    getAppleWatchHomeList,
    getMacBookHomeList,
}) {

    useEffect(() => {
        getPhoneHomeList({
            page: 1
        });
        getIpadHomeList({
            page: 1
        });
        getAppleWatchHomeList({
            page: 1
        });
        getMacBookHomeList({
            page: 1
        })
    }, []);

    const renderPhonetList = () => {
        return phoneHomeData.map((phone, phoneIndex) => {
            return (
                <Col
                    span={6}
                    className="list-phone"
                    key={`dienthoai-${phone.id}-${phoneIndex}`}
                    onClick={() => history.push(`/sanpham/${phone.id}`)}
                >
                    <div
                        className="list-phone-child">
                        <div className="image-phone">
                            <Image src={phone.url1} width="207px" height="207px" />
                        </div>
                        <div className="name-phone" style={{ height: 50 }} >
                            <p style={{ color: "#000000", fontSize: "14px" }}>{phone.name}</p>
                        </div>
                        <div className="price-phone" style={{ height: 30 }}>
                            <NumberFormat style={{ color: "#fc0328", fontWeight: "700" }} value={phone.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </div>
                    </div>
                    <div className="sale-phone">
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{phone.name}</p>
                        <p style={{ margin: 0, fontSize: 14 }}>
                            <NumberFormat style={{ color: "#fc0328", fontWeight: "700" }} value={phone.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </p>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>Khuyến Mãi:</p>
                        <ul>
                            <li>
                                <span>Tặng</span> kèm ốp lưng thời trang trị giá <span>100.000 đ</span>
                            </li>
                            <li>
                                <span>Tặng</span> dán cường lực chống va đập trị giá <span>100.000 đ</span>
                            </li>
                            <li>
                                <span>Tặng Voucher</span> giảm giá cho lần mua hàng tiếp theo trị giá <span>200.000 đ</span>
                            </li>
                        </ul>
                    </div>
                </Col>
            )
        })
    }

    const renderIpadtList = () => {
        return ipadHomeData.map((ipad, ipadIndex) => {
            return (
                <Col
                    span={6}
                    className="list-ipad"
                    key={`maytinhbang-${ipad.id}-${ipadIndex}`}
                    onClick={() => history.push(`/sanpham/${ipad.id}`)}
                >
                    <div
                        className="list-ipad-child"
                    >
                        <div className="image-ipad">
                            <img src={ipad.url1} alt="" width="207px" height="207px" />
                        </div>
                        <div className="name-ipad" style={{ height: 50 }} >
                            <p style={{ color: "#000000", fontSize: "14px" }}>{ipad.name}</p>
                        </div>
                        <div className="price-ipad" style={{ height: 30 }}>
                            <NumberFormat style={{ color: "#fc0328", fontWeight: "700" }} value={ipad.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </div>
                    </div>
                    <div
                        className="sale-ipad"
                    >
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{ipad.name}</p>
                        <p style={{ margin: 0, fontSize: 14 }}>
                            <NumberFormat style={{ color: "#fc0328", fontWeight: "700" }} value={ipad.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </p>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>Khuyến Mãi:</p>
                        <ul>
                            <li>
                                <span>Tặng</span> dán cường lực chính hãng trị giá <span>150.000 đ</span>
                            </li>
                            <li>
                                <span>Tặng Voucher</span> giảm giá cho lần mua hàng tiếp theo trị giá <span>200.000 đ</span>
                            </li>
                        </ul>
                    </div>
                </Col>
            )
        })
    }

    const renderAppleWatchtList = () => {
        return applewatchHomeData.map((applewatch, applewatchIndex) => {
            return (
                <Col
                    span={6}
                    className="list-applewatch"
                    key={`applewatch-${applewatch.id}-${applewatchIndex}`}
                    onClick={() => history.push(`/sanpham/${applewatch.id}`)}
                >
                    <div
                        className="list-applewatch-child">
                        <div className="image-applewatch">
                            <img src={applewatch.url1} alt="" width="160px" height="150px" />
                        </div>
                        <div className="name-applewatch" style={{ height: 50 }} >
                            <p style={{ color: "#000000", fontSize: "14px" }}>{applewatch.name}</p>
                        </div>
                        <div className="price-applewatch" style={{ height: 30 }}>
                            <NumberFormat style={{ color: "#fc0328", fontWeight: "700" }} value={applewatch.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </div>
                    </div>
                    <div className="sale-applewatch">
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{applewatch.name}</p>
                        <p style={{ margin: 0, fontSize: 14 }}>
                            <NumberFormat style={{ color: "#fc0328", fontWeight: "700" }} value={applewatch.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </p>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>Khuyến Mãi:</p>
                        <ul>
                            <li>
                                <span>Tặng</span> Trợ giá PPF Body <span>99.000 đ</span>
                            </li>
                            <li>
                                Giảm <span>50%</span> khi mua thêm dây đeo thời trang
                            </li>
                        </ul>
                    </div>
                </Col>
            )
        })
    }

    const renderMacBooktList = () => {
        return macbookHomeData.map((macbook, macbookIndex) => {
            return (
                <Col
                    span={6}
                    className="list-macbook"
                    key={`macbook-${macbook.id}-${macbookIndex}`}
                    onClick={() => history.push(`/sanpham/${macbook.id}`)}
                >
                    <div
                        className="list-macbook-child">
                        <div className="image-macbook">
                            <img src={macbook.url1} alt="" width="207px" height="207px" />
                        </div>
                        <div className="name-macbook" style={{ height: 90 }} >
                            <p style={{ color: "#000000", fontSize: "14px" }}>{macbook.name}</p>
                        </div>
                        <div className="price-macbook" style={{ height: 50 }}>
                            <NumberFormat style={{ color: "#fc0328", fontWeight: "700" }} value={macbook.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </div>
                    </div>
                    <div className="sale-macbook">
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{macbook.name}</p>
                        <p style={{ margin: 0, fontSize: 14 }}>
                            <NumberFormat style={{ color: "#fc0328", fontWeight: "700" }} value={macbook.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </p>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>Khuyến Mãi:</p>
                        <ul>
                            <li>
                                Giảm <span>10%</span> khi mua phụ kiện Macbook &#40;trừ phụ kiện Apple&#41;
                            </li>
                        </ul>
                    </div>
                </Col>
            )
        })
    }

    return (
        <>
            <Row className="HomeCarousel">
                <Col
                    className="carousel"
                >
                    <Carousel autoplay autoplaySpeed={2500}>
                        <div className="carousel-image">
                            <img src="https://exphone.vn/uploads/2020/09/SLIDE-WEB-1.png" alt="#"/>
                        </div>
                        <div className="carousel-image">
                            <img src="https://exphone.vn/uploads/2020/09/slide_755x300_web_s3_moi.png" alt="#" />
                        </div>
                        <div className="carousel-image">
                            <img src="https://exphone.vn/uploads/2020/07/SLIDE-WEB.png" alt="#" />
                        </div>
                        <div className="carousel-image">
                            <img src="https://exphone.vn/uploads/2020/12/XSMAX-LOCK-_-SLIDE-WEB.png" alt="#" />
                        </div>
                        <div className="carousel-image">
                            <img src="https://exphone.vn/uploads/2020/11/S6WEB1.png" alt="#" />
                        </div>
                        <div className="carousel-image">
                            <img src="https://exphone.vn/uploads/2020/11/AIRPODS-2-WEB.png" alt="#" />
                        </div>
                    </Carousel>
                </Col>
                <Col
                    className="advertisement"
                >
                    <div className="advertisement-image-1" >
                        <img width="100%" height="135px" src="https://didongviet.vn/pub/media/magestore/bannerslider/images/4/8/480x255_20.png" alt="#" />
                    </div>
                    <div className="advertisement-image-2" style={{ paddingTop: 10 }} >
                        <img width="100%" height="135px" src="https://didongviet.vn/pub/media/magestore/bannerslider/images/4/8/480x255_21.png" alt="#" />
                    </div>
                </Col>
            </Row >

            <Row className="HomePhone">
                <Row className="row-name">
                    <Col span={24}>
                        <p className="name-home">Điện Thoại iPhone 11 | iPhone 11 Pro | iPhone 11 Pro Max</p>
                    </Col>
                </Row>
                <Row className="list-product-group">
                    {renderPhonetList()}
                </Row>
            </Row>

            <Row className="HomeIpad">
                <Row className="row-name">
                    <Col span={24}><p className="name-home">iPad Pro 2020</p></Col>
                </Row>
                <Row className="list-product-group">
                    {renderIpadtList()}
                </Row>
            </Row>

            <Row className="HomeAppleWatch">
                <Row className="row-name">
                    <Col span={24}><p className="name-home">Apple Watch Series 6 | Apple Watch Series 5</p></Col>
                </Row>
                <Row className="list-product-group">
                    {renderAppleWatchtList()}
                </Row>
            </Row>

            <Row className="HomeMacBook">
                <Row className="row-name">
                    <Col span={24}><p className="name-home">iMac 2020</p></Col>
                </Row>
                <Row className="list-product-group">
                    {renderMacBooktList()}
                </Row>
            </Row>

            <Row className="HomeBanner">
                <Col className="col-homebaner" span={24}>
                    <img width="100%" height="auto" src="http://ihubdanang.vn/uploads/images/1600.png" alt="#" />
                </Col>
            </Row>
        </>
    );
}

// store ( state tổng )
const mapStateToProps = (state) => {
    const { phoneHomeData, ipadHomeData, applewatchHomeData, macbookHomeData } = state.homeReducer;
    return {
        phoneHomeData,
        ipadHomeData,
        applewatchHomeData,
        macbookHomeData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getPhoneHomeList: (params) => dispatch(getPhoneHomeList(params)),
        getIpadHomeList: (params) => dispatch(getIpadHomeList(params)),
        getAppleWatchHomeList: (params) => dispatch(getAppleWatchHomeList(params)),
        getMacBookHomeList: (params) => dispatch(getMacBookHomeList(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);