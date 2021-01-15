import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../../util/history';
import NumberFormat from 'react-number-format';
import { Col, Row} from 'antd';
import {
    getAppleWatchList
} from '../../../redux/actions/index.action';
import './styles.css';

function AppleWatch({
    applewatchData,
    getAppleWatchList,
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
        const object = productStyle && { style: productStyle }
        getAppleWatchList({
            more: false,
            page: 1,
            priceGTE: productFilter.priceGTE,
            priceLTE: productFilter.priceLTE,
            ...objectType,
            ...object
        });
    }, [productType, productStyle]);

    const handleClickPriceFilter = (item) => {
        getAppleWatchList({
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
        getAppleWatchList({
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

    const renderAppleWatchtList = () => {
        return applewatchData.map((applewatch, applewatchIndex) => {
            return (
                <Col
                    span={6}
                    className="list-applewatch"
                    key={`applewatch-${applewatch.id}-${applewatchIndex}`}
                    onClick={() => history.push(`/sanpham/${applewatch.id}`)}
                >
                    <div
                        className="list-applewatch-child"
                    >
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
                    <div
                        className="sale-applewatch"
                    >
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

    return (
        <>
            <Row className="ApplewatchPage">
                <Row className="namePhone-itemMenu">
                    <Col span={4}>
                        <p className="name">Apple Watch</p>
                    </Col>
                    <Col span={20}>
                        <div className="price-level">
                            {renderPriceLevel()}
                        </div>
                    </Col>
                </Row>
                <Row className="list-applewatch-group">
                    {renderAppleWatchtList()}
                </Row>
            </Row>
            <Row>
                <Col span={24}
                    className="col-more"
                >
                    {applewatchData.length < 12
                        ? (
                            null
                        )
                        : (
                            <div
                                className="btn-more"
                                onClick={() => handleLoadmoreProducts()}
                            >
                                {`${((applewatchData.length > 41) || (applewatchData.length === 18) || (applewatchData.length === 14)) ? 'Đã Tải Xong' : 'Hiển Thị Thêm'}`}
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
    const { applewatchData } = state.applewatchReducer;
    return {
        applewatchData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getAppleWatchList: (params) => dispatch(getAppleWatchList(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppleWatch);