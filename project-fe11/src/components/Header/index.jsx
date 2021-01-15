import React, { useEffect } from 'react';
import history from '../../util/history';
import { Row, Col, Select, Avatar, Dropdown, Menu, Button, Badge, notification } from 'antd';
import { ShoppingCartOutlined, MailOutlined, FacebookOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import imageLogo from '../../image/imageHeader/logo.png'
import { connect } from 'react-redux';
import {
    getSearch,
    getCart,
    Logout
} from '../../redux/actions/index.action';
import './styles.css';

function Header({
    searchData,
    cartData,
    getSearch,
    getCart,
    Logout,
}) {
    useEffect(() => {
        getCart({ idUser: info?.id });
    }, []);

    // Get localStorage
    const info = JSON.parse(localStorage.getItem("user"));

    // Search
    const handlChangeSearch = (value) => {
        getSearch({ name: value });
    }

    const renderSearchOption = () => {
        return searchData.map((searchItem, searchItemIndex) => (
            <Select.Option
                key={`search-item-${searchItem.id}-${searchItemIndex}`}
                value={searchItem.id}
            >
                {searchItem.name}
            </Select.Option>
        ))
    }

    return (
        <>
            <Row>
                <Col span={24}>
                    <div className="banner-top">
                        <div className="banner-top-child">
                            <div className="hotline">
                                <p style={{ marginBottom: '0px' }} >
                                    <MailOutlined style={{ fontSize: '15px' }} />&nbsp;&nbsp;<span>smartapple207nvl@gmail.com</span>&nbsp;&nbsp;&nbsp;&nbsp;&#124;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <FacebookOutlined style={{ fontSize: '16px' }} />&nbsp;&nbsp;<span>facebook.com/smartapple/</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row
                className="banner-top-2">
                <Col span={3}></Col>
                <Col span={4}>
                    <div className="logo" style={{ marginTop: 20, cursor: "pointer" }} >
                        <img onClick={() => history.push('/')} src={imageLogo} alt="#" title="Smart Apple - Cửa Hàng Điện Thoại Uy Tín Nhất" width="120px" height="75px" />
                    </div>
                </Col>
                <Col
                    className="search"
                    span={10}>
                    <Select
                        showSearch
                        showArrow={false}
                        placeholder="Tìm kiếm sản phẩm..."
                        size="large"
                        defaultActiveFirstOption={false}
                        filterOption={false}
                        onSearch={(value) => handlChangeSearch(value)}
                        onChange={(id) => history.push(`/sanpham/${id}`)}
                        style={{ width: '100%' }}
                    >
                        {renderSearchOption()}
                    </Select>
                    <div className="dot" style={{ display: "flex", paddingTop: 10 }}>
                        <img alt="#" src="https://exphone.vn/clipse.svg" height="20px" width="auto" />
                        <p style={{ fontSize: 11, paddingLeft: 5 }}>Lên đời iphone 11 cực dễ , giảm cực sốc lên tới 1 triệu đồng </p>
                    </div>
                </Col>
                <Col span={4}>
                    <div className="User-Cart">
                        {
                            (info === null)
                                ? (<Button
                                    style={{ height: 40, borderRadius: 5 }}
                                    onClick={() => history.push('/login')}
                                >
                                    <UserOutlined />
                                Đăng Nhập
                                </Button>
                                )
                                : (
                                    <Dropdown overlay={
                                        <Menu>
                                            <Menu.Item className="user-dropdown" onClick={() => history.push('/profile')} >Thông tin người dùng</Menu.Item>
                                            <Menu.Item className="user-dropdown" onClick={() => { Logout() }} >Đăng xuất</Menu.Item>
                                        </Menu>}
                                    >
                                        <Badge count={1}>
                                            <Avatar style={{ backgroundColor: "#6b6b6b", color: "#f0f0f0", cursor: "pointer" }} size={40} icon={<UserOutlined />} />
                                        </Badge>
                                    </Dropdown>
                                )
                        }
                        <div className="cart">
                            <ShoppingCartOutlined
                                className="iconCart"
                                style={{ fontSize: 40, color: "#6b6b6b", cursor: "pointer" }}
                                title="Giỏ hàng"
                                onClick={() => {
                                    if (info === null) {
                                        notification.open({
                                            message: `Bạn cần phải đăng nhập tài khoản!`,
                                            className: 'custom-class',
                                            duration: 1.5,
                                            icon: <InfoCircleOutlined  style={{marginTop: 6,color:"#fc0303"}} />,
                                            style: {
                                                width: 350,
                                                backgroundColor: "#ffffff",
                                                fontSize: 18,
                                                fontWeight: 600,
                                            },
                                        });
                                    } else {
                                        history.push('/giohang')
                                    }
                                }}
                            />
                            <span className="count-cart">
                                {cartData.length}
                            </span>
                        </div>
                    </div>
                </Col>
                <Col span={3}></Col>
            </Row>
        </>
    );
}

// store ( state tổng )
const mapStateToProps = (state) => {
    const { searchData } = state.searchReducer;
    const { cartData } = state.cartReducer;
    const { userData } = state.authReducer;
    return {
        searchData,
        cartData,
        userData,
    }
};

// dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getSearch: (params) => dispatch(getSearch(params)),
        getCart: (params) => dispatch(getCart(params)),
        Logout: (params) => dispatch(Logout(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

