import React, { useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { QRCodeSVG } from 'qrcode.react';


function DrawPage() {
    const [drawed, setDrawed] = useState(false);
    const [hasPrize, setHasPrize] = useState();

    const successResponse = {
        success: true,
        result: {
            drawSuccess: true,
            prize: "XXXXXX",
            redeemQRCode: "XXXXXX",
            expiryDateTime: "20250501T23:59:59"
        }
    };

    const failResponse = {
        success: true,
        result: {
            drawSuccess: false,
            prize: "XXXXXX",
            redeemQRCode: "XXXXXX",
            expiryDateTime: "20250501T23:59:59"
        }
    };

    const handleDrawPrize = () => {
        setDrawed(true)
        setHasPrize(true);
    };

    const handleDrawPrizeFail = () => {
        setDrawed(true)
        setHasPrize(false);
    };


    return (
        <>
            <Container className='d-flex justify-content-center mt-2 flex-column'
            // style={{ maxWidth: '100%' }}
            >
                {!drawed ? <>
                    <Row className='text-center'>
                        <Col>
                            <button className='normal-button' onClick={handleDrawPrize}>Draw </button>
                        </Col>
                        {/* <Col>
                            <button className='normal-button' onClick={handleDrawPrizeFail}>Draw Fail</button>
                        </Col> */}
                    </Row>
                </> : <>
                    {
                        hasPrize ? <>
                            <Row>
                                <Col>
                                    <p>Congratulations! You've won {successResponse.result.prize}!</p>
                                    <p>Your redeem QR Code: {successResponse.result.redeemQRCode}</p>
                                    <div>
                                        <QRCodeSVG value={successResponse.result.redeemQRCode} />
                                    </div>
                                    <p>Expiry Date: {successResponse.result.expiryDateTime}</p>
                                </Col>
                            </Row>
                        </> : <>
                            <Row>
                                <Col>
                                    <p>Sorry, better luck next time!</p>
                                </Col>
                            </Row>
                        </>
                    }
                </>
                }

            </Container>
        </>
    );
}

export default DrawPage;