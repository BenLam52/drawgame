import React, { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    function ifMobileByAgent() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        console.log('Agent: ' + navigator.userAgent)
        return regex.test(navigator.userAgent);
    }

    function ifMobileByWidth() {
        const minWidth = 768; // Minimum width for desktop devices
        console.log('Window width: ' + window.innerWidth)
        console.log('Screen width: ' + screen.width)
        return window.innerWidth < minWidth || screen.width < minWidth;
      }

    useEffect(() => {
        if (ifMobileByAgent() && ifMobileByWidth()) {
            console.log("Mobile device detected");
            navigate('/form');
        } else {
            console.log("Desktop device detected");
            window.location.href = "https://primeprioritytech.com";
        }
    }, [])

    return (
        <>
            <Container className='d-flex justify-content-center mt-3'
            // style={{ maxWidth: '100%' }}
            >
                <Spinner></Spinner>
            </Container>
        </>
    );
}

export default HomePage;