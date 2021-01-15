import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { Col, Row } from 'antd';
import {
    getRepairList
} from '../../../redux/actions/index.action';
import './styles.css';

function Repair({
    repairData,
    getRepairList
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
    const productType = urlParams.searchParams.get('type')
    const productStyle = urlParams.searchParams.get('style')

    useEffect(() => {
        const objectType = productType && { type: productType }
        const objectStyle = productStyle && { style: productStyle }
        getRepairList({
            more: false,
            page: 1,
            priceGTE: productFilter.priceGTE,
            priceLTE: productFilter.priceLTE,
            ...objectType,
            ...objectStyle
        });
    }, [productType, productStyle]);

    const handleClickPriceFilter = (item) => {
        getRepairList({
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
        getRepairList({
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

    const renderRepairtList = () => {
        return repairData.map((repair, repairIndex) => {
            return (
                <Col
                    span={6}
                    className="list-repair"
                    key={`suachua-${repair.id}-${repairIndex}`}
                >
                    <div
                        className="list-repair-child"
                    >
                        <div className="image-repair">
                            <img src={repair.url1} alt="#" width="207px" height="207px" />
                        </div>
                        <div className="name-repair" style={{ marginTop: 10, height: 50 }} >
                            <p style={{ color: "#000000", fontSize: "14px" }}>{repair.name}</p>
                        </div>
                        <div className="price-repair" style={{ height: 30 }}>
                            <NumberFormat style={{ color: "#fc0328", fontWeight: "700" }} value={repair.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                        </div>
                    </div>
                </Col>
            )
        })
    }

    return (
        <>
            <Row className="RepairPage">
                <Row className="namePhone-itemMenu">
                    <Col span={3}>
                        <p className="name">Sữa Chữa</p>
                    </Col>
                    <Col span={21}>
                        <div className="price-level">
                            {renderPriceLevel()}
                        </div>
                    </Col>
                </Row>
                <Row className="list-repair-group">
                    {renderRepairtList()}
                </Row>
            </Row>
            <Row>
                <Col span={24}
                    className="col-more"
                >
                    {repairData.length <= 11
                        ? (
                            null
                        )
                        : (
                            <div
                                className="btn-more"
                                onClick={() => handleLoadmoreProducts()}
                            >
                                {`${repairData.length === 17 ? 'Đã Tải Xong' : 'Hiển Thị Thêm'}`}
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
    const { repairData } = state.repairReducer;
    return {
        repairData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getRepairList: (params) => dispatch(getRepairList(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Repair);