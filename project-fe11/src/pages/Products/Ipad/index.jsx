import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../../util/history';
import NumberFormat from 'react-number-format';
import { Col, Row } from 'antd';
import {
    getIpadList
} from '../../../redux/actions/index.action';
import './styles.css';

function Ipad({
    ipadData,
    getIpadList,
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

    const urlParams = new URL(window.location.href);
    const productType = urlParams.searchParams.get('type');
    const productStyle = urlParams.searchParams.get('style')

    useEffect(() => {
        const objectType = productType && { type: productType };
        const objectStyle = productStyle && { style: productStyle }
        getIpadList({
            more: false,
            page: 1,
            priceGTE: productFilter.priceGTE,
            priceLTE: productFilter.priceLTE,
            ...objectType,
            ...objectStyle,
        });
    }, [productType, productStyle]);

    const handleClickPriceFilter = (item) => {
        getIpadList({
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

    const handleLoadmoreProducts = () => {
        getIpadList({
            more: true,
            page: productPage + 1,
            priceGTE: productFilter.priceGTE,
            priceLTE: productFilter.priceLTE,
            ...productType && { type: productType },
            ...productStyle && { style: productStyle },
        });
        setProductPage(productPage + 1);
    }

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

    const renderIpadtList = () => {
        return ipadData.map((ipad, ipadIndex) => {
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

    return (
        <>
            <Row className="IpadPage">
                <Row className="namePhone-itemMenu">
                    <Col span={4}>
                        <p className="name">Máy Tính Bảng</p>
                    </Col>
                    <Col span={20}>
                        <div className="price-level">
                            {renderPriceLevel()}
                        </div>
                    </Col>
                </Row>
                <Row className="list-ipad-group">
                    {renderIpadtList()}
                </Row>
            </Row>
            <Row>
                <Col span={24}
                    className="col-more"
                >
                    {ipadData.length <= 11
                        ? (
                            null
                        )
                        : (
                            <div
                                className="btn-more"
                                onClick={() => { handleLoadmoreProducts() }}>
                                {`${ipadData.length > 21 ? 'Đã Tải Xong' : 'Hiển Thị Thêm'}`}
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
    const { ipadData } = state.ipadReducer;
    return {
        ipadData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getIpadList: (params) => dispatch(getIpadList(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ipad);