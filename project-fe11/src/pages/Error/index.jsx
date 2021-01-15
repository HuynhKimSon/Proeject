import React from 'react';
import { Row, Col } from 'antd';
import './styles.css'

function PageError() {

    return (
        <Row className="ErrorPage">
            <Col className="name-error" span={24}>
                <h2>Rất tiếc! trang bạn tìm không tồn tại trong Smartapple.vn</h2>
                <div className="img-error">
                    <img src="https://scontent-hkg4-2.xx.fbcdn.net/v/t1.15752-9/121703921_3458411677546399_5158162367127379017_n.png?_nc_cat=104&_nc_sid=ae9488&_nc_ohc=Wf-g0tghSYgAX_QFN_r&_nc_ht=scontent-hkg4-2.xx&oh=14a1332396e805c9ed9191f90dce33a3&oe=5FB799BB" alt="#" height="400px" width="auto" />
                </div>
            </Col>
        </Row >
    );
};

export default (PageError);
