import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import demoVideo from '../assets/demovideo.mp4';
import { useLocation, useNavigate } from 'react-router-dom';

function VideoPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { reason } = location.state || {};

    const videoRef = useRef();

    const [showPlayButton, setShowPlayButton] = useState(true);
    const [remainingTime, setRemainingTime] = useState(0);
    const [videoFinished, setVideoFinished] = useState(false);

    // const progressRef = useRef();
    // const remainingProgressRef = useRef();

    // const [currentTime, setCurrentTime] = useState(0);
    // const [duration, setDuration] = useState(0);


    // const handlePlayVideo = () => {
    //     videoRef.current.play();
    // };

    // const handlePauseVideo = () => {
    //     videoRef.current.pause();
    // };

    // show full remaining bar at first
    // useEffect(() => {
    //     remainingProgressRef.current.style.width = `100%`;
    // }, []);

    // const formatTime = (time) => {
    //     const minutes = Math.floor(time / 60);
    //     const seconds = Math.floor(time % 60);
    //     return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    // };

    // const updateProgressBar = () => {
    //     const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    //     const remainingProgress = 100 - progress;
    //     progressRef.current.style.width = `${progress}%`;
    //     remainingProgressRef.current.style.width = `${remainingProgress}%`;
    //     setCurrentTime(videoRef.current.currentTime);
    // };

    // useEffect(() => {
    //     videoRef.current.addEventListener('timeupdate', updateProgressBar);
    //     videoRef.current.addEventListener('loadedmetadata', () => {
    //         setDuration(videoRef.current.duration);
    //     });
    // }, []);

    useEffect(() => {
        if (reason && reason === "backFromGame") {
            setVideoFinished(true);
        }
    }, []);

    useEffect(() => {
        const handleVideoEnd = () => {
            setVideoFinished(true);
            setShowPlayButton(true)
        };
        videoRef.current.addEventListener('ended', handleVideoEnd);

        videoRef.current.addEventListener('timeupdate', updateRemainingTime);

    }, []);

    const handleRestart = () => {
        setShowPlayButton(false)
        videoRef.current.currentTime = 0; // Reset video to the beginning
        videoRef.current.play(); // Start playing the video
    };

    const updateRemainingTime = () => {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        const remaining = Math.ceil(duration - currentTime); // Calculate remaining time in seconds
        setRemainingTime(remaining);
    };

    return (
        <>
            <Container className='mt-2 d-flex justify-content-start' style={{ maxWidth: '100%' }}>
                <div>
                    <p>Please understand information about the subsequent game rules from the video.</p>
                    <p>* You might miss out on important infomation if you skip to next step.</p>
                </div>
            </Container>
            <Container className='video-container mt-2 d-flex justify-content-center'>
                <div style={{ position: 'relative' }}>
                    <video ref={videoRef}>
                        <source src={demoVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className='countdown'>
                        {remainingTime > 0 && <div>{remainingTime}</div>}
                    </div>
                    {showPlayButton &&
                        <div className='replay-button-div'>
                            <button className='replay-button' onClick={handleRestart}>Play</button>
                    </div>}
                </div>
            </Container>
            <Container className='mt-2 d-flex justify-content-end' style={{ maxWidth: '100%' }}>
                {videoFinished && <button className='normal-button' onClick={() => { navigate('/game') }}>Next</button>}
            </Container>

            {
                // self made progress bar
                /* <Container className='d-flex justify-content-center flex-column' style={{ maxWidth: '100%' }}>
                    <Row>                        
                        <Col className="progress-bar-style d-flex align-items-center" >
                            <div ref={progressRef} className="progress-style"></div>
                            <div ref={remainingProgressRef} className="remaining-progress-style"></div>
                        </Col>
                        <Col xs='auto' className="progress-bar-style d-flex align-items-center">
                            <div style={{ color: 'white', fontSize: 12 }}>{`${formatTime(currentTime)}/${formatTime(duration)}`}</div>
                        </Col>
                    </Row>
                </Container> */}

            {
                // self made play button
                /* <Row className='mt-2'>
                    <Col xs='auto'>
                        <button className='normal-button' onClick={handlePlayVideo}>Play</button>
                    </Col>
                    <Col xs='auto'>
                        <button className='normal-button' onClick={handlePauseVideo}>Pause</button>
                    </Col>
                    <Col>
                        {videoFinished && <button className='normal-button' onClick={() => { navigate('/game') }}>Next</button>}
                    </Col>
                </Row> */}

        </>
    );
}

export default VideoPage;