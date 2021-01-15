import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../../util/history';
import NumberFormat from 'react-number-format';
import { Col, Row } from 'antd';
import {
    getPhoneList
} from '../../../redux/actions/index.action';
import './styles.css'

function Phone({
    phoneData,
    getPhoneList,
}) {

    const priceLevelData = [
        {
            priceLevel: "Dưới 5 triệu",
            priceGTE: 0,
            priceLTE: 5000000,
        },
        {
            priceLevel: "Từ 5 triệu - 10 triệu",
            priceGTE: 5000000,
            priceLTE: 10000000,
        },
        {
            priceLevel: "Từ 10 triệu - 20 triệu",
            priceGTE: 10000000,
            priceLTE: 20000000,
        },
        {
            priceLevel: "Từ 20 triệu - 30 triệu",
            priceGTE: 20000000,
            priceLTE: 30000000,
        },
        {
            priceLevel: "Trên 30 triệu",
            priceGTE: 30000000,
            priceLTE: 999999999,
        },
    ]

    const [productPage, setProductPage] = useState(1);
    const [productFilter, setProductFilter] = useState({
        priceGTE: 0,
        priceLTE: 999999999,
    });

    // URL Window
    const urlParams = new URL(window.location.href);
    const productType = urlParams.searchParams.get('type');
    const productStyle = urlParams.searchParams.get('style');

    useEffect(() => {
        const objectType = productType && { type: productType };
        const objectStyle = productStyle && { style: productStyle };
        getPhoneList({
            more: false,
            page: 1,
            priceGTE: productFilter.priceGTE,
            priceLTE: productFilter.priceLTE,
            ...objectType,
            ...objectStyle,
        });
    }, [productType, productStyle]);

    // Sort Price
    const handleClickPriceFilter = (item) => {
        getPhoneList({
            more: false,
            page: 1,
            priceGTE: item.priceGTE,
            priceLTE: item.priceLTE,
            ...productType && { type: productType },
            ...productStyle && { style: productStyle },
        });
        setProductFilter({
            priceGTE: item.priceGTE,
            priceLTE: item.priceLTE,
        });
        setProductPage(1);
    }

    // Show More
    const handleLoadmoreProducts = () => {
        getPhoneList({
            more: true,
            page: productPage + 1,
            priceGTE: productFilter.priceGTE,
            priceLTE: productFilter.priceLTE,
            ...productType && { type: productType },
            ...productStyle && { style: productStyle },
        });
        setProductPage(productPage + 1);
    }

    // Render Price
    const renderPriceLevel = () => {
        return priceLevelData.map((pricelevelItem, pricelevelItemIndex) => {
            return (
                <a
                    className="pricelevel-name"
                    key={`pricelevel-item-${pricelevelItemIndex}`}
                    onClick={() => handleClickPriceFilter(pricelevelItem)}
                >
                    {pricelevelItem.priceLevel}
                </a>
            )
        })
    }

    // Render Product Phone
    const renderPhonetList = () => {
        return phoneData.map((phone, phoneIndex) => {
            return (
                <Col
                    span={6}
                    className="list-phone"
                    key={`dienthoai-${phone.id}-${phoneIndex}`}
                    onClick={() => history.push(`/sanpham/${phone.id}`)}
                >
                    <div
                        className="list-phone-child"
                    >
                        <div className="image-phone">
                            <img src={phone.url1} width="207px" height="207px" />
                        </div>
                        <div className="name-phone" style={{ height: 50 }} >
                            <p style={{ color: "#000000", fontSize: "14px" }}>{phone.name}</p>
                        </div>
                        <div className="price-phone" style={{ height: 30 }}>
                            <NumberFormat style={{ color: "#fc0328", fontWeight: "700" }} value={phone.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </div>
                    </div>
                    <div
                        className="sale-phone"
                    >
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

    return (
        <>
            <Row className="PhonePage">
                <Row className="namePhone-itemMenu">
                    <Col span={3}>
                        <p className="name">Điện Thoại</p>
                    </Col>
                    <Col span={21}>
                        <div className="price-level">
                            {renderPriceLevel()}
                        </div>
                    </Col>
                </Row>
                <Row className="list-phone-group">
                    {renderPhonetList()}
                </Row>
            </Row>
            <Row>
                <Col span={24}
                    className="col-more"
                >
                    {phoneData.length <= 12
                        ? (
                            null
                        )
                        : (
                            <div
                                className="btn-more"
                                onClick={() => handleLoadmoreProducts()}>
                                {`${((phoneData.length > 52) || (phoneData.length === 22)) ? 'Đã Tải Xong' : 'Hiển Thị Thêm'}`}
                            </div>
                        )
                    }
                </Col>
            </Row>
        </>
    );
}
// store ( state tổng )
const mapStateToProps = (state) => {
    const { phoneData } = state.phoneReducer;
    return {
        phoneData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getPhoneList: (params) => dispatch(getPhoneList(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Phone);