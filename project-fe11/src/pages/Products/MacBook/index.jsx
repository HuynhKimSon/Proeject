import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../../util/history';
import NumberFormat from 'react-number-format';
import { Col, Row } from 'antd';
import {
    getMacBookList
} from '../../../redux/actions/index.action';
import './styles.css';

function Macbook({
    macbookData,
    getMacBookList
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
        getMacBookList({
            more: false,
            page: 1,
            priceGTE: productFilter.priceGTE,
            priceLTE: productFilter.priceLTE,
            ...objectType,
            ...objectStyle
        });
    }, [productType, productStyle])

    const handleClickPriceFilter = (item) => {
        getMacBookList({
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
        getMacBookList({
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

    const renderMacBooktList = () => {
        return macbookData.map((macbook, macbookIndex) => {
            return (
                <Col
                    span={6}
                    className="list-macbook"
                    key={`macbook-${macbook.id}-${macbookIndex}`}
                    onClick={() => history.push(`/sanpham/${macbook.id}`)}
                >
                    <div
                        className="list-macbook-child"
                    >
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
                    <div
                        className="sale-macbook"
                    >
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
            <Row className="MacbookPage">
                <Row className="namePhone-itemMenu">
                    <Col span={3}>
                        <p className="name">MacBook</p>
                    </Col>
                    <Col span={21}>
                        <div className="price-level">
                            {renderPriceLevel()}
                        </div>
                    </Col>
                </Row>
                <Row className="list-macbook-group">
                    {renderMacBooktList()}
                </Row>
            </Row>
            <Row>
                <Col span={24}
                    className="col-more"
                >
                    {macbookData.length <= 11
                        ? (
                            null
                        )
                        : (
                            <div
                                className="btn-more"
                                onClick={() => handleLoadmoreProducts()}
                            >
                                {`${((macbookData.length > 24) || (macbookData.length === 17)) ? 'Đã Tải Xong' : 'Hiển Thị Thêm'}`}
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
    const { macbookData } = state.macbookReducer;
    return {
        macbookData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getMacBookList: (params) => dispatch(getMacBookList(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Macbook);