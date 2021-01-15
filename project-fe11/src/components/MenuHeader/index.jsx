import React from "react";
import { Row, Col, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import history from '../../util/history';
import './styles.css';

function MenuHeader() {
    const dataMenu = [
        {
            title: "ĐIỆN THOẠI",
            icon: "http://exphone.vn/uploads/2019/10/mobile.png",
            path: "/dienthoai?type=phone",
            menuItemChild: [
                {
                    title: "iPhone 11 | 11 Pro | 11 Pro Max ",
                    path: "/dienthoai?type=phone&style=iphone-11-11pro-11promax",
                },
                {
                    title: "iPhone Xs | Xs Max",
                    path: "/dienthoai?type=phone&style=iphone-xs-xsmax",
                },
                {
                    title: "iPhone X | Xr",
                    path: "/dienthoai?type=phone&style=iphone-x-xr",
                },
                {
                    title: "iPhone 8 | 8 Plus",
                    path: "/dienthoai?type=phone&style=iphone-8-8plus",
                },
                {
                    title: "iPhone 7 | 7 Plus",
                    path: "/dienthoai?type=phone&style=iphone-7-7plus",
                },
                {
                    title: "iPhone 6s | 6s Plus ",
                    path: "/dienthoai?type=phone&style=iphone-6s-6splus",
                },
            ],
        },
        {
            title: " MÁY TÍNH BẢNG",
            icon: "http://exphone.vn/uploads/2019/10/tablet-icon.png",
            path: "/maytinhbang?type=ipad",
            menuItemChild: [
                {
                    title: "iPad Pro (2020)",
                    path: "/maytinhbang?type=ipad&style=ipad-pro2020",
                },
                {
                    title: "iPad 10.2 (2020)",
                    path: "/maytinhbang?type=ipad&style=ipad-10.2-2020",
                },
                {
                    title: "iPad Air 4 (2020)",
                    path: "/maytinhbang?type=ipad&style=ipad-air-4-2020",
                },
                {
                    title: "iPad 10.2 (2019)",
                    path: "/maytinhbang?type=ipad&style=ipad-10.2-2019",
                },
            ],
        },
        {
            title: "APPLE WATCH",
            icon: "https://exphone.vn/uploads/2019/10/apple-watch.png",
            path: "/applewatch?type=applewatch",
            menuItemChild: [
                {
                    title: "Apple Watch Series 6",
                    path: "/applewatch?type=applewatch&style=apple-watch-series-6",
                },
                {
                    title: "Apple Watch Series 5",
                    path: "/applewatch?type=applewatch&style=apple-watch-series-5",
                },
                {
                    title: "Apple Watch Series 4",
                    path: "/applewatch?type=applewatch&style=apple-watch-series-4",
                },
                {
                    title: "Apple Watch Series 3",
                    path: "/applewatch?type=applewatch&style=apple-watch-series-3",
                },
                {
                    title: "Apple Watch Series 2",
                    path: "/applewatch?type=applewatch&style=apple-watch-series-2",
                },
                {
                    title: "Apple Watch Series 1",
                    path: "/applewatch?type=applewatch&style=apple-watch-series-1",
                },
            ],
        },
        {
            title: "MACBOOK",
            icon: "http://exphone.vn/uploads/2019/10/hire-purchase-icon.png",
            path: "/macbook?type=macbook",
            menuItemChild: [
                {
                    title: "iMac 2020",
                    path: "/macbook?type=macbook&style=imac2020",
                },
                {
                    title: "Macbook Pro 2020 | Air 2020",
                    path: "/macbook?type=macbook&style=macbook-pro2020-air2020",
                },
                {
                    title: "Macbook Pro 2019",
                    path: "/macbook?type=macbook&style=macbook-pro2019",
                },
                {
                    title: "Sạc Macbook",
                    path: "/macbook?type=macbook&style=sac-macbook",
                },
            ],
        },
        {
            title: "SỮA CHỮA",
            icon: "http://exphone.vn/uploads/2019/10/repair-icon.png",
            path: "/suachua?type=repair",
            menuItemChild: [
                {
                    title: "Dịch Vụ Thay Pin",
                    path: "/suachua?type=repair&style=dichvuthaypin",
                },
                {
                    title: "ÉP Kính & Thay màn",
                    path: "/suachua?type=repair&style=epkinh-thayman",
                },
                {
                    title: "Thay Vỏ & Lưng Kính",
                    path: "/suachua?type=repair&style=thayvo-lungkinh",
                },
            ],
        },
    ];

    const renderDropdownItem = (dropdownData) => {
        return (dropdownData || []).map((dropdownItem, dropdownItemIndex) => {
            return (
                <Menu.Item
                    className="item-dropdown"
                    key={`dropdown-item-${dropdownItemIndex}`}
                    onClick={() => history.push(dropdownItem.path)}
                >
                    {dropdownItem.title}
                </Menu.Item>
            )
        })
    }
    const renderMenuItem = () => {
        return dataMenu.map((menuItem, menuItemIndex) => {
            return (
                <Menu.Item
                    key={`menu-item-${menuItemIndex}`}
                    className={`menu-item ${history.location.pathname === menuItem.path ? 'menu-active' : ''}`}
                >
                    <Dropdown
                        overlay={
                            <Menu>
                                {renderDropdownItem(menuItem.menuItemChild)}
                            </Menu>
                        }
                    >
                        <div
                            className="item"
                            onClick={() => history.push(menuItem.path)}
                        >
                            <Space
                                align="start" style={{ height: 40 }}>
                                <img alt="#" src={menuItem.icon} />
                                <p style={{ paddingTop: 2 }}>{menuItem.title}</p>
                                <DownOutlined style={{ marginRight: 0 }} />
                            </Space>
                        </div>
                    </Dropdown>
                </Menu.Item>
            )
        });
    }
    return (
        <Row>
            <Col span={24}>
                <Menu
                    mode="horizontal menu">
                    {renderMenuItem()}
                </Menu>
            </Col>
        </Row>
    )
}
export default MenuHeader;