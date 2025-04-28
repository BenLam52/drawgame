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

    function formatDateTime(inputDateTimeString) {
        const year = inputDateTimeString.slice(0, 4);
        const month = inputDateTimeString.slice(4, 6);
        const day = inputDateTimeString.slice(6, 8);
        const hours = inputDateTimeString.slice(9, 11);
        const minutes = inputDateTimeString.slice(12, 14);
        const seconds = inputDateTimeString.slice(15, 17);

        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDateTime;
    }

    return (
        <>
            <Container className='d-flex justify-content-center mt-2 flex-column'>
                {!drawed ? <>
                    <Row className='text-center'>
                        <Col xs={12}>
                            Click the button to participate in the lucky draw.
                        </Col>
                        <Col className='mt-2'>
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
                                <Col sm={12}>
                                    <p>Congratulations! You've won {successResponse.result.prize}!</p>
                                    <p>Please redeem before : {formatDateTime(successResponse.result.expiryDateTime)}</p>
                                    <p>Your redeem QR Code :</p>                                 
                                </Col>
                                <Col sm={12} className='d-flex justify-content-center'>
                                        <div className="qrcode-container">
                                            <span className="line"></span>
                                            <span className="line"></span>
                                            <span className="line"></span>
                                            <span className="line"></span>
                                            <QRCodeSVG value={successResponse.result.redeemQRCode} />
                                        </div>
                                </Col>
                            </Row>
                        </> : <>
                            <Row>
                                <Col>
                                    <p>Sorry, better luck next time.</p>
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