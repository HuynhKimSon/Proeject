import React from 'react';
import paymentBank from '../../image/imagerFooter/ho-tro-thanh-toan.png'
import bct from '../../image/imagerFooter/bct.png'
import { Row, Col, Image } from 'antd';
import { BankOutlined, HomeOutlined, PhoneOutlined, ShopOutlined } from '@ant-design/icons';
import './styles.css';
function Footer() {
    return (
        <>
            <Row className="footer-top">
                <Col className="introduce" span={6}>
                    <div className="heading"><ShopOutlined style={{ color: "red" }} /> GIỚI THIỆU</div>
                    <p style={{ marginTop: 10, paddingRight: 15, fontSize: "15px" }}>
                        Cửa hàng điện thoại Smart Apple chúng tôi chuyên cung cấp sản phẩm của Apple, đặc biệt là các loại Smart Phone và Apple Watch đi kèm đó là sản phẩm phụ kiện, đồ chơi công nghệ , dịch vụ sửa chữa chuyên nghiệp.
                    </p>
                </Col>
                <Col className="phone-support" span={6} style={{ paddingLeft: 20 }}>
                    <div className="heading"><PhoneOutlined style={{ color: "red" }} /> HỖ TRỢ TƯ VẤN</div>
                    <ul>
                        <li>Gọi tư vấn máy - Phụ kiện <br />
                            <strong>1800.6018 &#40;08:30 - 21:30&#41;</strong>
                        </li>
                        <li>Khiếu nại - Góp ý <br />
                            <strong>1800.6018 &#40;08:30 - 21:30&#41;</strong>
                        </li>
                        <li>Bảo hành - Hỗ trợ kỹ thuật <br />
                            <strong>1900.2057 &#40;08:30 - 21:30&#41;</strong>
                        </li>
                    </ul>
                </Col>
                <Col className="bank-support" span={6}>
                    <div className="heading"><BankOutlined style={{ color: "red" }} /> HỖ TRỢ THANH TOÁN</div>
                        <Image style={{marginTop:15}} src={paymentBank} width="220px" height="70px" />
                        <Image style={{marginTop:15}} src={bct} width="100px"/>
                </Col>
                <Col className="map-address" span={6} style={{ paddingLeft: 10 }}>
                    <div className="heading"><HomeOutlined style={{ color: "red" }} /> ĐỊA CHỈ CỬA HÀNG</div>
                    <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1043574757487!2d108.2115024143366!3d16.060073543950292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b5f6ae2db3%3A0x226bdde95cedf920!2zMjA3IE5ndXnhu4VuIFbEg24gTGluaCwgTmFtIETGsMahbmcsIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1601716687137!5m2!1svi!2s" width={250} height={160} frameBorder={0} style={{ marginTop: 10, border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
                </Col>
            </Row>
            <Row className="footer-bottom">
                <Col span={24}>
                    <p className="footer-info">
                        &copy;2020 - Smartapple.vn - 207 Nguyễn Văn Linh, Đà Nẵng, Việt Nam <br></br>
                        Hộ Kinh Doanh Cá Thể : Huỳnh Kim Sơn - 207 Nguyễn Văn Linh, Quận Hải Châu -  Thành Phố Đà Nẵng, Việt Nam <br></br>
                        MST : 2007182009 &#40; Số giấy chứng nhận đăng ký thuế &#41; - Ngày cấp lần đầu 01/10/2018 <br></br>
                        Nơi cấp : Chi cục thuế quận Hải Châu
                    </p>
                </Col>
            </Row>
        </>
    );
}
export default Footer;